import { Col, Row, Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { SelectExpenseHead } from '../../../../common/fromItemCommon/SelectCustomField';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCreateExpenseSubHeadMutation } from '../api/ExpenseEndPoint';
import { ICreateExpenseSubHead } from '../types/ExpenseTypes';
import { setCommonModal } from '../../../../app/slice/modalSlice';

const CreateExpenseSubHead = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [createExpenseSubHead, { isLoading, isSuccess }] =
    useCreateExpenseSubHeadMutation();

  const onFinish = (values: ICreateExpenseSubHead) => {
    const data = {
      name: values.name,
      expense_head_id: values.expense_head_id,
    };
    createExpenseSubHead({ data });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
      form.resetFields();
    }
  }, [isSuccess, dispatch, form]);
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout='vertical'
      style={{ paddingTop: '20px' }}
    >
      {' '}
      <Row gutter={10}>
        <Col xs={24} sm={12} md={12}>
          <SelectExpenseHead
            name='expense_head_id'
            required
            label='Expense Head'
          />
        </Col>

        <Col xs={24} sm={12} md={12}>
          <Form.Item
            name='name'
            rules={[{ required: true }]}
            label='Expense Sub Head Name'
            required
          >
            <Input placeholder='Expense Sub Head Name' type='text' />
          </Form.Item>
        </Col>
      </Row>
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

export default CreateExpenseSubHead;
