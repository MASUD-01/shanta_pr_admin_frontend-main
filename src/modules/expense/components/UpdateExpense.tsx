/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Form, DatePicker, Divider, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
// import { useWatch } from "antd/es/form/Form";
import SubmitButton from "../../../common/submitButton/SubmitButton";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCommonModal } from "../../../app/slice/modalSlice";
// import { useGetAllAccountQuery } from "../../accounts/api/AccountEndPoints";
import {
  // useGetExpenseQuery,
  useUpdateSingleExpenseMutation,
} from "../api/expenseEndPoint";
import dayjs from "dayjs";
import DynamicExpense from "./DynamicExpense";

const UpdateExpense = ({ record }: any) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        method: record?.method,
        note: record?.note,
        account_id: record?.account_id,
        expense_date: record?.date ? dayjs(record?.date) : dayjs(),
      });
    }
  }, [form, record]);

  const [productId, setProductId] = useState<number>(0);

  const [updateExpense, { isLoading, isSuccess }] =
    useUpdateSingleExpenseMutation();

  const onFinish = (values: any) => {
    const { expense_date, expenseItem, note, method } = values;
    // console.log(values);
    const SubmitData = {
      note,
      method,
      expense_date: expense_date
        ? dayjs(expense_date).format("YYYY-MM-DD")
        : dayjs(),
      expense_head_id: expenseItem[0]?.expense_head_id,
      expense_sub_head_id: expenseItem[0]?.expense_sub_head_id,
      amount: expenseItem[0]?.amount,
    };
    // console.log(SubmitData);
    updateExpense({ id: record.id, data: SubmitData });
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(setCommonModal());
    }
  }, [isSuccess]);

  return (
    <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{
            method: record?.method,
            note: record?.note,
            account_id: record?.account_id,
            expense_date: record?.date ? dayjs(record?.date) : dayjs(),
          }}
        >
          <Card
            className="border"
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <Row align={"middle"} gutter={[5, 16]}>
              <Col xs={24} sm={24} md={6} lg={24}>
                <Form.List name="expenseItem" initialValue={[{}]}>
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => {
                        return (
                          <div key={index}>
                            <DynamicExpense
                              field={field}
                              add={add}
                              remove={remove}
                              singleExpenseData={record}
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

              {/* <Col xs={24} sm={24} md={8}>
                <Form.Item label="Method" name="method">
                  <Select placeholder="Select Method" showSearch disabled>
                    <Select.Option key={1} value="Cash">
                      {"Cash"}
                    </Select.Option>
                    <Select.Option key={2} value="Bank">
                      {"Bank"}
                    </Select.Option>
                    <Select.Option key={3} value="Mobile Banking">
                      {"Mobile Banking"}
                    </Select.Option>
                    <Select.Option key={4} value="cheque">
                      {"Cheque"}
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={8} lg={8}>
                {payment_type === "Bank" ? (
                  <SearchAbleSelectInput
                    placeholder="Select account"
                    label="Select account"
                    name="account_id"
                    options={getOptions("Bank")}
                    onSelect={(value: any) =>
                      form.setFieldValue("account_id", value)
                    }
                  />
                ) : payment_type === "Cash" ? (
                  <SearchAbleSelectInput
                    placeholder="Select account"
                    label="Select account"
                    name="account_id"
                    options={getOptions("Cash")}
                    onSelect={(value: any) =>
                      form.setFieldValue("account_id", value)
                    }
                  />
                ) : payment_type === "Mobile Banking" ? (
                  <SearchAbleSelectInput
                    placeholder="Select account"
                    label="Select account"
                    name="account_id"
                    options={getOptions("Mobile banking")}
                    onSelect={(value: any) =>
                      form.setFieldValue("account_id", value)
                    }
                  />
                ) : (
                  <SearchAbleSelectInput
                    placeholder="Select account"
                    label="Select account"
                    name="account_id"
                    options={getOptions("Cheque")}
                    onSelect={(value: any) =>
                      form.setFieldValue("account_id", value)
                    }
                  />
                )}
              </Col>

              <>
                <Col xs={24} sm={24} md={8}>
                  <Form.Item name="available_balance" label="Available Balance">
                    <Input
                      placeholder="Available Balance"
                      type="number"
                      disabled
                    />
                  </Form.Item>
                </Col>
              </> */}

              {/* <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="amount"
                rules={[{ required: true, message: "Amount is required" }]}
                label="Amount"
                required
              >
                <InputNumber
                  placeholder="Amount"
                  type="number"
                  min={0}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{9})+(?!\d))/g, ",")
                  }
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            {method === "Cheque" && (
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  name="cheque_number"
                  label="Cheque Number"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Cheque Number" type="text" />
                </Form.Item>
              </Col>
            )} */}
              {/* <Col xs={24} sm={24} md={8}>
              <DateInput
                label="Date"
                name="date"
                placeholder="Date"
                required
              />
            </Col> */}
              <Col xs={24} sm={24} md={8} lg={8}>
                <Form.Item
                  name="method"
                  // rules={[
                  //   { required: true, message: "Payment Type is required" },
                  // ]}
                  label="Payment method"
                >
                  <Select
                    placeholder="Select payment method"
                    options={[
                      { value: "Cash", label: "Cash" },
                      { value: "Bank", label: "Bank" },
                      { value: "Cheque", label: "Cheque" },
                      { value: "Mobile Banking", label: "Mobile Banking" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  name="expense_date"
                  label="Date"
                  // rules={[{ required: true }]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24}>
                <Form.Item name="note" label="Note">
                  <TextArea rows={3} placeholder="Note" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Form.Item style={{ marginTop: "1rem" }}>
            <div style={{ textAlign: "end" }}>
              <SubmitButton loading={isLoading} label="Update" />
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default UpdateExpense;
