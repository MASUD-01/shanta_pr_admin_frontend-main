import GlobalLoader from "../../../app/utils/GlobalLoader";
import { Form, Row, Col, Card, Typography, Divider, Space, Input } from "antd";
import dayjs from "dayjs";
import { SearchAbleSelectInput } from "../../../common/Input/SearchAbleSelectInput";
import { useGetClientQuery } from "../../Client/api/ClientEndPoint";
import { DateInput } from "../../../common/fromItemCommon/SelectCustomField";
import DynamicForm from "../../invoice/components/DynamicForm";
import FormInput from "../../../common/Input/FormInput";
import { useEffect, useState } from "react";
import { useWatch } from "antd/es/form/Form";
import SubmitButton from "../../../common/submitButton/SubmitButton";
import {
  useGetSingleQuotationQuery,
  useUpdateQuotationMutation,
} from "../api/quotationEndPoint";
import { ISingleQuotation } from "../types/quotationTypes";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";

const UpdateQuotation = ({ quotationID }: { quotationID: number }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [productId, setProductId] = useState<number>(0);
  const { data, isLoading } = useGetSingleQuotationQuery(Number(quotationID));
  const singleQuotation = data?.data as ISingleQuotation;
  const { data: clients } = useGetClientQuery({});

  const [updateQuotation, { isSuccess, isLoading: submitLoading }] =
    useUpdateQuotationMutation();
  useEffect(() => {
    if (singleQuotation) {
      form.setFieldsValue({
        quotation_date: dayjs(singleQuotation?.quotation_date),
        discount: singleQuotation?.discount || 0,
        vat: singleQuotation?.vat || 0,
        remark: singleQuotation?.remark,
        note: singleQuotation?.note,
        client_id: singleQuotation?.client_id,
      });
      form.setFieldValue(
        "invoiceItem",
        singleQuotation?.quotation_items?.map((product) => {
          return {
            product_id: product.product_id,
            description: product.description,
            quantity: product.quantity,
            unit_price: product.unit_price,
          };
        })
      );
    }
  }, [singleQuotation, form]);

  const a = useWatch(["invoiceItem"], form);

  const discount = useWatch("discount", form);
  const vat = useWatch("vat", form);

  const totalPrice = a?.reduce((total: any, item: any) => {
    const quantity = item?.quantity ?? 0;
    const unitPrice = item?.unit_price ?? 0;
    return total + quantity * unitPrice;
  }, 0);

  let gTotal = totalPrice;

  useEffect(() => {
    // form.setFieldValue("total", Number(totalPrice));

    if (discount) {
      gTotal -= discount;
    }
    if (vat) {
      gTotal += vat;
    }

    // form.setFieldValue("grandTotal", gTotal);
  }, [form, discount, totalPrice, vat]);

  const onFinish = (values: any) => {
    const {
      client_id,
      vat,
      discount,
      invoiceItem,
      note,
      quotation_date,
      remark,
    } = values;

    // Constructing the desired JSON format
    const submitData: any = {
      client_id,
      quotation_date: dayjs(quotation_date).format("YYYY-MM-DD"),
      vat: vat ? vat : 0,
      discount: discount ? discount : 0,
      products: invoiceItem.map((item: any) => ({
        id: item.product_id,
        description: item.description,
        quantity: item.quantity,
        unit_price: Number(item.unit_price),
      })),
    };
    if (remark) {
      submitData.remark = remark;
    }
    if (note) {
      submitData.note = note;
    }

    updateQuotation({ id: singleQuotation.id, data: submitData });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess]);
  return (
    <>
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <>
          {" "}
          <Form onFinish={onFinish} layout="vertical" form={form}>
            <Card
              className="border"
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
            >
              <Row align={"middle"} gutter={[5, 16]}>
                <Col xs={24} sm={24} md={8} lg={5}>
                  <SearchAbleSelectInput
                    name="client_id"
                    label="Select Client"
                    placeholder="Select client"
                    options={
                      clients?.data?.length
                        ? clients?.data?.map((client) => ({
                            value: client.id,
                            label: client.name,
                          }))
                        : []
                    }
                    rules={[{ required: true, message: "Client is required" }]}
                  />
                </Col>

                <Col xs={24} sm={24} md={6} lg={6}>
                  <DateInput
                    label="Quotation Date"
                    name="quotation_date"
                    size={5}
                  />
                </Col>
              </Row>
            </Card>
            <Card className="border">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <Typography.Title level={5}>Billing Info</Typography.Title>
              </div>
              <Form.List name="invoiceItem" initialValue={[{}]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => {
                      return (
                        <div key={index}>
                          <DynamicForm
                            field={field}
                            add={add}
                            remove={remove}
                            singleInvoice=""
                            // warehouse={warehouse}
                            setProductId={setProductId}
                            productId={productId}
                            form={form}
                          />
                          {fields.length > 1 && <Divider />}
                        </div>
                      );
                    })}
                  </>
                )}
              </Form.List>
            </Card>
            <Card
              className="border"
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
            >
              <Typography.Title style={{ marginBottom: "1rem" }} level={5}>
                Payment Information 💳
              </Typography.Title>
              <Row align={"middle"} gutter={[5, 16]}>
                <FormInput
                  label="Discount"
                  name="discount"
                  placeholder="Discount"
                  size={6}
                  numberType
                />
                <FormInput
                  label="Vat"
                  name="vat"
                  placeholder="Vat"
                  size={6}
                  numberType
                />
              </Row>
            </Card>

            <div>
              <Col xs={24} sm={24} md={12} lg={10}>
                <Form.Item label={"Remark"} name={"remark"}>
                  <Input.TextArea
                    placeholder="Remark"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </Col>
            </div>
            <div>
              <Col xs={24} sm={24} md={12} lg={10}>
                <Form.Item label={"Note"} name={"note"}>
                  <Input.TextArea
                    placeholder="Note"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </Col>
            </div>

            <Row gutter={[16, 16]} justify="end">
              <Col>
                <div
                  style={{
                    padding: "16px",
                  }}
                >
                  {" "}
                  <div style={{ textAlign: "right" }}>
                    <Space align="start">
                      <Typography.Text strong>Sub Total :</Typography.Text>
                      <Typography.Text style={{ textAlign: "left" }}>
                        {totalPrice}
                      </Typography.Text>
                    </Space>
                  </div>
                  <div style={{ textAlign: "right", padding: "7px 0px" }}>
                    <Space align="start">
                      <Typography.Text strong>(+ BDT) VAT :</Typography.Text>
                      <Typography.Text>{vat ? vat : 0}</Typography.Text>
                    </Space>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Space align="start">
                      <Typography.Text strong> Grand Total :</Typography.Text>
                      <Typography.Text>
                        {totalPrice + Number(vat)}
                      </Typography.Text>
                    </Space>
                  </div>
                  <div style={{ textAlign: "right", padding: "7px 0px" }}>
                    <Space align="start">
                      <Typography.Text strong>
                        (- BDT) Discount :
                      </Typography.Text>
                      <Typography.Text>
                        {discount ? discount : 0}
                      </Typography.Text>
                    </Space>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Space align="start">
                      <Typography.Text strong> Net Total :</Typography.Text>
                      <Typography.Text>
                        {totalPrice + Number(vat) - Number(discount)}
                      </Typography.Text>
                    </Space>
                  </div>
                  {/* <div style={{ textAlign: "right", padding: "7px 0px" }}>
                  <Space align="start">
                    <Typography.Text strong style={{ color: "red" }}>
                      Previous Due :
                    </Typography.Text>
                    <Typography.Text style={{ color: "red" }}>
                      {findClient?.due ? findClient?.due : 0}
                    </Typography.Text>
                  </Space>
                </div> */}
                  <Divider />
                  <div style={{ textAlign: "right" }}>
                    <Space align="start">
                      <Typography.Text
                        style={{ fontWeight: "bold", color: "red" }}
                      >
                        Due :
                      </Typography.Text>
                      <Typography.Text
                        style={{ fontWeight: "bold", color: "red" }}
                      >
                        {totalPrice + Number(vat) - Number(discount)}
                      </Typography.Text>
                    </Space>
                  </div>
                </div>
              </Col>
            </Row>

            <SubmitButton label="Update Quotation" loading={submitLoading} />
          </Form>
        </>
      )}
    </>
  );
};

export default UpdateQuotation;
