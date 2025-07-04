import { Row, Typography } from 'antd';
import { IDashboardData } from '../types/dashboardTypes';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

const TopProducts = ({ data }: { data: IDashboardData }) => {
  return (
    <div className='dashboard-box-shape' style={{ height: 350 }}>
      <Row
        justify={'space-between'}
        style={{
          marginBottom: 10,
          alignItems: 'center',

          display: 'flex',
          justifyContent: 'space-between',
          background: '#337ab7',

          padding: '5px 20px',
          borderRadius: 4,
        }}
      >
        <Typography.Text
          strong
          style={{ fontSize: '16px', color: '#fff', fontWeight: 'bold' }}
        >
          Top Highest Sales Product
        </Typography.Text>
      </Row>

      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={400} height={400}>
          <Pie
            dataKey='total_sale'
            startAngle={360}
            endAngle={0}
            data={data?.topProducts}
            cx='50%'
            cy='50%'
            outerRadius={80}
            fill='#8884d8'
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopProducts;
