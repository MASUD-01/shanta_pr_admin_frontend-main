import { Button, Card, Col, Divider, Form, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import SubmitButton from "../../../common/submitButton/SubmitButton";
import Container from "../../../common/Container/Container";
import CreateProject from "../../CreateProject/CreateProject";
import PricingCoastDynamicForm from "./PricingCoastDynamicForm";
import { DateInput } from "../../../common/fromItemCommon/SelectCustomField";
import SelectCostingName from "../../Configuration/DefineCostListName/components/SelectCostingName";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import SelectFlatField from "../../homemake/SelectFlatField";

const CreatePurchaseForm = () => {
	const [form] = Form.useForm();

	/* Form calculation */
	const productItem = Form.useWatch(["pricingandcost"], form);
	// const wholeSubTotal = useMemo(() => {
	//   return (
	//     (productItem || []).reduce(
	//       (acc: any, curr: any) => acc + curr?.product_actual_total,
	//       0
	//     ) || 0
	//   );
	// }, [productItem]);
	const wholeVatTotal = useMemo(() => {
		return (productItem || [])?.reduce((acc: number, curr: any) => {
			if (curr?.vat_type === "fixed") {
				return acc + (curr?.vat || 0);
			} else if (curr?.vat_type === "percentage") {
				const vat =
					((curr?.product_actual_total || 0) * (curr?.vat || 0)) / 100;
				return acc + vat;
			}
			return acc;
		}, 0);
	}, [productItem]);

	const netTotal = useMemo(() => {
		return (
			(productItem || []).reduce(
				(acc: any, curr: any) => acc + curr?.product_total,
				0
			) || 0
		);
	}, [productItem]);

	const grossTotal = netTotal;

	useEffect(() => {
		if (grossTotal) {
			form.validateFields();
		}
	}, [form, grossTotal]);

	const onFinish = async (values: Record<string, any>) => {
		console.log(values, "--------------");
		values.date = dayjs(values?.date).format("YYYY-MM-DD");
	};
	return (
		<Container>
			{/* <Test /> */}
			<Card styles={{ body: { paddingTop: 0 } }}>
				<Form layout="vertical" form={form} onFinish={onFinish}>
					<Card
						size="small"
						className="border"
						style={{ marginBottom: "1rem", marginTop: "1rem" }}
						//   styles={{ body: { padding: 0 } }}
					>
						<Row gutter={[12, 12]}>
							<Divider style={{ margin: 0, fontWeight: "bold" }}>
								New Pricing & Cost sheet Info
							</Divider>
							<Col xs={24}>
								<Row gutter={[10, 0]}>
									<Col xs={24} sm={24} md={6} lg={6}>
										<CreateProject />
									</Col>

									<Col xs={24} sm={24} md={6} lg={6}>
										<DateInput
											label="Select Date"
											name="invoice_date"
											size={5}
											// defaultValue={dayjs()}
										/>
									</Col>
								</Row>
							</Col>

							<Col xs={24} sm={24} md={24} lg={24}>
								<div>
									<Form.List
										name="pricingandcost"
										initialValue={[{ costing_name: undefined, services: [{}] }]}
									>
										{(fields, { add, remove }) => (
											<div>
												{fields.map((field) => {
													return (
														<div
															style={{
																border: "1px solid #c1bebe",
																background: "#e1e1e1",
																borderRadius: "5px",
																margin: "10px",
																padding: "10px",
															}}
														>
															<Row>
																<Col>
																	{" "}
																	<SelectCostingName
																		formItemProps={{
																			name: [field.name, "costing_name"],
																		}}

																		
																	/>
																</Col>
																<Col>
																	{" "}
																	<SelectFlatField
																		name={[field.name, "flat_name"]}
																	/>
																</Col>
															</Row>

															<Form.List
																name={[field.name, "services"]}
																// initialValue={[{ services: [{}] }]}
															>
																{(
																	serviceFields,
																	{ add: addService, remove: removeService }
																) => (
																	<>
																		{serviceFields?.map(
																			(
																				serviceField,
																				serviceIndex,
																				serviceArr
																			) => (
																				<PricingCoastDynamicForm
																					outerIndex={field.name}
																					index={serviceIndex}
																					arr={serviceArr?.length}
																					add={addService}
																					remove={removeService}
																					field={serviceField}
																					form={form}
																					wholeVatTotal={wholeVatTotal}
																				/>
																			)
																		)}
																	</>
																)}
															</Form.List>

															<Button
																danger
																type="text"
																onClick={() => remove(field.name)}
																icon={<MinusCircleOutlined />}
															>
																Remove Pricing & Costing
															</Button>
														</div>
													);
												})}

												<Form.Item>
													<Button
														type="dashed"
														onClick={() =>
															add({ costing_name: undefined, services: [{}] })
														}
														block
														icon={<PlusOutlined />}
													>
														Add New Pricing & Costing
													</Button>
												</Form.Item>
											</div>
										)}
									</Form.List>
								</div>
							</Col>

							{/* 
              <Col xs={24} sm={24} md={24} lg={10}>
                <Card>
                  <Descriptions
                    column={1}
                    size='small'
                    bordered
                    items={[
                      {
                        key: '1',
                        label: 'Sub Total',
                        children: wholeSubTotal,
                      },

                      {
                        key: '3',
                        label: 'Net Total',
                        children: netTotal,
                        style: { fontWeight: 'bold' },
                      },

                      {
                        key: '5',
                        label: 'Vat (+)',
                        children: wholeVatTotal,
                      },

                      {
                        key: '8',
                        label: 'Gross Total',
                        children: grossTotal?.toFixed(2),
                        style: { fontWeight: 'bold' },
                      },
                    ]}
                  />
                </Card>
              </Col> */}
						</Row>
					</Card>
					<SubmitButton label="Submit" htmlType="submit" />
				</Form>
			</Card>
		</Container>
	);
};

export default CreatePurchaseForm;
