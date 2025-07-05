import { PrinterOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Table, Tooltip, Typography } from "antd";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { FcApprove } from "react-icons/fc";
import ApprovalPricingAndCostSheet from "./ApprovalPricingAndCostSheet";
import AssignToOthers from "../../homemake/AssignToOthers";
import { MdOutlineAssignmentInd } from "react-icons/md";
const { Text } = Typography;

const costingData = [
	{
		costing_name: "Utility Costs",
		services: [
			{
				vat: 10,
				product_actual_total: 100,
				product_total: 100,
				service: 4,
				service_name: "Cleaning",
				unit_price: 100,
			},
			{
				vat: 0,
				product_actual_total: 900,
				product_total: 900,
				service: 1,
				service_name: "Painting",
				unit_price: 150,
				quantity: 6,
			},
		],
	},
	{
		costing_name: "Monthly Operating Costs",
		services: [
			{
				vat: 0,
				product_actual_total: 250,
				product_total: 250,
				service: 3,
				service_name: "Maintenance",
				unit_price: 250,
			},
			{
				vat: 0,
				product_actual_total: 150,
				product_total: 150,
				service: 2,
				service_name: "Plumbing",
				unit_price: 150,
			},
		],
	},
];

const ViewCostSheetPage = () => {
	const componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: `COSTING`,
		removeAfterPrint: true,
	});
	const dispatch = useDispatch();
	const showModal = () => {
		dispatch(
			setCommonModal({
				title: "Pricing & CostSheet Approval Process",
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
		<div style={{ padding: "24px" }}>
			<Row justify={"space-between"} gutter={[10, 0]} style={{ marginBottom: "10PX" }}>
				<Col>
					<Tooltip title="Assigning for checking">
						<Button
							onClick={showModal1}
							type="primary"
							icon={<MdOutlineAssignmentInd style={{ fontSize: "20px" }} />}
						>
							Assign To
						</Button>
					</Tooltip>
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

			<Card
				size="small"
				title="Building Name : Shapno Bilash"
				ref={componentRef}
			>
				<Row gutter={[16, 16]}>
					{costingData.map((section, index) => {
						const columns = [
							{
								title: "Service Name",
								dataIndex: "service_name",
								key: "service_name",
							},
							{
								title: "Service ID",
								dataIndex: "service",
								key: "service",
							},
							{
								title: "Unit Price",
								dataIndex: "unit_price",
								key: "unit_price",
							},
							{
								title: "Quantity",
								dataIndex: "quantity",
								key: "quantity",
								render: (value: number) => value || 1,
							},

							{
								title: "VAT",
								dataIndex: "vat",
								key: "vat",
							},
							{
								title: "Sub Total",
								dataIndex: "product_actual_total",
								key: "product_actual_total",
							},
							{
								title: "Total",
								dataIndex: "product_total",
								key: "product_total",
								render: (text: number) => (
									<Text strong style={{ color: "#1677ff" }}>
										{text}
									</Text>
								),
							},
						];

						const totalAmount = section.services.reduce(
							(acc, item) => acc + Number(item.product_total || 0),
							0
						);

						return (
							<Col xs={24} key={index}>
								<Card
									title={section.costing_name}
									bordered
									style={{ borderRadius: 8 }}
									headStyle={{ backgroundColor: "#fafafa", fontWeight: "bold" }}
								>
									<Table
										columns={columns}
										dataSource={section.services.map((s, i) => ({
											key: i,
											...s,
										}))}
										pagination={false}
										bordered
										size="small"
										summary={() => (
											<Table.Summary.Row>
												<Table.Summary.Cell index={1} colSpan={6} align="right">
													<Text strong>Total</Text>
												</Table.Summary.Cell>
												<Table.Summary.Cell index={1}>
													<Text strong style={{ color: "#fa541c" }}>
														{totalAmount}
													</Text>
												</Table.Summary.Cell>
											</Table.Summary.Row>
										)}
									/>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Card>
		</div>
	);
};

export default ViewCostSheetPage;
