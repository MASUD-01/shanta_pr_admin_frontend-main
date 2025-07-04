import { Card, Col, Row, Form, Input, Button, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SendOutlined } from "@ant-design/icons";
import { DateInput } from "../../../../common/fromItemCommon/SelectCustomField";
import { useGetEmployeesQuery } from "../api/employeeEndPoint";
import { SearchAbleSelectInput } from "../../../../common/Input/SearchAbleSelectInput";
import dayjs from "dayjs";
import { useWatch } from "antd/es/form/Form";
import { useEffect } from "react";

const CreateIncrement = () => {
  const [form] = Form.useForm();

  const selectEmployee = useWatch("employee", form);

  const { data } = useGetEmployeesQuery({});
  const employee = data?.data?.find((i) => i?.id === selectEmployee);

  useEffect(() => {
    if (employee) {
      form.setFieldsValue({ salary: employee.salary });
    }
  }, [employee, form]);

  return (
    <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            date: dayjs(),
          }}
        >
          <Card
            className="border"
            style={{
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            {" "}
            <Row align={"middle"} gutter={[5, 16]}>
              <Col xs={24} sm={24} md={8}>
                {/* <Form.Item required label="Select Employee" name="employee"> */}

                <SearchAbleSelectInput
                  placeholder="Select Employee"
                  label="Form"
                  name="employee"
                  rules={[{ required: true, message: "Employee is required" }]}
                  options={
                    data?.data?.length
                      ? data?.data?.map((employee) => ({
                          value: employee.id,
                          label: employee.name,
                        }))
                      : []
                  }
                />
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  name="salary"
                  rules={[{ required: true }]}
                  label="Present Salary"
                  required
                >
                  <Input placeholder="Present Salary" type="number" readOnly />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  name="increment"
                  rules={[{ required: true }]}
                  label="Increment Amount"
                  required
                >
                  <InputNumber
                    placeholder="Increment Amount"
                    type="number"
                    min={0}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{9})+(?!\d))/g, ",")
                    }
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <DateInput
                  label="Date"
                  name="date"
                  placeholder="Date"
                  required
                />
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item name="note" label="Note">
                  <TextArea rows={3} placeholder="Note" />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Form.Item style={{ marginTop: "1rem" }}>
            <div style={{ textAlign: "end" }}>
              <Button htmlType="submit" type="primary" icon={<SendOutlined />}>
                Create
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateIncrement;
