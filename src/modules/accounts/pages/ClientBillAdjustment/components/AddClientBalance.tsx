/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Col, Input, Row, DatePicker, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useWatch } from 'antd/es/form/Form';
import { useGetAllAccountQuery } from '../../../api/AccountEndPoints';
import { useCreateClientBillAdjMutation } from '../api/ClientBillAdjustmentEndpoint';
import { setCommonModal } from '../../../../../app/slice/modalSlice';
import SubmitButton from '../../../../../common/submitButton/SubmitButton';

const AddClientBalance = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { data: accounts } = useGetAllAccountQuery({});
  const [createAddBalance, { isLoading, isSuccess }] =
    useCreateClientBillAdjMutation();
  const [clientDueAmount, setClientDueAmount] = useState('');
  const accountId = useWatch('client_id', form);
  const findAccount = accounts?.data?.find(
    (account) => account.id === accountId
  );

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
    const { client_id, amount, type } = values;

    const payload = {
      client_id,
      amount: Number(amount),
      create_date: dayjs(values?.date).format('YYYY-MM-DD'),
      type,
    };
    createAddBalance(payload);
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
      form.resetFields();
      setClientDueAmount('');
    }
  }, [isSuccess]);

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
            {Number(clientDueAmount) > 0 ? (
              <span style={{ color: 'red' }}>
                Client Due: {clientDueAmount}
              </span>
            ) : (
              ''
            )}
          </Col>

          <Col xs={24} md={12} lg={12}>
            <Form.Item
              name='type'
              rules={[{ required: true, message: 'Payment Type is required' }]}
              label='Payment type'
            >
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
            <Form.Item name='date' label=' Date' required>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ marginTop: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <SubmitButton loading={isLoading} label='Adjust Client Balance' />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddClientBalance;
