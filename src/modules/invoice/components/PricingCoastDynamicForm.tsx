/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Button, Col, Row, Form, InputNumber, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib';
import SelectFieldForAllsServices from '../../Configuration/CreateService/components/SelectFieldForAllsServices';

type props = {
  field: any;
  add: any;
  remove: any;
  form: FormInstance<any>;
  arr: number;
  index: number;
  outerIndex: number;
  wholeVatTotal: any;
};

const PricingCoastDynamicForm = ({
  field,
  add,
  remove,
  form,
  arr,
  index,
  wholeVatTotal,
  outerIndex,
}: props) => {
  const priceValue = Form.useWatch(
    ['pricingandcost', outerIndex, 'services', field.name, 'unit_price'],
    form
  );

  const vat_type = Form.useWatch(
    ['pricingandcost', outerIndex, 'services', field.name, 'vat_type'],
    form
  );

  const vatValue = Form.useWatch(
    ['pricingandcost', outerIndex, 'services', field.name, 'vat'],
    form
  );

  const quantityValue = Form.useWatch(
    ['pricingandcost', outerIndex, 'services', field.name, 'quantity'],
    form
  );

  // useEffect(() => {
  //   if (serviceValue) {
  //     form?.setFieldValue(
  //       ['pricingandcost', outerIndex, 'services', field.name, 'unit_price'],
  //       Number(serviceValue)
  //     );
  //   }
  // }, [serviceValue]);

  const subTotal = quantityValue
    ? Number(priceValue) * Number(quantityValue)
    : Number(priceValue);

  const vatAmount =
    vat_type === 'fixed'
      ? vatValue
      : vat_type === 'percentage'
      ? (subTotal * vatValue) / 100
      : 0;

  console.log({ vatAmount });
  useEffect(() => {
    if (priceValue || quantityValue || vatAmount) {
      form?.setFieldValue(
        [
          'pricingandcost',
          outerIndex,
          'services',
          field.name,
          'product_actual_total',
        ],
        subTotal
      );

      form?.setFieldValue(
        ['pricingandcost', outerIndex, 'services', field.name, 'product_total'],
        Number(priceValue) + Number(wholeVatTotal || 0) + Number(vatAmount || 0)
      );
    } else {
      form?.setFieldValue(
        [
          'pricingandcost',
          outerIndex,
          'services',
          field.name,
          'product_actual_total',
        ],
        undefined
      );
    }

    if (wholeVatTotal || priceValue || quantityValue || vatAmount) {
      form?.setFieldValue(
        ['pricingandcost', outerIndex, 'services', field.name, 'product_total'],
        subTotal + Number(wholeVatTotal || 0) + Number(vatAmount || 0)
      );
    } else {
      if (!wholeVatTotal && !priceValue) {
        form?.setFieldValue(
          [
            'pricingandcost',
            outerIndex,
            'services',
            field.name,
            'product_total',
          ],
          undefined
        );
      }
    }
  }, [priceValue, wholeVatTotal, quantityValue, vatAmount]);

  return (
    <>
      <Row gutter={16} align={'middle'}>
        <SelectFieldForAllsServices
          name={[field.name, 'service']}
          plainLabel
          required
          md={12}
          lg={3}
          onSelect={(e: any, f: any) => {
            if (f?.price) {
              form?.setFieldValue(
                [
                  'pricingandcost',
                  outerIndex,
                  'services',
                  field.name,
                  'unit_price',
                ],
                Number(f.price)
              );
            }
          }}
        />

        <Col xs={24} sm={24} md={12} lg={3}>
          <Form.Item
            name={[field.name, 'unit_price']}
            label='Price'
            rules={[
              {
                required: true,
              },
            ]}

            // initialValue={0}
          >
            <InputNumber
              placeholder='Price'
              style={{
                width: '100%',
              }}
              type='number'
              min={0}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={3}>
          <Form.Item name={[field.name, 'quantity']} label='Quantity'>
            <InputNumber
              placeholder='Quantity'
              style={{
                width: '100%',
              }}
              type='number'
              min={0}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={24} lg={3}>
          <Form.Item
            name={[field.name, 'vat_type']}
            label='Vat Type'
            initialValue={'fixed'}
          >
            <Radio.Group
              style={{
                width: '100%',
              }}
              buttonStyle='solid'
            >
              <Radio.Button
                style={{
                  width: '50%',
                }}
                value='fixed'
              >
                Tk
              </Radio.Button>
              <Radio.Button
                style={{
                  width: '50%',
                }}
                value='percentage'
              >
                %
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={3}>
          <Form.Item name={[field.name, 'vat']} label='Vat' initialValue={0}>
            <InputNumber
              placeholder='Enter vat'
              style={{
                width: '100%',
              }}
              type='number'
              min={0}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={3}>
          <Form.Item
            name={[field.name, 'product_actual_total']}
            label='Sub Total'
            initialValue={0}
          >
            <InputNumber
              readOnly
              placeholder='Sub Total'
              style={{
                width: '100%',
              }}
              type='number'
              min={0}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={12} lg={3}>
          <Form.Item
            name={[field.name, 'product_total']}
            label='Net Total'
            initialValue={0}
          >
            <InputNumber
              readOnly
              placeholder='Net Total'
              style={{
                width: '100%',
              }}
              type='number'
              min={0}
            />
          </Form.Item>
        </Col>

        {index === arr - 1 ? (
          <Col xs={24} sm={24} md={12} lg={1}>
            <Button
              type='dashed'
              style={{
                marginTop: '6px',
              }}
              onClick={() => {
                if (arr >= 15) {
                  // message.error("You can't add more than 15 products");
                } else {
                  add();
                }
              }}
              block
              icon={<PlusOutlined />}
            ></Button>
          </Col>
        ) : (
          <Col xs={24} sm={24} md={12} lg={1}>
            <Button
              type='dashed'
              style={{
                marginTop: '6px',
              }}
              onClick={() => remove(index)}
              block
              icon={
                <MinusCircleOutlined
                  style={{
                    color: 'red',
                  }}
                />
              }
            ></Button>
          </Col>
        )}
      </Row>
    </>
  );
};

export default PricingCoastDynamicForm;
