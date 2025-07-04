/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Form, Row, Col, Card, Typography, Divider, Space, Input } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import FormInput from '../../../common/Input/FormInput';
import SubmitButton from '../../../common/submitButton/SubmitButton';
// import DynamicForm from "../../Invoice/components/DynamicForm";
import { DateInput } from '../../../common/fromItemCommon/SelectCustomField';
import dayjs from 'dayjs';
import DynamicForm from '../../invoice/components/DynamicForm';
import { useCreateQuotationMutation } from '../api/quotationEndPoint';
import { useNavigate } from 'react-router-dom';

const CreateQuotation = () => {
  const [form] = Form.useForm();
  const [createQuotation, { data, isLoading, isSuccess }] =
    useCreateQuotationMutation();
  const navigate = useNavigate();

  const [productId, setProductId] = useState<number>(0);
  const a = useWatch(['invoiceItem'], form);

  const discount = useWatch('discount', form);
  const vat = useWatch('vat', form);

  const totalPrice = a?.reduce((total: any, item: any) => {
    const quantity = item?.quantity ?? 0;
    const unitPrice = item?.unit_price ?? 0;
    return total + quantity * unitPrice;
  }, 0);

  let gTotal = totalPrice;

  useEffect(() => {
    // form.setFieldValue("total", Number(totalPrice));

    if (discount) {
      gTotal -= discount;
    }
    if (vat) {
      gTotal += vat;
    }

    // form.setFieldValue("grandTotal", gTotal);
  }, [form, discount, totalPrice, vat]);

  const onFinish = (values: any) => {
    const {
      client_id,
      vat,
      discount,
      invoiceItem,
      note,
      quotation_date,
      remark,
    } = values;

    // Constructing the desired JSON format
    const submitData: any = {
      client_id,
      quotation_date: dayjs(quotation_date).format('YYYY-MM-DD'),
      vat: vat ? vat : 0,
      discount: discount ? discount : 0,
      products: invoiceItem.map((item: any) => ({
        id: item.product_id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
      })),
    };
    if (remark) {
      submitData.remark = remark;
    }
    if (note) {
      submitData.note = note;
    }
    // console.log(submitData); // Logging the body object
    createQuotation({ data: submitData });
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      navigate(`/quotation/list/${data?.id as number}`);
    }
  }, [isSuccess]);
  return (
    <>
      <Card
        style={{
          boxShadow: '0 0 0 1px rgba(0,0,0,.05)',
        }}
        title={'Create Quotation'}
      >
        <Form
          onFinish={onFinish}
          layout='vertical'
          initialValues={{
            discount: 0,
            vat: 0,
            quantity: 1,
            total: 0,
            quotation_date: dayjs(),
          }}
          form={form}
        >
          <Card
            className='border'
            style={{ marginBottom: '1rem', marginTop: '1rem' }}
          >
            <Row align={'middle'} gutter={[10, 16]}>
              <Col xs={24} sm={24} md={6} lg={8}>
                <DateInput
                  name='quotation_date'
                  label='Quotation Date'
                  size={5}
                  rules={[
                    { required: true, message: 'Quotation date is required' },
                  ]}
                />
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <Form.Item label={'Note'} name={'note'}>
                  <Input placeholder='Note' />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card className='border'>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <Typography.Title level={5}>Billing Info</Typography.Title>
            </div>
            <Form.List name='invoiceItem' initialValue={[{}]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => {
                    return (
                      <div key={index}>
                        <DynamicForm
                          field={field}
                          add={add}
                          remove={remove}
                          // warehouse={warehouse}
                          singleInvoice=''
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
          <Card
            className='border'
            style={{ marginBottom: '1rem', marginTop: '1rem' }}
          >
            <Typography.Title style={{ marginBottom: '1rem' }} level={5}>
              Payment Information 💳
            </Typography.Title>
            <Row align={'middle'} gutter={[5, 16]}>
              <FormInput
                label='Discount'
                name='discount'
                placeholder='Discount'
                size={6}
                numberType
              />
              <FormInput
                label='Vat'
                name='vat'
                placeholder='Vat'
                size={6}
                numberType
              />
            </Row>
          </Card>

          <div>
            <Col xs={24} sm={24} md={12} lg={10}>
              <Form.Item label={'Remark'} name={'remark'}>
                <Input.TextArea
                  placeholder='Remark'
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
            </Col>
          </div>

          <Row gutter={[16, 16]} justify='end'>
            <Col>
              <div
                style={{
                  padding: '16px',
                }}
              >
                {' '}
                <div style={{ textAlign: 'right' }}>
                  <Space align='start'>
                    <Typography.Text strong>Sub Total :</Typography.Text>
                    <Typography.Text style={{ textAlign: 'left' }}>
                      {totalPrice}
                    </Typography.Text>
                  </Space>
                </div>
                <div style={{ textAlign: 'right', padding: '7px 0px' }}>
                  <Space align='start'>
                    <Typography.Text strong>(+ BDT) VAT :</Typography.Text>
                    <Typography.Text>{vat ? vat : 0}</Typography.Text>
                  </Space>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Space align='start'>
                    <Typography.Text strong> Grand Total :</Typography.Text>
                    <Typography.Text>{totalPrice + vat}</Typography.Text>
                  </Space>
                </div>
                <div style={{ textAlign: 'right', padding: '7px 0px' }}>
                  <Space align='start'>
                    <Typography.Text strong>(- BDT) Discount :</Typography.Text>
                    <Typography.Text>{discount ? discount : 0}</Typography.Text>
                  </Space>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Space align='start'>
                    <Typography.Text strong> Net Total :</Typography.Text>
                    <Typography.Text>
                      {totalPrice + vat - discount}
                    </Typography.Text>
                  </Space>
                </div>
                {/* <div style={{ textAlign: "right", padding: "7px 0px" }}>
                  <Space align="start">
                    <Typography.Text strong style={{ color: "red" }}>
                      Previous Due :
                    </Typography.Text>
                    <Typography.Text style={{ color: "red" }}>
                      {findClient?.due ? findClient?.due : 0}
                    </Typography.Text>
                  </Space>
                </div> */}
                <Divider />
                <div style={{ textAlign: 'right' }}>
                  <Space align='start'>
                    <Typography.Text
                      style={{ fontWeight: 'bold', color: 'red' }}
                    >
                      Due :
                    </Typography.Text>
                    <Typography.Text
                      style={{ fontWeight: 'bold', color: 'red' }}
                    >
                      {totalPrice + vat - discount}
                    </Typography.Text>
                  </Space>
                </div>
              </div>
            </Col>
          </Row>

          <SubmitButton label='Create Quotation' loading={isLoading} />
        </Form>
      </Card>
    </>
  );
};

export default CreateQuotation;
