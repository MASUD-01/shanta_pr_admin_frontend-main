/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { IExpenseHead } from "../types/ExpenseTypes";
import { Col, Row, Form, Input } from "antd";

import { useUpdateExpenseHeadMutation } from "../api/ExpenseEndPoint";
import SubmitButton from "../../../../common/submitButton/SubmitButton";
import { useEffect } from "react";
import { setCommonModal } from "../../../../app/slice/modalSlice";

const UpdateExpenseHead = ({ record }: { record: IExpenseHead }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [UpdateExpenseHead, { isLoading, isSuccess }] =
    useUpdateExpenseHeadMutation();

  useEffect(() => {
    if (record) {
      form.setFieldValue("name", record?.name);
    }
  }, [record, form]);

  const onFinish = (values: any) => {
    UpdateExpenseHead({ id: record?.id, data: { name: values.name } });
    // createExpenseHead({ data });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess, form]);
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        style={{ paddingTop: "20px" }}
      >
        <Row align={"middle"} gutter={[5, 16]}>
          <Col xs={24} sm={24} md={24}>
            <Form.Item name="name" label="Expense Head Name">
              <Input placeholder="Expense Head Name" type="text" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: "1rem" }}>
          <div style={{ textAlign: "center" }}>
            <SubmitButton label="Update" loading={isLoading} />
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateExpenseHead;
