/* eslint-disable @typescript-eslint/no-unused-vars */
import { SendOutlined } from "@ant-design/icons";
import { Form, Button, Card, Col, Input, Row } from "antd";
import {
  SelectAccountGroup,
  SelectAccountHead,
} from "../../../common/fromItemCommon/SelectCustomField";
import TextArea from "antd/es/input/TextArea";
import { useCreateAccountHeadMutation } from "../api/AccountEndPoints";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCommonModal } from "../../../app/slice/modalSlice";
import Swal from "sweetalert2";
import { ICreateAccount } from "../types/AccountTypes";

const CreateAccountHead = () => {
  const [form] = Form.useForm();
  const [createAccountHead, { isLoading, isSuccess }] =
    useCreateAccountHeadMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(setCommonModal());
      Swal.fire({
        title: "Successfully Created",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [isSuccess]);

  const onFinish = async (values: ICreateAccount) => {
    try {
      // Filter out undefined values
      const payload: Partial<ICreateAccount> = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v !== undefined)
      );

      await createAccountHead(payload);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <Card
            className="border"
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            {" "}
            <Row align={"middle"} gutter={[5, 16]}>
              <Col xs={24} sm={24} md={8}>
                <SelectAccountGroup
                  required
                  label="Select Group"
                  name={"group_id"}
                />
              </Col>
              <Col xs={24} sm={24} md={8}>
                <SelectAccountHead label="Select Parent" name={"parent_head"} />
              </Col>

              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  name="name"
                  rules={[{ required: true }]}
                  label="Name"
                  required
                >
                  <Input placeholder="Name" type="text" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24}>
                <Form.Item name="description" label="Description">
                  <TextArea rows={3} placeholder="Description" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Form.Item style={{ marginTop: "1rem" }}>
            <div style={{ textAlign: "end" }}>
              <Button
                loading={isLoading}
                htmlType="submit"
                type="primary"
                icon={<SendOutlined />}
              >
                Create
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateAccountHead;
