import { useDispatch } from "react-redux";
import { ICreateExpenseSubHead, IExpenseSubHead } from "../types/ExpenseTypes";
import { Col, Row, Form, Input } from "antd";
import { SelectExpenseHead } from "../../../../common/fromItemCommon/SelectCustomField";
import SubmitButton from "../../../../common/submitButton/SubmitButton";
import { useUpdateExpenseSubHeadMutation } from "../api/ExpenseEndPoint";
import { useEffect } from "react";
import { setCommonModal } from "../../../../app/slice/modalSlice";
const UpdateExpenseSubHead = ({ record }: { record: IExpenseSubHead }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [UpdateExpenseSubHead, { isLoading, isSuccess }] =
    useUpdateExpenseSubHeadMutation();

  useEffect(() => {
    if (record) {
      form.setFieldValue("expense_head_id", {
        value: record.head_id,
        label: `${record?.expense_head_name} [${record.expense_head_id}]`,
      });
      form.setFieldValue("name", record.expense_sub_head_name);
    }
  }, [form, record]);
  const onFinish = (values: ICreateExpenseSubHead) => {
    const data = {
      name: values.name,
      expense_head_id: values.expense_head_id?.value || values.expense_head_id,
      expense_sub_head_id: values.expense_sub_head_id,
    };
    UpdateExpenseSubHead({ id: record.id, data });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
    }
  }, [isSuccess, form]);
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ paddingTop: "20px" }}
      >
        <Row align={"middle"} gutter={[0, 0]}>
          <Col xs={24} sm={24} md={24}>
            <Form.Item label="Expense Head">
              <SelectExpenseHead name="expense_head_id" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24}>
            <Form.Item name="name" label="Expense Sub Head Name">
              <Input placeholder="Expense Sub Head Name" type="text" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginTop: "1rem" }}>
          <div style={{ textAlign: "end" }}>
            <SubmitButton loading={isLoading} label="Update" />
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateExpenseSubHead;
