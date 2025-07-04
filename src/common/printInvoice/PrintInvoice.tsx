import {
  Row,
  Col,
  Table,
  Tooltip,
  Typography,
  ConfigProvider,
  theme,
  Checkbox,
} from 'antd';
import { TableProps } from 'antd/lib';
import { PrinterOutlined, DownloadOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { DetailsView } from '../commonDetailsView/CommonDetailsView';
import {
  IInvoiceProductItem,
  ISingleInvoice,
} from '../../modules/invoice/types/invoiceTypes';
import generatePDF from 'react-to-pdf';
import { InvoiceHeader } from '../invoice/InVoiceHeader';
import dayjs from 'dayjs';
import { payrollTitleStyle } from '../../modules/Payroll/Styles/PayrollStyles';
import AuthorizeSignature from './AuthorizeSignature';
import MoneyReceiptsDisplay from './MoneyReceiptsDisplay';

const PrintInvoice = ({ data }: { data: ISingleInvoice }) => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${data?.client_name}_invoice`,
    removeAfterPrint: true,
  });

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        handlePrint();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const columns: TableProps<IInvoiceProductItem>['columns'] = [
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      key: 'unit_price',
      render: (unit) => <p>{parseFloat(unit)?.toFixed(2)}</p>,
    },

    {
      title: <p style={{ textAlign: 'right' }}>Total Price</p>,
      render: (record: any) => (
        <div style={{ textAlign: 'right' }}>
          {(record?.quantity * record?.unit_price)?.toFixed(2)}
        </div>
      ),
    },
  ];
  const subtotal = data?.invoice_items?.reduce((total: any, item: any) => {
    const quantity = item?.quantity ?? 0;
    const unitPrice = item?.unit_price ?? 0;
    return total + quantity * unitPrice;
  }, 0);
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
      <Row gutter={[10, 10]}>
        <Col xs={24} md={24} lg={15} xl={15} xxl={15}>
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '805px',
                margin: '0 auto',
              }}
            >
              <div>
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                >
                  {checked ? 'Without Signature' : 'With Signature'}
                </Checkbox>
              </div>

              <div>
                <Tooltip title='Download Invoice'>
                  <DownloadOutlined
                    style={{ fontSize: '25px', marginRight: '20px' }}
                    onClick={() =>
                      generatePDF(componentRef, {
                        filename: `${data?.client_name}_invoice.pdf`,
                      })
                    }
                  />
                </Tooltip>
                <Tooltip title='Print Invoice'>
                  <PrinterOutlined
                    style={{ fontSize: '25px' }}
                    onClick={handlePrint}
                  />
                </Tooltip>
              </div>
            </div>

            <div>
              <div
                style={{
                  padding: '16px',
                  background: 'white',
                  height: '1000px',
                  // maxWidth: '780px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  // margin: '0 auto',
                }}
              >
                <div>
                  <div>
                    <InvoiceHeader />
                  </div>
                  <Row justify={'center'}>
                    <Typography.Title level={5} style={payrollTitleStyle}>
                      {'INVOICE'}
                    </Typography.Title>
                  </Row>

                  <div className='p-10 ps-14'>
                    <Row
                      gutter={[16, 16]}
                      justify='space-between'
                      className='invoice-row'
                    >
                      <Col
                        xs={24}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        xxl={12}
                        className='invoice-col'
                      >
                        <div>
                          <div className='invoice-title-div'>
                            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                              Invoice To
                            </p>
                          </div>
                          <div>
                            <DetailsView
                              title='Name'
                              value={data?.client_name}
                            />
                            <DetailsView
                              title='Cell No'
                              value={data?.client_mobile}
                            />
                            <DetailsView
                              title='Email'
                              value={data?.client_email}
                            />
                            <DetailsView
                              title='Address'
                              value={data?.client_address}
                            />
                          </div>
                        </div>
                      </Col>
                      <div
                        className='invoice-col invo'
                        style={{
                          paddingRight: '14px',
                          paddingLeft: '10px',
                          paddingTop: '20px',
                        }}
                      >
                        <div>
                          <DetailsView
                            title='Invoice Date'
                            value={dayjs(data?.invoice_date).format(
                              'DD-MM-YYYY'
                            )}
                          />
                          <DetailsView
                            title='Invoice No'
                            value={data?.invoice_no}
                          />
                          <DetailsView
                            title='Sales By'
                            value={data?.employee_name}
                          />
                          {data?.remark && (
                            <DetailsView title='Remark' value={data?.remark} />
                          )}
                        </div>
                      </div>
                    </Row>
                  </div>

                  <div className='p-10'>
                    <Row align={'middle'} gutter={[8, 0]}>
                      <Col xs={24} sm={24} md={24} xl={24}>
                        <div>
                          <h5
                            style={{
                              fontWeight: 'bold',
                              fontSize: '16px',
                              color: 'black',
                            }}
                          >
                            Billing Information
                          </h5>

                          <div className='p-16  '>
                            <ConfigProvider
                              theme={{
                                algorithm: theme.defaultAlgorithm,
                                token: {
                                  colorPrimary: '#FFFFFF',
                                },
                                components: {
                                  Table: {
                                    colorBgContainer: '#FFFFFF',
                                  },
                                },
                              }}
                            >
                              <Table
                                style={{
                                  color: 'white',
                                  background: 'white',
                                  backgroundColor: 'white',
                                }}
                                scroll={{ x: 'max-content' }}
                                rowKey={'product_id'}
                                size='small'
                                columns={columns}
                                dataSource={
                                  data?.invoice_items?.length
                                    ? data.invoice_items
                                    : []
                                }
                                bordered
                                pagination={false}
                              />
                            </ConfigProvider>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className='p-10'>
                    <Row
                      gutter={[8, 0]}
                      justify={'space-between'}
                      style={{ display: 'flex' }}
                    >
                      <Col xs={12} md={12} xl={12}>
                        <div>
                          <div style={{ color: 'black' }}>
                            <h3 style={{ display: 'inline' }}>Note :</h3>
                            <span>{data?.note ? data?.note : ' N/A'}</span>
                          </div>

                          <div>
                            <span style={{ fontSize: '12.1px' }}></span>
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} md={12} xl={12} style={{}}>
                        <table
                          className='invoice-table'
                          style={{ color: 'black' }}
                        >
                          <tbody>
                            <tr>
                              <th>SubTotal</th>
                              <td>{subtotal?.toFixed(2) || 0}</td>
                            </tr>

                            <tr>
                              <th>(+ BDT) Vat</th>
                              <td>{parseInt(data?.vat) || 0}</td>
                            </tr>
                            <tr>
                              <th> (- BDT) Discount</th>
                              <td>{parseInt(data?.discount) || 0}</td>
                            </tr>
                            <tr>
                              <th>Net total</th>
                              <td>{parseInt(data?.net_total) || 0}</td>
                            </tr>

                            <tr>
                              <th>Due</th>
                              <td>{parseInt(data?.due) || 0}</td>
                            </tr>
                          </tbody>
                        </table>
                      </Col>
                    </Row>
                  </div>
                </div>
                <AuthorizeSignature checked={checked} />
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={24} lg={9} xl={9} xxl={9}>
          <MoneyReceiptsDisplay
            createdBy={data?.created_by}
            moneyReceipts={data?.money_receipts}
            invoiceOrMoney='invoice'
            created_at={data?.created_at}
          />
        </Col>
      </Row>

      {/* if i hidden this div and hit download its show white. thats why position use  */}
      <div
        style={{
          position: 'absolute',
          top: -12000,
        }}
      >
        <div
          style={{
            padding: '16px',
            background: 'white',
            height: '1010px',
            width: '785px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          ref={componentRef}
        >
          <div>
            <div>
              <InvoiceHeader />
            </div>
            <Row justify={'center'}>
              <Typography.Title level={5} style={payrollTitleStyle}>
                {'INVOICE'}
              </Typography.Title>
            </Row>

            <Row
              gutter={[16, 16]}
              justify='space-between'
              style={{ padding: '0 10px' }}
            >
              <Col className='invoice-col'>
                <div>
                  <div className='invoice-title-div'>
                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      Invoice To
                    </p>
                  </div>
                  <div>
                    <DetailsView title='Name' value={data?.client_name} />
                    <DetailsView title='Cell No' value={data?.client_mobile} />
                    <DetailsView title='Email' value={data?.client_email} />
                    <DetailsView title='Address' value={data?.client_address} />
                  </div>
                </div>
              </Col>
              <div
                style={{
                  paddingTop: '25px',
                }}
              >
                <div>
                  <DetailsView
                    title='Invoice Date'
                    value={dayjs(data?.invoice_date).format('DD-MM-YYYY')}
                  />
                  <DetailsView title='Invoice No' value={data?.invoice_no} />
                  <DetailsView title='Sales By' value={data?.employee_name} />
                  {data?.remark && (
                    <DetailsView title='Remark' value={data?.remark} />
                  )}
                </div>
              </div>
            </Row>

            <div className='p-10'>
              <Row align={'middle'} gutter={[8, 0]}>
                <Col xs={24} sm={24} md={24} xl={24}>
                  <div>
                    <h5
                      style={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: 'black',
                      }}
                    >
                      Billing Information
                    </h5>

                    <div className='p-16  '>
                      <ConfigProvider
                        theme={{
                          algorithm: theme.defaultAlgorithm,
                          token: {
                            colorPrimary: '#FFFFFF',
                          },
                          components: {
                            Table: {
                              colorBgContainer: '#FFFFFF',
                            },
                          },
                        }}
                      >
                        <Table
                          style={{
                            color: 'white',
                            background: 'white',
                            backgroundColor: 'white',
                          }}
                          scroll={{ x: 'max-content' }}
                          rowKey={'product_id'}
                          size='small'
                          columns={columns}
                          dataSource={
                            data?.invoice_items?.length
                              ? data.invoice_items
                              : []
                          }
                          bordered
                          pagination={false}
                        />
                      </ConfigProvider>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className='p-10'>
              <Row
                gutter={[8, 0]}
                justify={'space-between'}
                style={{ display: 'flex' }}
              >
                <Col xs={12} md={12} xl={12}>
                  <div>
                    <div style={{ color: 'black' }}>
                      <h3 style={{ display: 'inline' }}>Note :</h3>{' '}
                      <span>{data?.note ? data?.note : 'N/A'}</span>
                    </div>

                    <div>
                      <span style={{ fontSize: '12.1px' }}></span>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={12} xl={12} style={{}}>
                  <table className='invoice-table' style={{ color: 'black' }}>
                    <tbody>
                      <tr>
                        <th>SubTotal</th>
                        <td>{subtotal?.toFixed(2) || 0}</td>
                      </tr>

                      <tr>
                        <th>(+ BDT) Vat</th>
                        <td>{parseInt(data?.vat) || 0}</td>
                      </tr>
                      <tr>
                        <th> (- BDT) Discount</th>
                        <td>{parseInt(data?.discount) || 0}</td>
                      </tr>
                      <tr>
                        <th>Net total</th>
                        <td>{parseInt(data?.net_total) || 0}</td>
                      </tr>

                      <tr>
                        <th>Due</th>
                        <td>{parseInt(data?.due) || 0}</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
            </div>
          </div>
          <AuthorizeSignature checked={checked} />
        </div>
      </div>
    </div>
  );
};
export default PrintInvoice;
