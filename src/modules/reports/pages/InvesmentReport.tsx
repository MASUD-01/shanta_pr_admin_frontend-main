import { useRef, useState } from "react";
import { useLazyGetInvestmentReportQuery } from "../api/reportEndPoint";
import { IClientLedgerParams } from "../types/reportTypes";
import dayjs from "dayjs";
import { Card, Col, DatePicker, Form, Row, Table, Typography } from "antd";
import { useReactToPrint } from "react-to-print";
import { generatePagination } from "../../../common/TablePagination";
import CommonViewReport from "../../../common/commonDetailsView/CommonViewReport";
import { PrimaryButton } from "../../../common/submitButton/CommonButton";
import { PrinterOutlined } from "@ant-design/icons";
import ExcelGenerator from "../../../common/excel/ExcelGenerator";
import { InvestmentReportTableColumns } from "../utils/InvestmentReportTableColumns";

export const landscapePageStyle = `
    @page {
        size: A4 landscape;
    }
`;

const InvesmentReport = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });
  const [form] = Form.useForm();

  const [fetchData, { data, isLoading, isFetching }] =
    useLazyGetInvestmentReportQuery();

  const onFinish = (values: any) => {
    // console.log(values);
    const { date } = values;
    const filterData: IClientLedgerParams = {};

    if (date?.length) {
      filterData.start_date = dayjs(String(date[0])).format("YYYY-MM-DD");
      filterData.end_date = dayjs(String(date[1])).format("YYYY-MM-DD");
    }

    fetchData(filterData);
  };

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "investment_report",
    pageStyle: landscapePageStyle,
    removeAfterPrint: true,

    // onBeforeGetContent: <GlobalLoader />,
  });
  const investment_report_content = (
    <>
      <Table
        bordered
        columns={InvestmentReportTableColumns()}
        dataSource={data?.data?.data ? data?.data?.data : []}
        size="small"
        loading={isLoading || isFetching}
        scroll={{ x: true }}
        pagination={generatePagination(
          Number(data?.total),
          setPagination,
          pagination
        )}
        summary={() => {
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={5} colSpan={6}>
                <Typography.Text
                  strong
                  style={{
                    display: "block",
                    textAlign: "right",
                    marginRight: "10px",
                  }}
                >
                  Total Investment Amount
                </Typography.Text>
              </Table.Summary.Cell>

              <Table.Summary.Cell index={4}>
                <Typography.Text strong>
                  <div
                    style={{
                      color: "green",
                      // textAlign: "right",
                    }}
                  >
                    {data?.data?.summary.total_investment_amount}
                  </div>
                </Typography.Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </>
  );

  const print_content = (
    <div hidden>
      <CommonViewReport
        printRef={componentRef}
        children={investment_report_content}
        title="INVESTMENT REPORT"
      />
    </div>
  );

  return (
    <>
      <Card style={{ marginBottom: "10px", border: "none" }}>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{ date: [dayjs(), dayjs()] }}
        >
          <Row gutter={[5, 5]} justify={"end"}>
            <Col xs={24} md={6} xl={6} xxl={5}>
              <Form.Item
                name="date"
                rules={[{ required: true, message: "Date range is required" }]}
              >
                <DatePicker.RangePicker
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={2} xl={3}>
              <PrimaryButton name="Search" htmlType="submit" />
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        style={{ border: "none" }}
        title="Investment Report"
        extra={
          <div style={{ paddingTop: "10px" }}>
            <Row gutter={[5, 5]}>
              <Col xs={24} sm={24} md={8}>
                <PrimaryButton
                  name="Print"
                  onClick={handlePrint}
                  icon={<PrinterOutlined />}
                />
              </Col>{" "}
              <Col xs={24} sm={24} md={14}>
                <ExcelGenerator
                  excelName="investment_report_expense"
                  excelTableHead={[
                    "SL",
                    "Investor",
                    "Bank Name",
                    "Recevier",
                    "Purpose",
                    "Amount",
                  ]}
                  excelData={
                    data?.data?.data
                      ? data?.data?.data?.map((sData, index) => {
                          const data = {
                            SL: index + 1,
                            Investor: sData?.invested_by,
                            "Bank Name": sData?.bank_name,
                            Recevier: sData?.receiver,
                            Purpose: sData?.purpose,
                            Amount: sData?.amount,
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
        {investment_report_content}
      </Card>
      {print_content}
    </>
  );
};

export default InvesmentReport;
