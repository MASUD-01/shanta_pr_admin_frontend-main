/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  Col,
  Row,
  DatePicker,
  Form,
  Table,
  Typography,
  theme,
  ConfigProvider,
  Divider,
} from 'antd';
import { useLazyGetAccountReportQuery } from '../api/reportEndPoint';
import dayjs from 'dayjs';
import { PrimaryButton } from '../../../common/submitButton/CommonButton';
import { AccountsReportTableColumns } from '../utils/AccountsReportTableColumns';
import ExcelGenerator from '../../../common/excel/ExcelGenerator';
import { PrinterOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import CommonViewReport from '../../../common/commonDetailsView/CommonViewReport';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';
import SetQueyInUrl from '../../../common/applayout/utils/SetQueyInUrl';
import OneMonthDatePicker from '../utils/OneMonthDatePicker';
import CommonAccountSelect from '../../accounts/components/CommonAccountSelect';
import { IAccountAllData } from '../types/reportTypes';
const { Title } = Typography;
const AccountReport = () => {
  const { searchParams, setSearchParams } = SetQueyInUrl();
  const themeGlobal = useSelector(globalTheme);
  const [form] = Form.useForm();
  const [printDate, setDate] = useState<any>([]);
  const [accName, setAccName] = useState('');
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'accounts_report',
    removeAfterPrint: true,
  });
  const [fetchData, { data, isLoading, isFetching }] =
    useLazyGetAccountReportQuery();

  const onFinish = (values: any) => {
    const { client_id, account_id, date } = values;
    setDate(date);
    const filterData: any = {};
    if (client_id) {
      filterData.client_id = client_id;
    } else if (account_id) {
      filterData.account_id = account_id;
    }
    if (date?.length) {
      filterData.start_date = dayjs(String(date[0])).format('YYYY-MM-DD');
      filterData.end_date = dayjs(String(date[1])).format('YYYY-MM-DD');
    }

    fetchData(filterData);
    setSearchParams(filterData);
  };
  useEffect(() => {
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');
    const account_id = searchParams.get('account_id');

    const fromQuery: {
      client_id?: string;
      start_date?: string;
      end_date?: string;
      account_id?: string;
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
    }
    if (account_id) {
      fromQuery.account_id = account_id;
      form.setFieldValue('account_id', Number(account_id));
      fetchData(fromQuery as any);

      if (start_date && end_date) {
        setDate([start_date, end_date]);
      }
    }
  }, []);

  const account_report = (
    <Table
      className={
        themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
      }
      bordered
      rowKey={(e) => e.id}
      columns={AccountsReportTableColumns()}
      dataSource={data?.data?.ledger?.length ? data?.data?.ledger : []}
      size='small'
      loading={isLoading || isFetching}
      scroll={{ x: true }}
      pagination={false}
      components={{
        body: {
          wrapper: (props: any) => (
            <tbody {...props}>
              <tr>
                <td
                  colSpan={9}
                  style={{
                    textAlign: 'end',
                    fontWeight: 'bold',
                    padding: '12px',
                    fontSize: '16px',
                  }}
                >
                  <span
                    style={{
                      color: '#9f5b5b',
                      fontWeight: 'bold',
                      fontSize: '17px',
                    }}
                  >
                    Opening Balance:{' '}
                  </span>
                </td>
                <td
                  style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    padding: '12px',
                    fontSize: '16px',
                  }}
                >
                  {data?.data?.opening_balance}
                </td>
              </tr>
              {props.children}
            </tbody>
          ),
        },
      }}
      summary={(tableData: any) => {
        const calculateTotal = (
          data: readonly IAccountAllData[],
          type: string
        ): number => {
          return (
            data
              ?.filter((item) => item?.type === type)
              ?.reduce((total: number, item: any) => {
                return total + Number(item?.amount);
              }, 0) || 0
          );
        };

        const debit = calculateTotal(tableData, 'OUT');
        const credit = calculateTotal(tableData, 'IN');
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell index={5} colSpan={7}>
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

            <Table.Summary.Cell index={4}>
              <Typography.Text strong>
                <div
                  style={{
                    color: 'red',
                    // textAlign: "right",
                  }}
                >
                  {debit || 0}
                </div>
              </Typography.Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={5} colSpan={2}>
              <Typography.Text strong>
                <div
                  style={{
                    color: 'green',
                    // textAlign: "right",
                  }}
                >
                  {credit || 0}
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
          children={account_report}
          title='ACCOUNTS REPORT'
          extraInfo={
            <Row gutter={[40, 0]}>
              <Col>
                {' '}
                <Typography.Text
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontFamily: "'Source Sans Pro', sans-serif",
                  }}
                >
                  <b>Report Date :</b>{' '}
                  {dayjs(printDate[0]).format('DD-MM-YYYY')} -{' '}
                  {dayjs(printDate[1]).format('DD-MM-YYYY')}
                </Typography.Text>
              </Col>
              <Col>
                <Typography.Text
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontFamily: "'Source Sans Pro', sans-serif",
                  }}
                >
                  <b>Account Name :</b> {accName}
                </Typography.Text>
              </Col>
            </Row>
          }
        />
      </ConfigProvider>
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
          <Title level={5}>Accounts Report</Title>
          <Form form={form} onFinish={onFinish}>
            <Row gutter={[5, 5]} justify={'end'}>
              <CommonAccountSelect
                margin={'0px'}
                name={'account_id'}
                md={12}
                lg={6}
                required
                onSelect={(
                  _: any,
                  singleData: { value: number; label: string }
                ) => setAccName(singleData?.label)}
              />

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
      </div>
      <Card>
        <Row gutter={[5, 6]}>
          <Col xs={24} sm={24} md={12}></Col>
          <Col xs={24} sm={24} md={12}>
            <Row gutter={[5, 6]} justify={'end'}>
              <Col xs={24} sm={24} md={12} lg={5}>
                <PrimaryButton
                  name='Print'
                  onClick={handlePrint}
                  icon={<PrinterOutlined />}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={5}>
                <ExcelGenerator
                  excelName='accounts_report'
                  excelTableHead={[
                    'Voucher No.',
                    'Date',
                    'Account Name',
                    'Particular',
                    'Details',
                    'Type',
                    'Debit',
                    'Credit',
                    'Balance',
                  ]}
                  excelData={
                    data?.data?.ledger?.length
                      ? data?.data?.ledger?.map((sData) => {
                          const data = {
                            'Voucher No.': sData?.voucher_no,
                            Date: dayjs(sData?.ledger_date).format(
                              'DD-MM-YYYY'
                            ),
                            'Account Name': sData?.account_name,
                            Particular: sData?.particular,
                            Details: sData?.details,
                            Type: sData?.tr_type,
                            Debit:
                              sData.type === 'OUT' ? Number(sData.amount) : '',
                            Credit:
                              sData.type === 'IN' ? Number(sData.amount) : '',
                            Balance: sData.running_balance,
                          };
                          return data;
                        })
                      : []
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider plain style={{ marginTop: '8px', marginBottom: '10px' }} />
        {account_report}
      </Card>
      {print_content}
    </>
  );
};

export default AccountReport;
