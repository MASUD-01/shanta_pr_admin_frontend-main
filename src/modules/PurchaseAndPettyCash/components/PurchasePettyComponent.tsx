import React, { useState } from 'react';
import {
  Card,
  Form,
  Select,
  InputNumber,
  Input,
  Upload,
  Button,
  Typography,
  Divider,
  Switch,
  message,
  UploadFile,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Text } = Typography;

type ExpenseType = 'po' | 'petty';
type ExpenseHeadKey =
  | 'stationery'
  | 'it_equipment'
  | 'transport'
  | 'maintenance';

interface BudgetInfo {
  budget: number;
  spent: number;
}

interface FormValues {
  type: ExpenseType;
  head: ExpenseHeadKey;
  amount: number;
  description: string;
  is_billable: boolean;
  files?: UploadFile[];
}

const expenseHeads = [
  { label: 'Stationery', value: 'stationery' },
  { label: 'IT Equipment', value: 'it_equipment' },
  { label: 'Transport', value: 'transport' },
  { label: 'Maintenance', value: 'maintenance' },
];

const budgetData: Record<ExpenseHeadKey, BudgetInfo> = {
  stationery: { budget: 5000, spent: 3000 },
  it_equipment: { budget: 10000, spent: 7500 },
  transport: { budget: 2000, spent: 1800 },
  maintenance: { budget: 3000, spent: 1000 },
};

const PurchasePettyComponent: React.FC = () => {
  const [form] = Form.useForm<FormValues>();
  const [selectedHead, setSelectedHead] = useState<ExpenseHeadKey | null>(null);
  const [budgetStatus, setBudgetStatus] = useState<{
    remaining: number;
    overBudget: boolean;
  } | null>(null);

  const handleHeadChange = (value: ExpenseHeadKey) => {
    const headBudget = budgetData[value];
    const remaining = headBudget.budget - headBudget.spent;
    setSelectedHead(value);
    form.setFieldsValue({ amount: undefined });
    setBudgetStatus(null);
  };

  const handleAmountChange = (value: number | null) => {
    if (selectedHead && value !== null) {
      const { budget, spent } = budgetData[selectedHead];
      const remaining = budget - spent;
      setBudgetStatus({ remaining, overBudget: value > remaining });
    } else {
      setBudgetStatus(null);
    }
  };

  const handleSubmit = (values: FormValues) => {
    if (budgetStatus?.overBudget) {
      message.warning('Expense exceeds the remaining budget. Please revise.');
      return;
    }

    console.log('Submitted for approval:', values);
    message.success('Submitted for approval!');
    form.resetFields();
    setBudgetStatus(null);
    setSelectedHead(null);
  };

  return (
    <Card title='Purchase Order / Petty Cash Entry' bordered>
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          name='type'
          label='Expense Type'
          rules={[{ required: true, message: 'Select expense type' }]}
        >
          <Select<ExpenseType>
            options={[
              { label: 'Purchase Order', value: 'po' },
              { label: 'Petty Cash', value: 'petty' },
            ]}
            placeholder={'Expense Type'}
          />
        </Form.Item>

        <Form.Item
          name='head'
          label='Expense Head'
          rules={[{ required: true, message: 'Select expense head' }]}
        >
          <Select<ExpenseHeadKey>
            options={expenseHeads}
            onChange={handleHeadChange}
            placeholder={'Expense Head'}
          />
        </Form.Item>

        {selectedHead && (
          <div style={{ marginBottom: 16 }}>
            <Text type='secondary'>
              Budget: ৳{budgetData[selectedHead].budget}
            </Text>
            <br />
            <Text type='secondary'>
              Spent: ৳{budgetData[selectedHead].spent}
            </Text>
            <br />
            <Text strong type={budgetStatus?.overBudget ? 'danger' : 'success'}>
              Remaining: ৳
              {budgetStatus?.remaining ??
                budgetData[selectedHead].budget -
                  budgetData[selectedHead].spent}
            </Text>
          </div>
        )}

        <Form.Item
          name='amount'
          label='Amount'
          rules={[{ required: true, message: 'Enter amount' }]}
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            onChange={handleAmountChange}
            placeholder='Enter amount'
          />
        </Form.Item>

        <Form.Item
          name='description'
          label='Description'
        >
          <Input.TextArea rows={3} placeholder='Write expense purpose...' />
        </Form.Item>

        {/* <Form.Item
          name='is_billable'
          label='Is Billable'
          valuePropName='checked'
          initialValue={true}
        >
          <Switch />
        </Form.Item> */}
        <Divider />

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Submit for Approval
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PurchasePettyComponent;