/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import SubmitButton from "../../../../common/submitButton/SubmitButton";
import { ICreateService } from "../types/ClientCategoryTypes";
import { useCreateServiceMutation } from "../api/CreateServiceEndPoint";

const CreateServiceComponent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [CreateServiceComponent, { isLoading, isSuccess }] =
    useCreateServiceMutation();

  const onFinish = (values: ICreateService) => {
    const data = {
      category_name: values.category_name,
      prefix: values.prefix,
      prefix_start: values.prefix_start,
    };
    CreateServiceComponent({ data });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess, form]);
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Card
        className="border"
        style={{
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      >
        <Row align={"middle"} gutter={[5, 16]}>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="category_name"
              rules={[{ required: true }]}
              label="Service Name"
              required
            >
              <Input placeholder="Service Name" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="price"
              rules={[{ required: true }]}
              label="Price"
              required
            >
              <Input placeholder="price" type="text" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Form.Item style={{ marginTop: "1rem" }}>
        <div style={{ textAlign: "end" }}>
          <SubmitButton loading={isLoading} label="Create" />
        </div>
      </Form.Item>
    </Form>
  );
};

export default CreateServiceComponent;
