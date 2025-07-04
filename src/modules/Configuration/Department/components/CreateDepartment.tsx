/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Form, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useCreateDepartmentMutation } from "../api/departmentEndPoint";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../../app/slice/modalSlice";

const CreateDepartment = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [createDepartment, { isLoading, isSuccess }] =
    useCreateDepartmentMutation();

  const onFinish = (values: any) => {
    const data = {
      // company_id: 1,
      name: values.name,
    };
    createDepartment({ data });
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
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Card
            className="border"
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <Row align={"middle"} gutter={[5, 16]}>
              <Col xs={24} sm={24} md={24}>
                <Form.Item
                  name="name"
                  rules={[{ required: true }]}
                  label="Department"
                  required
                >
                  <Input placeholder="Department" type="text" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Form.Item style={{ marginTop: "1rem" }}>
            <div style={{ textAlign: "end" }}>
              <Button
                htmlType="submit"
                type="primary"
                icon={<SendOutlined />}
                loading={isLoading}
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

export default CreateDepartment;
