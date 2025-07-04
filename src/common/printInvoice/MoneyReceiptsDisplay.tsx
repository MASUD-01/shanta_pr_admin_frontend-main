import { UserOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Alert, Card, Divider, Tag } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
interface MoneyReceiptCardProps {
  created_at: string;
  moneyReceipts?: {
    id: number;
    money_receipt_no: string;
    paid_amount: string;
  }[];
  createdBy: string;
  invoiceOrMoney: 'invoice' | 'money';
  invoices?:
    | {
        id: number;
        invoice_no: string;
        paid_amount: string;
      }[]
    | undefined;
}

function MoneyReceiptsDisplay({
  invoiceOrMoney,
  createdBy,
  invoices,
  moneyReceipts,
  created_at,
}: MoneyReceiptCardProps) {
  return (
    <Card size='small' style={{ width: '100%', margin: '25px auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <div
          style={{
            fontSize: '1.2rem',
            lineHeight: '2rem',
            textAlign: 'center',
            textDecoration: 'underline',
          }}
        >
          Extra Information
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'start',
            gap: '0.3rem',
            fontSize: '0.875rem',
            color: 'var(--muted-foreground)',
            flexDirection: 'column',
          }}
        >
          <span>
            <UserOutlined style={{ fontSize: '15px' }} /> Created by :{' '}
            <span style={{ fontWeight: 'bold' }}> {createdBy}</span>
          </span>
          <span>
            <FieldTimeOutlined style={{ fontSize: '15px' }} /> Created at :{' '}
            <span style={{ fontWeight: 'bold' }}>
              {' '}
              {created_at && dayjs(created_at).format('DD-MMM-YYYY')}
            </span>
          </span>
        </div>
      </div>

      <div>
        <div
          style={{
            height: '200px',
            width: '100%',
            borderRadius: '0.375rem',
            border: '1px solid var(--border)',
            padding: '.5rem 0',
          }}
        >
          <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
            <Divider orientation='center'>
              {invoiceOrMoney === 'invoice' ? 'Money Receipts' : 'Invoices'}
            </Divider>
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'start',
            }}
          >
            {invoiceOrMoney === 'invoice' &&
              (moneyReceipts && moneyReceipts?.length ? (
                moneyReceipts?.map((receipt, index) => (
                  <Tag color='purple'>
                    <span
                      key={index}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1,
                      }}
                    >
                      <Link to={`/money-receipt/list/${receipt?.id}`}>
                        {receipt?.money_receipt_no} ({receipt.paid_amount})
                      </Link>
                    </span>
                  </Tag>
                ))
              ) : (
                <Alert
                  style={{ width: '100%' }}
                  message='Not Found'
                  type='error'
                />
              ))}

            {invoiceOrMoney === 'money' &&
              (invoices && invoices?.length ? (
                invoices?.map((receipt, index) => (
                  <Tag color='purple'>
                    <span
                      key={index}
                      style={{
                        fontWeight: 500,
                        lineHeight: 1,
                      }}
                    >
                      <Link to={`/invoice/list/${receipt?.id}`}>
                        {receipt?.invoice_no} ({receipt.paid_amount})
                      </Link>
                    </span>
                  </Tag>
                ))
              ) : (
                <Alert
                  style={{ width: '100%' }}
                  message='Not Found'
                  type='error'
                />
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default MoneyReceiptsDisplay;
