import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useGetDashboardProfitLossQuery } from '../api/dashboardEndPoints';
import {
  CustomTooltipProps,
  IViewProfitLossDashboard,
} from '../types/dashboardTypes';

export const DashboardBarChart = () => {
  const { data: profitLossData } = useGetDashboardProfitLossQuery();
  // Ensure data is available and create a mutable copy
  const reversedData = profitLossData?.data
    ? [...(profitLossData?.data as IViewProfitLossDashboard[])]?.reverse()
    : [];

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const salesItem = payload.find((item) => item.dataKey === 'Sales');

      const sales = salesItem ? salesItem.value : 0;
      const payroll_expense = salesItem ? salesItem.payload.Payroll_Expense : 0;
      const expenses = salesItem ? salesItem.payload.Expense : 0;
      const profitLoss = salesItem ? salesItem.payload.ProfitLoss : 0;
      const expense = expenses ? expenses : 0;
      const payrollExpense = payroll_expense ? payroll_expense : 0;
      const profitLosss = profitLoss ? profitLoss : 0;

      return (
        <div
          className='custom-tooltip'
          style={{
            background: 'rgba(255, 255, 255, 0.8)', // white background with 80% opacity
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <p
            className='intro'
            style={{ color: 'black' }}
          >{`Sales: ${sales}`}</p>
          <p
            className='intro'
            style={{ color: 'black' }}
          >{`Expense: ${expense}`}</p>
          <p
            className='intro'
            style={{ color: 'black' }}
          >{`Payroll Expense: ${payrollExpense}`}</p>
          <p
            className='intro'
            style={{ borderBottom: '1px solid gray', color: 'black' }}
          ></p>
          <p className='intro' style={{ color: 'black' }}>
            Profit/Loss:{' '}
            <span
              style={{
                color: Number(profitLosss) > 0 ? 'green' : 'red',
              }}
            >
              {profitLosss}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          width={500}
          height={400}
          data={reversedData.map((item) => ({
            ...item,
            Sales: Number(item.Sales),
            Total_Expense: Number(item.Total_Expense),
          }))}
          barSize={50}
          margin={{
            // top: 5,
            // right: 30,
            left: 20,
            // bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='Month' textAnchor='end' />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey='Sales' fill='#8884d8' />
          <Bar dataKey='Total_Expense' fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
