import { TableProps, Typography } from 'antd';
import { IAccountLedger } from '../types/reportTypes';
import dayjs from 'dayjs';

export const AccountsReportTableColumns =
  (): TableProps<IAccountLedger>['columns'] => {
    return [
      {
        title: 'Sl',
        width: 20,
        render: (_text, _record, index) => index + 1,
      },
      {
        title: 'Voucher No.',
        dataIndex: 'voucher_no',
        key: 'voucher_no',
        width: 85,
      },
      {
        title: 'Date',
        dataIndex: 'ledger_date',
        key: 'ledger_date',
        width: 120,
        render: (ledger_date) => {
          return dayjs(ledger_date).format('DD-MM-YYYY');
        },
      },
      {
        title: 'Account Name',
        dataIndex: 'account_name',
        key: 'account_name',
        width: 130,
      },
      {
        title: 'Particular',
        dataIndex: 'particular',
        key: 'particular',
        width: 200,
      },
      {
        title: 'Details',
        dataIndex: 'details',
        key: 'details',
        width: 200,
      },

      {
        title: 'Type',
        dataIndex: 'tr_type',
        key: 'tr_type',
        width: 110,
      },
      {
        title: 'Debit',
        width: 100,
        render: (record) => (
          <Typography.Text style={{ color: 'red' }}>
            {record.type === 'OUT' && record.amount}
          </Typography.Text>
        ),
      },
      {
        title: 'Credit',
        width: 100,
        render: (record) => (
          <Typography.Text style={{ color: 'green' }}>
            {record.type === 'IN' && record.amount}
          </Typography.Text>
        ),
      },
      {
        title: 'Balance',
        width: 100,
        dataIndex: 'running_balance',
        key: 'running_balance',
        align: 'left',
        render: (record) => (
          <Typography.Text
            style={{
              color: Number(record) > 0 ? 'green' : 'red',
              fontWeight: 'bold',
              fontSize: '13px',
            }}
          >
            {Number(Math?.abs(record))}
          </Typography.Text>
        ),
      },
    ];
  };
