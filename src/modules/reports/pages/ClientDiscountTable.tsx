import {
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Row,
  Table,
  theme,
} from 'antd';
import { PrimaryButton } from '../../../common/submitButton/CommonButton';
import { useEffect, useRef, useState } from 'react';
import { useLazyGetClientDiscountQuery } from '../api/reportEndPoint';
import { Typography } from 'antd/lib';
import { PrinterOutlined } from '@ant-design/icons';
import ExcelGenerator from '../../../common/excel/ExcelGenerator';
import { useReactToPrint } from 'react-to-print';
import CommonViewReport from '../../../common/commonDetailsView/CommonViewReport';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';
import { ClientDiscountReportTableColumns } from '../utils/ClientDiscountReportTableColumns';
import dayjs from 'dayjs';
import Title from 'antd/es/typography/Title';
import SetQueyInUrl from '../../../common/applayout/utils/SetQueyInUrl';
import OneMonthDatePicker from '../utils/OneMonthDatePicker';

export const landscapePageStyle = `
    @page {
        size: A4 landscape;
    }
`;

const ClientDiscountTable = () => {
  const [form] = Form.useForm();
  const themeGlobal = useSelector(globalTheme);
  const { searchParams, setSearchParams } = SetQueyInUrl();
  const [fetchData, { data, isLoading, isFetching }] =
    useLazyGetClientDiscountQuery({});
  const [printDate, setDate] = useState([]);
  const onFinish = (values: any) => {
    const { date } = values;
    setDate(date);
    const filterData: any = {};

    if (date?.length) {
      filterData.start_date = dayjs(String(date[0])).format('YYYY-MM-DD');
      filterData.end_date = dayjs(String(date[1])).format('YYYY-MM-DD');
    }

    fetchData(filterData);
    setSearchParams(filterData);
  };
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'client_ledger',
    pageStyle: landscapePageStyle,
    removeAfterPrint: true,
  });
  useEffect(() => {
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');
    const fromQuery: {
      start_date?: string;
      end_date?: string;
    } = {};
    if (start_date && end_date) {
      fromQuery.start_date = start_date;
      fromQuery.end_date = end_date;
      form.setFieldsValue({
        date: [dayjs(start_date, 'YYYY-MM-DD'), dayjs(end_date, 'YYYY-MM-DD')],
      });
    } else {
      fromQuery.start_date = OneMonthDatePicker()[0].format('YYYY-MM-DD');
      fromQuery.end_date = OneMonthDatePicker()[1].format('YYYY-MM-DD');
    }
    fetchData(fromQuery as any);
  }, []);
  const discount_report = (
    <Table
      className={
        themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ' '
      }
      bordered
      columns={ClientDiscountReportTableColumns()}
      dataSource={data?.data?.length ? (data.data as any) : []}
      size='small'
      loading={isLoading || isFetching}
      scroll={{ x: true }}
      pagination={false}
      summary={(tableData) => {
        const totalAdvance = tableData?.reduce((total: number, item: any) => {
          return total + Number(item?.discount);
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
                  color:
                    themeGlobal.theme === theme.defaultAlgorithm
                      ? 'black'
                      : 'white',
                }}
              >
                Total
              </Typography.Text>
            </Table.Summary.Cell>

            <Table.Summary.Cell index={2}>
              <Typography.Text style={{ color: 'green' }}>
                {totalAdvance?.toFixed(2)}
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
            {discount_report}
          </ConfigProvider>
        }
        title='Discount Report'
        extraInfo={
          <>
            <Typography.Text
              style={{
                display: 'block',
                fontSize: '13px',
                fontFamily: "'Source Sans Pro', sans-serif",
              }}
            >
              <b>Report Date :</b> {dayjs(printDate[0]).format('DD-MM-YYYY')} -{' '}
              {dayjs(printDate[1]).format('DD-MM-YYYY')}
            </Typography.Text>
          </>
        }
      />
    </div>
  );
  return (
    <>
      <div>
        <Card
          className={
            themeGlobal.theme === theme.defaultAlgorithm
              ? 'custom-header'
              : 'header-dark'
          }
        >
          <Title level={5}>Discount Report</Title>
          <Form form={form} onFinish={onFinish}>
            <Row gutter={[5, 5]} justify={'end'}>
              <Col xs={24} sm={24} md={12} xl={6} xxl={4}>
                <Form.Item
                  name='date'
                  rules={[
                    { required: true, message: 'Date range is required' },
                  ]}
                  initialValue={OneMonthDatePicker()}
                >
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    format='DD-MM-YYYY'
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} xl={3} xxl={2}>
                <PrimaryButton name='Search' htmlType='submit' />
              </Col>
            </Row>
          </Form>
        </Card>

        <Card
          style={{ border: 'none' }}
          extra={
            <div style={{ paddingTop: '5px' }}>
              <Row gutter={[5, 5]}>
                <Col xs={24} sm={24} md={10}>
                  <PrimaryButton
                    name='Print'
                    onClick={handlePrint}
                    icon={<PrinterOutlined />}
                  />
                </Col>{' '}
                <Col xs={24} sm={24} md={14}>
                  <ExcelGenerator
                    excelName='discount_report'
                    excelTableHead={[
                      'SL',
                      'Invoice No',
                      'Date',
                      'Client Name',
                      'Discount',
                    ]}
                    excelData={
                      data?.data?.length
                        ? data?.data?.map((sData, index) => {
                            const data = {
                              SL: index + 1,
                              'Invoice No': sData?.voucher_no,
                              Date: dayjs(sData?.date).format('YYYY-MM-DD'),
                              'Client Name': sData.client_name,
                              Discount: sData.discount,
                            };
                            return data;
                          })
                        : []
                    }
                  />
                </Col>
              </Row>
            </div>
          }
        >
          {discount_report}
        </Card>
      </div>
      {print_content}
    </>
  );
};

export default ClientDiscountTable;
