/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormInstance } from 'antd/lib';
import { Button, Col, Row, DatePicker, Form } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import FormInput from '../../../common/Input/FormInput';
import { SearchAbleSelectInput } from '../../../common/Input/SearchAbleSelectInput';
import { useGetAllDueInvoiceQuery } from '../../invoice/api/invoiceEndpoints';
import { useWatch } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import notification from '../../../common/Notification/notification';
type props = {
  field: any;
  add: any;
  remove: any;
  form: FormInstance<any>;
  client_id: number;
};
const SpecificInvoiceForm = ({
  field,
  add,
  remove,
  form,
  client_id,
}: props) => {
  const [searchInvoiceWise, setSearchInvoiceWise] = useState('');
  const cleanParam = Object?.fromEntries(
    Object.entries({ client_id, invoice_no: searchInvoiceWise })?.filter(
      ([, value]) => value !== ''
    )
  );
  const { data: invoices } = useGetAllDueInvoiceQuery(cleanParam);
  const invoiceId = useWatch(['invoices', field.name, 'invoice_id'], form);
  const dueAmount = useWatch(['invoices', field.name, 'Due'], form);
  const inputAmount = useWatch(['invoices', field.name, 'amount'], form);

  const FindInvoice = invoices?.data?.find(
    (invoice) => invoice.id === invoiceId
  );

  useEffect(() => {
    if (FindInvoice) {
      form.setFieldValue(
        ['invoices', field.name, 'date'],
        dayjs(FindInvoice?.invoice_date)
      );
      form.setFieldValue(
        ['invoices', field.name, 'net_total'],
        FindInvoice?.net_total
      );
      form.setFieldValue(['invoices', field.name, 'paid_amount'], Number(0));
      form.setFieldValue(
        ['invoices', field.name, 'Due'],
        Number(FindInvoice?.due)
      );
      form.setFieldValue(
        ['invoices', field.name, 'amount'],
        Number(FindInvoice?.due)
      );
    }
  }, [invoiceId, FindInvoice]);

  useEffect(() => {
    if (inputAmount > dueAmount) {
      notification("Payment amount can't be greater than due amount!", 'error');
      form.setFieldValue(['invoices', field.name, 'amount'], 0);
    }
  }, [dueAmount, inputAmount]);

  return (
    <>
      {' '}
      <Row gutter={[10, 0]} align='middle'>
        <Col xs={24} sm={24} md={4} lg={4} xxl={4}>
          <SearchAbleSelectInput
            placeholder='Invoice No'
            label='Invoice no'
            name={[field.name, 'invoice_id']}
            rules={[{ required: true, message: 'This field is required' }]}
            options={
              invoices?.data?.length
                ? invoices?.data?.map((invoice) => ({
                    value: invoice.id,
                    label: invoice.invoice_no,
                  }))
                : []
            }
            onSearch={(e: any) => setSearchInvoiceWise(e?.toUpperCase())}
            onSelect={(value: any) => {
              form.setFieldValue('invoice_id', value);
              if (!value) {
                setSearchInvoiceWise('');
              }
            }}
          />
        </Col>{' '}
        <Col xs={24} sm={24} md={4} lg={4} xxl={4}>
          <Form.Item label={'Invoice date'} name={[field.name, 'date']}>
            <DatePicker style={{ width: '100%' }} disabled />
          </Form.Item>
        </Col>
        <FormInput
          disabled
          name={[field.name, 'net_total']}
          label={`Net Total`}
          size={4}
          numberType
          placeholder='Net total'
        />
        <FormInput
          disabled
          name={[field.name, 'paid_amount']}
          label='Paid Amount'
          size={4}
          numberType
          placeholder='Paid amount'
        />
        <FormInput
          disabled
          name={[field.name, 'Due']}
          label={<span style={{ color: 'red' }}>Due Amount</span>}
          size={4}
          numberType
          placeholder='Due amount'
        />
        <FormInput
          rules={[{ required: true }]}
          name={[field.name, 'amount']}
          label='Amount'
          size={4}
          numberType
          placeholder='Amount'
        />
        <Form.Item
          style={{
            marginLeft: '10px',
            // marginTop: "2rem",
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
      </Row>
    </>
  );
};

export default SpecificInvoiceForm;
