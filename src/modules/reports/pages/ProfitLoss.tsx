import {
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Row,
  Table,
  theme,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useLazyGetProfitLossReportQuery } from '../api/reportEndPoint';
import { useReactToPrint } from 'react-to-print';
import CommonViewReport from '../../../common/commonDetailsView/CommonViewReport';
import { PrimaryButton } from '../../../common/submitButton/CommonButton';
import { PrinterOutlined } from '@ant-design/icons';
import ExcelGenerator from '../../../common/excel/ExcelGenerator';
import { IClientLedgerParams } from '../types/reportTypes';
import '../utils/ProfitLossReportTableColumns';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';
import { ProfitLossReportTableColumns } from '../utils/ProfitLossReportTableColumns';
import SetQueyInUrl from '../../../common/applayout/utils/SetQueyInUrl';
import OneMonthDatePicker from '../utils/OneMonthDatePicker';
const { Title } = Typography;
export const landscapePageStyle = `
    @page {
        size: A4 landscape;
    }
`;

const ProfitLoss = () => {
  const { searchParams, setSearchParams } = SetQueyInUrl();
  const [form] = Form.useForm();
  const themeGlobal = useSelector(globalTheme);
  const [fetchData, { data, isLoading, isFetching }] =
    useLazyGetProfitLossReportQuery();
  const [dateRange, setDateRange] = useState<{
    fromDate: string;
    toDate: string;
  }>({
    fromDate: OneMonthDatePicker()[0].format('YYYY-MM-DD'),
    toDate: OneMonthDatePicker()[1].format('YYYY-MM-DD'),
  });
  const onFinish = (values: { date: string[] }) => {
    const { date } = values;
    const filterData: IClientLedgerParams = {};

    if (date?.length) {
      filterData.start_date = dayjs(String(date[0])).format('YYYY-MM-DD');
      filterData.end_date = dayjs(String(date[1])).format('YYYY-MM-DD');
    }
    setDateRange({
      fromDate: dayjs(String(date[0])).format('YYYY-MM-DD'),
      toDate: dayjs(String(date[1])).format('YYYY-MM-DD'),
    });
    fetchData(filterData);
    setSearchParams(filterData as any);
  };
  useEffect(() => {
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');

    const fromQuery: {
      client_id?: string;
      start_date?: string;
      end_date?: string;
      employee_id?: string;
      product_id?: string;
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

      //this dateRange for navigate profit loss to sales report
      setDateRange({
        fromDate: OneMonthDatePicker()[0].format('YYYY-MM-DD'),
        toDate: OneMonthDatePicker()[1].format('YYYY-MM-DD'),
      });
    }
    fetchData(fromQuery as any);
  }, []);
  const excelData = data
    ? data.data.map((item: { category: string; amount: string }) => ({
        Category: item.category,
        Amount: item.amount,
      }))
    : [];

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'profit_loss',
    pageStyle: landscapePageStyle,
    removeAfterPrint: true,
  });

  const profit_loss_content = (
    <>
      <Table
        className={
          themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ' '
        }
        bordered
        columns={ProfitLossReportTableColumns(dateRange)}
        dataSource={data?.data}
        size='small'
        loading={isLoading || isFetching}
        scroll={{ x: true }}
        pagination={false}
      />
    </>
  );

  const print_content = (
    <div hidden>
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
        <CommonViewReport
          printRef={componentRef}
          children={profit_loss_content}
          title='PROFIT LOSS'
          fromDate={dateRange.fromDate}
          toDate={dateRange.toDate}
        />
      </ConfigProvider>
    </div>
  );

  return (
    <>
      <Card
        size={'small'}
        style={{ marginBottom: '10px', border: 'none' }}
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? 'custom-header'
            : 'header-dark'
        }
      >
        <Row>
          <Col xs={24} sm={24} md={24} lg={6} xl={4} xxl={4}>
            <Title level={5}>Profit/Loss Report</Title>
          </Col>

          <Col xs={24} sm={24} md={24} lg={18} xl={20} xxl={20}>
            <Form form={form} onFinish={onFinish}>
              <Row gutter={[5, 5]} justify={'end'}>
                <Col xs={24} md={12} xl={8} xxl={6}>
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

                <Col xs={24} md={6} xl={3}>
                  <PrimaryButton name='Search' htmlType='submit' />
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
      <Card
        style={{ border: 'none' }}
        extra={
          <div style={{ paddingTop: '10px' }}>
            <Row gutter={[5, 5]}>
              <Col xs={24} sm={24} md={12}>
                <PrimaryButton
                  name='Print'
                  onClick={handlePrint}
                  icon={<PrinterOutlined />}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <ExcelGenerator
                  nameOfBtn='Export'
                  excelName='profit_loss_report'
                  excelTableHead={['Category', 'Amount']}
                  excelData={excelData}
                />
              </Col>
            </Row>
          </div>
        }
      >
        {profit_loss_content}
      </Card>
      {print_content}
    </>
  );
};

export default ProfitLoss;
