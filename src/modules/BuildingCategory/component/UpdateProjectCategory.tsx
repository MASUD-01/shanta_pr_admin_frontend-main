import { Col, Row, Form, Input } from "antd";
import {
  IProjectService,
  IProjectServiceCategory,
} from "../types/ProjectCategoryTypes";
import { useDispatch } from "react-redux";
import SubmitButton from "../../../common/submitButton/SubmitButton";
import { useEffect } from "react";
import { useUpdateCreateProjectMutation } from "../api/CreateServiceEndPoint";
import { setCommonModal } from "../../../app/slice/modalSlice";

const UpdateProjectCategory = ({ record }: { record: IProjectService }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [updateProjectCategory, { isLoading, isSuccess }] =
    useUpdateCreateProjectMutation();

  useEffect(() => {
    if (record) {
      form.setFieldValue("project_name", record.building_name);
      form.setFieldValue("building_code", record.building_code);
      form.setFieldValue("total_floors", record.total_floors);
      form.setFieldValue("address", record.address);
      form.setFieldValue("city", record.city);
      form.setFieldValue("state", record.state);
      form.setFieldValue("pincode", record.pincode);
      form.setFieldValue("price", record.price);
    }
  }, [form, record]);

  const onFinish = (values: IProjectServiceCategory) => {
    const data = {
      project_name: values.building_name,
      building_code: values.building_code,
      total_floors: values.total_floors,
      total_flats: values.total_flats,
      address: values.address,
      city: values.city,
      state: values.state,
      pincode: values.pincode,
      price: values.price,
    };
    updateProjectCategory({ id: record.id, data });
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
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="Project_name"
              rules={[{ required: true }]}
              label="Project Name"
              required
            >
              <Input placeholder="Project Name" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="building_code"
              rules={[{ required: true }]}
              label="Building Code"
              required
            >
              <Input placeholder="Building Code" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="total_floors"
              rules={[{ required: true }]}
              label="Total Floors"
              required
            >
              <Input placeholder="Total Floors" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="address"
              rules={[{ required: true }]}
              label="Address"
              required
            >
              <Input placeholder="Total Floors" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="total_flats"
              rules={[{ required: true, message: "Please enter total flats" }]}
              label="Total Flats"
              required
            >
              <Input placeholder="Number of flats" type="number" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="city"
              rules={[{ required: true }]}
              label="City"
              required
            >
              <Input placeholder="City" type="text" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="state"
              rules={[{ required: true }]}
              label="State"
              required
            >
              <Input placeholder="State" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="pincode"
              rules={[{ required: true }]}
              label="Pincode"
              required
            >
              <Input placeholder="Pincode" type="number" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="price"
              rules={[{ required: true }]}
              label="Pincode"
              required
            >
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

export default UpdateProjectCategory;
