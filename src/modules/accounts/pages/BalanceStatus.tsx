/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, ConfigProvider, Table, theme, Typography } from 'antd';
import { useGetAllAccountQuery } from '../api/AccountEndPoints';
import { BalanceStatusTableColumns } from '../utils/BalanceStatusTableColumns';
import { Row } from 'antd/lib';
import { PrimaryButton } from '../../../common/submitButton/CommonButton';
import { PrinterOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import CommonViewReport from '../../../common/commonDetailsView/CommonViewReport';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';
import ExcelGenerator from '../../../common/excel/ExcelGenerator';
import Title from 'antd/es/typography/Title';

const BalanceStatus = () => {
  const themeGlobal = useSelector(globalTheme);
  const { data, isLoading } = useGetAllAccountQuery({});
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'balance_status',
    removeAfterPrint: true,
  });

  const balance_status_content = (
    <Table
      className={
        themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
      }
      size='small'
      bordered
      rowKey={'id'}
      dataSource={data?.data?.length ? data?.data : []}
      columns={BalanceStatusTableColumns()}
      scroll={{ x: true }}
      loading={isLoading}
      pagination={false}
      summary={(tableData) => {
        const totalBalance = tableData?.reduce((total: number, item: any) => {
          const balance = parseFloat(item?.balance);
          return total + (isNaN(balance) ? 0 : balance);
        }, 0);
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell index={1} colSpan={4}>
              <Typography.Text
                strong
                style={{
                  display: 'block',
                  textAlign: 'right',
                  marginRight: '10px',
                }}
              >
                Total
              </Typography.Text>
            </Table.Summary.Cell>

            <Table.Summary.Cell index={3}>
              <Typography.Text strong>
                <div style={{ color: totalBalance < 0 ? 'red' : ' ' }}>
                  {totalBalance || 0}
                </div>
              </Typography.Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
    />
  );

  const print_content = (
    <div hidden>
      <CommonViewReport
        printRef={componentRef}
        children={
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
            {balance_status_content}
          </ConfigProvider>
        }
        title='Balance Status'
      />
    </div>
  );
  return (
    <>
      <Card
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? 'custom-header'
            : 'header-dark'
        }
      >
        <Title level={5}>Balance Status Report</Title>
      </Card>

      <Card
        extra={
          <>
            <Row gutter={[5, 6]} justify={'space-between'}>
              <Col xs={24} sm={24} md={10}>
                <PrimaryButton
                  name='Print'
                  onClick={handlePrint}
                  icon={<PrinterOutlined />}
                />
              </Col>
              <Col xs={24} sm={24} md={13}>
                <ExcelGenerator
                  excelName='Balance_status_report'
                  excelTableHead={['Bank Name', 'Branch', 'Account No']}
                  excelData={
                    data?.data?.length
                      ? data?.data?.map((sData: any) => {
                          const data = {
                            'Bank Name': sData?.bank_name,

                            Branch: sData?.branch,
                            'Account No': sData?.account_no,
                          };
                          return data;
                        })
                      : []
                  }
                />
              </Col>
            </Row>
          </>
        }
      >
        <>{balance_status_content}</>
      </Card>
      {print_content}
    </>
  );
};

export default BalanceStatus;
