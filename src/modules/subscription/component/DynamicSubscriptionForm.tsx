/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Button, Col, Row, Form, Input, Select } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib';
import FormInput from '../../../common/Input/FormInput';
import {
  DateInput,
  SelectProduct,
} from '../../../common/fromItemCommon/SelectCustomField';
import dayjs from 'dayjs';
import { useWatch } from 'antd/es/form/Form';
import { Option } from 'antd/es/mentions';

type props = {
  field: any;
  setProductId: any;
  add: any;
  remove: any;
  productId: any;
  form: FormInstance<any>;
};
export const months = [
  { value: '1_month', label: '1 month' },
  { value: '2_month', label: '2 month' },
  { value: '3_month', label: '3 month' },
  { value: '4_month', label: '4 month' },
  { value: '5_month', label: '5 month' },
  { value: '6_month', label: '6 month' },
  { value: '7_month', label: '7 month' },
  { value: '8_month', label: '8 month' },
  { value: '9_month', label: '9 month' },
  { value: '10_month', label: '10 month' },
  { value: '11_month', label: '11 month' },
  { value: '1_year', label: 'Yearly' },
];
const DynamicSubscriptionForm = ({ field, add, remove, form }: props) => {
  const sold_date = useWatch(['subscription', field.name, 'sold_date'], form);
  useEffect(() => {
    form.setFieldValue(['subscription', field.name, 'sold_date'], dayjs());
    form.setFieldValue(['subscription', field.name, 'expire_date'], dayjs());
  }, []);
  const handleMonthChange = (value: any) => {
    const monthCount = value === '1_year' ? 12 : parseInt(value); // Extract the numeric part of the value
    const expireDate = dayjs(sold_date).add(monthCount, 'month');
    form.setFieldValue(['subscription', field.name, 'expire_date'], expireDate); // Calculate the expiration date
  };

  return (
    <>
      <Row gutter={[10, 0]} align='middle'>
        <Col lg={23}>
          <Row gutter={[10, 0]}>
            <Col xs={24} sm={24} md={4} lg={6}>
              <SelectProduct name={[field.name, 'product_id']} required />
            </Col>
            <Col xs={24} sm={24} md={3} lg={6}>
              <DateInput
                label='Sold Date'
                name={[field.name, 'sold_date']}
                required
                size={5}
              />
            </Col>
            <Col xs={24} sm={24} md={4} lg={6}>
              <Form.Item
                name={[field.name, 'period']}
                label='Subscription Month'
                rules={[{ required: true, message: 'Please select a month!' }]}
              >
                <Select
                  placeholder='Select a month'
                  onChange={handleMonthChange}
                >
                  {months?.map((month) => (
                    <Option key={month.value} value={month.value}>
                      {month.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6}>
              <DateInput
                label='Expire Date'
                name={[field.name, 'expire_date']}
                required
                size={3}
              />
            </Col>
            <FormInput
              name={[field.name, 'subscription_amount']}
              label='Subscription Amount'
              size={6}
              md={6}
              lg={6}
              rules={[
                { required: true, message: 'Subscription Amount is required' },
              ]}
              numberType
              placeholder='Subscription'
            />

            <Col xs={24} sm={24} md={6} lg={6}>
              <Form.Item label={'Remark'} name={[field.name, 'last_feedback']}>
                <Input.TextArea
                  placeholder='Remark'
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col lg={1}>
          <Row justify={'end'}>
            {field.name === 0 ? (
              <Button
                type='primary'
                onClick={() => add()}
                icon={<PlusOutlined />}
                style={{ width: '80%' }}
              />
            ) : (
              <Button
                style={{
                  background: 'red',
                  color: '#fff',
                  width: '80%',
                }}
                onClick={() => remove(field.name)}
                icon={<MinusOutlined />}
              />
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default DynamicSubscriptionForm;
