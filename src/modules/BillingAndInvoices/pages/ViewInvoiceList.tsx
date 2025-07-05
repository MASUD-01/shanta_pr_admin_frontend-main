/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import {
	Card,
	Row,
	Table,
	Col,
	DatePicker,
	theme,
	Form,
	Tag,
	Space,
	Button,
	Select,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { generatePagination } from "../../../common/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import { globalTheme } from "../../../app/slice/themeSlice";
import SetQueyInUrl from "../../../common/applayout/utils/SetQueyInUrl";
import { useForm } from "antd/es/form/Form";
import CommSearchInput from "../../../common/Input/CommSearchInput";
import { IInvoiceFilter } from "../../invoice/types/invoiceTypes";
import { useGetAllInvoiceQuery } from "../../invoice/api/invoiceEndpoints";
import { CustomLink } from "../../../common/CustomLink";
import { EyeIcon } from "../../../common/icon/Icon";
import SendInvoiceToOwner from "./SendInvoiceToOwner";
import { IoIosSend } from "react-icons/io";
import { setCommonModal } from "../../../app/slice/modalSlice";
import ReminderSettings from "../../homemake/ReminderSettings";

const { Option } = Select;
const ViewInvoiceList = () => {
	const [form] = useForm();
	const { searchParams, setSearchParams } = SetQueyInUrl();
	const start_date = searchParams.get("start_date");
	const end_date = searchParams.get("end_date");
	const client_id = searchParams.get("client_id");
	const limit = searchParams.get("limit");
	const skip = searchParams.get("skip");
	const themeGlobal = useSelector(globalTheme);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 100,
	});
	const page = searchParams.get("page") || "1";
	const pageSize = searchParams.get("pageSize") || "100";
	const skipValue = (Number(page) - 1) * Number(pageSize);

	const [filter, setFilter] = useState<{ limit: number; skip: number }>({
		limit: Number(pageSize),
		skip: skipValue,
	});
	useEffect(() => {
		setFilter({
			limit: Number(pageSize),
			skip: skipValue,
		});
	}, [page, pageSize, skipValue]);

	const [filterItem, setFilterItem] = useState<IInvoiceFilter>({
		client_id: client_id ? Number(client_id) : 0,
		start_date: start_date ? start_date : dayjs().format("YYYY-MM-DD"),
		end_date: end_date ? end_date : dayjs().format("YYYY-MM-DD"),
		invoice_no: "",
		limit: limit ? Number(limit) : 100,
		skip: skip ? skip : "0",
	});

	const valuesWithData: any = {} as IInvoiceFilter;
	for (const key of Object.keys(filterItem) as (keyof IInvoiceFilter)[]) {
		if (filterItem.hasOwnProperty(key) && filterItem[key]) {
			valuesWithData[key] = filterItem[key];
		}
	}
	const { data, isFetching, isLoading } = useGetAllInvoiceQuery(valuesWithData);
	useEffect(() => {
		setSearchParams(valuesWithData);
	}, [filterItem]);

	useEffect(() => {
		if (limit && skip) {
			setFilterItem({
				...filterItem,
				limit: Number(limit),
				skip: String(skip),
			});
		}
	}, [filter]);

	useEffect(() => {
		if (client_id) form.setFieldValue("client_id", Number(client_id));
	}, []);

