import React, { useState } from "react";
import {
  Upload,
  Table,
  Button,
  Typography,
  Select,
  Row,
  Col,
  Tag,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const systemRecords = [
  {
    id: 1,
    date: "2025-07-01",
    owner: "Mr. Karim",
    amount: 5000,
    method: "Bank Transfer",
    receiptNo: "MR-001",
  },
  {
    id: 2,
    date: "2025-07-02",
    owner: "Mr. Rahim",
    amount: 2000,
    method: "bKash",
    receiptNo: "MR-002",
  },
];

const bankRecords = [
  {
    id: "B1",
    date: "2025-07-01",
    amount: 5000,
    description: "TRX-XYZ001 DBBL",
  },
  {
    id: "B2",
    date: "2025-07-02",
    amount: 2000,
    description: "TXN-111 bKash",
  },
];

const BankReconciliation = () => {
  const [matches, setMatches] = useState<{ [key: number]: string }>({});

  const handleMatch = (sysId: number, bankId: string) => {
    setMatches((prev) => ({ ...prev, [sysId]: bankId }));
    message.success("Matched successfully");
  };

  const columns = [
    { title: "Date", dataIndex: "date" },
    { title: "Owner", dataIndex: "owner" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Method", dataIndex: "method" },
    { title: "Receipt No", dataIndex: "receiptNo" },
    {
      title: "Status",
      render: (_: any, record: any) => {
        const matched = matches[record.id];
        return matched ? <Tag color="green">Reconciled</Tag> : <Tag color="red">Unreconciled</Tag>;
      },
    },
  ];

  return (
    <div style={{ padding: 32, background: "#fff",  margin: "0 auto" }}>
      <Title level={4}>🏦 Bank Reconciliation</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Upload beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload Bank Statement (CSV)</Button>
          </Upload>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={systemRecords}
        rowKey="id"
        pagination={false}
        bordered
      />

    
    </div>
  );
};

export default BankReconciliation;