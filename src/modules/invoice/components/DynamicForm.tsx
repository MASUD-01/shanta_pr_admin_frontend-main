/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Button, Col, Row, Form, Input } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib';
import { useWatch } from 'antd/es/form/Form';
import FormInput from '../../../common/Input/FormInput';
import { SelectProduct } from '../../../common/fromItemCommon/SelectCustomField';

type props = {
  field: any;
  setProductId: any;
  add: any;
  remove: any;
  productId: any;
  form: FormInstance<any>;
  singleInvoice: any;
};

const DynamicForm = ({ field, add, remove, form, singleInvoice }: props) => {
  const quantity = useWatch(['invoiceItem', field.name, 'quantity'], form);
  const unit_price = useWatch(['invoiceItem', field.name, 'unit_price'], form);

  useEffect(() => {
    if (singleInvoice?.data) {
      const invoiceItems = singleInvoice.data.invoice_items.map(
        (item: any) => ({
          product_id: item.product_id,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          sii_total_price: item.quantity * item.unit_price,
        })
      );
      form.setFieldsValue({
        invoiceItem: invoiceItems,
      });
    }
  }, [singleInvoice, form]);

  useEffect(() => {
    if (quantity && unit_price > 0) {
      form.setFieldValue(
        ['invoiceItem', field.name, 'sii_total_price'],
        quantity && unit_price > 0 ? quantity * unit_price : 0
      );
    }
  }, [quantity, unit_price]);

  return (
    <>
      <Row gutter={[5, 20]} align='middle'>
        <Col xs={24} sm={24} md={6} lg={6} xxl={singleInvoice?.data ? 8 : 6}>
          <SelectProduct
            name={[field.name, 'product_id']}
            {...(!singleInvoice?.data && { required: true })}
          />
        </Col>
        <Col xs={24} sm={24} md={6} lg={5} xxl={singleInvoice?.data ? 8 : 5}>
          <Form.Item name={[field.name, 'description']} label={`Description`}>
            <Input placeholder='Description' />
          </Form.Item>
        </Col>

        <FormInput
          name={[field.name, 'quantity']}
          label={`Quantity`}
          size={singleInvoice?.data ? 8 : 4}
          rules={
            singleInvoice?.data
              ? []
              : [{ required: true, message: 'Quantity is required' }]
          }
          numberType
          placeholder='Quantity'
        />
        <FormInput
          name={[field.name, 'unit_price']}
          label='Unit Price'
          size={singleInvoice?.data ? 8 : 4}
          rules={
            singleInvoice?.data
              ? []
              : [{ required: true, message: 'Unit Price is required' }]
          }
          numberType
          placeholder='Unit Price'
        />
        <FormInput
          disabled
          name={[field.name, 'sii_total_price']}
          label='Total Price'
          size={singleInvoice?.data ? 8 : 4}
          numberType
          lg={4}
          placeholder='Total Price'
        />

        <Col xs={1}>
          {!singleInvoice?.data && (
            <Form.Item
              style={{
                // marginLeft: '10px',
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
                <>
                  <Button
                    style={{
                      background: 'red',
                      color: '#fff',
                    }}
                    onClick={() => remove(field.name)}
                    icon={<MinusOutlined />}
                  />
                </>
              )}
            </Form.Item>
          )}
        </Col>
      </Row>
    </>
  );
};

export default DynamicForm;
