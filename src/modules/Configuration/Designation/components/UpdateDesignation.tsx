import { Col, Row, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import SubmitButton from "../../../../common/submitButton/SubmitButton";
import { useUpdateDesignationMutation } from "../api/DesignationEndPoints";
import { IAllDesignation } from "../types/DesignationTypes";

const UpdateDesignation = ({ record }: { record: IAllDesignation }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [updateDesignation, { isLoading, isSuccess }] =
    useUpdateDesignationMutation();

  useEffect(() => {
    if (record) {
      form.setFieldValue("name", record.name);
    }
  }, [record, form]);

  const onFinish = (values: any) => {
    const data = {
      name: values.name,
    };
    updateDesignation({ id: record.id, data });
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
              <Input placeholder="Designation" type="text" />
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

export default UpdateDesignation;
