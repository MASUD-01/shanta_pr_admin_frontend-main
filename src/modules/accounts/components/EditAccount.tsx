import dayjs from "dayjs";
import { Form, Col, Input, Row, Select } from "antd";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import SubmitButton from "../../../common/submitButton/SubmitButton";
import { IAllAccount } from "../types/AccountTypes";
import { useDispatch } from "react-redux";
import { useUpdateAccountMutation } from "../api/AccountEndPoints";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { useWatch } from "antd/es/form/Form";

const EditAccount = ({ data }: { data: IAllAccount }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [UpdateAccount, { isLoading, isSuccess }] = useUpdateAccountMutation();
  // console.log("rrr", data);

  useEffect(() => {
    if (data) {
      form.setFieldValue("name", data?.name);
      form.setFieldValue("branch", data?.branch);
      form.setFieldValue("account_no", data?.account_no);
      form.setFieldValue("account_type", data?.account_type);
      form.setFieldValue("bank_name", data?.bank_name);
      form.setFieldValue("routing_no", data?.routing_no);
      form.setFieldValue("opening_balance", data?.balance);
      // form.setFieldValue("account_date", dayjs(data?.account_date));
    }
  }, [data, form]);
  const onFinish = (values: any) => {
    const SubmitData = {
      name: values.name,
      opening_balance: values.opening_balance,
      branch: values.branch,
      account_no: values.account_no,
      routing_no: values.routing_no,
      account_date: dayjs(values.account_date).format("YYYY-MM-DD"),
    };
    UpdateAccount({ id: data?.id, data: SubmitData });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess]);
  const accountType = useWatch("account_type", form);
  return (
    <>
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        style={{ paddingTop: "20px" }}
      >
        <Row gutter={[5, 0]}>
          <Col xs={24} md={24}>
            <Form.Item
              name="account_type"
              // rules={[{ required: true }]}
              label="Account Type"
            >
              <Select
                placeholder="Account type"
                options={[
                  { value: "Cash", label: "Cash" },
                  { value: "Bank", label: "Bank" },
                  { value: "Mobile banking", label: "Mobile banking" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item name="name" label="Account name">
              <Input placeholder="Account name" type="text" />
            </Form.Item>
          </Col>

          {accountType === "Bank" && (
            <>
              <Col xs={24} md={24}>
                <Form.Item name="account_no" label="Account number">
                  <Input placeholder="Account No" />
                </Form.Item>
              </Col>{" "}
              <Col xs={24} md={24}>
                <Form.Item name="bank_name" label="Bank name">
                  <Input placeholder="Bank name" type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24}>
                <Form.Item name="branch" label="Branch">
                  <Input placeholder="Branch" type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24}>
                <Form.Item name="routing_no" label="Routing no">
                  <Input placeholder="Routing no" type="text" />
                </Form.Item>
              </Col>
            </>
          )}

          {accountType === "Mobile banking" && (
            <Col xs={24} md={24}>
              <Form.Item name="account_no" label="Account number">
                <Input placeholder="Account No" type="number" />
              </Form.Item>
            </Col>
          )}

          {/* <Col xs={24} md={24}>
            <Form.Item
              name="opening_balance"
              // rules={[{ required: true }]}
              label="Current Last Balance"
            >
              <Input placeholder="Current Last Balance" type="number" />
            </Form.Item>
          </Col> */}
        </Row>
        <Form.Item style={{ marginTop: "1rem" }}>
          <div style={{ textAlign: "center" }}>
            <SubmitButton loading={isLoading} label="Update" />
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditAccount;
