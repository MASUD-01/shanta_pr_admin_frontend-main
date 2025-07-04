/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Col, Row, Form, DatePicker, Divider, Select, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useWatch } from 'antd/es/form/Form';
import SubmitButton from '../../../common/submitButton/SubmitButton';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCommonModal } from '../../../app/slice/modalSlice';
import { useGetAllAccountQuery } from '../../accounts/api/AccountEndPoints';
import { useCreateExpenseMutation } from '../api/expenseEndPoint';
import dayjs from 'dayjs';
import DynamicExpense from './DynamicExpense';
import { SearchAbleSelectInput } from '../../../common/Input/SearchAbleSelectInput';
import { DateInput } from '../../../common/fromItemCommon/SelectCustomField';

const CreateExpense = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { data: accounts } = useGetAllAccountQuery({});

  const [productId, setProductId] = useState<number>(0);
  const [createExpense, { isLoading, isSuccess }] = useCreateExpenseMutation();
  const accountId = useWatch('account_id', form);
  const findAvailableBalance = accounts?.data?.find(
    (account) => account?.id === accountId
  );

  useEffect(() => {
    if (findAvailableBalance) {
      form.setFieldValue(
        'available_balance',
        findAvailableBalance?.balance || '00'
      );
    }
  }, [findAvailableBalance, form]);

  const payment_type = useWatch('method', form);

  useEffect(() => {
    if (payment_type) {
      form.resetFields(['account_id']);
    }
  }, [form, payment_type]);

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

  const onFinish = (values: any) => {
    const { available_balance, ...rest } = values;

    const SubmitData: any = {};
    for (const key in rest) {
      if (rest[key]) {
        if (key === 'amount') {
          SubmitData[key] = Number(rest[key]);
        } else if (key === 'expense_date') {
          SubmitData[key] = dayjs(rest[key]).format('YYYY-MM-DD');
        } else {
          SubmitData[key] = rest[key];
        }
      }
    }

    createExpense({ data: SubmitData });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
      form.resetFields();
    }
  }, [isSuccess]);

  const findAccount = accounts?.data?.find(
    (account) => account.id === accountId
  );
  useEffect(() => {
    if (payment_type) {
      form.resetFields(['account_id']);
    }
  }, [form, payment_type]);

  useEffect(() => {
    if (findAccount?.id) {
      form.setFieldValue('available_balance', findAccount.balance || 0);
    } else {
      form.resetFields(['available_balance']);
    }
  }, [accountId, findAccount?.balance, findAccount?.id, form]);

  return (
    <Row justify='center' align='middle' style={{ maxWidth: 'auto' }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Form
          layout='vertical'
          form={form}
          onFinish={onFinish}
          initialValues={{
            expense_date: dayjs(),
            method: 'Cash',
          }}
        >
          <Card
            className='border'
            style={{
              marginBottom: '1rem',
              marginTop: '1rem',
            }}
          >
            <Row align={'middle'} gutter={[5, 16]}>
              <Col xs={24} sm={24} md={6} lg={24}>
                <Form.List name='expenseItem' initialValue={[{}]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => {
                        return (
                          <div key={index}>
                            <DynamicExpense
                              field={field}
                              add={add}
                              remove={remove}
                              singleExpenseData=''
                              setProductId={setProductId}
                              productId={productId}
                              form={form}
                            />
                            {fields.length > 1 && <Divider />}
                          </div>
                        );
                      })}
                    </>
                  )}
                </Form.List>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8}>
                <Form.Item
                  name='method'
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
                ) : payment_type === 'Mobile Banking' ? (
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
                ) : (
                  ''
                )}
              </Col>

              {payment_type === 'Cheque' && (
                <>
                  <Col xs={24} sm={24} md={6} lg={8}>
                    <DateInput
                      label='Withdraw Date'
                      name='withdraw_date'
                      size={5}
                      required
                    />
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={8}>
                    <Form.Item
                      name='cheque_no'
                      rules={[
                        { required: true, message: 'This field is required' },
                      ]}
                      label='Cheque No.'
                      required
                    >
                      <Input placeholder='Cheque No.' type='number' />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={8}>
                    <Form.Item
                      name='bank_name'
                      rules={[
                        { required: true, message: 'This field is required' },
                      ]}
                      label='Bank Name'
                      required
                    >
                      <Input placeholder='Bank Name' type='text' />
                    </Form.Item>
                  </Col>
                </>
              )}
              {payment_type !== 'Cheque' ? (
                <Col xs={24} md={12} lg={8}>
                  <Form.Item
                    name='available_balance'
                    // rules={[{ required: true, message: "Amount is required" }]}
                    label='Available balance'
                  >
                    <Input
                      placeholder='Amount'
                      type='number'
                      style={{ width: '100%' }}
                      disabled
                    />
                  </Form.Item>
                </Col>
              ) : (
                ''
              )}

              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  name='expense_date'
                  label='Date'
                  rules={[{ required: true }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item name='note' label='Note'>
                  <TextArea rows={3} placeholder='Note' />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Form.Item style={{ marginTop: '1rem' }}>
            <div style={{ textAlign: 'end' }}>
              <SubmitButton loading={isLoading} label='Create' />
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateExpense;
