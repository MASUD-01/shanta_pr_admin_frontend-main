/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from 'antd';
import { ICollectionReport } from '../types/reportTypes';
import dayjs from 'dayjs';

export const CollectionReportTableColumns =
  (): TableProps<ICollectionReport>['columns'] => {
    return [
      {
        title: 'SL',
        width: 20,
        render: (_text, _record, index) => index + 1,
      },

      {
        title: 'Money Receipt No',
        dataIndex: 'money_receipt_no',
        key: 'money_receipt_no',
        width: 150,
      },
      {
        title: 'Date',
        dataIndex: 'invoice_date',
        key: 'invoice_date',
        render: (_, record) => {
          return record.payment_date
            ? dayjs(record.payment_date).format('DD-MMM-YYYY')
            : '';
        },
        width: 150,
      },
      {
        title: 'Client Name',
        dataIndex: 'client_name',
        key: 'client_name',
        width: 300,
      },
      {
        title: 'Collected By',
        dataIndex: 'collected_by',
        key: 'collected_by',
        width: 200,
      },
      {
        title: 'Amount',
        dataIndex: 'paid_amount',
        key: 'paid_amount',
        width: 100,
      },
    ];
  };
