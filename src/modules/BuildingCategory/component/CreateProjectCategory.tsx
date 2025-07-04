/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { useCreateProjectMutation } from "../api/CreateServiceEndPoint";
import { IProjectServiceCategory } from "../types/ProjectCategoryTypes";
import SubmitButton from "../../../common/submitButton/SubmitButton";

const CreateProjectCategory = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [createProjectCategory, { isLoading, isSuccess }] =
    useCreateProjectMutation();

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
    createProjectCategory({ data });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess, form]);

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Card className="border" style={{ margin: "1rem 0" }}>
        <h2>Building Information</h2>
        <p style={{ marginBottom: "1.5rem", color: "#888" }}>
          Add and manage building details
        </p>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="building_name"
              label="Building Name"
              rules={[
                { required: true, message: "Please enter building name" },
              ]}
            >
              <Input placeholder="Enter building name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="building_code"
              label="Building Code"
              rules={[
                { required: true, message: "Please enter building code" },
              ]}
            >
              <Input placeholder="e.g., BLD001" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="total_floors"
              label="Total Floors"
              rules={[{ required: true, message: "Please enter total floors" }]}
            >
              <Input placeholder="Number of floors" type="number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="total_flats"
              label="Total Flats"
              rules={[{ required: true, message: "Please enter total flats" }]}
            >
              <Input placeholder="Number of flats" type="number" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input.TextArea
                placeholder="Complete building address"
                rows={3}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Please enter city" }]}
            >
              <Input placeholder="City" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="state"
              label="State"
              rules={[{ required: true, message: "Please enter state" }]}
            >
              <Input placeholder="State" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="pincode"
              label="Pincode"
              rules={[{ required: true, message: "Please enter pincode" }]}
            >
              <Input placeholder="Pincode" type="number" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <div style={{ textAlign: "left" }}>
            <SubmitButton loading={isLoading} label="Save Building" />
          </div>
        </Form.Item>
      </Card>
    </Form>
  );
};

export default CreateProjectCategory;
