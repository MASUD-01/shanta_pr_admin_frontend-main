import { TableProps, Typography } from 'antd';
import dayjs from 'dayjs';
import { ITransactionHistory } from '../types/AccountTypes';

export const AccountStatementTableColumns =
  (): TableProps<ITransactionHistory>['columns'] => {
    return [
      {
        title: 'Date',
        dataIndex: 'ledger_date',
        key: 'ledger_date',
        render: (ledger_date) => {
          return dayjs(ledger_date).format('DD-MM-YYYY');
        },
        width: 100,
      },
      {
        title: 'Voucher No.',
        dataIndex: 'voucher_no',
        key: 'voucher_no',
        width: 100,
      },

      {
        title: 'Purpose',
        dataIndex: 'purpose',
        key: 'purpose',
        colSpan: 1,
      },
      {
        title: 'Details',
        dataIndex: 'details',
        key: 'details',
        colSpan: 1,
      },
      {
        title: 'Debit',
        colSpan: 1,
        render: (record) => {
          return (
            <Typography style={{ color: 'red' }}>
              {record?.type === 'OUT' && record?.amount}
            </Typography>
          );
        },
      },
      {
        title: 'Credit',
        colSpan: 1,
        render: (record) => {
          return (
            <Typography style={{ color: 'green' }}>
              {record?.type === 'IN' && record?.amount}
            </Typography>
          );
        },
      },

      // {
      //   title: "Note",
      //   dataIndex: "Added_by",
      //   key: "Added_by",
      // },
    ];
  };
