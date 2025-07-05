import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleMoneyReceiptQuery } from "../api/moneyReceiptEndPoint";
import GlobalLoader from "../../../app/utils/GlobalLoader";
import MoneyReceiptCard from "../components/MoneyReceiptCard";
import { ISingleMoneyReceipt } from "../types/moneyReceiptTypes";
import { useReactToPrint } from "react-to-print";
import { Button, Checkbox, Col, Radio, Row, Tooltip } from "antd";
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import generatePDF from "react-to-pdf";
import MoneyReceiptsDisplay from "../../../common/printInvoice/MoneyReceiptsDisplay";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { FcApprove } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import ApprovalPricingAndCostSheet from "../../invoice/pages/ApprovalPricingAndCostSheet";
import AssignToOthers from "../../homemake/AssignToOthers";
import ReminderSettings from "../../homemake/ReminderSettings";

const MoneyReceiptDetails = () => {
	const { id } = useParams();
	// const { data, isLoading } = useGetSingleMoneyReceiptQuery(Number(id));
	const componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: `money_receipt`,
		removeAfterPrint: true,
	});
	const [value, setValue] = useState(1);
	const [checked, setChecked] = useState(false);

	const data = {
		id: 2529,
		money_receipt_no: "MR2025-1136",
		transaction_no: null,
		invoice_total: "20000.00",
		paid_amount: "20000.00",
		payment_method: "Cash",
		payment_date: "2025-06-27T00:00:00.000Z",
		discount: "0.00",
		created_at: "2025-06-27T14:28:36.142Z",
		note: null,
		bank_name: null,
		extra_charge: null,
		cheque_number: null,
		client_name: "masud1231",
		collected_by: "Masud",
		account_name: "masudCash",
		account_branch: null,
		account_no: null,
		created_by: "Demo Customer",
		invoices: [
			{
				id: 2742,
				invoice_no: "INV2025-1125",
				paid_amount: "20000.00",
			},
		],
	};

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
		<div>

  
			<div style={{ maxWidth: "1300px", margin: "0 auto" }}>
				<Row gutter={[10, 10]}>
					<Col xs={24} md={15} lg={15} xl={15} xxl={15}>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								maxWidth: "805px",
								margin: "0 auto",
							}}
						>
							<Row
								justify={"space-between"}
								gutter={[10, 0]}
								style={{ marginBottom: "10PX" }}
							>
								<Col>
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
									</Row>
								</Col>
							</Row>
							{/* <div>
                  <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  >
                    {checked ? 'Without Signature' : 'With Signature'}
                  </Checkbox>
                  <Radio.Group
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                  >
                    <Radio value={1}>Single Copy</Radio>
                    <Radio value={2}>Double Copy</Radio>
                  </Radio.Group>
                </div> */}

							<Row gutter={5}>
								<Col>
									<Tooltip title="Download Money Receipt">
										<Button
											onClick={() =>
												generatePDF(componentRef, {
													filename: `money_receipt.pdf`,
													canvas: {
														mimeType: "image/png",
														qualityRatio: 1,
														useCORS: true, // allows cross-origin images
													},
												})
											}
											type="primary"
											icon={
												<DownloadOutlined
													style={{ fontSize: "15px",  }}
												/>
											}
										>Download</Button>
									</Tooltip>
								</Col>

								<Col>
									<Tooltip title="Print money receipt">
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
						</div>
						<div ref={componentRef} className="a4sizeStyle1">
							{value === 1 ? (
								<MoneyReceiptCard
									singleData={data as ISingleMoneyReceipt}
									checked={checked}
								/>
							) : (
								<>
									<MoneyReceiptCard
										titleFor="Office Copy"
										singleData={data as ISingleMoneyReceipt}
										checked={checked}
									/>
									{/* <div style={{ border: '1px dashed gray' }}></div>
                    <MoneyReceiptCard
                      titleFor='Customer Copy'
                      singleData={data as ISingleMoneyReceipt}
                      checked={checked}
                    /> */}
								</>
							)}
						</div>
					</Col>
					{/* <Col xs={24} md={9} lg={9} xl={9} xxl={9}>
              <MoneyReceiptsDisplay
                createdBy={data?.created_by || ''}
                invoices={data?.invoices}
                invoiceOrMoney='money'
                created_at={data?.created_at || ''}
              />
            </Col> */}
				</Row>
			</div>
		</div>
	);
};

export default MoneyReceiptDetails;
