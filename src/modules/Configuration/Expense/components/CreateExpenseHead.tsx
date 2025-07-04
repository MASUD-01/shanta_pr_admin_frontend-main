import { Card, Col, Row, Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useCreateExpenseHeadMutation } from '../api/ExpenseEndPoint';
import { ICreateExpenseHead } from '../types/ExpenseTypes';
import { useEffect } from 'react';
import { setCommonModal } from '../../../../app/slice/modalSlice';

const CreateExpenseHead = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [createExpenseHead, { isLoading, isSuccess }] =
    useCreateExpenseHeadMutation();

  const onFinish = (values: ICreateExpenseHead) => {
    const data = {
      name: values.name,
    };
    createExpenseHead({ data });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
      form.resetFields(['name']);
    }
  }, [isSuccess, dispatch, form]);

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
          {/* <Col xs={24} sm={24} md={24}>
            <Form.Item
              name="expense_head_id"
              rules={[{ required: true }]}
              label="Expense Head Id"
              required
            >
              <Input placeholder="HEX-0000" type="text" disabled />
            </Form.Item>
          </Col> */}
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              name='name'
              rules={[{ required: true }]}
              label='Expense Head Name'
              required
            >
              <Input placeholder='Expense Head Name' type='text' />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Form.Item style={{ marginTop: '1rem' }}>
        <div style={{ textAlign: 'end' }}>
          <Button
            htmlType='submit'
            type='primary'
            icon={<SendOutlined />}
            loading={isLoading}
          >
            Create
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CreateExpenseHead;
