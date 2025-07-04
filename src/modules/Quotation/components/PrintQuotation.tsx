/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { IQuotationItem, ISingleQuotation } from '../types/quotationTypes';
import { useReactToPrint } from 'react-to-print';
import {
  Col,
  ConfigProvider,
  Row,
  Table,
  TableProps,
  theme,
  Tooltip,
  Typography,
} from 'antd';
import { PrinterOutlined, DownloadOutlined } from '@ant-design/icons';
import generatePDF from 'react-to-pdf';
import { InvoiceHeader } from '../../../common/invoice/InVoiceHeader';
import { DetailsView } from '../../../common/commonDetailsView/CommonDetailsView';
import { imageURL } from '../../../app/slice/baseQuery';

const PrintQuotation = ({ data }: { data: ISingleQuotation }) => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${data?.client_name}_quotation`,
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
  const columns: TableProps<IQuotationItem>['columns'] = [
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
    },
    {
      title: <p style={{ textAlign: 'right' }}>Total Price</p>,
      render: (record: any) => (
        <div style={{ textAlign: 'right' }}>
          {record?.quantity * record?.unit_price}
        </div>
      ),
    },

    // {
    //   title: "Total Price",
    //   render: (record: any) => record?.quantity * record?.unit_price,
    // },
  ];
  const subtotal = data?.quotation_items?.reduce((total: any, item: any) => {
    const quantity = item?.quantity ?? 0;
    const unitPrice = item?.unit_price ?? 0;
    return total + quantity * unitPrice;
  }, 0);
  return (
    <div className='print-invoice-wrapper'>
      <div style={{ textAlign: 'end', padding: '5px' }}>
        <Tooltip title='Download Quotation'>
          <DownloadOutlined
            style={{ fontSize: '25px', marginRight: '20px' }}
            onClick={() =>
              generatePDF(componentRef, {
                filename: `${data?.client_name}_quotation.pdf`,
              })
            }
          />
        </Tooltip>
        <Tooltip title='Print Quotation'>
          <PrinterOutlined style={{ fontSize: '25px' }} onClick={handlePrint} />
        </Tooltip>
      </div>
      <div
        style={{ padding: '20px', background: 'white', minHeight: '1000px' }}
        ref={componentRef}
      >
        {/* start section start */}
        <div>
          <InvoiceHeader />
        </div>
        <Row justify={'center'}>
          <Typography.Title level={5}>{'QUOTATION'}</Typography.Title>
        </Row>
        {/* start section end */}
        {/* info section start */}
        <div className='p-10'>
          <Row gutter={[5, 0]} justify={'space-between'}>
            <Col xs={12} md={12} xl={12}>
              <div>
                <div className='invoice-title-div'>
                  <p style={{ fontSize: '22px' }}>Quotation to</p>
                </div>

                <div className='p-10' style={{ color: 'black' }}>
                  <DetailsView title='Name' value={data?.client_name} />
                  <DetailsView title='Cell No' value={data?.client_mobile} />
                  <DetailsView title='Email' value={data?.client_email} />
                  <DetailsView title='Address' value={data?.client_address} />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {/* info section end */}
        {/* product section start */}
        <div className='p-10'>
          <Row align={'middle'} gutter={[8, 0]}>
            <Col xs={24} md={24} xl={24}>
              <div>
                <h5
                  style={{ fontWeight: 500, fontSize: '14px', color: 'black' }}
                >
                  Billing Information
                </h5>

                <div className='p-10 invoice'>
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
                      rowKey={'product_id'}
                      size='small'
                      scroll={{ x: 'max-content' }}
                      columns={columns}
                      dataSource={
                        data?.quotation_items?.length
                          ? data.quotation_items
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
        {/* product section end */}
        <div className='p-10'>
          <Row gutter={[8, 0]} justify={'space-between'}>
            <Col xs={12} md={12} xl={12}>
              <div>
                <div style={{ paddingBottom: '15px', color: 'black' }}>
                  <h3>Note</h3>

                  <p>{data?.note}</p>
                </div>
                <div>
                  {/* <h5>Terms And Condition</h5> */}
                  <span style={{ fontSize: '12.1px' }}></span>
                </div>
              </div>
            </Col>
            <Col xs={12} md={12} xl={12}>
              <table className='invoice-table'>
                <tbody style={{ color: 'black' }}>
                  <tr>
                    <th>SubTotal</th>
                    <td>{subtotal}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
        </div>

        {/* bottom part  */}
        <div
          style={{
            position: 'absolute',
            bottom: 5,
            left: 0,
            right: 0,
            margin: 'auto',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              padding: 10,
              color: 'black',
            }}
          >
            {' '}
            <div style={{ textAlign: 'right' }}>
              <p style={{ border: '1px solid gray' }}></p>
              <p style={{ margin: 0 }}>Customer Signature</p>
            </div>
            <div style={{ textAlign: 'left' }}>
              <img width={100} src={imageURL + data?.signature} alt='' />
              <p style={{ border: '1px solid gray' }}></p>
              <p style={{ margin: 0 }}>Authorized Signature</p>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '10px', marginTop: '5px' }}>
              This is Software Generated Bill. M360ICT Property Management
              Developed By: M360 ICT
            </p>
          </div>
        </div>

        {/* <div
          style={{
            position: "absolute",
            bottom: 5,
            left: 0,
            right: 0,
            margin: "auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              padding: 10,
            }}
          >
            <div style={{ textAlign: "left" }}>
              <img src={imageURL + data?.signature} alt="" />
              <p style={{ margin: 0 }}>Authorized Signature</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "12px", margin: 0 }}>
                This is Software Generated Bill. 
                <br />
                M360 Property Management Developed By: M360 ICT
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PrintQuotation;
