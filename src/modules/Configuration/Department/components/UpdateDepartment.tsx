import { Card, Col, Row, Form, Input, Button } from "antd";
import { IDepartment } from "../types/departmentTypes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { SendOutlined } from "@ant-design/icons";
import { useUpdateDepartmentMutation } from "../api/departmentEndPoint";
const UpdateDepartment = ({ record }: { record: IDepartment }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [UpdateDepartment, { isLoading, isSuccess }] =
    useUpdateDepartmentMutation();

  useEffect(() => {
    if (record) {
      form.setFieldValue("name", record.name);
    }
  }, [record, form]);
  const onFinish = (values: any) => {
    const data = {
      // company_id: 1,
      name: values.name,
    };
    UpdateDepartment({ id: record?.id, data });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess]);
  return (
    <div>
      {" "}
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
                  <Form.Item name="name" label="Department">
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
                  Update
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateDepartment;
