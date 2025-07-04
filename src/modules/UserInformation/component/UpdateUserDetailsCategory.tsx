import { Col, Row, Form, Input, InputNumber, Select } from "antd";
import { IUserDetails } from "../types/UserInfoTypes";
import { useDispatch } from "react-redux";
import SubmitButton from "../../../common/submitButton/SubmitButton";
import { useEffect } from "react";
import { useUpdateCreateFLatDetailsMutation } from "../api/AddFlatEndPoint";
import { setCommonModal } from "../../../app/slice/modalSlice";

const { Option } = Select;

const UpdateUserDetailsCategory = ({ record }: { record: IUserDetails }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [updateFlatDetails, { isLoading, isSuccess }] =
    useUpdateCreateFLatDetailsMutation();

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [form, record]);

  const onFinish = (values: Partial<IUserDetails>) => {
    updateFlatDetails({ id: record.id, data: values });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess]);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={onFinish}
      style={{ paddingTop: "20px" }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8}>
          <Form.Item
            name="building_name"
            label="Building Name"
            rules={[{ required: true, message: "Please enter building name" }]}
          >
            <Input placeholder="Building Name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Form.Item
            name="flat_number"
            label="Flat Number"
            rules={[{ required: true, message: "Please enter flat number" }]}
          >
            <Input placeholder="Flat Number" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Form.Item
            name="floor_number"
            label="Floor Number"
            rules={[{ required: true, message: "Please enter floor number" }]}
          >
            <InputNumber placeholder="Floor Number" style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Form.Item
            name="flat_type"
            label="Flat Type"
            rules={[{ required: true, message: "Please enter flat type" }]}
          >
            <Input placeholder="Flat Type" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Form.Item
            name="carpet_area"
            label="Carpet Area (sq ft)"
            rules={[{ required: true, message: "Please enter carpet area" }]}
          >
            <InputNumber
              placeholder="Carpet Area"
              style={{ width: "100%" }}
              min={0}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Form.Item
            name="base_rent"
            label="Base Rent"
            rules={[{ required: true, message: "Please enter base rent" }]}
          >
            <InputNumber
              placeholder="Base Rent"
              style={{ width: "100%" }}
              min={0}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Form.Item
            name="security_deposit"
            label="Security Deposit"
            rules={[
              { required: true, message: "Please enter security deposit" },
            ]}
          >
            <InputNumber
              placeholder="Security Deposit"
              style={{ width: "100%" }}
              min={0}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select Status">
              <Option value="available">Available</Option>
              <Option value="occupied">Occupied</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ marginTop: "1rem" }}>
        <div style={{ textAlign: "center" }}>
          <SubmitButton label="Update" loading={isLoading} />
        </div>
      </Form.Item>
    </Form>
  );
};

export default UpdateUserDetailsCategory;
