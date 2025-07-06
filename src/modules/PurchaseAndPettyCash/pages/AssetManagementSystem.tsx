import React, { useState } from 'react';
import { 
  Table, 
  Tag, 
  Space, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Divider, 
  Card,
  Row,
  Col,
  Tabs,
  Badge,
  Popconfirm,
  message 
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BarcodeOutlined,
  HomeOutlined,
  BankOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;

interface Asset {
  key: string;
  assetId: string;
  name: string;
  type: string;
  location: string;
  assignedTo: string;
  status: 'in-use' | 'available' | 'maintenance';
  purchaseDate: string;
  value: string;
  condition: string;
}

interface Stats {
  total: number;
  inUse: number;
  available: number;
}

interface StatisticCardProps {
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, color, icon }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ 
      backgroundColor: `${color}20`, 
      color, 
      padding: '12px', 
      borderRadius: '50%',
      marginRight: '16px'
    }}>
      {icon}
    </div>
    <div>
      <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>{title}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</div>
    </div>
  </div>
);

const AssetManagementSystem: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState<string>('ho');
  const [assets, setAssets] = useState<Asset[]>([
    {
      key: '1',
      assetId: 'AST-1001',
      name: 'Dell Laptop XPS 15',
      type: 'Electronics',
      location: 'Head Office',
      assignedTo: 'John Doe (IT Dept)',
      status: 'in-use',
      purchaseDate: '2023-01-15',
      value: '$1,200',
      condition: 'Good'
    },
    {
      key: '2',
      assetId: 'AST-1002',
      name: 'Projector Epson 4500',
      type: 'Electronics',
      location: 'Property - Downtown Tower',
      assignedTo: 'Conference Room A',
      status: 'in-use',
      purchaseDate: '2022-11-20',
      value: '$800',
      condition: 'Fair'
    },
    {
      key: '3',
      assetId: 'AST-1003',
      name: 'Office Chair Herman Miller',
      type: 'Furniture',
      location: 'Head Office',
      assignedTo: 'Sarah Smith (HR Dept)',
      status: 'in-use',
      purchaseDate: '2023-03-10',
      value: '$950',
      condition: 'Excellent'
    },
  ]);

  const handleAddAsset = () => {
    form.validateFields().then((values: Omit<Asset, 'key' | 'assetId' | 'status' | 'condition'>) => {
      const newAsset: Asset = {
        key: `${assets.length + 1}`,
        assetId: `AST-${1000 + assets.length + 1}`,
        ...values,
        status: 'available',
        condition: 'New'
      };
      setAssets([...assets, newAsset]);
      setVisible(false);
      form.resetFields();
      message.success('Asset added successfully');
    });
  };

  const handleDeleteAsset = (assetId: string) => {
    setAssets(assets.filter(asset => asset.assetId !== assetId));
  };

  const columns = [
    {
      title: 'Asset ID',
      dataIndex: 'assetId',
      key: 'assetId',
      render: (text: string) => <span><BarcodeOutlined /> {text}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (location: string) => (
        <Tag icon={location.includes('Property') ? <HomeOutlined /> : <BankOutlined />} 
             color={location.includes('Property') ? 'geekblue' : 'purple'}>
          {location}
        </Tag>
      ),
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Asset['status']) => (
        <Tag color={status === 'in-use' ? 'green' : status === 'maintenance' ? 'orange' : 'blue'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Asset) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} />
          <Popconfirm
            title="Are you sure to delete this asset?"
            onConfirm={() => handleDeleteAsset(record.assetId)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredAssets = assets.filter(asset => 
    activeTab === 'ho' 
      ? asset.location.includes('Head Office') 
      : asset.location.includes('Property')
  );

  const stats: { ho: Stats, property: Stats } = {
    ho: {
      total: assets.filter(a => a.location.includes('Head Office')).length,
      inUse: assets.filter(a => a.location.includes('Head Office') && a.status === 'in-use').length,
      available: assets.filter(a => a.location.includes('Head Office') && a.status === 'available').length,
    },
    property: {
      total: assets.filter(a => a.location.includes('Property')).length,
      inUse: assets.filter(a => a.location.includes('Property') && a.status === 'in-use').length,
      available: assets.filter(a => a.location.includes('Property') && a.status === 'available').length,
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '24px' }}>Asset Management System</h1>
      
      <Tabs defaultActiveKey="ho" onChange={(key: string) => setActiveTab(key)}>
        <TabPane
          tab={
            <span>
              <BankOutlined />
              Head Office Assets
              <Badge count={stats.ho.total} style={{ marginLeft: '8px' }} />
            </span>
          }
          key="ho"
        >
          <Row gutter={16} style={{ marginBottom: '16px' }}>
            <Col span={8}>
              <Card>
                <StatisticCard 
                  title="Total Assets" 
                  value={stats.ho.total} 
                  color="#1890ff" 
                  icon={<BankOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <StatisticCard 
                  title="In Use" 
                  value={stats.ho.inUse} 
                  color="#52c41a" 
                  icon={<CheckCircleOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <StatisticCard 
                  title="Available" 
                  value={stats.ho.available} 
                  color="#faad14" 
                  icon={<ClockCircleOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <HomeOutlined />
              Property Assets
              <Badge count={stats.property.total} style={{ marginLeft: '8px' }} />
            </span>
          }
          key="property"
        >
          <Row gutter={16} style={{ marginBottom: '16px' }}>
            <Col span={8}>
              <Card>
                <StatisticCard 
                  title="Total Assets" 
                  value={stats.property.total} 
                  color="#1890ff" 
                  icon={<HomeOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <StatisticCard 
                  title="In Use" 
                  value={stats.property.inUse} 
                  color="#52c41a" 
                  icon={<CheckCircleOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <StatisticCard 
                  title="Available" 
                  value={stats.property.available} 
                  color="#faad14" 
                  icon={<ClockCircleOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
        <Input.Search 
          placeholder="Search assets..." 
          style={{ width: 300 }} 
          enterButton={<SearchOutlined />}
        />
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => setVisible(true)}
        >
          Add Asset
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={filteredAssets} 
        bordered
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Add New Asset"
        visible={visible}
        onOk={handleAddAsset}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        okText="Add Asset"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Asset Name"
            rules={[{ required: true, message: 'Please input the asset name!' }]}
          >
            <Input placeholder="e.g., Dell Laptop XPS 15" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Asset Type"
            rules={[{ required: true, message: 'Please select asset type!' }]}
          >
            <Select placeholder="Select asset type">
              <Option value="Electronics">Electronics</Option>
              <Option value="Furniture">Furniture</Option>
              <Option value="Vehicle">Vehicle</Option>
              <Option value="Equipment">Equipment</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please select location!' }]}
          >
            <Select placeholder="Select location">
              <Option value="Head Office">Head Office</Option>
              <Option value="Property - Downtown Tower">Property - Downtown Tower</Option>
              <Option value="Property - Riverside Apartments">Property - Riverside Apartments</Option>
              <Option value="Property - Mountain View Villas">Property - Mountain View Villas</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="assignedTo"
            label="Assigned To"
          >
            <Input placeholder="Person or location where asset is assigned" />
          </Form.Item>

          <Form.Item
            name="value"
            label="Value"
          >
            <Input prefix="$" placeholder="Estimated value" />
          </Form.Item>

          <Form.Item
            name="purchaseDate"
            label="Purchase Date"
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AssetManagementSystem;