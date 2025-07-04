import { Col, Row, Form, Input } from "antd";
import {
  IClientCategory,
  ICreateClientCategory,
} from "../types/ClientCategoryTypes";
import { useDispatch } from "react-redux";
import SubmitButton from "../../../../common/submitButton/SubmitButton";
import { useEffect } from "react";
import { useUpdateClientCategoryMutation } from "../api/ClientCategoryEndPoint";
import { setCommonModal } from "../../../../app/slice/modalSlice";

const UpdateClientCategory = ({ record }: { record: IClientCategory }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [updateClientCategory, { isLoading, isSuccess }] =
    useUpdateClientCategoryMutation();

  useEffect(() => {
    if (record) {
      form.setFieldValue("category_name", record.category_name);
      form.setFieldValue("prefix", record.prefix);
      form.setFieldValue("prefix_start", record.prefix_start);
    }
  }, [form, record]);

  const onFinish = (values: ICreateClientCategory) => {
    const data = {
      category_name: values.category_name,
      prefix: values.prefix,
      prefix_start: values.prefix_start,
    };
    updateClientCategory({ id: record.id, data });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess, form]);
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        style={{ paddingTop: "20px" }}
      >
        <Row align={"middle"} gutter={[0, 0]}>
          <Col xs={24} sm={24} md={24}>
            <Form.Item name="category_name" label="Category Name">
              <Input placeholder="Category Name" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item name="prefix" label="Prefix">
              <Input placeholder="Prefix" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item name="prefix_start" label="Prefix Start">
              <Input placeholder="Prefix Start" type="text" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: "1rem" }}>
          <div style={{ textAlign: "center" }}>
            <SubmitButton label="Update" loading={isLoading} />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateClientCategory;
