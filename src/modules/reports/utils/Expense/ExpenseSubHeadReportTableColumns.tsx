import { TableProps } from 'antd';
import { IExpenseSubHeadReport } from '../../types/reportTypes';
import dayjs from 'dayjs';

export const ExpenseSubHeadReportTableColumns =
  (): TableProps<IExpenseSubHeadReport>['columns'] => {
    return [
      {
        title: 'SL',
        width: 20,
        render: (_text, _record, index) => index + 1,
      },
      {
        title: 'Expense No.',
        dataIndex: 'expense_no',
        key: 'expense_no',
        width: 80,
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 100,
        render: (date) => {
          return dayjs(date).format('DD-MM-YYYY');
        },
      },

      {
        title: 'Account Name',
        dataIndex: 'account_name',
        key: 'account_name',
        width: 110,
        render: (_, record) => `${record.account_name} (${record.method})`,
      },
      {
        title: 'Created by',
        dataIndex: 'created_by',
        key: 'created_by',
        width: 150,
      },
      {
        title: 'Expense',
        dataIndex: 'expense_head_name',
        key: 'expense_head_name',
        width: 150,
      },
      {
        title: 'Sub Expense',
        dataIndex: 'expense_sub_head_name',
        key: 'expense_sub_head_name',
        width: 150,
      },
      {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
        render: (note) => <span>{note || 'N/A'}</span>,
        width: 350,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        width: 150,
      },
    ];
  };
