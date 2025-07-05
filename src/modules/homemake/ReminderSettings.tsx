import React from "react";
import {
  Form,
  DatePicker,
  InputNumber,
  Switch,
  Button,
  Typography,
  Card,
  message,
} from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const ReminderSettings: React.FC = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Reminder Settings:", values);
    message.success("Reminder settings saved successfully!");
  };

  return (
    <Card
      style={{ maxWidth: 600, margin: "0 auto"}}
      bordered
    >
      <Title level={4}>🔔 Automatic Collection Reminder Settings</Title>
      <Text type="secondary">
        Configure when to automatically remind owners after due date.
      </Text>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={{
          enableReminder: true,
          reminderDelay: 3,
          startFrom: dayjs(),
        }}
        style={{ marginTop: 24 }}
      >
        <Form.Item
          label="Enable Auto Reminder"
          name="enableReminder"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

     

        <Form.Item
          label="Select Reminding Date"
          name="startFrom"
          rules={[{ required: true, message: "Please select reminder start date" }]}
        >
          <DatePicker style={{ width: 200 }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ReminderSettings;
