import { Col, Row, Form, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { ICreateProduct } from "../types/ProductTypes";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { useDispatch } from "react-redux";
import { useCreateProductMutation } from "../api/productEndPoint";

const CreateProduct = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [createProduct, { isSuccess, isLoading }] = useCreateProductMutation();

  const onFinish = (values: ICreateProduct) => {
    // const { photo } = values;
    const formData = new FormData();
    formData.append("name", values.name);

    if (values?.details) {
      formData.append("details", values?.details);
    }

    // if (photo) {
    //   formData.append("photo", photo[0].originFileObj);
    // }
    // console.table(Object.fromEntries(formData));
    createProduct({ data: formData });
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(setCommonModal());
    }
  }, [isSuccess, form]);

  return (
    <div style={{ paddingTop: "10px" }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row align={"middle"} gutter={[5, 0]}>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              name="name"
              rules={[{ required: true }]}
              label="Product Name"
              required
            >
              <Input placeholder="Product Name" type="text" />
            </Form.Item>
          </Col>
          {/* <Col xs={24} sm={24} md={24}>
            <FormFileInput
              size={24}
              name="photo"
              label="Photo"
              picture="picture"
            />
          </Col> */}
          <Col xs={24} sm={24} md={24}>
            <Form.Item name="details" label="Product Details">
              <TextArea placeholder="Product Details" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: "1rem" }}>
          <div style={{ textAlign: "end" }}>
            <Button
              htmlType="submit"
              type="primary"
              icon={<SendOutlined />}
              loading={isLoading}
            >
              Create
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
