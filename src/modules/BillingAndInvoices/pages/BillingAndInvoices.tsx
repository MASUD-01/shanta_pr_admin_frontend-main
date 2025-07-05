import { Row, Col, Form, Card } from "antd";
import OwnerMultiSelect from "../../homemake/OwnerMultiSelect";
import Container from "../../../common/Container/Container";
import SubmitButton from "../../../common/submitButton/SubmitButton";
import CreateProject from "../../CreateProject/CreateProject";
import SelectCostingName from "../../Configuration/DefineCostListName/components/SelectCostingName";
import { DateInput } from "../../../common/fromItemCommon/SelectCustomField";

const BillingAndInvoices = () => {
	const [form] = Form.useForm();
	const onFinish = async (values: Record<string, any>) => {
		console.log(values, "--------------");
	};
	return (
		<>
			<Container>
				<Card styles={{ body: { paddingTop: 0 } }}>
					<Form layout="vertical" form={form} onFinish={onFinish}>
						<Card
							size="small"
							className="border"
							style={{ marginBottom: "1rem", marginTop: "1rem" }}
						>
							<Row gutter={10}>
								<Col xs={24} sm={12} md={6}>
									<DateInput
										label="Select Invoice Date"
										name="invoice_date"
										size={5}
										// defaultValue={dayjs()}

										required
									/>
								</Col>
							</Row>
							<Row gutter={10}>
								<Col xs={24} sm={12} md={6}>
									<CreateProject
										formItemProps={{ label: "Select Building" }}
										selectFieldProps={{
											placeholder: "select building",
											allowClear: true,
										}}
									/>
								</Col>
								<Col xs={24} sm={12} md={6}>
									<OwnerMultiSelect
										form={form}
										formItemProps={{
											name: "owners",
											label: "Select Owners",
											rules: [
												{
													required: true,
												},
											],
										}}
										selectFieldProps={{ mode: "multiple" }}
									/>
								</Col>

								<Col xs={24} sm={12} md={6}>
									<SelectCostingName
										formItemProps={{
											name: "costing_name",
											label: "Select Costing",
										}}
										selectFieldProps={{
											mode: "multiple",
											placeholder: "Select costing",
											allowClear: true,
										}}
									/>
								</Col>
							</Row>
						</Card>
						<SubmitButton label="Create Invoice & Billing" htmlType="submit" />
					</Form>
				</Card>
			</Container>
		</>
	);
};

export default BillingAndInvoices;
