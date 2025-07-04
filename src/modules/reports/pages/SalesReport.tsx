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
} from 'antd';
import dayjs from 'dayjs';
import { useLazyGetSalesReportQuery } from '../api/reportEndPoint';
import { PrimaryButton } from '../../../common/submitButton/CommonButton';
import { SalesReportTableColumns } from '../utils/SalesReportTableColumns';
import { PrinterOutlined } from '@ant-design/icons';
import ExcelGenerator from '../../../common/excel/ExcelGenerator';
import CommonViewReport from '../../../common/commonDetailsView/CommonViewReport';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useGetEmployeesQuery } from '../../Configuration/Employee/api/employeeEndPoint';
import { SearchAbleSelectInput } from '../../../common/Input/SearchAbleSelectInput';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';
import SetQueyInUrl from '../../../common/applayout/utils/SetQueyInUrl';
import OneMonthDatePicker from '../utils/OneMonthDatePicker';
import { ISalesReport } from '../types/reportTypes';

const { Title } = Typography;

const SalesReport = () => {
  const { searchParams, setSearchParams } = SetQueyInUrl();
  const themeGlobal = useSelector(globalTheme);
  const [form] = Form.useForm();
  const [date, setDate] = useState([]);
  const { data: employees } = useGetEmployeesQuery({});
  const [fetchData, { data, isLoading, isFetching }] =
    useLazyGetSalesReportQuery();

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'sales_report',
    removeAfterPrint: true,
  });

  useEffect(() => {
    const client_id = searchParams.get('client_id');
    const start_date = searchParams.get('start_date');
    const end_date = searchParams.get('end_date');
    const employee_id = searchParams.get('employee_id');
    const product_id = searchParams.get('product_id');
    const fromQuery: {
      client_id?: string;
      start_date?: string;
      end_date?: string;
      employee_id?: string;
      product_id?: string;
    } = {};
    if (client_id) {
      fromQuery.client_id = client_id;
      form.setFieldValue('client_id', Number(client_id));
    }
    if (employee_id) {
      fromQuery.employee_id = employee_id;
      form.setFieldValue('employee_id', Number(employee_id));
    }
    if (product_id) {
      fromQuery.product_id = product_id;
      form.setFieldValue('product_id', Number(product_id));
    }
    if (start_date && end_date) {
      fromQuery.start_date = start_date;
      fromQuery.end_date = end_date;
      form.setFieldsValue({
        date: [dayjs(start_date, 'YYYY-MM-DD'), dayjs(end_date, 'YYYY-MM-DD')],
      });
    } else {
      //SET DATE RANGE FOR whole month
      fromQuery.start_date = OneMonthDatePicker()[0].format('YYYY-MM-DD');
      fromQuery.end_date = OneMonthDatePicker()[1].format('YYYY-MM-DD');
    }
    fetchData(fromQuery as any);
  }, []);
  const onFinish = (values: any) => {
    const { date, client_id, employee_id, product_id } = values;
    setDate(date);

    const filterData: any = {};
    if (date?.length) {
      filterData.start_date = dayjs(String(date[0])).format('YYYY-MM-DD');
      filterData.end_date = dayjs(String(date[1])).format('YYYY-MM-DD');
    }
    if (client_id) {
      filterData.client_id = client_id;
    }
    if (employee_id) {
      filterData.employee_id = employee_id;
    }
    if (product_id) {
      filterData.product_id = product_id;
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
      columns={SalesReportTableColumns()}
      dataSource={data?.data?.length ? data.data : []}
      size='small'
      loading={isLoading || isFetching}
      scroll={{ x: true }}
      pagination={false}
      summary={(tableData: any) => {
        const total = tableData?.reduce((total: number, item: any) => {
          return total + Number(item?.collection || 0);
        }, 0);

        const totalDue = tableData?.reduce((total: number, item: any) => {
          return total + Number(item?.due || 0);
        }, 0);
        const totalSales = tableData?.reduce((total: number, item: any) => {
          return total + Number(item?.net_total || 0);
        }, 0);

        return (
          <>
            {/* Summary for Total and Due */}
            <Table.Summary.Row>
              <Table.Summary.Cell index={1} colSpan={5}>
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

              <Table.Summary.Cell index={2}>
                <Typography.Text strong>{totalSales || 0}</Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Typography.Text strong>{totalSales || 0}</Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Typography.Text strong>{total || 0}</Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Typography.Text strong style={{ color: 'red' }}>
                  {totalDue || 0}
                </Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}></Table.Summary.Cell>
            </Table.Summary.Row>

            {/* Summary for Product Details */}

            {/* <Table.Summary.Row>
              <Table.Summary.Cell index={1}>
                <Typography.Text strong>Product Name</Typography.Text>
              </Table.Summary.Cell>

              <Table.Summary.Cell index={2}>
                <Typography.Text>Quantity</Typography.Text>
              </Table.Summary.Cell>

              <Table.Summary.Cell index={2}>
                <Typography.Text>Price</Typography.Text>
              </Table.Summary.Cell>

              <Table.Summary.Cell index={3}>
                <Typography.Text strong>Total</Typography.Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
            {tableData
              ?.flatMap((row: any) => row.sale_products || [])
              .map((product: any, index: number) => {
                const totalAmount =
                  (product?.quantity || 0) * (product?.unit_price || 0);
                return (
                  <Table.Summary.Row key={index}>
                    <Table.Summary.Cell index={1}>
                      <Typography.Text strong>
                        {product?.name || '-'}
                      </Typography.Text>
                    </Table.Summary.Cell>

                    <Table.Summary.Cell index={2}>
                      <Typography.Text>
                        {product?.quantity || 0}
                      </Typography.Text>
                    </Table.Summary.Cell>

                    <Table.Summary.Cell index={2}>
                      <Typography.Text>
                        {product?.unit_price?.toFixed(2) || '0.00'}
                      </Typography.Text>
                    </Table.Summary.Cell>

                    <Table.Summary.Cell index={3}>
                      <Typography.Text strong>
                        {totalAmount.toFixed(2)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                );
              })} */}
          </>
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
          children={sales_report_content}
          title='SALES REPORT'
          extraInfo={
            <>
              <Typography.Text
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontFamily: "'Source Sans Pro', sans-serif",
                }}
              >
                <b>Report Date :</b> {dayjs(date[0]).format('DD-MM-YYYY')} -{' '}
                {dayjs(date[1]).format('DD-MM-YYYY')}
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
        style={{ marginBottom: '20px' }}
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? 'custom-header'
            : 'header-dark'
        }
      >
        <Title level={5}>Sales Report</Title>
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[5, 5]} justify={'end'}>
            {/* <CommonCustomLabelProductSelect
              md={6}
              lg={6}
              xl={5}
              name={'product_id'}
              paddingTopZero
              // customLabel
              // handleSelect={(e) =>
              //   setFilterItem((prevState) => ({
              //     ...prevState,
              //     product_id: e,
              //   }))
              // }
            /> */}

            <Col xs={24} sm={24} md={12} xl={5} xxl={4}>
              <SearchAbleSelectInput
                name={'employee_id'}
                options={
                  employees?.data?.length
                    ? employees?.data?.map((employee) => ({
                        value: employee.id,
                        label: employee.name,
                      }))
                    : []
                }
                placeholder='Select Sales by'
              />
            </Col>
            {/* <Col xs={24} sm={24} md={12} xl={5} xxl={4}>
              <SearchAbleSelectInput
                name={'product_id'}
                options={
                  products?.data?.length
                    ? products?.data?.map((product) => ({
                        value: product.id,
                        label: product.name,
                      }))
                    : []
                }
                placeholder='Select product'
              />
            </Col> */}
            <Col xs={24} sm={24} md={12} xl={6} xxl={5}>
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

            <Col xs={24} sm={24} md={12} xl={3}>
              <PrimaryButton name='Search' htmlType='submit' />
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        style={{ border: 'none' }}
        // title="Sales Report"
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
                  excelName='sales_report'
                  excelTableHead={[
                    'Invoice No',
                    'Date',
                    'Client Name',
                    'Product',
                    'Sales Amount',
                    'Total Amount',
                    'Collected Amount',
                    'Due Amount',
                    'Employee',
                  ]}
                  excelData={
                    data?.data?.length
                      ? data?.data?.map((sData, index: number) => {
                          const netTotal = parseFloat(sData?.net_total) || 0;
                          const extraCharge =
                            parseFloat(sData?.extra_charge) || 0;
                          const data = {
                            SL: index + 1,
                            'Invoice No': sData?.invoice_no,
                            Date: dayjs(sData?.invoice_date).format(
                              'DD-MM-YYYY'
                            ),

                            'Client Name': sData?.client_name,
                            Product: sData?.sale_products
                              ?.map((product: any) => product?.name)
                              .join(', '),
                            'Sales Amount': sData?.net_total,
                            Discount: sData?.discount,
                            'Total Amount': netTotal + extraCharge,
                            'Collected Amount': sData?.collection,
                            'Due Amount': sData?.due,
                            Employee: sData?.sale_by,
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

      <SaleProductTable data={data?.data} />
    </>
  );
};

export default SalesReport;

const SaleProductTable = ({ data }: { data: ISalesReport[] | undefined }) => {
  // Flatten sale_products from all entries
  const saleProducts = data?.flatMap((entry) => entry?.sale_products || []);

  // Group and aggregate data by product ID
  const groupedData: any = saleProducts?.length
    ? Object.values(
        saleProducts.reduce((acc: any, item: any) => {
          if (!acc[item.id]) {
            acc[item.id] = {
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              unit_price: item.unit_price,
              total_price: item.quantity * item.unit_price,
            };
          } else {
            acc[item.id].quantity += item.quantity;
            acc[item.id].total_price += item.quantity * item.unit_price;
          }
          return acc;
        }, {})
      )
    : [];

  // Define table columns
  const columns: any = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },

    {
      title: 'Total',
      key: 'total',
      render: (_: any, record: any) => record?.total_price?.toFixed(2),
    },
  ];

  return (
    <Card size='small' title='Product Summary' style={{ marginTop: '10px' }}>
      <Table
        size='small'
        dataSource={groupedData}
        columns={columns}
        rowKey='id'
        pagination={false}
        bordered
        summary={(data) => {
          const totalAmount = data?.reduce(
            (sum: number, item: any) => sum + item.total_price,
            0
          );
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={2} align='end'>
                <Typography.Text strong>Total</Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Typography.Text strong>
                  {totalAmount?.toFixed(2)}
                </Typography.Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </Card>
  );
};
