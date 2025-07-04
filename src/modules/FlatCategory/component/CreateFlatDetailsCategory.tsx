/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { useCreateFlatDetailsMutation } from "../api/AddFlatEndPoint";
import { IFlatDetailsCategory } from "../types/FlatCategoryTypes";
import SubmitButton from "../../../common/submitButton/SubmitButton";

const { Option } = Select;

const CreateFlatDetailsCategory = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [createFlatDetailsCategory, { isLoading, isSuccess }] =
    useCreateFlatDetailsMutation();

  const onFinish = (values: IFlatDetailsCategory) => {
    const data = {
      ...values,
    };
    createFlatDetailsCategory({ data });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess]);

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Card className="border" style={{ margin: "1rem 0" }}>
        <h2>Flat Information</h2>
        <p style={{ marginBottom: "1.5rem", color: "#888" }}>
          Add and manage flat details
        </p>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="building_name"
              label="Select Building"
              rules={[{ required: true, message: "Please select building" }]}
            >
              <Select placeholder="Choose building">
                <Option value="building-1">Building 1</Option>
                <Option value="building-2">Building 2</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="flat_number"
              label="Flat Number"
              rules={[{ required: true, message: "Please enter flat number" }]}
            >
              <Input placeholder="e.g., A-101" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="floor_number"
              label="Floor Number"
              rules={[{ required: true, message: "Please enter floor number" }]}
            >
              <Input placeholder="Floor number" type="number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="flat_type"
              label="Flat Type"
              rules={[{ required: true, message: "Please select flat type" }]}
            >
              <Select placeholder="Select type">
                <Option value="1bhk">1 BHK</Option>
                <Option value="2bhk">2 BHK</Option>
                <Option value="3bhk">3 BHK</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="carpet_area"
              label="Carpet Area (sq ft)"
              rules={[{ required: true, message: "Please enter carpet area" }]}
            >
              <Input placeholder="Area in sq ft" type="number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="base_rent"
              label="Base Rent"
              rules={[{ required: true, message: "Please enter base rent" }]}
            >
              <Input placeholder="Monthly rent amount" type="number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="security_deposit"
              label="Security Deposit"
              rules={[
                { required: true, message: "Please enter security deposit" },
              ]}
            >
              <Input placeholder="Security deposit amount" type="number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select status">
                <Option value="available">Available</Option>
                <Option value="occupied">Occupied</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <div style={{ textAlign: "left" }}>
            <SubmitButton loading={isLoading} label="Save Flat" />
          </div>
        </Form.Item>
      </Card>
    </Form>
  );
};

export default CreateFlatDetailsCategory;
