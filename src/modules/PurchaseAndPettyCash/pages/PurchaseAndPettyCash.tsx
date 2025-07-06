import React, { useState } from "react";
import { Table, Tag, Button, Space, Card, Row, Col, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import ApprovalPricingAndCostSheet from "../../invoice/pages/ApprovalPricingAndCostSheet";
import AssetManagementSystem from "./AssetManagementSystem";

type ExpenseType = "po" | "petty";
type Status = "pending" | "approved" | "rejected";
type ExpenseHead = "stationery" | "it_equipment" | "transport" | "maintenance";

interface ExpenseRecord {
	key: string;
	type: ExpenseType;
	head: ExpenseHead;
	amount: number;
	is_billable: boolean;
	status: Status;
	budget_ok: boolean;
	description: string;
}

const PurchaseAndPettyCash: React.FC = () => {
	const dispatch = useDispatch();
	const [filter, setFilter] = useState("");

	const dummyData: any = [
		{
			key: "1",
			type: "po",
			head: "it_equipment",
			amount: 2500,
			is_billable: true,
			status: "pending",
			budget_ok: true,
			description: "New mouse & keyboard for staff",
		},
		{
			key: "2",
			type: "petty",
			head: "transport",
			amount: 300,
			is_billable: true,
			status: "approved",
			budget_ok: true,
			description: "Urgent bike fuel reimbursement",
		},
	].filter((item) => (filter === "" ? item : item.type === filter));

	const showModal = () => {
		dispatch(
			setCommonModal({
				title: "Purchase Order / Petty Cash Approval Process",
				content: <ApprovalPricingAndCostSheet />,
				show: true,
				width: 700,
			})
		);
	};
	const columns: ColumnsType<ExpenseRecord> = [
		{
			title: "SL.",
			dataIndex: "",
			render: (__: any, _: any, index) => index + 1,
		},
		{
			title: "Type",
			dataIndex: "type",
			render: (type) => (type === "po" ? "Purchase Order" : "Petty Cash"),
		},
		{
			title: "Expense Head",
			dataIndex: "head",
			render: (head) =>
				head
					.split("_")
					.map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" "),
		},
		{
			title: "Amount (৳)",
			dataIndex: "amount",
		},
		{
			title: "Billable",
			dataIndex: "is_billable",
			render: (val) => (val ? <Tag color="blue">Yes</Tag> : <Tag>No</Tag>),
		},
		{
			title: "Budget Status",
			dataIndex: "budget_ok",
			render: (ok) => (
				<Tag color={ok ? "green" : "red"}>
					{ok ? "Within Budget" : "Over Budget"}
				</Tag>
			),
		},
		{
			title: "Status",
			dataIndex: "status",
			render: (status) => {
				return <Tag>{status.toUpperCase()}</Tag>;
			},
		},
		{
			title: "Actions",
			key: "actions",
			render: (_, record) => (
				<Space>
					{record.status === "pending" && (
						<>
							<Button type="primary" size="small" onClick={showModal}>
								Approve
							</Button>
						</>
					)}
				</Space>
			),
		},
	];

	return (
		<>

        <AssetManagementSystem/>
			<Card
				title={"Purchase Order Petty Cash List"}
				extra={
					<Row>
						<Col md={12}>
							<Select
								allowClear
								placeholder={"Filter..."}
								style={{ width: "250px" }}
								options={[
									{
										label: "Petty Cash",
										value: "petty",
									},
									{
										label: "Purchase Order",
										value: "po",
									},
								]}
								onChange={(e) => (e ? setFilter(e) : setFilter(""))}
							/>
						</Col>
					</Row>
				}
			>
				<Table
					columns={columns}
					dataSource={dummyData}
					bordered
					pagination={{ pageSize: 5 }}
				/>
			</Card>
		</>
	);
};

export default PurchaseAndPettyCash;
