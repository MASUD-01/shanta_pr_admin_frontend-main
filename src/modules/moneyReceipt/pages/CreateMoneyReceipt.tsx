/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  Col,
  Input,
  Row,
  Select,
  DatePicker,
  Card,
  Typography,
  Divider,
  InputNumber,
  Button,
} from 'antd';
import SubmitButton from '../../../common/submitButton/SubmitButton';
import dayjs from 'dayjs';
import { useWatch } from 'antd/es/form/Form';
import { useEffect, useMemo, useState } from 'react';
import { useGetAllAccountQuery } from '../../accounts/api/AccountEndPoints';
import { SearchAbleSelectInput } from '../../../common/Input/SearchAbleSelectInput';
import { useCreateMoneyReceiptMutation } from '../api/moneyReceiptEndPoint';
import SpecificInvoiceForm from '../components/SpecificInvoiceForm';
import { useNavigate } from 'react-router-dom';
import notification from '../../../common/Notification/notification';
import { debounce } from 'lodash';
import { useGetEmployeesQuery } from '../../Configuration/Employee/api/employeeEndPoint';
import { useAppDispatch } from '../../../app/store/store';
import { setCommonModal } from '../../../app/slice/modalSlice';
import CreateEmployee from '../../Configuration/Employee/components/CreateEmployee';
import { PlusOutlined } from '@ant-design/icons';

