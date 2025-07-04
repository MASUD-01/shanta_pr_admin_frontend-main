/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Form, FormInstance, InputNumber, Row } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useWatch } from 'antd/es/form/Form';
import { useEffect } from 'react';
import SelectSubHead from './SelectSubHead';
import SelectHead from './SelectHead';

type Props = {
  field: any;
  setProductId: any;
  add: any;
  remove: any;
  productId: any;
  form: FormInstance<any>;
  singleExpenseData: any;
};

const DynamicExpense = ({
  field,
  add,
  remove,
  form,
  singleExpenseData,
}: Props) => {
  useEffect(() => {
    if (singleExpenseData) {
      form.setFieldValue(
        ['expenseItem', field.name, 'expense_head_id'],
        singleExpenseData?.expense_head_id
      );
      form.setFieldValue(
        ['expenseItem', field.name, 'expense_sub_head_id'],
        singleExpenseData?.expense_sub_head_id || 0
      );
      form.setFieldValue(
        ['expenseItem', field.name, 'amount'],
        singleExpenseData?.amount
      );
    }
  }, [field.name, form, singleExpenseData]);

  const getExpenseHead = useWatch(
    ['expenseItem', field.name, 'expense_head_id'],
    form
  );
  return (
    <div>
      <Row align={'middle'} gutter={[5, 16]}>
        <SelectHead
          name={[field.name, 'expense_head_id']}
          md={24}
          label='Head of Expense'
          onSelect={(value: any) => {
            form.setFieldValue(
              ['expenseItem', field.name, 'expense_head_id'],
              value
            );
            form.setFieldValue(
              ['expenseItem', field.name, 'expense_sub_head_id'],
              undefined
            );
          }}
        />
        {/* <Col xs={24} sm={24} md={8}>
          <SearchAbleSelectInput
            placeholder='Select Head of Expense'
            label='Head of Expense'
            name={[field.name, 'expense_head_id']}
            options={
              expenseHead?.data?.length
                ? expenseHead?.data?.map((head) => ({
                    value: head.id,
                    label: head.name,
                  }))
                : []
            }
            onSelect={(value: any) => {
              form.setFieldValue(
                ['expenseItem', field.name, 'expense_head_id'],
                value
              );
              form.setFieldValue(
                ['expenseItem', field.name, 'expense_sub_head_id'],
                undefined
              );
            }}
          />
        </Col> */}

        <SelectSubHead
          label='Sub Head of Expense'
          name={[field.name, 'expense_sub_head_id']}
          onSelect={(value: any) =>
            form.setFieldValue(
              ['expenseItem', field.name, 'expense_sub_head_id'],
              value
            )
          }
          getExpenseHead={getExpenseHead}
        />

        <Col xs={24} sm={24} md={6}>
          <Form.Item name={[field.name, 'amount']} label='Amount' required>
            <InputNumber
              required
              placeholder='Amount'
              type='number'
              min={0}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{9})+(?!\d))/g, ',')
              }
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>

        {!singleExpenseData && (
          <Form.Item
            style={{
              marginLeft: '10px',
              marginTop: '2rem',
            }}
          >
            {field.name === 0 ? (
              <Button
                type='primary'
                onClick={() => add()}
                icon={<PlusOutlined />}
              />
            ) : (
              <Button
                style={{
                  background: 'red',
                  color: '#fff',
                }}
                onClick={() => remove(field.name)}
                icon={<MinusOutlined />}
              />
            )}
          </Form.Item>
        )}
      </Row>
    </div>
  );
};

export default DynamicExpense;
