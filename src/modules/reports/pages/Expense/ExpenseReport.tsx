/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
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
} from 'antd';
import {
  useLazyExpenseReportQuery,
  useUserListQuery,
} from '../../api/expenseReportEndPoint';
import { PrimaryButton } from '../../../../common/submitButton/CommonButton';
import { ExpenseSubHeadReportTableColumns } from '../../utils/Expense/ExpenseSubHeadReportTableColumns';
import { PrinterOutlined } from '@ant-design/icons';
import ExcelGenerator from '../../../../common/excel/ExcelGenerator';
import CommonViewReport from '../../../../common/commonDetailsView/CommonViewReport';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useWatch } from 'antd/es/form/Form';
import { SearchAbleSelectInput } from '../../../../common/Input/SearchAbleSelectInput';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../../app/slice/themeSlice';
import SetQueyInUrl from '../../../../common/applayout/utils/SetQueyInUrl';
import OneMonthDatePicker from '../../utils/OneMonthDatePicker';
import SelectHead from '../../../expense/components/SelectHead';
import SelectSubHead from '../../../expense/components/SelectSubHead';
const { Title } = Typography;

const ExpenseReport = () => {
  const { searchParams, setSearchParams } = SetQueyInUrl();
  const themeGlobal = useSelector(globalTheme);
  const [form] = Form.useForm();
  const componentRef = useRef(null);
  const [date, setDate] = useState([]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'expense_report',
    removeAfterPrint: true,
  });
  const { data: userList } = useUserListQuery({});
  const getExpenseHead = useWatch('head_id', form);

  const [fetchData, { data, isLoading, isFetching }] =
    useLazyExpenseReportQuery();
  const onFinish = (values: any) => {
    const { date, head_id, sub_head_id, created_by } = values;
    setDate(date);
    const filterData: any = {};
    if (head_id) {
      filterData.head_id = head_id;
    }
    if (sub_head_id) {
      filterData.sub_head_id = sub_head_id;
    }
    if (created_by) {
      filterData.created_by = created_by;
    }
    if (date?.length) {
      filterData.start_date = dayjs(String(date[0])).format('YYYY-MM-DD');
      filterData.end_date = dayjs(String(date[1])).format('YYYY-MM-DD');
    }
    fetchData(filterData);
    setSearchParams(filterData);
  };
  useEffect(() => {
    const head_id = searchParams.get('head_id');
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');
    const sub_head_id = searchParams.get('sub_head_id');
    const created_by = searchParams.get('created_by');
    const fromQuery: {
      head_id?: string;
      start_date?: string;
      end_date?: string;
      sub_head_id?: string;
      created_by?: string;
    } = {};
    if (head_id) {
      fromQuery.head_id = head_id;
      form.setFieldValue('head_id', Number(head_id));
    }
    if (sub_head_id) {
      fromQuery.sub_head_id = sub_head_id;
      form.setFieldValue('sub_head_id', Number(sub_head_id));
    }
    if (created_by) {
      fromQuery.created_by = created_by;
      form.setFieldValue('created_by', Number(created_by));
    }
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
  const expense_content = (
    <Table
      className={
        themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
      }
      bordered
      rowKey={(e) => e.id}
      columns={ExpenseSubHeadReportTableColumns()}
      dataSource={data?.data?.length ? data.data : []}
      size='small'
      loading={isLoading || isFetching}
      scroll={{ x: true }}
      pagination={false}
      summary={(tableData) => {
        const total = tableData?.reduce((total: number, item: any) => {
          return total + Number(item?.amount);
        }, 0);
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell index={1} colSpan={8}>
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
            <Table.Summary.Cell index={2} colSpan={3}>
              <Typography.Text>{Math?.abs(total)?.toFixed(2)}</Typography.Text>
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
          children={expense_content}
          title='EXPENSE REPORT'
          extraInfo={
            <>
              <Typography.Text
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontFamily: "'Source Sans Pro', sans-serif",
                }}
              >
                <b>Report Date :</b> {dayjs(date[0]).format('YYYY-MM-DD')} -{' '}
                {dayjs(date[1]).format('YYYY-MM-DD')}
              </Typography.Text>
            </>
          }
        />
      </ConfigProvider>
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
        <Title level={5}>Expense Report</Title>
        <Form form={form} onFinish={onFinish} style={{ marginBottom: '10px' }}>
          {' '}
          <Row gutter={[5, 5]} justify={'end'}>
            <SelectHead
              md={12}
              xl={5}
              name={'head_id'}
              onSelect={(value: any) => {
                form.setFieldValue('head_id', value);
                form.setFieldValue('sub_head_id', undefined);
              }}
            />
            {/* <Col xs={24} sm={24} md={12} xl={5} xxl={4}>
              <SearchAbleSelectInput
                name={'head_id'}
                placeholder='Select expense head'
                options={
                  expenseHead?.data?.length
                    ? expenseHead?.data?.map((head) => ({
                        value: head.id,
                        label: head.name,
                      }))
                    : []
                }
                onSelect={(value: any) => {
                  form.setFieldValue('head_id', value);
                  form.setFieldValue('sub_head_id', undefined);
                }}
              />
            </Col> */}

            <SelectSubHead
              md={12}
              xl={5}
              name={'sub_head_id'}
              onSelect={(value: any) =>
                form.setFieldValue('sub_head_id', value)
              }
              getExpenseHead={getExpenseHead}
            />

            <Col xs={24} sm={24} md={12} xl={5} xxl={4}>
              <SearchAbleSelectInput
                name={'created_by'}
                placeholder='Select name'
                options={
                  userList?.data?.length
                    ? userList?.data?.map((user: any) => ({
                        value: user.id,
                        label: user.first_name + ' ' + user.last_name,
                      }))
                    : []
                }
                onSelect={(value: any) =>
                  form.setFieldValue('created_by', value)
                }
              />
            </Col>
            <Col xs={24} sm={24} md={12} xl={6} xxl={4}>
              <Form.Item
                name='date'
                rules={[{ required: true, message: 'Date range is required' }]}
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
                excelName='expense_report'
                excelTableHead={[
                  'Expense No.',
                  'Date',
                  'Account Name',
                  'Created by',
                  'Expense',
                  'Sub Expense',
                  'Note',
                  'Amount',
                ]}
                excelData={
                  data?.data?.length
                    ? data?.data?.map((sData) => {
                        const data = {
                          'Expense No.': sData?.expense_no,
                          Date: dayjs(sData?.date).format('DD-MM-YYYY'),
                          'Account Name': `${sData.account_name} (${sData.account_name})`,
                          'Created by': sData?.created_by,
                          Expense: sData?.expense_head_name,
                          'Sub Expense': sData?.expense_sub_head_name,
                          Note: sData?.note ? sData.note : 'N/A',
                          Amount: sData?.amount,
                        };
                        return data;
                      })
                    : []
                }
              />
            </Col>
          </Row>
        }
      >
        {expense_content}
      </Card>
      {print_content}
    </>
  );
};

export default ExpenseReport;
