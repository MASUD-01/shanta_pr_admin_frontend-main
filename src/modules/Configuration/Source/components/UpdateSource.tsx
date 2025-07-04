import { Col, Row, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { IAllSource } from "../types/SourceTypes";
import SubmitButton from "../../../../common/submitButton/SubmitButton";
import { useUpdateSourceMutation } from "../api/sourceEndPoint";

const UpdateSource = ({ record }: { record: IAllSource }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [updateSource, { isLoading, isSuccess }] = useUpdateSourceMutation();

  useEffect(() => {
    if (record) {
      form.setFieldValue("name", record.name);
    }
  }, [record, form]);

  const onFinish = (values: any) => {
    const data = {
      name: values.name,
    };
    updateSource({ id: record.id, data });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess, form, dispatch]);
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ paddingTop: "20px" }}
      >
        {" "}
        <Row align={"middle"} gutter={[5, 16]}>
          <Col xs={24} sm={24} md={24}>
            <Form.Item name="name" label="Name">
              <Input placeholder="Source" type="text" />
            </Form.Item>
          </Col>
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

export default UpdateSource;
