import React, { useState } from "react";
import {
	Typography,
	Select,
	Button,
	Table,
	Divider,
	Input,
	Row,
	Col,
	Switch,
	Space,
	message,
} from "antd";
import {
	MailOutlined,
	WhatsAppOutlined,
	MobileOutlined,
	SendOutlined,
} from "@ant-design/icons";
import OwnerMultiSelect from "../../homemake/OwnerMultiSelect";

const { Title, Text } = Typography;
const { Option } = Select;

const owners = [
	{ id: 1, name: "Mr. Karim", flat: "A-1", contact: "017XXXXXXXX" },
	{ id: 2, name: "Mr. Rahim", flat: "A-7", contact: "018XXXXXXXX" },
];

const invoiceItems = [
	{ key: 1, service: "Utility Charges", amount: 1200 },
	{ key: 2, service: "Water Bill", amount: 300 },
	{ key: 3, service: "Garbage Collection", amount: 200 },
];

const SendInvoiceToOwner: React.FC = () => {
	const [ownerId, setOwnerId] = useState<number | null>(null);
	const [splitFormat, setSplitFormat] = useState(false);
	const [paymentUrl, setPaymentUrl] = useState<string>(
		"https://pay.example.com/txn/123456"
	);

	const selectedOwner = owners.find((o) => o.id === ownerId);
	const total = invoiceItems.reduce((sum, item) => sum + item.amount, 0);

	const handleSend = (method: "email" | "sms" | "whatsapp") => {
		if (!ownerId) {
			message.warning("Please select an owner first.");
			return;
		}

		message.success(`Invoice sent via ${method.toUpperCase()}`);
		console.log("Sending invoice:", {
			owner: selectedOwner,
			items: invoiceItems,
			paymentUrl,
			splitFormat,
			method,
		});
	};

	return (
		<div
			style={{
				padding: 32,
				maxWidth: 900,
				margin: "0 auto",
				background: "#fff",
			}}
		>
			<Title level={4}>📤 Send Invoice to Owner</Title>

			{/* Form */}
			<Row gutter={24} style={{ marginBottom: 24 }} justify={"space-between"}>
				<Col span={8}>
					<OwnerMultiSelect
						formItemProps={{
							layout: "vertical",
							label: <Text strong>Select Owner</Text>,
                            rules:[{
                                required:true
                            }]
						}}
						selectFieldProps={{
							value: ownerId ?? undefined,
							onChange: setOwnerId,
						}}
					/>
				</Col>

				<Col span={8}>
					<Text strong>Payment Link:</Text>
					<Input
						placeholder="https://payment.link"
						value={paymentUrl}
						onChange={(e) => setPaymentUrl(e.target.value)}
					/>
				</Col>
			</Row>

			<Divider />

			{/* Invoice Preview */}
			<Title level={5}>🧾 Invoice Preview</Title>
			<Table
				dataSource={invoiceItems}
				columns={[
					{ title: "SL", dataIndex: "key", width: 60 },
					{ title: "Service Item", dataIndex: "service" },
					{
						title: "Amount (৳)",
						dataIndex: "amount",
						render: (amt) => `৳ ${amt.toFixed(2)}`,
						align: "right" as const,
					},
				]}
				pagination={false}
				bordered
				style={{ marginBottom: 16 }}
			/>

			<div style={{ textAlign: "right", fontSize: 16 }}>
				<Text strong>Total: ৳ {total.toFixed(2)}</Text>
			</div>

			<Divider />

			{/* Send Buttons */}
			<div style={{ textAlign: "center", marginTop: 24 }}>
				<Space>
					<Button
						icon={<MailOutlined />}
						type="primary"
						onClick={() => handleSend("email")}
					>
						Send Email
					</Button>
					<Button icon={<MobileOutlined />} onClick={() => handleSend("sms")}>
						Send SMS
					</Button>
					<Button
						icon={<WhatsAppOutlined />}
						type="dashed"
						onClick={() => handleSend("whatsapp")}
					>
						WhatsApp
					</Button>
					<Button
						icon={<SendOutlined />}
						onClick={() => handleSend("email")}
						type="default"
					>
						Simulate Send
					</Button>
				</Space>
			</div>
		</div>
	);
};

export default SendInvoiceToOwner;