const dispatch = useDispatch();
		const showModal1 = () => {
			dispatch(
				setCommonModal({
					title: "Send Reminders for Dues Invoices",
					content:     <ReminderSettings/>,
					show: true,
					width: 700,
				})
			);
		};
	return (
		<>
			<Card
				styles={{
					header: {
						backgroundColor:
							themeGlobal.theme === theme.defaultAlgorithm
								? "#FFFFFF"
								: "#121212",
					},
				}}
				title={`Billing & Invoice list`}
				extra={
					<Form form={form}>
						<Row
							gutter={[5, 0]}
							style={{ marginTop: "0px", width: "900px" }}
							align={"middle"}
							justify={"end"}
						>
							<Col xs={24} sm={12} md={8} lg={6}>
								<Button icon={<IoIosSend />} onClick={showModal1} style={{ width: "100%" }} type="primary">
									Send Reminders for dues
								</Button>
							</Col>
							<Col xs={24} sm={12} md={8} lg={6}>
								<Form.Item noStyle name="status">
									<Select style={{ width: "100%" }} placeholder="Select Status">
										<Option value="Paid">Paid</Option>
										<Option value="Unpaid">Unpaid</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={8} lg={6}>
								<CommSearchInput
									placeholder="Search by Building Name"
									onChange={(e) => {
										setFilterItem((prev) => ({
											...prev,
											invoice_no: e,
										}));
									}}
								/>
							</Col>

							<Col xs={24} sm={12} md={9} lg={6}>
								<DatePicker.RangePicker
									defaultValue={[
										start_date ? dayjs(start_date) : dayjs(),
										end_date ? dayjs(end_date) : dayjs(),
									]}
									onChange={(e) => {
										if (e?.length) {
											setFilterItem({
												...filterItem,
												start_date: dayjs(e[0]).format("YYYY-MM-DD"),
												end_date: dayjs(e[1]).format("YYYY-MM-DD"),
											});
										} else {
											setFilterItem({
												...filterItem,
												start_date: "",
												end_date: "",
											});
										}
									}}
								/>
							</Col>
						</Row>
					</Form>
				}
			>
				<Table
					className={
						themeGlobal.theme === theme.defaultAlgorithm ? "custom-table" : ""
					}
					rowKey={"id"}
					size="small"
					bordered
					columns={[
						{
							title: "SL",
							dataIndex: "id",
							key: "id",
							render: (_: any, __: any, index: number) => index + 1,
						},
						{
							title: "Invoice Date",
							dataIndex: "invoiceDate",
							key: "invoiceDate",
						},
						{
							title: "Invoice No.",
							dataIndex: "invoiceNo",
							key: "invoiceNo",
						},
						{
							title: "Invoice Type",
							dataIndex: "invoiceType",
							key: "invoiceType",
							render: (type: string) => (
								<Tag color={type === "Manual" ? "volcano" : "green"}>
									{type}
								</Tag>
							),
						},
						{
							title: "Building Name",
							dataIndex: "buildingName",
							key: "buildingName",
						},
						{
							title: "Owner Name",
							dataIndex: "ownerName",
							key: "ownerName",
						},
						{
							title: "Service Item",
							dataIndex: "serviceItems",
							key: "serviceItems",
							render: (items: string[]) =>
								items?.map((item, idx) => (
									<Tag key={idx} color="blue">
										{item}
									</Tag>
								)),
						},
						{
							title: "Status",
							dataIndex: "status",
							key: "status",
							render: (items: string) => (
								<Tag color={items === "Paid" ? "blue" : "red"}>{items}</Tag>
							),
						},
						{
							title: "Actions",
							width: 120,
							render: (_: any, record: any) => (
								<Space size="middle">
									<CustomLink
										to={`/billing-invoices/view-invoice/${record.id}`}
									>
										<EyeIcon />
									</CustomLink>

									<CustomLink
										to={`/billing-invoices/send-invoice/${record.id}`}
									>
										<Button type="primary" icon={<IoIosSend />}>
											Send Invoices
										</Button>
									</CustomLink>
								</Space>
							),
						},
					]}
					dataSource={[
						{
							id: 1,
							invoiceDate: "2025-07-01",
							invoiceType: "Auto Prepare",
							buildingName: "Building A",
							ownerName: "Mr. Karim",
							serviceItems: ["Service Charge"],
							invoiceNo: "INV-00001",
							status: "Paid",
						},
						{
							id: 2,
							invoiceDate: "2025-07-02",
							invoiceType: "Manual",
							buildingName: "Building A",
							ownerName: "Mr. Rahim",
							serviceItems: ["Water"],
							invoiceNo: "INV-00002",
							status: "Paid",
						},
						{
							id: 3,
							invoiceDate: "2025-07-03",
							invoiceType: "Manual",
							buildingName: "Building B",
							ownerName: "Mr. Hossain",
							serviceItems: ["Garbage", "Gas", "Security"],
							invoiceNo: "INV-00003",
							status: "Unpaid",
						},

						{
							id: 3,
							invoiceDate: "2025-07-03",
							invoiceType: "Auto Prepare",
							buildingName: "Building B",
							ownerName: "Mr. Asnot Ali",
							serviceItems: ["Service Charge"],
							invoiceNo: "INV-00003",
							status: "Paid",
						},
					]}
					// loading={isLoading || isFetching}
					pagination={{
						...generatePagination(
							Number(data?.total),
							setPagination,
							pagination
						),
						current: Number(page),
						showSizeChanger: true,
						defaultPageSize: limit ? Number(limit) : 100,
						pageSizeOptions: ["50", "100", "200", "300", "400", "500"],
						total: data ? Number(data?.total) : 0,
						showTotal: (total) => `Total ${total} `,
					}}
					scroll={{ x: true }}
					onChange={(pagination) => {
						setSearchParams({
							...valuesWithData,
							limit: pagination.pageSize,
							skip: String(Number((pagination.current || 1) - 1)),
						});
						setFilter({
							...filter,
							skip:
								((pagination.current || 1) - 1) * (pagination.pageSize || 100),
							limit: pagination.pageSize!,
						});
					}}
				/>
			</Card>
		</>
	);
};

export default ViewInvoiceList;
