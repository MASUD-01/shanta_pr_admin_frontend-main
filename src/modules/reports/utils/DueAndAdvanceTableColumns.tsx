import { TableProps } from 'antd';
import { IGetDueAdvanceType } from '../../Client/types/ClientTypes';
import { Link } from 'react-router-dom';

export const DueAndAdvanceTableColumns =
  (): TableProps<IGetDueAdvanceType>['columns'] => {
    return [
      {
        title: 'SL',
        render: (_text, _record, index) => index + 1,
        width: 20,
      },
      {
        title: 'Client Name',
        dataIndex: 'client_name',
        key: 'client_name',
        width: 250,
        render: (_, record) => (
          <Link to={`/reports/client-ledger?client_id=${record.id}`}>
            {record.name ? `${record.name} [${record?.client_no}]` : 'N/A'}
          </Link>
        ),
      },
      {
        title: 'Mobile No',
        dataIndex: 'mobile',
        key: 'mobile',
        width: 100,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 100,
      },
      {
        title: 'Present Due',
        dataIndex: 'due',
        key: 'due',
        width: 100,
        render: (_, record) => (
          <span style={{ color: 'red', textAlign: 'right' }}>
            {Number(record.balance) < 0 && Math.abs(Number(record.balance))}
          </span>
        ),
      },
      {
        title: 'Present Advance',
        dataIndex: 'trade_license_no',
        key: 'trade_license_no',
        width: 150,
        render: (_, record) => (
          <span style={{ color: 'green', textAlign: 'right' }}>
            {Number(record.balance) > 0 && record.balance}
          </span>
        ),
      },
    ];
  };
