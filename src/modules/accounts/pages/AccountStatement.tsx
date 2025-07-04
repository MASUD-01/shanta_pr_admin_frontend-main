/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  Col,
  Row,
  DatePicker,
  Form,
  Table,
  ConfigProvider,
  theme,
} from 'antd';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { Typography } from 'antd/lib';
import CommonViewReport from '../../../common/commonDetailsView/CommonViewReport';
import SubmitButton from '../../../common/submitButton/SubmitButton';
import { useParams } from 'react-router-dom';
import {
  useGetAllAccountQuery,
  useLazyGetAccountStatementQuery,
} from '../api/AccountEndPoints';
import { AccountStatementTableColumns } from '../utils/AccountStatementTableColumns';
import { tablePagination } from '../../../common/TablePagination';
import { ITransactionHistory } from '../types/AccountTypes';

export const landscapePageStyle = `
    @page {
        size: A4 landscape;
    }
`;

const AccountStatement = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data: accounts } = useGetAllAccountQuery({});
  const [fetchData, { data, isLoading, isFetching }] =
    useLazyGetAccountStatementQuery();
  const [date, setDate] = useState({
    start_date: dayjs().format('YYYY-MM-DD'),
    end_date: dayjs().format('YYYY-MM-DD'),
  });

  useEffect(() => {
    const params = {
      account_id: Number(id),
      start_date: date.start_date,
      end_date: date.end_date,
    };
    fetchData({ params });
  }, []);
  const onFinish = (values: any) => {
    const { date } = values;
    const params: any = { account_id: Number(id) };
    if (date?.length) {
      params.start_date = dayjs(String(date[0])).format('YYYY-MM-DD');
      params.end_date = dayjs(String(date[1])).format('YYYY-MM-DD');
      setDate({
        start_date: dayjs(String(date[0])).format('YYYY-MM-DD'),
        end_date: dayjs(String(date[1])).format('YYYY-MM-DD'),
      });
    }

    fetchData({ params });
  };

  const FindAccount = accounts?.data?.find(
    (account) => account.id === Number(id)
  );

  const componentRef = useRef(null);

  const client_ledger_content = (
    <Table
      size='small'
      bordered
      rowKey={'id'}
      dataSource={data?.data?.length ? data?.data : []}
      columns={AccountStatementTableColumns()}
      scroll={{ x: true }}
      loading={isLoading || isFetching}
      pagination={
        Number(data?.total) !== undefined && Number(data?.total) > 20
          ? tablePagination
          : false
      }
      summary={(tableData: readonly ITransactionHistory[]) => {
        const calculateTotal = (
          data: readonly ITransactionHistory[],
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
            <Table.Summary.Cell index={6}>
              <Typography.Text style={{ color: 'red' }}>
                {Math.abs(debit).toFixed(2)}
              </Typography.Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={7}>
              <Typography.Text strong style={{ color: 'green' }}>
                {Math.abs(credit).toFixed(2)}
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
            {client_ledger_content}
          </ConfigProvider>
        }
        title={`Bank statement of ${FindAccount?.name}`}
        extraInfo={
          <>
            {FindAccount?.id && (
              <>
                {' '}
                <Typography.Text
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontFamily: "'Source Sans Pro', sans-serif",
                  }}
                >
                  <b>Account Name:</b> {FindAccount?.name}
                </Typography.Text>
                <Typography.Text
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontFamily: "'Source Sans Pro', sans-serif",
                  }}
                >
                  <b>Report Date :</b>{' '}
                  {dayjs(date.start_date).format('DD-MM-YYYY')} -{' '}
                  {dayjs(date.end_date).format('DD-MM-YYYY')}
                </Typography.Text>
              </>
            )}
          </>
        }
      />
    </div>
  );
  return (
    <>
      <Card
        title={`Bank statement of ${FindAccount?.name}`}
        extra={
          <>
            <Form
              form={form}
              layout='vertical'
              onFinish={onFinish}
              initialValues={{
                date: [dayjs(), dayjs()],
              }}
            >
              {' '}
              <Row gutter={[5, 5]} align={'middle'}>
                <Col xs={24} md={18}>
                  <Form.Item
                    name='date'
                    label='Date range'
                    rules={[
                      {
                        required: true,
                        message: 'Please select date range',
                      },
                    ]}
                  >
                    <DatePicker.RangePicker
                      style={{ width: '100%' }}
                      format='DD-MM-YYYY'
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <SubmitButton label='Search' loading={isLoading} />
                </Col>
              </Row>
            </Form>
          </>
        }
      >
        <Card
          style={{ border: 'none' }}
          // extra={
          //   <div>
          //     <Row gutter={[5, 5]}>
          //       <Col xs={24} sm={24} md={10}>
          //         <PrimaryButton
          //           name='Print'
          //           onClick={handlePrint}
          //           icon={<PrinterOutlined />}
          //         />
          //       </Col>{' '}
          //       <Col xs={24} sm={24} md={14}>
          //         <ExcelGenerator
          //           excelName={`Bank statement of ${FindAccount?.name}`}
          //           excelTableHead={[
          //             'Date',
          //             'Voucher No.',
          //             'Account Name',
          //             'Purpose',
          //             'Details',
          //             'Dr.',
          //             'Cr.',
          //             'Balance',
          //           ]}
          //           excelData={
          //             data?.data?.length
          //               ? data?.data?.map((sData) => {
          //                   const debitAmount = sData?.type === 'OUT';
          //                   const creditAmount = sData?.type === 'IN';
          //                   const data = {
          //                     Date: dayjs(sData.ledger_date).format(
          //                       'YYYY-MM-DD'
          //                     ),
          //                     'Voucher No.': sData?.voucher_no,
          //                     'Account Name': sData?.account_name,
          //                     Purpose: sData?.purpose,
          //                     Details: sData?.details,

          //                     'Dr.': debitAmount ? sData?.amount : '',
          //                     'Cr.': creditAmount ? sData?.amount : '',
          //                     Balance: sData?.last_balance,
          //                   };
          //                   return data;
          //                 })
          //               : []
          //           }
          //         />
          //       </Col>
          //     </Row>
          //   </div>
          // }
        >
          {client_ledger_content}
        </Card>
      </Card>
      {print_content}
    </>
  );
};

export default AccountStatement;
