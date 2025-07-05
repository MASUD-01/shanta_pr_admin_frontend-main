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
} from "antd";
import dayjs from "dayjs";
import { PrimaryButton } from "../../../common/submitButton/CommonButton";
import { CollectionReportTableColumns } from "../utils/CollectionReportTableColumns";
import { useLazyGetCollectionReportQuery } from "../api/reportEndPoint";
import { PrinterOutlined } from "@ant-design/icons";
import ExcelGenerator from "../../../common/excel/ExcelGenerator";
import CommonViewReport from "../../../common/commonDetailsView/CommonViewReport";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import { globalTheme } from "../../../app/slice/themeSlice";
import SetQueyInUrl from "../../../common/applayout/utils/SetQueyInUrl";
import OneMonthDatePicker from "../utils/OneMonthDatePicker";
import OwnerMultiSelect from "../../homemake/OwnerMultiSelect";
const { Title } = Typography;

const CollectionReport = () => {
	const { searchParams, setSearchParams } = SetQueyInUrl();
	const themeGlobal = useSelector(globalTheme);
	const [form] = Form.useForm();
	const [date, setDate] = useState([]);
	const componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: "collection_report",
		removeAfterPrint: true,
	});

	const [fetchData, { data, isLoading, isFetching }] =
		useLazyGetCollectionReportQuery();

	const onFinish = (values: any) => {
		const { date, client_id, employee_id } = values;
		setDate(date);
		const filterData: any = {};
		if (date?.length) {
			filterData.start_date = dayjs(String(date[0])).format("YYYY-MM-DD");
			filterData.end_date = dayjs(String(date[1])).format("YYYY-MM-DD");
		}
		if (client_id) {
			filterData.client_id = client_id;
		}
		if (employee_id) {
			filterData.employee_id = employee_id;
		}
		fetchData(filterData);

		setSearchParams(filterData);
	};
	useEffect(() => {
		const client_id = searchParams.get("client_id");
		const start_date = searchParams.get("start_date");
		const end_date = searchParams.get("end_date");
		const employee_id = searchParams.get("employee_id");
		const fromQuery: {
			client_id?: string;
			start_date?: string;
			end_date?: string;
			employee_id?: string;
			product_id?: string;
		} = {};
		if (client_id) {
			fromQuery.client_id = client_id;
			form.setFieldValue("client_id", Number(client_id));
		}
		if (employee_id) {
			fromQuery.employee_id = employee_id;
			form.setFieldValue("employee_id", Number(employee_id));
		}

		if (start_date && end_date) {
			fromQuery.start_date = start_date;
			fromQuery.end_date = end_date;
			form.setFieldsValue({
				date: [dayjs(start_date, "YYYY-MM-DD"), dayjs(end_date, "YYYY-MM-DD")],
			});
		} else {
			fromQuery.start_date = OneMonthDatePicker()[0].format("YYYY-MM-DD");
			fromQuery.end_date = OneMonthDatePicker()[1].format("YYYY-MM-DD");
		}
		fetchData(fromQuery as any);
	}, []);
	const collection_report_content = (
		<Table
			bordered
			rowKey={(e) => e.id}
			columns={CollectionReportTableColumns()}
			dataSource={[
				{
					key: 1,
					date: "2025-07-01",
					money_receipt_no: "TRX-XYZ001",
					owner: "Mr. Karim",
					amount: 5000,
					paymentMethod: "Bank Transfer",
					bankAccount: "DBBL A/C 123",
				},
				{
					key: 2,
					date: "2025-07-02",
					money_receipt_no: "TXN-111",
					owner: "Mr. Rahim",
					amount: 2000,
					paymentMethod: "bKash",
					bankAccount: "bKash Merchant 987",
				},
			]}
			size="small"
			// loading={isLoading || isFetching}
			scroll={{ x: true }}
			pagination={false}
			summary={(tableData) => {
				const total = tableData?.reduce((total: number, item: any) => {
					return total + Number(item?.amount);
				}, 0);
				return (
					<Table.Summary.Row>
						<Table.Summary.Cell index={1} colSpan={6}>
							<Typography.Text
								strong
								style={{
									display: "block",
									textAlign: "right",
									marginRight: "10px",
								}}
							>
								Total
							</Typography.Text>
						</Table.Summary.Cell>
						<Table.Summary.Cell index={2}>
							<Typography.Text strong>{total || 0}</Typography.Text>
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
						colorPrimary: "#FFFFFF",
					},
					components: {
						Table: {
							colorBgContainer: "#FFFFFF",
						},
					},
				}}
			>
				<CommonViewReport
					printRef={componentRef}
					children={collection_report_content}
					title="COLLECTION REPORT"
					extraInfo={
						<>
							<Typography.Text
								style={{
									display: "block",
									fontSize: "13px",
									fontFamily: "'Source Sans Pro', sans-serif",
								}}
							>
								<b>Report Date :</b> {dayjs(date[0]).format("YYYY-MM-DD")} -{" "}
								{dayjs(date[1]).format("YYYY-MM-DD")}
							</Typography.Text>
						</>
					}
				/>
			</ConfigProvider>
		</div>
	);
	return (
		<>
			<Card>
				<Title level={5}>Collection Report</Title>

				<Form title="Collection Report" form={form} onFinish={onFinish}>
					<Row gutter={[5, 5]} justify={"end"}>
						<Col xs={24} sm={24} md={12} xl={5} xxl={4}>
             <OwnerMultiSelect formItemProps={{noStyle:true}}/>
            
            </Col>
						<Col xs={24} sm={24} md={12} xl={6} xxl={4}>
							<Form.Item
								name="date"
								rules={[{ required: true, message: "Date range is required" }]}
								initialValue={OneMonthDatePicker()}
							>
								<DatePicker.RangePicker
									style={{ width: "100%" }}
									format="DD-MM-YYYY"
								/>
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={12} xl={3}>
							<PrimaryButton name="Search" htmlType="submit" />
						</Col>
					</Row>
				</Form>
			</Card>
			<Card
				style={{ border: "none" }}
				extra={
					<>
						<Row gutter={[5, 5]}>
							<Col xs={24} sm={24} md={10}>
								<PrimaryButton
									name="Print"
									onClick={handlePrint}
									icon={<PrinterOutlined />}
								/>
							</Col>{" "}
							<Col xs={24} sm={24} md={14}>
								<ExcelGenerator
									excelName="collection_report"
									excelTableHead={[
										"SL",
										"Money Receipt No.",
										"Date",
										"Client Name",
										"Collected By",
										"Amount",
									]}
									excelData={
										data?.data?.length
											? data?.data?.map((sData, index) => {
													const data = {
														SL: index + 1,
														"Money Receipt No.": sData?.money_receipt_no,
														Date: dayjs(sData?.payment_date).format(
															"YYYY-MM-DD"
														),
														"Client Name": sData?.client_name,
														"Collected By": sData?.collected_by,
														Amount: sData?.paid_amount,
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
				{collection_report_content}
			</Card>
			{print_content}
		</>
	);
};

export default CollectionReport;
