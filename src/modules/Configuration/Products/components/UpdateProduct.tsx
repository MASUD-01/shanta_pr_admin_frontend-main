import { useDispatch } from "react-redux";
import { ICreateProduct, IProduct } from "../types/ProductTypes";
import { Col, Row, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
// import { FormFileInput } from "../../../../common/fromItemCommon/SelectCustomField";

import { useUpdateProductMutation } from "../api/productEndPoint";
import { setCommonModal } from "../../../../app/slice/modalSlice";
import { useEffect } from "react";
import SubmitButton from "../../../../common/submitButton/SubmitButton";
const UpdateProduct = ({ data }: { data: IProduct }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [UpdateProduct, { isLoading, isSuccess }] = useUpdateProductMutation();
  useEffect(() => {
    if (data) {
      form.setFieldValue("name", data.name);
      form.setFieldValue("details", data.details);
    }
  }, [data]);

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
    UpdateProduct({ id: data?.id, data: formData });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess, form]);
  return (
    <>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row align={"middle"} gutter={[5, 0]}>
          <Col xs={24} sm={24} md={24}>
            <Form.Item name="name" label="Product Name">
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
          <div style={{ textAlign: "center" }}>
            <SubmitButton loading={isLoading} label="Update" />
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateProduct;
