/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Select,
} from 'antd';
import { generatePagination } from '../../../common/TablePagination';
import dayjs from 'dayjs';
import { useLazyGetSubscriptionReportQuery } from '../api/reportEndPoint';
import { PrimaryButton } from '../../../common/submitButton/CommonButton';
import { PrinterOutlined } from '@ant-design/icons';
import CommonViewReport from '../../../common/commonDetailsView/CommonViewReport';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useGetEmployeesQuery } from '../../Configuration/Employee/api/employeeEndPoint';
import { SearchAbleSelectInput } from '../../../common/Input/SearchAbleSelectInput';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';
import SetQueyInUrl from '../../../common/applayout/utils/SetQueyInUrl';
import { CommonCustomLabelProductSelect } from '../../../common/fromItemCommon/SelectCustomField';
import { ISubscriptionFilter } from '../../subscription/type/subscriptiontype';
import { SubscriptionReportTableColumn } from '../utils/SubscriptionReportTableColumn';
import ExcelGenerator from '../../../common/excel/ExcelGenerator';
import PrintSubscriptionTableReportColumn from '../utils/PrintSubscriptionTableReportColumn';
import { debounce } from 'lodash';

const SubscriptionReport = () => {
  const { searchParams, setSearchParams } = SetQueyInUrl();
  const themeGlobal = useSelector(globalTheme);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  });
  const product_id = searchParams.get('product_id');
  const [filterItem, setFilterItem] = useState<ISubscriptionFilter>({
    product_id: product_id ? Number(product_id) : 0,
  });

  const [form] = Form.useForm();
  const [date, setDate] = useState([]);
  //employee search-----------------------------start--
  const [searchEmployee, setSearchEmployee] = useState('');
  const handleSearchEmployee = useMemo(
    () =>
      debounce((searchEmployee) => {
        setSearchEmployee(searchEmployee);
      }, 500),
    []
  );
  const { data: employees } = useGetEmployeesQuery(
    searchEmployee
      ? {
          name: searchEmployee,
        }
      : {}
  );
  //employee search-----------------------------end--
  const [fetchData, { data, isLoading, isFetching }] =
    useLazyGetSubscriptionReportQuery();

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'subscription_report',
    removeAfterPrint: true,
  });
  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');
  useEffect(() => {
    const client_id = searchParams.get('client_id');

    const last_collected_by = searchParams.get('last_collected_by');
    const product_id = searchParams.get('product_id');
    const status = searchParams.get('status');
    const fromQuery: {
      client_id?: string;
      start_date?: string;
      end_date?: string;
      last_collected_by?: string;
      product_id?: string;
      status?: string;
    } = {};
    if (client_id) {
      fromQuery.client_id = client_id;
      form.setFieldValue('client_id', Number(client_id));
    }
    if (last_collected_by) {
      fromQuery.last_collected_by = last_collected_by;
      form.setFieldValue('last_collected_by', Number(last_collected_by));
    }
    if (product_id) {
      fromQuery.product_id = product_id;
      form.setFieldValue('product_id', Number(product_id));
    }
    if (status) {
      fromQuery.status = status;
      form.setFieldValue('status', status);
    }
    if (start_date && end_date) {
      fromQuery.start_date = start_date;
      fromQuery.end_date = end_date;
    } else {
      //SET DATE RANGE FOR whole month
      // fromQuery.start_date = OneMonthDatePicker()[0].format('YYYY-MM-DD');
      // fromQuery.end_date = OneMonthDatePicker()[1].format('YYYY-MM-DD');
    }

    if (Object.values(fromQuery)?.length > 0) {
      fetchData(fromQuery as any);
    }
  }, []);

  const l_start_date = searchParams.get('l_start_date');
  const l_end_date = searchParams.get('l_end_date');
  const e_start_date = searchParams.get('e_start_date');
  const e_end_date = searchParams.get('e_end_date');
  const onFinish = (values: any) => {
    const { date, client_id, last_collected_by } = values;

    const filterData: any = {};
    if (date?.length) {
      setDate(date);
      filterData.start_date = dayjs(String(date[0])).format('YYYY-MM-DD');
      filterData.end_date = dayjs(String(date[1])).format('YYYY-MM-DD');
    }
    if (client_id) {
      filterData.client_id = client_id;
    }
    if (last_collected_by) {
      filterData.last_collected_by = last_collected_by;
    }

    if (filterItem?.product_id) {
      filterData.product_id = filterItem?.product_id;
    }
    if (filterItem?.l_start_date) {
      filterData.l_start_date = filterItem?.l_start_date;
    }
    if (filterItem?.l_end_date) {
      filterData.l_end_date = filterItem?.l_end_date;
    }
    if (filterItem?.e_start_date) {
      filterData.e_start_date = filterItem?.e_start_date;
    }
    if (filterItem?.e_end_date) {
      filterData.e_end_date = filterItem?.e_end_date;
    }
    if (filterItem?.status) {
      filterData.status = filterItem?.status;
    }
    fetchData(filterData);
    setSearchParams(filterData);
  };

  const sales_report_content = (
    <Table
      className={
        themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ' '
      }
      bordered
      rowKey={(e) => e.id}
      columns={SubscriptionReportTableColumn()}
      dataSource={data?.data?.length ? data?.data : []}
      size='small'
      loading={isLoading || isFetching}
      scroll={{ x: true }}
      pagination={false}
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
          children={
            <Table
              className='custom-tables'
              bordered
              rowKey={(e) => e.id}
              columns={PrintSubscriptionTableReportColumn()}
              dataSource={data?.data?.length ? data.data : []}
              size='small'
              loading={isLoading || isFetching}
              pagination={generatePagination(
                Number(data?.total),
                setPagination,
                pagination
              )}
            />
          }
          title='SUBSCRIPTION REPORT'
          extraInfo={
            <>
              <Typography.Text
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontFamily: "'Source Sans Pro', sans-serif",
                }}
              >
                <b>Report Date :</b> {dayjs(date[0])?.format('DD-MM-YYYY')} -{' '}
                {dayjs(date[1])?.format('DD-MM-YYYY')}
              </Typography.Text>
            </>
          }
        />
      </ConfigProvider>
    </div>
  );

  return (
    <>
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Card
          title='Subscription Report'
          style={{ marginBottom: '20px' }}
          className={
            themeGlobal.theme === theme.defaultAlgorithm
              ? 'custom-header'
              : 'header-dark'
          }
        >
          <Row gutter={[5, { xs: 10, sm: 10, md: 10 }]} justify={'end'}>
            <Col xs={24} sm={24} md={24} lg={22} xl={22}>
              <Row gutter={[5, 0]} justify={'end'}>
                <Col xs={24} sm={24} md={8} lg={8} xl={5} xxl={4}>
                  <div>
                    <Typography.Text>Select Employee</Typography.Text>
                  </div>
                  <SearchAbleSelectInput
                    name={'last_collected_by'}
                    options={
                      employees?.data?.length
                        ? employees?.data?.map((employee) => ({
                            value: employee.id,
                            label: employee.name,
                          }))
                        : []
                    }
                    onSearch={handleSearchEmployee}
                    onSelect={(e: any) => {
                      if (!e) {
                        setSearchEmployee('');
                      }
                    }}
                    placeholder='Select Employee by'
                  />
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={6} xxl={5}>
                  <div>
                    <Typography.Text>Created date</Typography.Text>
                  </div>
                  <Form.Item name='date'>
                    <DatePicker.RangePicker
                      style={{ width: '100%' }}
                      format='DD-MM-YYYY'
                      defaultValue={[
                        start_date ? dayjs(start_date) : undefined,
                        end_date ? dayjs(end_date) : undefined,
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Row justify={'end'} gutter={[5, 0]}>
                    <Col
                      xs={24}
                      sm={24}
                      md={6}
                      lg={6}
                      style={{ paddingTop: '5px' }}
                    >
                      <Typography.Text> Select Status</Typography.Text>
                      <Form.Item name='status'>
                        <Select
                          placeholder={'Select status'}
                          showSearch
                          allowClear
                          style={{
                            padding: '0',
                            margin: '0',
                            border: '0',
                            width: '100%',
                          }}
                          optionFilterProp='roleMobile'
                          filterOption={(input, option) =>
                            (option!.children as unknown as string).includes(
                              input
                            )
                          }
                          onChange={(e) => {
                            if (e?.length) {
                              console.log(e);
                              setFilterItem({
                                ...filterItem,
                                status: e,
                              });
                            } else {
                              setFilterItem({
                                ...filterItem,
                                status: '',
                              });
                            }
                          }}
                        >
                          <Select.Option value={'active'}>Active</Select.Option>
                          <Select.Option value={'inactive'}>
                            InActive
                          </Select.Option>
                          <Select.Option value={'expired'}>
                            Expired
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <CommonCustomLabelProductSelect
                      md={6}
                      lg={6}
                      xl={5}
                      name={'product_id'}
                      customLabel
                      handleSelect={(e) =>
                        setFilterItem((prevState) => ({
                          ...prevState,
                          product_id: e,
                        }))
                      }
                    />

                    <Col
                      xs={24}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={5}
                      xxl={4}
                      style={{ paddingTop: '5px' }}
                    >
                      <Typography.Text> Payment date</Typography.Text>
                      <DatePicker.RangePicker
                        style={{ width: '100%' }}
                        defaultValue={[
                          l_start_date ? dayjs(l_start_date) : undefined,
                          l_end_date ? dayjs(l_end_date) : undefined,
                        ]}
                        onChange={(e) => {
                          if (e?.length) {
                            setFilterItem({
                              ...filterItem,
                              l_start_date: dayjs(e[0]).format('YYYY-MM-DD'),
                              l_end_date: dayjs(e[1]).format('YYYY-MM-DD'),
                            });
                          } else {
                            setFilterItem({
                              ...filterItem,
                              l_start_date: '',
                              l_end_date: '',
                            });
                          }
                        }}
                      />
                    </Col>
                    <Col
                      xs={24}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={6}
                      xxl={5}
                      style={{ paddingTop: '5px' }}
                    >
                      <Typography.Text>Expire date</Typography.Text>
                      <DatePicker.RangePicker
                        style={{ width: '100%' }}
                        defaultValue={[
                          e_start_date ? dayjs(e_start_date) : undefined,
                          e_end_date ? dayjs(e_end_date) : undefined,
                        ]}
                        onChange={(e) => {
                          if (e?.length) {
                            setFilterItem({
                              ...filterItem,
                              e_start_date: dayjs(e[0]).format('YYYY-MM-DD'),
                              e_end_date: dayjs(e[1]).format('YYYY-MM-DD'),
                            });
                          } else {
                            setFilterItem({
                              ...filterItem,
                              e_start_date: '',
                              e_end_date: '',
                            });
                          }
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col
              xs={24}
              sm={24}
              md={24}
              lg={2}
              xl={2}
              style={{
                padding: 0,
                display: 'flex',
                alignItems: 'center', // centers vertically
                justifyContent: 'center', // centers horizontally
              }}
            >
              <div style={{ width: '90%' }}>
                <PrimaryButton name='Search' htmlType='submit' />
              </div>
            </Col>
          </Row>
        </Card>

        <Card
          style={{ border: 'none' }}
          extra={
            <>
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
                    excelName='subscription_report'
                    excelTableHead={[
                      'Sold Date',
                      'Payment Date',
                      'Expire Date',
                      'Client Name',
                      'Email',
                      'Mobile',
                      'Address',
                      'Subscription Amount',
                      'Paid Amount',
                      'Product Name',
                      'Collected by',
                      'Remark',
                    ]}
                    excelData={
                      data?.data?.length
                        ? data?.data?.map((sData, index: number) => {
                            const data = {
                              SL: index + 1,
                              'Sold Date': dayjs(sData?.sold_date).format(
                                'DD-MM-YYYY'
                              ),
                              'Payment Date': dayjs(
                                sData?.last_payment_date
                              ).format('DD-MM-YYYY'),
                              'Expire Date': dayjs(sData?.expire_date).format(
                                'DD-MM-YYYY'
                              ),

                              'Client Name': sData?.client_name,
                              Email: sData?.client_email,
                              Mobile: sData?.client_phone,
                              Address: sData?.client_address,
                              'Subscription Amount': sData?.subscription_amount,
                              'Paid Amount': sData?.last_paid_amount,
                              'Product Name': sData?.product_name,
                              'Collected by': sData?.last_collected_by_name,
                              Remark: sData.last_feedback,
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
          {sales_report_content}
        </Card>
        {print_content}
      </Form>
    </>
  );
};

export default SubscriptionReport;
