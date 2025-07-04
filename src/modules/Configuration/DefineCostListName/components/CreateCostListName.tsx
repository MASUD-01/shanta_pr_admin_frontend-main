/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCommonModal } from '../../../../app/slice/modalSlice';
import SubmitButton from '../../../../common/submitButton/SubmitButton';
import { useCreateServiceMutation } from '../../CreateService/api/CreateServiceEndPoint';

const CreateCostListName = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [CreateCostListName, { isLoading, isSuccess }] =
    useCreateServiceMutation();

  const onFinish = (values: any) => {
    const data = {
      category_name: values.category_name,
      prefix: values.prefix,
      prefix_start: values.prefix_start,
    };
    CreateCostListName({ data });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess, form]);
  return (
    <Form layout='vertical' form={form} onFinish={onFinish}>
      <Card
        className='border'
        style={{
          marginBottom: '1rem',
          marginTop: '1rem',
        }}
      >
        <Row align={'middle'} gutter={[5, 16]}>
          <Col xs={24}>
            <Form.Item
              name='costing_name'
              rules={[{ required: true }]}
              label='Costing Name'
              required
            >
              <Input placeholder='Service Name' type='text' />
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
  );
};

export default CreateCostListName;
