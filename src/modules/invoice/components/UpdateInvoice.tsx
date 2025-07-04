/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import SubmitButton from "../../../common/submitButton/SubmitButton";
import {
  useGetSingleInvoiceQuery,
  useUpdateInvoicesMutation,
} from "../api/invoiceEndpoints";
import { IInvoice } from "../types/invoiceTypes";
import { Col, Row, Form, Input, Divider, Card, Typography } from "antd";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { useDispatch } from "react-redux";
import { DateInput } from "../../../common/fromItemCommon/SelectCustomField";
import dayjs from "dayjs";
import FormInput from "../../../common/Input/FormInput";
import DynamicForm from "./DynamicForm";
const UpdateInvoice = ({ record }: { record: IInvoice }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [productId, setProductId] = useState<number>(0);

  const { data: singleInvoice } = useGetSingleInvoiceQuery(record?.id);

  const [updateInvoices, { isSuccess, isLoading }] =
    useUpdateInvoicesMutation();

  useEffect(() => {
    if (singleInvoice?.data) {
      form.setFieldValue(
        "invoice_date",
        singleInvoice?.data?.invoice_date
          ? dayjs(singleInvoice?.data?.invoice_date)
          : dayjs()
      );
      form.setFieldValue(
        "due_date",
        singleInvoice?.data?.due_date
          ? dayjs(singleInvoice?.data?.due_date)
          : dayjs()
      );
      form.setFieldValue("discount", singleInvoice?.data?.discount);
      form.setFieldValue("vat", singleInvoice?.data?.vat);
      form.setFieldValue("note", singleInvoice?.data?.note || "");
      form.setFieldValue("remark", singleInvoice?.data?.remark || "");
    }
  }, [singleInvoice?.data, form]);

  const onFinish = (values: any) => {
    updateInvoices({
      id: Number(singleInvoice?.data?.id),
      data: {
        note: values?.note,
        remark: values?.remark,
        discount: values?.discount,
        vat: values?.vat,
        due_date: dayjs(values?.due_date).format("YYYY-DD-MM"),
        invoice_date: dayjs(values?.invoice_date).format("YYYY-DD-MM"),
        products: values?.invoiceItem?.map((item: any) => ({
          id: item.product_id,
          description: item.description || "",
          quantity: item.quantity,
          unit_price: item.unit_price,
        })),
      },
    });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [dispatch, isSuccess]);
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        style={{ paddingTop: "20px" }}
      >
        <Row align={"middle"} gutter={[5, 16]}>
          <Col xs={24} sm={24} md={6} lg={12}>
            <DateInput label="Invoice Date" name="invoice_date" size={5} />
          </Col>

          <Col xs={24} sm={24} md={6} lg={12}>
            <DateInput label="Due Date" name="due_date" size={5} />
          </Col>

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
            <Col xs={24} sm={24} md={6} lg={24}>
              <Form.List name="invoiceItem" initialValue={[{}]}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => {
                      return (
                        <div key={index}>
                          <DynamicForm
                            singleInvoice={singleInvoice}
                            field={field}
                            add={add}
                            remove={remove}
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
            </Col>
          </Card>

          <Col xs={24} sm={24} md={6} lg={12}>
            <FormInput
              label="Vat"
              name="vat"
              placeholder="Vat"
              size={24}
              numberType
            />
          </Col>
          <Col xs={24} sm={24} md={6} lg={12}>
            <FormInput
              label="Discount"
              name="discount"
              placeholder="Discount"
              size={24}
              numberType
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item label={"Remark"} name={"remark"}>
              <Input placeholder="Remark" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item name="note" label="Note">
              <Input.TextArea
                placeholder="Note"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: "1rem" }}>
          <div style={{ textAlign: "center" }}>
            <SubmitButton label="Update" loading={isLoading} />
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateInvoice;
