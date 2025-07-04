/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Col, Input, Row, Select } from "antd";
import { useCreateAccountMutation } from "../api/AccountEndPoints";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCommonModal } from "../../../app/slice/modalSlice";
import SubmitButton from "../../../common/submitButton/SubmitButton";
import { useWatch } from "antd/es/form/Form";

const CreateAccount = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [createAccount, { isLoading, isSuccess }] = useCreateAccountMutation();

  const onFinish = (values: any) => {
    const submitData: any = {};
    for (const key in values) {
      if (values[key]) {
        submitData[key] = values[key];
      }
    }

    createAccount(submitData);
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
      form.resetFields();
    }
  }, [isSuccess]);

  const accountType = useWatch("account_type", form);
  return (
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
            rules={[{ required: true }]}
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
          <Form.Item
            name="name"
            rules={[{ required: true }]}
            label="Account name"
          >
            <Input placeholder="Account name" type="text" />
          </Form.Item>
        </Col>

        {accountType === "Bank" && (
          <>
            <Col xs={24} md={24}>
              <Form.Item
                name="account_no"
                rules={[{ required: true }]}
                label="Account number"
              >
                <Input placeholder="Account No" />
              </Form.Item>
            </Col>{" "}
            <Col xs={24} md={24}>
              <Form.Item
                name="bank_name"
                rules={[{ required: true }]}
                label="Bank name"
              >
                <Input placeholder="Bank name" type="text" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item
                name="branch"
                rules={[{ required: true }]}
                label="Branch"
              >
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
            <Form.Item
              name="account_no"
              rules={[{ required: true }]}
              label="Account number"
            >
              <Input placeholder="Account number" />
            </Form.Item>
          </Col>
        )}

        <Col xs={24} md={24}>
          <Form.Item
            name="opening_balance"
            // rules={[{ required: true }]}
            label="Current Last Balance"
          >
            <Input placeholder="Current Last Balance" type="number" />
          </Form.Item>
        </Col>
        {/* <Col xs={24} md={24}>
          <Form.Item
            name="account_date"
            rules={[{ required: true }]}
            label="Date"
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col> */}
      </Row>
      <Form.Item style={{ marginTop: "1rem" }}>
        <div style={{ textAlign: "center" }}>
          <SubmitButton loading={isLoading} label="Create" />
        </div>
      </Form.Item>
    </Form>
  );
};

export default CreateAccount;
