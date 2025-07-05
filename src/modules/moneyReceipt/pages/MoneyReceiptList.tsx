/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Card,
	Row,
	Table,
	Col,
	DatePicker,
	theme,
	Input,
	Form,
	Typography,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { MoneyReceiptTableColumns } from "../utils/MoneyReceiptTableColumns";
import { useGetMoneyReceiptQuery } from "../api/moneyReceiptEndPoint";
import { IInvoiceFilter } from "../../invoice/types/invoiceTypes";
import { generatePagination } from "../../../common/TablePagination";
import { useSelector } from "react-redux";
import { globalTheme } from "../../../app/slice/themeSlice";
import { debounce } from "lodash";
import SetQueyInUrl from "../../../common/applayout/utils/SetQueyInUrl";
import { useForm } from "antd/es/form/Form";
import CommonAccountSelect from "../../accounts/components/CommonAccountSelect";

const MoneyReceiptList = () => {
	const { searchParams, setSearchParams } = SetQueyInUrl();
	const start_date = searchParams.get("start_date");
	const end_date = searchParams.get("end_date");
	const client_id = searchParams.get("client_id");
	const account_id = searchParams.get("account_id");
	const limit = searchParams.get("limit");
	const skip = searchParams.get("skip");
	const [form] = useForm();
	const themeGlobal = useSelector(globalTheme);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 100,
	});

	const page = searchParams.get("page") || "1";
	const pageSize = searchParams.get("pageSize") || "100";
	const skipValue = (Number(page) - 1) * Number(pageSize);

	const [filter, setFilter] = useState<any>({
		limit: Number(pageSize),
		skip: skipValue,
	});

	useEffect(() => {
		if (client_id) form.setFieldValue("client_id", Number(client_id));
		if (account_id) form.setFieldValue("account_id", Number(account_id));
	}, []);
	useEffect(() => {
		setFilter({
			limit: Number(pageSize),
			skip: skipValue,
		});
	}, [page, pageSize, skipValue]);

	const [filterItem, setFilterItem] = useState<IInvoiceFilter>({
		start_date: start_date ? start_date : dayjs().format("YYYY-MM-DD"),
		end_date: end_date ? end_date : dayjs().format("YYYY-MM-DD"),
		client_id: client_id ? Number(client_id) : 0,
		account_id: account_id ? Number(account_id) : 0,
		limit: limit ? Number(limit) : 100,
		skip: skip ? skip : "0",
	});

	const valuesWithData: any = {} as IInvoiceFilter;
	for (const key of Object.keys(filterItem) as (keyof IInvoiceFilter)[]) {
		if (filterItem.hasOwnProperty(key) && filterItem[key]) {
			valuesWithData[key] = filterItem[key];
		}
	}
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
	const { data, isLoading, isFetching } =
		useGetMoneyReceiptQuery(valuesWithData);

	const debouncesSetSearchValue = useMemo(
		() =>
			debounce((e: any) => {
				setFilterItem((prev) => ({
					...prev,
					money_receipt_no: e?.target?.value?.toUpperCase()?.trim(),
				}));
			}, 500),
		[]
	);
	return (
		<>
			<Card
				size="small"
				style={{
					borderTopRightRadius: "7px",
					borderTopLeftRadius: "7px",
					// padding: '15px 24px',
					// backgroundColor:
					//   themeGlobal.theme === theme.defaultAlgorithm
					//     ? '#C3E6CB'
					//     : '#121212',
				}}
			>
				<Row align={"middle"}>
					<Col xs={24} sm={24} md={8} lg={6}>
						<Typography.Title level={5}>
							{`Money Receipt List`}
						</Typography.Title>
					</Col>
					<Col xs={24} sm={24} md={16} lg={18}>
						<Form form={form}>
							<Row
								gutter={[5, 5]}
								align={"middle"}
								justify={"end"}
								style={{ marginTop: "0px" }}
							>
								<Col xs={24} sm={24} md={12} lg={6}>
									<Input
										allowClear
										placeholder="Search by money receipt no"
										onChange={debouncesSetSearchValue}
									/>
								</Col>
								<CommonAccountSelect
									margin={"0px"}
									name={"account_id"}
									md={12}
									lg={6}
									onSelect={(value: any) =>
										setFilterItem({ ...filterItem, account_id: value })
									}
								/>

								<Col xs={24} sm={24} md={12} lg={6}>
									<DatePicker.RangePicker
										style={{ width: "100%" }}
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
					</Col>
				</Row>
			</Card>
			<Card>
				<>
					<Table
						// className={
						//   themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
						// }
						size="small"
						tableLayout="fixed"
						bordered
						// loading={isLoading || isFetching}
						dataSource={[
							{
								id: 1,
								money_receipt_no: "MR-001",
								payment_date: "2025-07-01",
								client_name: "Mr. Karim",
								client_id: 101,
								client_no: "C-001",
								account_name: "Utility Collection",
								payment_method: "Cash",

								paid_amount: "2200",
							},
							{
								id: 2,
								money_receipt_no: "MR-002",
								payment_date: "2025-07-02",
								client_name: "Mr. Rahim",
								client_id: 102,
								client_no: "C-002",
								account_name: "Service Charge",
								payment_method: "Bank",

								paid_amount: "1500",
							},
							{
								id: 3,
								money_receipt_no: "MR-003",
								payment_date: "2025-07-03",
								client_name: "Mr. Hossain",
								client_id: 103,
								client_no: "C-003",
								account_name: "Electricity",
								payment_method: "Mobile Banking",

								paid_amount: "1850",
							},
						]}
						columns={MoneyReceiptTableColumns()}
						pagination={{
							...generatePagination(
								Number(data?.total),
								setPagination,
								pagination
							),
							defaultPageSize: limit ? Number(limit) : 100,
							current: Number(page),
							showSizeChanger: true,
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
									((pagination.current || 1) - 1) *
									(pagination.pageSize || 100),
								limit: pagination.pageSize!,
							});
						}}
					/>
				</>
			</Card>
		</>
	);
};

export default MoneyReceiptList;
