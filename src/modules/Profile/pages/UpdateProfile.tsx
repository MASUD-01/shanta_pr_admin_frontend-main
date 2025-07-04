/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "../../admin/types/adminTypes";
import { Button, Col, Form, Input, Row, Upload } from "antd";
import SubmitButton from "../../../common/submitButton/SubmitButton";
import { useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useUpdateProfileMutation } from "../../../app/api/userApi/userApi";
import { setCommonModal } from "../../../app/slice/modalSlice";

const UpdateProfile = ({ record }: { record: IUser }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [updateProfile, { isSuccess, isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (record) {
      form.setFieldValue("first_name", record?.first_name);
      form.setFieldValue("last_name", record?.last_name);
      form.setFieldValue("phone_number", record?.phone_number);
      form.setFieldValue("photo", record?.photo);
    }
  }, [form, record]);

  const onFinish = (values: any) => {
    const formData = new FormData();
    const { photo, ...rest } = values;
    for (const key in rest) {
      if (rest[key]) {
        formData.append(key, rest[key]);
      }
    }
    if (photo?.file && photo !== String) {
      formData.append("photo", photo?.file);
    }

    updateProfile(formData as any);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields(["photo"]);
      dispatch(setCommonModal());
    }
  }, [isSuccess]);

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        style={{ paddingTop: "20px" }}
      >
        <Row align={"middle"} gutter={[5, 16]}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item name="first_name" label="First Name">
              <Input placeholder="First Name" type="text" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item name="last_name" label="Last Name">
              <Input placeholder="Last Name" type="text" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="phone_number" label="Phone">
              <Input placeholder="Phone" type="number" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name="photo" label="Photo">
              <Upload
                accept="image/png, image/jpeg, image/jpg, image/webp"
                listType="picture"
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                  Click to Upload
                </Button>
              </Upload>
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

export default UpdateProfile;
