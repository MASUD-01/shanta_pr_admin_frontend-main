import { Form, Col, Input, Row, DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCommonModal } from "../../../app/slice/modalSlice";
import { useGetAllAccountQuery } from "../api/AccountEndPoints";
import { SearchAbleSelectInput } from "../../../common/Input/SearchAbleSelectInput";
import SubmitButton from "../../../common/submitButton/SubmitButton";
import { useWatch } from "antd/es/form/Form";
import { useCreateBalanceTransferMutation } from "../api/transferBalanceEndPoint";
import notification from "../../../common/Notification/notification";

const CreateTransferBalance = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { data: accounts } = useGetAllAccountQuery({});
  const [createBalanceTransfer, { isLoading, isSuccess }] =
    useCreateBalanceTransferMutation();
  const fromAccount = useWatch("from_account", form);
  const preAmount = useWatch("preAmount", form);
  const charge = useWatch("charge", form);
  // const Account = useWatch("amount", form);
  const FindAccount = accounts?.data?.find(
    (account) => account?.id === fromAccount
  );

  const totalAmount = parseFloat(preAmount) + parseFloat(charge || 0);

  useEffect(() => {
    form.setFieldValue("amount", totalAmount);
  }, [form, preAmount, totalAmount]);

  const onFinish = (values: any) => {
    const { from_account, to_account, amount, charge } = values;

    if (Number(FindAccount?.balance) < Number(amount)) {
      notification("Balance unavailable", "error");
      return;
    }
    createBalanceTransfer({
      data: {
        charge: parseFloat(charge) || 0,
        from_account,
        to_account,
        amount: Number(amount),
        date: dayjs(values?.date).format("YYYY-MM-DD"),
      },
    });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
      form.resetFields();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (FindAccount) {
      form.setFieldValue("available_balance", FindAccount?.balance || 0);
    }
  }, [fromAccount, FindAccount]);

  return (
    <>
      {" "}
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        initialValues={{ date: dayjs(new Date()) }}
        style={{ paddingTop: "20px" }}
      >
        <Row>
          <Col xs={24} md={24}>
            <SearchAbleSelectInput
              placeholder="Select account"
              label="Form"
              name="from_account"
              rules={[{ required: true, message: "Account is required" }]}
              options={
                accounts?.data?.length
                  ? accounts?.data?.map((account) => ({
                      value: account.id,
                      label: account.name,
                    }))
                  : []
              }
              onSelect={(value: any) =>
                form.setFieldValue("from_account", value)
              }
            />
          </Col>
          <Col xs={24} md={24}>
            <SearchAbleSelectInput
              placeholder="Select account"
              label="To"
              name="to_account"
              rules={[{ required: true, message: "Account is required" }]}
              options={
                accounts?.data?.length
                  ? accounts?.data
                      ?.filter((i) => i.id !== fromAccount)
                      ?.map((account) => ({
                        value: account.id,
                        label: account.name,
                      }))
                  : []
              }
              onSelect={(value: any) => form.setFieldValue("to_account", value)}
            />
          </Col>
          <Col xs={24} md={24}>
            <Form.Item
              name="available_balance"
              // rules={[{ required: true, message: "Amount is required" }]}
              label="Available Balance"
              // required
            >
              <Input placeholder="Amount" type="number" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item
              name="preAmount"
              rules={[{ required: true, message: "Amount is required" }]}
              label="Amount to Transfer"
              required
            >
              <Input
                placeholder="Amount"
                type="number"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item name="charge" label="Charge">
              <Input
                placeholder="Amount"
                type="number"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item name="amount" label="Total Amount">
              <Input
                placeholder="Amount"
                type="number"
                style={{ width: "100%" }}
                readOnly
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24}>
            <Form.Item name="date" label=" Date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item style={{ marginTop: "1rem" }}>
          <div style={{ textAlign: "center" }}>
            <SubmitButton loading={isLoading} label="Transfer" />
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateTransferBalance;
