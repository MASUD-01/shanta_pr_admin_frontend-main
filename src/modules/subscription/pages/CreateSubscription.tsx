/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Form, Card, Typography, Divider } from 'antd';
import dayjs from 'dayjs';
import SubmitButton from '../../../common/submitButton/SubmitButton';
import DynamicSubscriptionForm from '../component/DynamicSubscriptionForm';
import { useCreateSubscriptionMutation } from '../api/subscriptionEndpoints';
import { useNavigate } from 'react-router-dom';
import { ISubscriptionType } from '../type/subscriptiontype';
const CreateSubscription = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [createSubscription, { isLoading, isSuccess }] =
    useCreateSubscriptionMutation();
  const [productId, setProductId] = useState<number>(0);

  const onFinish = (values: { subscription: ISubscriptionType[] }) => {
    const data = values?.subscription.map((item) => ({
      sold_date: dayjs(item.sold_date).format('YYYY-MM-DD'),
      expire_date: dayjs(item.expire_date).format('YYYY-MM-DD'),
      client_id: item.client_id,
      last_collected_by: item.last_collected_by,
      product_id: item.product_id,
      subscription_amount: item.subscription_amount,
      period: item.period,
      // last_paid_amount: item.last_paid_amount,
      status: 'active',
      last_feedback: item.last_feedback,
    }));

    createSubscription({ subscription: data });
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      navigate('/subscription/list');
    }
  }, [isSuccess]);
  return (
    <Card
      style={{
        boxShadow: '0 0 0 1px rgba(0,0,0,.05)',
      }}
      title={'Create Subscription'}
    >
      <Form onFinish={onFinish} layout='vertical' form={form}>
        <Card className='border'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <Typography.Title level={5}>Subscription Info</Typography.Title>
          </div>

          <Form.List name='subscription' initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => {
                  return (
                    <div key={index}>
                      <DynamicSubscriptionForm
                        field={field}
                        add={add}
                        remove={remove}
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
        </Card>

        <div style={{ marginTop: '10px' }}>
          <SubmitButton label='Create Subscription' loading={isLoading} />
        </div>
      </Form>
    </Card>
  );
};

export default CreateSubscription;
