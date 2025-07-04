/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps, Tag } from 'antd';
import dayjs from 'dayjs';
import { Tracking } from '../type/subscriptiontype';

export const TrackingTable = (): TableProps<Tracking>['columns'] => {
  return [
    {
      title: 'SL',
      width: 10,
      render: (_text, _record, index) => index + 1,
    },

    {
      title: 'Date',
      dataIndex: 'sold_date',
      key: 'sold_date',
      width: 200,
      render: (created_at) => {
        return dayjs(created_at).format('DD-MMM-YYYY hh:mm A');
      },
    },

    {
      title: 'Created By',
      dataIndex: 'created_by',
      key: 'created_by',
      render: (name) => <Tag color='blue'>{name}</Tag>,
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (text) => <span>{text}</span>,
    },
  ];
};

export default TrackingTable;