const CreateMoneyReceipt = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: accounts } = useGetAllAccountQuery({});
  const [createMoneyReceipt, { data, isLoading, isSuccess }] =
    useCreateMoneyReceiptMutation();
  const getOptions = (type: any) => {
    return accounts?.data?.length
      ? accounts?.data
          .filter((i) => i?.account_type === type)
          .map((account) => ({
            value: account.id,
            label: account.name,
          }))
      : [];
  };

  const client_id = useWatch('client_id', form);

  // const credit_note = useWatch("credit_note", form);
  const payment_type = useWatch('payment_method', form);
  const specific_invoice = useWatch('specific_invoice', form);
  const invoicesData = useWatch('invoices', form);
  useEffect(() => {
    if (payment_type) {
      form.resetFields(['account_id']);
    }
  }, [form, payment_type]);
  const total = invoicesData?.reduce(
    (acc: any, invoice: any) => acc + invoice?.amount,
    0
  );

  useEffect(() => {
    if (total) {
      form.setFieldValue('amount', total);
    }
  }, [total]);

  const onFinish = (values: any) => {
    const { present_due, amount, specific_invoice, ...rest } = values;
    if (Number(present_due) === 0) {
      notification(`Client does not have due amount`, 'error');
      return;
    } else {
      const submitData: any = {};
      submitData.amount = Number(amount);
      submitData.specific_invoice = specific_invoice === 1 ? true : false;
      for (const key in rest) {
        if (rest[key]) {
          if (key === 'discount') {
            submitData[key] = Number(rest[key]);
          } else if (
            key === 'payment_date' ||
            key === 'withdraw_date' ||
            key === 'create_date'
          ) {
            submitData[key] = dayjs(rest[key]).format('YYYY-MM-DD');
          } else if (key === 'invoices') {
            const SubmitValue = rest[key]?.map((item: any) => {
              return { invoice_id: item?.invoice_id, amount: item?.amount };
            });
            submitData[key] = SubmitValue;
          } else {
            submitData[key] = rest[key];
          }
        }
      }

      createMoneyReceipt({ data: submitData });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      navigate(`/money-receipt/list/${data?.data?.id}`);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (client_id) {
      form.setFieldValue('specific_invoice', 0);
      form.setFieldValue('invoices', [{}]);
    }
  }, [client_id]);

  const [searchEmployee, setSearchEmployee] = useState('');
  const { data: employees } = useGetEmployeesQuery(
    searchEmployee
      ? {
          name: searchEmployee,
        }
      : {}
  );
  const handleSearchEmployee = useMemo(
    () =>
      debounce((searchEmployee: string) => {
        setSearchEmployee(searchEmployee);
      }, 500),
    []
  );

  const dispatch = useAppDispatch();
  const showModal2 = () => {
    dispatch(
      setCommonModal({
        title: 'Create Employee',
        content: <CreateEmployee />,
        show: true,
        width: 1000,
      })
    );
  };

  return (
    <Card title={'Create Money Receipt'}>
      <Form
        onFinish={onFinish}
        layout='vertical'
        form={form}
        initialValues={{
          payment_date: dayjs(),
          withdraw_date: dayjs(),
          payment_type: 'Cash',
          specific_invoice: 0,
          amount: undefined,
        }}
      >
        <Row align={'middle'} gutter={[0, 0]} justify={'center'}>
          <Row
            gutter={[0, 0]}
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            <Col xs={24} sm={24} md={8} lg={8}></Col>
          </Row>

          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            <Col xs={24} sm={24} md={8} lg={8}>
              <Form.Item
                name='present_due'
                label={
                  <Typography style={{ color: 'red' }}>Present Due</Typography>
                }
              >
                <Input placeholder='Present due' type='text' disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            <Col xs={24} sm={24} md={8} lg={8}>
              <Form.Item
                name='specific_invoice'
                rules={[{ required: true }]}
                label='Payment To Specific Invoice'
                required
              >
                <Select
                  options={[
                    { value: 1, label: 'Specific' },
                    { value: 0, label: 'OverAll' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* specific invoice  start*/}

          {specific_invoice ? (
            <Form.List name='invoices' initialValue={[{}]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => {
                    return (
                      <div key={index}>
                        <SpecificInvoiceForm
                          field={field}
                          add={add}
                          remove={remove}
                          form={form}
                          client_id={client_id}
                        />

                        {fields.length > 1 && <Divider />}
                      </div>
                    );
                  })}
                </>
              )}
            </Form.List>
          ) : (
            ''
          )}

          {/* specific invoice  End*/}
          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            <Col xs={24} sm={24} md={8} lg={8}>
              <Form.Item
                name='payment_method'
                rules={[
                  { required: true, message: 'Payment Type is required' },
                ]}
                label='Payment method'
              >
                <Select
                  placeholder='Select payment method'
                  options={[
                    { value: 'Cash', label: 'Cash' },
                    { value: 'Bank', label: 'Bank' },
                    { value: 'Cheque', label: 'Cheque' },
                    { value: 'Mobile Banking', label: 'Mobile Banking' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            <Col xs={24} sm={24} md={8} lg={8}>
              {payment_type === 'Bank' ? (
                <SearchAbleSelectInput
                  placeholder='Select account'
                  label='Select account'
                  name='account_id'
                  rules={[{ required: true, message: 'Account is required' }]}
                  options={getOptions('Bank')}
                  onSelect={(value: any) =>
                    form.setFieldValue('account_id', value)
                  }
                />
              ) : payment_type === 'Cash' ? (
                <SearchAbleSelectInput
                  placeholder='Select account'
                  label='Select account'
                  name='account_id'
                  rules={[{ required: true, message: 'Account is required' }]}
                  options={getOptions('Cash')}
                  onSelect={(value: any) =>
                    form.setFieldValue('account_id', value)
                  }
                />
              ) : (
                payment_type === 'Mobile Banking' && (
                  <SearchAbleSelectInput
                    placeholder='Select account'
                    label='Select account'
                    name='account_id'
                    rules={[{ required: true, message: 'Account is required' }]}
                    options={getOptions('Mobile banking')}
                    onSelect={(value: any) =>
                      form.setFieldValue('account_id', value)
                    }
                  />
                )
              )}
            </Col>
          </Row>

          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            {payment_type === 'Cheque' && (
              <>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <Form.Item
                    name='bank_name'
                    rules={[
                      { required: true, message: 'Bank name is required' },
                    ]}
                    label='Bank Name'
                    required
                  >
                    <Input placeholder='Add bank name' type='text' />
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>
          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            {payment_type === 'Cheque' && (
              <>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <Form.Item
                    name='cheque_no'
                    rules={[
                      { required: true, message: 'Cheque No is required' },
                    ]}
                    label='Cheque No'
                    required
                  >
                    <Input placeholder='Cheque No' type='text' />
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>
          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            {payment_type === 'Cheque' && (
              <>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <Form.Item
                    name='withdraw_date'
                    rules={[
                      { required: true, message: 'Withdraw date is required' },
                    ]}
                    label='Withdraw Date'
                    required
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>

          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            {/* credit_note !== 1 && */}
            {payment_type !== 'Cash' ? (
              <Col xs={24} sm={24} md={8} lg={8}>
                <Form.Item name='extra_charge' label='Transaction Charge'>
                  <Input placeholder='Transaction Charge' type='number' />
                </Form.Item>
              </Col>
            ) : (
              ''
            )}
          </Row>

          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            {' '}
            <Col xs={24} sm={24} md={8} lg={8}>
              <Form.Item
                name='amount'
                rules={[{ required: true, message: 'Amount is required' }]}
                label='Amount'
                required
              >
                <InputNumber
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{9})+(?!\d))/g, ',')
                  }
                  placeholder='amount'
                  disabled={specific_invoice}
                  type='number'
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            <Col xs={24} sm={24} md={8} lg={8}>
              <Form.Item name='discount' label='Discount' initialValue={0}>
                <InputNumber
                  placeholder='Discount'
                  type='number'
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{9})+(?!\d))/g, ',')
                  }
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            <Col xs={24} sm={24} md={8} lg={8}>
              <Form.Item
                name='payment_date'
                // rules={[{ required: true }]}
                label='Payment Date'
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            <Col xs={24} sm={24} md={8} lg={8}>
              <Form.Item
                name='transaction_no'
                // rules={[
                //   {
                //     required: true,
                //     message: "Manual money receipt no is required",
                //   },
                // ]}
                label='Manual money receipt no'
              >
                <Input placeholder='Input manual number' type='text' />
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            <Col xs={24} sm={24} md={8} lg={8}>
              <Form.Item
                name='collected_by'
                label={
                  <>
                    Collected by
                    <Button
                      type='primary'
                      size={'small'}
                      icon={<PlusOutlined />}
                      onClick={showModal2}
                      style={{ marginLeft: '5px' }}
                    >
                      Add
                    </Button>
                  </>
                }
                rules={[{ required: true, message: 'Collector is required!' }]}
              >
                <Select
                  allowClear
                  showSearch
                  placeholder='Select Employee'
                  // onChange={(e) =>
                  //   e && setFilterItem({ ...filterItem, person: e })
                  // }
                  style={{ width: '100%' }}
                  options={
                    employees?.data?.length
                      ? employees?.data?.map((employee) => ({
                          value: employee.id,
                          label: employee.name,
                        }))
                      : []
                  }
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').localeCompare(optionB?.label ?? '')
                  }
                  // onSelect={(value: any) =>
                  //   form.setFieldValue("client_id", value)
                  // }
                  onSearch={handleSearchEmployee}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              width: '100%',
            }}
            justify={'center'}
          >
            <Col xs={24} sm={24} md={8} lg={8}>
              <Form.Item name='note' label='Note'>
                <Input.TextArea placeholder='Note' rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Row>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <SubmitButton label='Create' loading={isLoading} />
        </div>
      </Form>
    </Card>
  );
};

export default CreateMoneyReceipt;
