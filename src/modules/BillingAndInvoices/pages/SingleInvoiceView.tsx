import React, { useRef } from "react";
import {
	Button,
	Table,
	Typography,
	Descriptions,
	Divider,
	Row,
	Col,
	Tooltip,
} from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import ApprovalPricingAndCostSheet from "../../invoice/pages/ApprovalPricingAndCostSheet";
import AssignToOthers from "../../homemake/AssignToOthers";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { FcApprove } from "react-icons/fc";
import { useReactToPrint } from "react-to-print";
import logo from "../../../../public/shantaLogo.png";
import { CustomLink } from "../../../common/CustomLink";
import { IoIosSend } from "react-icons/io";
import { useParams } from "react-router-dom";
const { Title, Text } = Typography;

// 🔧 Sample Invoice Data
const invoice = {
	id: 1,
	invoiceDate: "2025-07-01",
	invoiceType: "Auto Prepare",
	buildingName: "Building A",
	ownerName: "Mr. Karim",
	serviceItems: [
		{ name: "Utility", amount: 1200 },
		{ name: "Maintenance", amount: 800 },
	],
};

const SingleInvoiceView = () => {
	const { id } = useParams();
	const componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: `COSTING`,
		removeAfterPrint: true,
	});
	const total = invoice.serviceItems.reduce(
		(sum, item) => sum + item.amount,
		0
	);

	const columns = [
		{ title: "SL", dataIndex: "sl", key: "sl" },
		{ title: "Service Item", dataIndex: "name", key: "name" },
		{ title: "Amount (৳)", dataIndex: "amount", key: "amount" },
	];

	const dataSource = invoice.serviceItems.map((item, index) => ({
		key: index,
		sl: index + 1,
		...item,
	}));
	const dispatch = useDispatch();
	const showModal = () => {
		dispatch(
			setCommonModal({
				title: "Billing & Invoice Approval Process",
				content: <ApprovalPricingAndCostSheet />,
				show: true,
				width: 700,
			})
		);
	};

	const showModal1 = () => {
		dispatch(
			setCommonModal({
				title: "Assign To Other Person",
				content: <AssignToOthers />,
				show: true,
				width: 700,
			})
		);
	};
	return (
		<div style={{ marginBottom: "10px" }}>
			<div>
				<Row
					justify={"space-between"}
					gutter={[10, 0]}
					style={{ maxWidth: 800, margin: "0 auto" }}
				>
					<Col>
						<Row justify={"end"} gutter={5}>
							<Col>
								{" "}
								<Tooltip title="Assigning for checking">
									<Button
										onClick={showModal1}
										type="primary"
										icon={
											<MdOutlineAssignmentInd style={{ fontSize: "20px" }} />
										}
									>
										Assign To
									</Button>
								</Tooltip>
							</Col>
							<Col>
								<Tooltip title="Assigning for checking">
									<CustomLink to={`/billing-invoices/send-invoice/${id}`}>
										<Button type="primary" icon={<IoIosSend />}>
											Send Invoices
										</Button>
									</CustomLink>
								</Tooltip>
							</Col>
						</Row>
					</Col>
					<Col>
						<Row justify={"end"} gutter={5}>
						
							<Col>
								<Tooltip title="Approval Process">
									<Button
										onClick={showModal}
										type="primary"
										icon={<FcApprove style={{ fontSize: "20px" }} />}
									>
										Approval Process
									</Button>
								</Tooltip>
							</Col>
							<Col>
								<Tooltip title="Print Pricing&Costing">
									<Button
										onClick={handlePrint}
										type="primary"
										icon={<PrinterOutlined style={{ fontSize: "15px" }} />}
									>
										Print
									</Button>
								</Tooltip>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>

			{/* Invoice Content */}
			<div
				// style={{ padding: 48, maxWidth: 800, margin: "0 auto" }}

				style={{
					padding: 48,
					maxWidth: 800,
					margin: "10px auto",
					backgroundColor: "white",
					minHeight: "100vh",
					paddingTop: 60,
				}}
				id="invoice-area"
				ref={componentRef}
			>
				<div style={{ textAlign: "center", marginBottom: 32 }}>
					{/* <img src={logo} alt="Company Logo" style={{ height: 60 }} /> */}
					<Title level={2} style={{ marginBottom: 0 }}>
						Invoice
					</Title>
				</div>

				<Row gutter={32} style={{ marginBottom: 24 }}>
					<Col span={12}>
						<Text strong>Invoice No:</Text> INV-{invoice.id} <br />
						<Text strong>Date:</Text> {invoice.invoiceDate} <br />
						<Text strong>Type:</Text> {invoice.invoiceType}
					</Col>
					<Col span={12} style={{ textAlign: "end" }}>
						<Text strong>Building Name:</Text> {invoice.buildingName} <br />
						<Text strong>Owner Name:</Text> {invoice.ownerName}
					</Col>
				</Row>

				<Divider />

				<Table
					size="small"
					columns={columns}
					dataSource={dataSource}
					pagination={false}
					bordered
					style={{ marginBottom: 24 }}
				/>

				<div style={{ textAlign: "right", fontSize: 16, marginTop: 12 }}>
					<Text strong>Total Amount: ৳ {total.toFixed(2)}</Text>
				</div>

				<div
					style={{
						marginTop: 48,
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<div>
						<Text>Prepared By</Text>
						<Divider style={{ margin: "4px 0", width: 150 }} />
					</div>
					<div>
						<Text>Approved By</Text>
						<Divider style={{ margin: "4px 0", width: 150 }} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleInvoiceView;
