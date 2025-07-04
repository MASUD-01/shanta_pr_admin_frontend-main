import { Button, Card, Col, List, Row, Statistic, Tabs } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { FaRegBuilding } from 'react-icons/fa';
import {
  FaChartLine,
  FaUserPlus,
  FaUsers,
  FaTasks,
  FaQrcode,
  FaFileSignature,
} from 'react-icons/fa';
import { MdOutlineHomeWork } from 'react-icons/md';
import { IoPeople } from 'react-icons/io5';
import TabPane from 'antd/es/tabs/TabPane';
export const Dashboard = () => {
  const summaryStats = [
    {
      title: 'Total Buildings',
      value: 12,
      icon: <FaRegBuilding size={32} color='#1890ff' />,
    },
    {
      title: 'Total Flats',
      value: 86,
      icon: <MdOutlineHomeWork size={32} color='#52c41a' />,
    },
    {
      title: 'Total Tenants',
      value: 74,
      icon: <IoPeople size={32} color='#faad14' />,
    },
  ];

  const costData = [
    { name: 'Jan', Cost: 2400 },
    { name: 'Feb', Cost: 1398 },
    { name: 'Mar', Cost: 9800 },
    { name: 'Apr', Cost: 3908 },
    { name: 'May', Cost: 4800 },
    { name: 'Jun', Cost: 3800 },
    { name: 'Jul', Cost: 4300 },
  ];

  const leadStagesData = [
    { name: 'Generated', value: 40 },
    { name: 'Quality Lead', value: 25 },
    { name: 'Priority', value: 20 },
    { name: 'Sold', value: 15 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return (
    <>
      <div>
        <Row gutter={[16, 16]}>
          {summaryStats.map((item, idx) => (
            <Col xs={24} sm={12} md={8} key={idx}>
              <Card>
                <Row gutter={12} align='middle'>
                  <Col flex='none' style={{ fontSize: 28 }}>
                    {item.icon}
                  </Col>
                  <Col flex='auto'>
                    <Statistic title={item.title} value={item.value} />
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {/* Summary Cards */}
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Card.Meta
                avatar={<FaUsers className='text-2xl text-blue-600' />}
                title='Leads'
                description='450 Total'
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card>
              <Card.Meta
                avatar={<FaUserPlus className='text-2xl text-green-600' />}
                title='Customers'
                description='120 Total'
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card>
              <Card.Meta
                avatar={<FaTasks className='text-2xl text-yellow-600' />}
                title='Follow Ups'
                description='Today: 8'
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card>
              <Card.Meta
                avatar={<FaChartLine className='text-2xl text-purple-600' />}
                title='Activity Log'
                description='52 this week'
              />
            </Card>
          </Col>

          {/* Lead Funnel Pie Chart */}
          <Col xs={24} md={12}>
            <Card title='Lead Funnel'>
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={leadStagesData}
                    dataKey='value'
                    nameKey='name'
                    outerRadius={100}
                    label
                  >
                    {leadStagesData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* Lead Conversion Bar Chart */}
          <Col xs={24} md={12}>
            <Card title='Lead Conversion by Stage'>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={leadStagesData}>
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='value' fill='#8884d8' />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          {/* Follow Up Tabs */}
          <Col span={24}>
            <Card title='Follow Ups'>
              <Tabs defaultActiveKey='today'>
                <TabPane tab="Today's Follow Ups" key='today'>
                  <List
                    bordered
                    dataSource={['Lead A', 'Lead B']}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                  />
                </TabPane>
                <TabPane tab='Missed Follow Ups' key='missed'>
                  <List
                    bordered
                    dataSource={['Lead C', 'Lead D']}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                  />
                </TabPane>
                <TabPane tab='Upcoming Follow Ups' key='upcoming'>
                  <List
                    bordered
                    dataSource={['Lead E', 'Lead F']}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                  />
                </TabPane>
              </Tabs>
            </Card>
          </Col>

          {/* Proposal & QR Features */}
          <Col span={24}>
            <Card title='Quick Actions'>
              <Row gutter={[16, 16]}>
                <Col>
                  <Button icon={<FaFileSignature />} type='primary'>
                    Create Proposal / Agreement
                  </Button>
                </Col>
                <Col>
                  <Button icon={<FaQrcode />} type='default'>
                    Generate QR Code
                  </Button>
                </Col>
                <Col>
                  <Button icon={<FaUserPlus />} type='dashed'>
                    Scan Business Card
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Cost Chart */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24}>
            <Card title='Monthly Cost Overview' bordered>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={costData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='Cost' fill='#1890ff' radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>
      {/* {isLoading ? (
        <GlobalLoader />
      ) : dashboardModule?.permissions.read ? (
        <>
          <Row gutter={[15, 20]}>
            <Col xs={24} md={18} xxl={18}>
              <Card
                size='small'
                title={
                  <p
                    style={{
                      padding: 10,
                      fontSize: '20px',
                    }}
                  >
                    Last Six Months of Data
                  </p>
                }
              >
                <div style={{ height: 390 }}>
                  <DashboardBarChart />
                </div>
              </Card>
            </Col>
            <Col xs={24} md={6} xxl={6}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                <Card size='small'>
                  <DashBoardCard
                    title="Today's Collection"
                    value={dData?.todaysCollection || 0}
                  />
                </Card>
                <Card size='small'>
                  <DashBoardCard
                    title="Today's Expenses"
                    value={dData?.todaysExpense.toFixed(2) || 0}
                  />{' '}
                </Card>
                <Card size='small'>
                  <DashBoardCard
                    title="Today's Profit"
                    value={dData?.currentDayEarning || 0}
                  />
                </Card>
              </div>
            </Col>
            <Col xs={24} md={24} xxl={24}>
              <Row gutter={[15, 10]}>
                <Col xs={24} md={6} xxl={6}>
                  <Card size='small'>
                    <DashBoardCard
                      title='This Month Collection'
                      value={`${dData?.monthlyCollection || 0} BDT`}
                    />
                  </Card>
                </Col>
                <Col xs={24} md={6} xxl={6}>
                  <Card size='small'>
                    <DashBoardCard
                      title='This Month Expense'
                      value={`${dData?.monthlyExpense.toFixed(2) || 0} BDT`}
                    />{' '}
                  </Card>
                </Col>
                <Col xs={24} md={6} xxl={6}>
                  <Card size='small'>
                    <DashBoardCard
                      title='This Month Profit'
                      value={`${dData?.currentMonthEarning || 0} BDT`}
                    />{' '}
                  </Card>
                </Col>
                <Col xs={24} md={6} xxl={6}>
                  <Card size='small'>
                    <DashBoardCard
                      title='Total Receivable'
                      value={`${dData?.totalReceivable || 0} BDT`}
                    />{' '}
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={15} xl={12} xxl={18}>
              <Card size='small' style={{ minHeight: '100%' }}>
                <DashboardTable data={dData?.accountWithBalanceList} />
              </Card>
            </Col>
            <Col xs={24} md={9} xl={12} xxl={6}>
              <Row gutter={[15, 20]}>
                <Col xs={24} md={12} xl={12} xxl={12}>
                  <Card size='small'>
                    <DashBoardCard
                      title='Total Client'
                      value={dData?.totalClient || 0}
                      height={73}
                    />
                  </Card>
                </Col>
                <Col xs={24} md={12} xl={12} xxl={12}>
                  <Card size='small'>
                    <DashBoardCard
                      title='Active Client'
                      value={dData?.activeClient || 0}
                      height={73}
                    />
                  </Card>
                </Col>
                <Col xs={24} md={24} xl={12} xxl={24}>
                  <Card size='small'>
                    <DashBoardCard
                      title='Inactive Client'
                      value={dData?.inActiveClient || 0}
                      height={73}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={8} xxl={8}>
              <Card size='small'>
                <TopSource data={dData} />
              </Card>
            </Col>
            <Col xs={24} md={8} xxl={8}>
              <Card size='small'>
                <TopProducts data={dData} />{' '}
              </Card>
            </Col>
            <Col xs={24} md={8} xxl={8}>
              <Card size='small'>
                <TopClients data={dData} />{' '}
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Row
          align={'middle'}
          justify={'center'}
          style={{ height: '100%', background: 'white' }}
        >
          <Col>
            <div style={{ position: 'relative' }}>
              <img src={imgs} height={'300px'} width={'100%'} />
              <h2
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'gray',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                There are no data
              </h2>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleGoBack}
                style={{
                  background: 'linear-gradient(135deg, #AECFE2, #A1C4D7)',
                  border: 'none',
                  padding: '10px 20px',
                  color: 'white',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Go Back
              </button>
            </div>
          </Col>{' '}
        </Row>
      )} */}
    </>
  );
};
