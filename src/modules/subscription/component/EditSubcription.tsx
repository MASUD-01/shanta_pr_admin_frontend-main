/* eslint-disable @typescript-eslint/ban-types */
import { Col, Form, Input, message, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { ISubscriptionListType } from '../type/subscriptiontype';
import SubmitButton from '../../../common/submitButton/SubmitButton';
import { useUpdateSubscriptionMutation } from '../api/subscriptionEndpoints';
import { months } from './DynamicSubscriptionForm';
import { Option } from 'antd/es/mentions';
import { useWatch } from 'antd/es/form/Form';
import { removeUndefinedAndNull } from '../../../app/utils/removeUndefinedAndNull';

const EditSubcription = ({
  record,
  setIsModalVisible,
}: {
  record: ISubscriptionListType;
  setIsModalVisible: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      data: {};
      renewsubscription: 'edit' | 'renew' | '';
    }>
  >;
}) => {
  const [form] = Form.useForm();
  const expire_date = useWatch('expire_date', form);
  const [updateSubscription, { isLoading, isSuccess }] =
    useUpdateSubscriptionMutation();
  const [info, setInfo] = useState({
    client_id: '',
    last_collected_by: '',
    product_id: '',
    last_payment_date: '',
    period: '',
    expire_date: '',
    last_paid_amount: '',
    last_feedback: '',
    status: '',
  });

  useEffect(() => {
    if (info.period && expire_date) {
      setInfo({
        ...info,
        expire_date: dayjs(expire_date).format('YYYY-MM-DD'),
      });
    }
  }, [info.period]);
  const onFinish = () => {
    const removeData = removeUndefinedAndNull(info);
    if (Object.values(removeData).length === 0) {
      return message.error('Please chnge any field first');
    }

    updateSubscription({ data: removeData, id: record.id });
  };

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        ...record,
        last_collected_by: record.last_collected_by,
        expire_date: dayjs(record?.expire_date),
        last_payment_date: dayjs(record?.last_payment_date),
        last_paid_amount: record.last_paid_amount,
      });
    }

    if (isSuccess) {
      setIsModalVisible({ isOpen: false, data: {}, renewsubscription: '' });
    }
  }, [isSuccess, record]);
  const handleMonthChange = (value: any) => {
    const monthCount = parseInt(value); // Extract the numeric part of the value
    const expireDate = dayjs(record.last_payment_date).add(monthCount, 'month');
    form.setFieldValue('expire_date', expireDate); // Calculate the expiration date
  };
  return (
    <Form onFinish={onFinish} layout='vertical' form={form}>
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name={'period'} label='Subscription Month'>
            <Select
              placeholder='Select a month'
              onChange={handleMonthChange}
              onSelect={(e) =>
                setInfo({
                  ...info,
                  period: e,
                })
              }
            >
              {months?.map((month) => (
                <Option key={month.value} value={month.value}>
                  {month.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={12}>
          <Form.Item name={'status'} label='Select Status'>
            <Select
              placeholder={'Select status'}
              showSearch
              allowClear
              style={{
                padding: '0',
                margin: '0',
                border: '0',
                width: '100%',
              }}
              optionFilterProp='roleMobile'
              filterOption={(input, option) =>
                (option!.children as unknown as string).includes(input)
              }
              onSelect={(e: any) =>
                setInfo({
                  ...info,
                  status: e,
                })
              }
            >
              <Select.Option value={'active'}>Active</Select.Option>
              <Select.Option value={'inactive'}>InActive</Select.Option>
              <Select.Option value={'expired'}>Expired</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item label='Remark' name='last_feedback'>
            <Input.TextArea
              placeholder='Enter remarks'
              autoSize={{ minRows: 2, maxRows: 5 }}
              onChange={(e: any) =>
                setInfo({
                  ...info,
                  last_feedback: e?.target?.value,
                })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <SubmitButton label='Update Subscription' loading={isLoading} />
    </Form>
  );
};

export default EditSubcription;
