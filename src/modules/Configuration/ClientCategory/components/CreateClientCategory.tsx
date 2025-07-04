/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { useCreateClientCategoryMutation } from "../api/ClientCategoryEndPoint";
import { ICreateClientCategory } from "../types/ClientCategoryTypes";
import SubmitButton from "../../../../common/submitButton/SubmitButton";

const CreateClientCategory = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [createClientCategory, { isLoading, isSuccess }] =
    useCreateClientCategoryMutation();

  const onFinish = (values: ICreateClientCategory) => {
    const data = {
      category_name: values.category_name,
      prefix: values.prefix,
      prefix_start: values.prefix_start,
    };
    createClientCategory({ data });
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
              label="Category Name"
              required
            >
              <Input placeholder="Category Name" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="prefix"
              rules={[{ required: true }]}
              label="Prefix"
              required
            >
              <Input placeholder="Prefix" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="prefix_start"
              rules={[{ required: true }]}
              label="Prefix Start"
              required
            >
              <Input placeholder="Prefix Start" type="number" />
            </Form.Item>
          </Col>
          {/* <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="prefix_start"
              rules={[{ required: true }]}
              label="Prefix Start"
              required
            >
              <Input placeholder="Department" type="text" />
            </Form.Item>
          </Col> */}
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

export default CreateClientCategory;
