/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Col, Input, Row, DatePicker, Select } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCommonModal } from '../../../app/slice/modalSlice';
import dayjs from 'dayjs';
import { useCreateAddBalanceMutation } from '../api/AddBalanceEndPoint';
import { useGetAllAccountQuery } from '../api/AccountEndPoints';
import { SearchAbleSelectInput } from '../../../common/Input/SearchAbleSelectInput';
import SubmitButton from '../../../common/submitButton/SubmitButton';
import { useWatch } from 'antd/es/form/Form';

const AddBalance = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { data: accounts } = useGetAllAccountQuery({});
  const [createAddBalance, { isLoading, isSuccess }] =
    useCreateAddBalanceMutation();

  const accountId = useWatch('account_id', form);
  const findAccount = accounts?.data?.find(
    (account) => account.id === accountId
  );

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

  const payment_type = useWatch('payment_method', form);
  useEffect(() => {
    if (payment_type) {
      form.resetFields(['account_id']);
      form.resetFields(['available_balance']);
    }
  }, [form, payment_type]);

  useEffect(() => {
    if (findAccount?.id) {
      form.setFieldValue('available_balance', findAccount.balance);
    }
  }, [accountId]);

  const onFinish = (values: any) => {
    const { account_id, amount, type, payment_method, extra_charge } = values;

    createAddBalance({
      data: {
        account_id,
        amount: Number(amount),
        create_date: dayjs(values?.date).format('YYYY-MM-DD'),
        type,
        payment_method,
        extra_charge,
      },
    });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
      form.resetFields();
    }
  }, [isSuccess]);

  // const paymentMethod = useWatch("payment_method", form);

  return (
    <div style={{ paddingTop: '10px' }}>
      <Form
        onFinish={onFinish}
        layout='vertical'
        form={form}
        initialValues={{ date: dayjs(new Date()) }}
      >
        <Row gutter={[10, 10]}>
          <Col xs={24} md={12} lg={12}>
            <Form.Item
              name='payment_method'
              rules={[{ required: true, message: 'Payment Type is required' }]}
              label='Payment Method'
            >
              <Select
                placeholder='Select payment method'
                options={[
                  { value: 'Cash', label: 'Cash' },
                  { value: 'Bank', label: 'Bank' },
                  { value: 'Mobile Banking', label: 'Mobile Banking' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={12}>
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
            ) : payment_type === 'Mobile banking' ? (
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
              <SearchAbleSelectInput
                placeholder='Select account'
                label='Select account'
                name='account_id'
                rules={[{ required: true, message: 'Account is required' }]}
                options={getOptions('Cheque')}
                onSelect={(value: any) =>
                  form.setFieldValue('account_id', value)
                }
              />
            )}
          </Col>
          <Col xs={24} md={12} lg={12}>
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
          <Col xs={24} md={12} lg={12}>
            <Form.Item name='type' label='Payment type'>
              <Select
                placeholder='Select payment type'
                options={[
                  { value: 'OUT', label: 'Debit' },
                  { value: 'IN', label: 'Credit' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={12}>
            <Form.Item
              name='amount'
              rules={[{ required: true, message: 'Amount is required' }]}
              label='Amount'
            >
              <Input
                placeholder='Amount'
                type='number'
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={12}>
            <Form.Item name='date' label=' Date'>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ marginTop: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <SubmitButton loading={isLoading} label='Add Balance' />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBalance;
