import { Col, Row, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import SubmitButton from "../../../../common/submitButton/SubmitButton";
import { useEffect } from "react";
import { useUpdateCreateServiceMutation } from "../api/CreateServiceEndPoint";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { ICreateService } from "../types/ClientCategoryTypes";

const UpdateCreateService = ({ record }: { record: ICreateService }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [UpdateCreateService, { isLoading, isSuccess }] =
    useUpdateCreateServiceMutation();

  useEffect(() => {
    if (record) {
      // form.setFieldValue("category_name", record.category_name);
      // form.setFieldValue("prefix", record.prefix);
      // form.setFieldValue("prefix_start", record.prefix_start);
    }
  }, [form, record]);

  const onFinish = (values: ICreateService) => {
    const data = {
      category_name: values.category_name,
      price: values.prefix,
      prefix_start: values.prefix_start,
    };
    UpdateCreateService({ id: record.id, data });
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
            <Form.Item name="category_name" label="Service Name">
              <Input placeholder="Category Name" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Form.Item name="price" label="Price">
              <Input placeholder="Price" type="number" />
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

export default UpdateCreateService;
