/* eslint-disable @typescript-eslint/ban-types */
import { Col, Form, Input, Row } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { DateInput } from '../../../common/fromItemCommon/SelectCustomField';
import FormInput from '../../../common/Input/FormInput';
import {
  ISubscriptionListType,
  ISubscriptionType,
} from '../type/subscriptiontype';
import SubmitButton from '../../../common/submitButton/SubmitButton';
import { useRenewSubscriptionMutation } from '../api/subscriptionEndpoints';

const RenewSubscription = ({
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
  const [renewSubscription, { isLoading, isSuccess }] =
    useRenewSubscriptionMutation();
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

  const onFinish = (values: ISubscriptionType) => {
    const data = {
      expire_date: dayjs(values.expire_date).format('YYYY-MM-DD'),
      last_paid_amount: values?.last_paid_amount as number,
      last_collected_by: values?.last_collected_by,
      last_payment_date: dayjs(values.last_payment_date).format('YYYY-MM-DD'),
      last_feedback: values.last_feedback,
    };
    renewSubscription({ data: data, id: record.id });
  };

  useEffect(() => {
    if (record) {
      form.setFieldValue('last_expire_date', dayjs(record.expire_date));
      form.setFieldsValue({
        last_payment_date: dayjs(),
      });
      form.setFieldsValue({
        last_paid_amount: record.subscription_amount,
      });

      const monthCount =
        record.period === '1_year' ? 12 : parseInt(record.period); // Extract the numeric part of the value
      const expireDate = dayjs(record.expire_date).add(monthCount, 'month');
      form.setFieldValue('expire_date', expireDate);
    }

    if (isSuccess) {
      setIsModalVisible({ isOpen: false, data: {}, renewsubscription: '' });
    }
  }, [isSuccess, record]);

  return (
    <Form onFinish={onFinish} layout='vertical' form={form}>
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12} md={8} lg={8}></Col>

        <Col xs={24} sm={12} md={8} lg={8}>
          <DateInput
            rules={[
              {
                required: true,
                message: 'Payment Date is required',
              },
            ]}
            label='Payment Date'
            name='last_payment_date'
            onChange={(e: any) =>
              setInfo({
                ...info,
                last_payment_date: dayjs(e)?.format('YYYY-MM-DD'),
              })
            }
          />
        </Col>

        <FormInput
          rules={[
            {
              required: true,
              message: 'Amount is required',
            },
          ]}
          name='last_paid_amount'
          label='Amount'
          md={6}
          lg={8}
          size={8}
          numberType
          placeholder='Enter amount'
          onChange={(e: any) =>
            setInfo({
              ...info,
              last_paid_amount: e,
            })
          }
        />
        <Col xs={24} sm={12} md={8} lg={8}>
          <DateInput
            required
            label='Last Expire Date'
            name='last_expire_date'
            size={3}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <DateInput
            required
            label='New Expire Date'
            name='expire_date'
            size={3}
            onChange={(e: any) =>
              setInfo({
                ...info,
                expire_date: dayjs(e)?.format('YYYY-MM-DD'),
              })
            }
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Form.Item
            label='Remark'
            name='last_feedback'
            rules={[
              {
                required: true,
                message: 'Remark is required',
              },
            ]}
          >
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
      <SubmitButton label='Renew' loading={isLoading} />
    </Form>
  );
};

export default RenewSubscription;
