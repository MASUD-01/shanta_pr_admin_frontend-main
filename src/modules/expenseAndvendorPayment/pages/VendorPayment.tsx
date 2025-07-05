import React, { useState } from "react";
import {
	Form,
	Input,
	Select,
	InputNumber,
	Button,
	DatePicker,
	Typography,
	Row,
	Col,
	Tag,
	Space,
	Table,
} from "antd";

const { Title } = Typography;
const { Option } = Select;

const VendorPayment: React.FC = () => {
	const [form] = Form.useForm();

	const handleFinish = (values: any) => {
		const taxAmount = (values.grossAmount * values.taxPercent) / 100;
		const netAmount = values.grossAmount - taxAmount;

		const payload = {
			...values,
			taxAmount,
			netAmount,
		};

		console.log("📦 Vendor Payment Submitted:", payload);
	};

	return (
		<div
			style={{
				maxWidth: 900,
				margin: "0 auto",
				padding: 24,
				background: "#fff",
			}}
		>
			<Title level={4}>🧾 Vendor Payment & Tax Deduction</Title>

			<Form layout="vertical" form={form} onFinish={handleFinish}>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item
							label="Vendor"
							name="vendor"
							rules={[{ required: true }]}
						>
							<Select placeholder="Select vendor">
								<Option value="Mr. Karim">Mr. Karim</Option>
								<Option value="Mr. Rahim">Mr. Rahim</Option>
							</Select>
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item
							label="Payment Date"
							name="paymentDate"
							rules={[{ required: true }]}
						>
							<DatePicker style={{ width: "100%" }} />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item
							label="Invoice No"
							name="invoiceNo"
							rules={[{ required: true }]}
						>
							<Input placeholder="Enter invoice number" />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item
							label="Gross Amount (৳)"
							name="grossAmount"
							rules={[{ required: true }]}
						>
							<InputNumber min={0} style={{ width: "100%" }} />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item label="Tax (%)" name="taxPercent" initialValue={10}>
							<InputNumber min={0} max={100} style={{ width: "100%" }} />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item
							label="Payment Method"
							name="paymentMethod"
							rules={[{ required: true }]}
						>
							<Select placeholder="Select method">
								<Option value="Cash">Cash</Option>
								<Option value="Bank Transfer">Bank Transfer</Option>
								<Option value="bKash">bKash</Option>
							</Select>
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item label="Bank Account" name="bankAccount">
							<Input placeholder="e.g., DBBL A/C 1234" />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item label="Transaction No" name="transactionNo">
							<Input placeholder="TRX ID or reference number" />
						</Form.Item>
					</Col>

					<Col span={24}>
						<Form.Item label="Remarks" name="remarks">
							<Input.TextArea rows={2} placeholder="Optional" />
						</Form.Item>
					</Col>

					<Col span={24}>
						<Button type="primary" htmlType="submit" block>
							Submit Payment
						</Button>
					</Col>
				</Row>
			</Form>


            <BankReconciliation/>
		</div>
	);
};

export default VendorPayment;

// 🧾 Example data
const softwarePayments = [
	{
		id: 1,
		date: "2025-07-01",
		amount: 5000,
		trxNo: "TRX-XYZ001",
		source: "Software",
	},
	{
		id: 2,
		date: "2025-07-02",
		amount: 2000,
		trxNo: "TXN-111",
		source: "Software",
	},
];

const bankTransactions = [
	{
		id: 101,
		date: "2025-07-01",
		amount: 5000,
		trxNo: "TRX-XYZ001",
		source: "Bank",
	},
	{
		id: 102,
		date: "2025-07-02",
		amount: 1900,
		trxNo: "TXN-111",
		source: "Bank",
	},
];

export const BankReconciliation: React.FC = () => {
	const [reconciled, setReconciled] = useState<number[]>([]);

	const handleReconcile = (trxNo: string) => {
		const match = bankTransactions.find((b) => b.trxNo === trxNo);
		if (match) {
			setReconciled((prev) => [...prev, match.id]);
		}
	};

	const mergedData = softwarePayments.map((s) => {
		const match = bankTransactions.find((b) => b.trxNo === s.trxNo);
		return {
			...s,
			match,
			status: match
				? match.amount === s.amount
					? "Matched"
					: "Amount Mismatch"
				: "Not Found",
		};
	});

	const columns = [
		{ title: "Date", dataIndex: "date" },
		{ title: "TRX No", dataIndex: "trxNo" },
		{ title: "Amount", dataIndex: "amount" },
		{
			title: "Status",
			dataIndex: "status",
			render: (status: string) => {
				let color = "default";
				if (status === "Matched") color = "green";
				else if (status === "Amount Mismatch") color = "orange";
				else if (status === "Not Found") color = "red";
				return <Tag color={color}>{status}</Tag>;
			},
		},
		{
			title: "Action",
			render: (_: any, record: any) => {
				if (record.status === "Matched") {
					return (
						<Button
							type="primary"
							disabled={reconciled.includes(record.match.id)}
							onClick={() => handleReconcile(record.trxNo)}
						>
							Mark Reconciled
						</Button>
					);
				}
				return null;
			},
		},
	];

	return (
		<div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
			<Title level={4}>🏦 Bank Reconciliation</Title>
			<Table
				columns={columns}
				dataSource={mergedData}
				rowKey="trxNo"
				pagination={false}
				bordered
			/>
		</div>
	);
};
