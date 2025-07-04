import { TableProps } from 'antd';
import { IClientDiscount } from '../types/reportTypes';
import dayjs from 'dayjs';

export const ClientDiscountReportTableColumns =
  (): TableProps<IClientDiscount>['columns'] => {
    return [
      {
        title: 'SL',
        render: (_text, _record, index) => index + 1,
        width: 20,
      },
      {
        title: 'Invoice No',
        dataIndex: 'voucher_no',
        key: 'voucher_no',
        width: 100,
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 100,
        render: (_text, record) =>
          record.date && dayjs(record.date).format('YYYY-MM-DD'),
      },
      {
        title: 'Client Name',
        dataIndex: 'client_name',
        key: 'client_name',
        width: 100,
      },
      {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
        width: 100,
      },
    ];
  };
