import { TableProps } from 'antd';
import { ITransactionHistory } from '../types/AccountTypes';
import dayjs from 'dayjs';

export const TransactionsHistoryTableColumns =
  (): TableProps<ITransactionHistory>['columns'] => {
    return [
      {
        title: 'SL',
        render: (_text, _record, index) => <>{index + 1}</>,
      },
      {
        title: 'Date',
        dataIndex: 'ledger_date',
        key: 'ledger_date',
        render: (ledger_date) => {
          return dayjs(ledger_date).format('DD-MM-YYYY');
        },
        width: 120,
      },
      {
        title: 'Transaction Type',
        dataIndex: 'tr_type',
        key: 'tr_type',
        width: 150,
      },
      {
        title: 'Method',
        dataIndex: 'payment_method',
        key: 'payment_method',
      },
      {
        title: 'Debit',
        render: (record) => {
          return record?.type === 'OUT' && record?.amount;
        },
      },

      {
        title: 'Credit',
        render: (record) => {
          return record?.type === 'IN' && record?.amount;
        },
      },

      {
        title: 'Last Balance',
        dataIndex: 'last_balance',
        key: 'last_balance',
        render: (last_balance) => {
          const amountValue = parseFloat(last_balance);
          return (
            <p style={{ color: amountValue < 0 ? 'red' : 'inherit' }}>
              {amountValue}
            </p>
          );
        },
      },
      {
        title: 'Details',
        dataIndex: 'details',
        key: 'details',
        width: 450,
      },
    ];
  };
