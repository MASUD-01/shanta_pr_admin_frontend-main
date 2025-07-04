import { TableProps } from 'antd';
import dayjs from 'dayjs';
import { IClientLedger } from '../types/reportTypes';

export const ClientLedgerTableColumns =
  (): TableProps<IClientLedger>['columns'] => {
    return [
      {
        title: 'SL',
        width: 20,
        render: (_text, _record, index) => index + 1,
      },

      {
        title: 'Voucher No',
        dataIndex: 'voucher_no',
        key: 'voucher_no',
        width: 120,
      },
      {
        title: 'Date',
        dataIndex: 'ledger_date',
        key: 'ledger_date',
        render: (ledger_date) => {
          return dayjs(ledger_date).format('DD-MM-YYYY');
        },
        width: 125,
      },
      // {
      //   title: 'Client Name',
      //   dataIndex: 'client_name',
      //   key: 'client_name',
      //   width: 250,
      //   render: (text, record) =>
      //     text ? `${text} [${record?.client_no}]` : 'N/A',
      // },

      {
        title: 'Particular',
        dataIndex: 'particular',
        key: 'particular',
      },
      {
        title: 'Details',
        dataIndex: 'details',
        key: 'details',
        width: 250,
      },
      {
        title: 'Type',
        dataIndex: 'tr_type',
        key: 'tr_type',
      },
      {
        title: 'Method',
        dataIndex: 'payment_method',
        key: 'payment_method',
      },

      {
        title: 'Dr.',
        render: (record) => {
          return record?.type === 'OUT' && record?.amount;
        },
        width: 110,
      },
      {
        title: 'Cr.',
        render: (record) => {
          return record?.type === 'IN' && record?.amount;
        },
        width: 110,
      },
      {
        title: 'Balance',
        dataIndex: 'due',
        key: 'due',
        width: 105,
        align: 'left',
        render: (due) => {
          return (
            <p
              style={{
                color:
                  Number(due) === 0
                    ? '#18b4e9'
                    : Number(due) < 0
                    ? 'green'
                    : 'red',
                fontWeight: 'bold',
              }}
            >
              {Math.abs(Number(due))}
            </p>
          );
        },
      },
    ];
  };
