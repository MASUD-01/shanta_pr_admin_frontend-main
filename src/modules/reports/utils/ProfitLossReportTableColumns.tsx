import { TableProps, Typography } from 'antd';
import { IViewProfitLoss } from '../types/reportTypes';
import { Link } from 'react-router-dom';

export const ProfitLossReportTableColumns = (dateRange: {
  fromDate: string;
  toDate: string;
}) => {
  return [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text: string) => {
        if (text === 'SALES') {
          return (
            <Link
              to={`/reports/sales-report?start_date=${dateRange.fromDate}&end_date=${dateRange.toDate}`}
            >
              {text}
            </Link>
          );
        } else if (text === 'EXPENSE') {
          return (
            <Link
              to={`/reports/expense?start_date=${dateRange.fromDate}&end_date=${dateRange.toDate}`}
            >
              {text}
            </Link>
          );
        } else if (text === 'PAYROLL EXPENSE') {
          return (
            <Link
              to={`/reports/expense?start_date=${dateRange.fromDate}&end_date=${dateRange.toDate}`}
            >
              {text}
            </Link>
          );
        } else {
          return text;
        }
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => {
        const amountValue = parseFloat(amount);
        return (
          <Typography.Text style={{ color: amountValue < 0 ? 'red' : 'green' }}>
            {amountValue.toFixed(2)}
          </Typography.Text>
        );
      },
    },
  ];
};

//

export const ProfitLossIncomeReportTableColumns =
  (): TableProps<any>['columns'] => {
    return [
      {
        title: 'SL',
        render: (_text, _record, index) => index + 1,
      },
      // {
      //   title: "Invoice Date",
      //   dataIndex: "invoice_date",
      //   key: "invoice_date",
      //   render: (text) => dayjs(text).format("YYYY-MM-DD"),
      // },
      {
        title: 'Description',
        dataIndex: 'product_name',
        key: 'product_name',
      },
      // {
      //   title: "Unit Price",
      //   dataIndex: "unit_price",
      //   key: "unit_price",
      // },
      {
        title: 'Amount',
        dataIndex: 'quantity',
        key: 'quantity',
      },
    ];
  };

export const ProfitLossBasicReportTableColumns =
  (): TableProps<IViewProfitLoss>['columns'] => {
    return [
      {
        title: 'Collection',
        dataIndex: 'collection',
        key: 'collection',
      },
      {
        title: 'Profit',
        dataIndex: 'profit',
        key: 'profit',
        width: '300px',
      },
      {
        title: 'Loss',
        dataIndex: 'loss',
        key: 'loss',
      },
      {
        title: 'Total Expense',
        dataIndex: 'totalExpense',
        key: 'totalExpense',
      },
    ];
  };
