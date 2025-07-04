import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleMoneyReceiptQuery } from '../api/moneyReceiptEndPoint';
import GlobalLoader from '../../../app/utils/GlobalLoader';
import MoneyReceiptCard from '../components/MoneyReceiptCard';
import { ISingleMoneyReceipt } from '../types/moneyReceiptTypes';
import { useReactToPrint } from 'react-to-print';
import { Checkbox, Col, Radio, Row, Tooltip } from 'antd';
import { DownloadOutlined, PrinterOutlined } from '@ant-design/icons';
import generatePDF from 'react-to-pdf';
import MoneyReceiptsDisplay from '../../../common/printInvoice/MoneyReceiptsDisplay';

const MoneyReceiptDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleMoneyReceiptQuery(Number(id));
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `money_receipt`,
    removeAfterPrint: true,
  });
  const [value, setValue] = useState(1);
  const [checked, setChecked] = useState(false);
  return (
    <div>
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <Row gutter={[10, 10]}>
            <Col xs={24} md={15} lg={15} xl={15} xxl={15}>
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
                  <Radio.Group
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                  >
                    <Radio value={1}>Single Copy</Radio>
                    <Radio value={2}>Double Copy</Radio>
                  </Radio.Group>
                </div>

                <div>
                  <Tooltip title='Download Money Receipt'>
                    <DownloadOutlined
                      style={{ fontSize: '25px', marginRight: '20px' }}
                      onClick={() =>
                        generatePDF(componentRef, {
                          filename: `money_receipt.pdf`,
                          canvas: {
                            mimeType: 'image/png',
                            qualityRatio: 1,
                            useCORS: true, // allows cross-origin images
                          },
                        })
                      }
                    />
                  </Tooltip>

                  <Tooltip title='Print money receipt'>
                    <PrinterOutlined
                      style={{ fontSize: '25px' }}
                      onClick={handlePrint}
                    />
                  </Tooltip>
                </div>
              </div>
              <div ref={componentRef} className='a4sizeStyle1'>
                {value === 1 ? (
                  <MoneyReceiptCard
                    singleData={data?.data as ISingleMoneyReceipt}
                    checked={checked}
                  />
                ) : (
                  <>
                    <MoneyReceiptCard
                      titleFor='Office Copy'
                      singleData={data?.data as ISingleMoneyReceipt}
                      checked={checked}
                    />
                    <div style={{ border: '1px dashed gray' }}></div>
                    <MoneyReceiptCard
                      titleFor='Customer Copy'
                      singleData={data?.data as ISingleMoneyReceipt}
                      checked={checked}
                    />
                  </>
                )}
              </div>
            </Col>
            <Col xs={24} md={9} lg={9} xl={9} xxl={9}>
              <MoneyReceiptsDisplay
                createdBy={data?.data?.created_by || ''}
                invoices={data?.data?.invoices}
                invoiceOrMoney='money'
                created_at={data?.data?.created_at || ''}
              />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default MoneyReceiptDetails;
