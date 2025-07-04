import { Col, Row, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { ICreateSource } from "../types/SourceTypes";
import SubmitButton from "../../../../common/submitButton/SubmitButton";
import { useCreateSourceMutation } from "../api/sourceEndPoint";

const CreateSource = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [createSource, { isLoading, isSuccess }] = useCreateSourceMutation();
  const onFinish = (values: ICreateSource) => {
    const data = {
      name: values.name,
    };
    createSource({ data });
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(setCommonModal());
    }
  }, [isSuccess, form, dispatch]);
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ paddingTop: "20px" }}
    >
      {" "}
      <Row align={"middle"} gutter={[5, 16]}>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            name="name"
            rules={[{ required: true }]}
            label="Name"
            required
          >
            <Input placeholder="Source" type="text" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item style={{ marginTop: "1rem" }}>
        <div style={{ textAlign: "center" }}>
          <SubmitButton loading={isLoading} label="Add" />
        </div>
      </Form.Item>
    </Form>
  );
};

export default CreateSource;
