import { Table, TableProps } from 'antd';
import DesignCompoent from '../../../common/applayout/utils/DesignCompoent';

interface DataType {
  id: number;
  name: string;
  branch: null | string;
  account_no: null | string;
  balance: string;
}
const DashboardTable = ({ data }: { data: DataType[] }) => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Sl',
      render: (_text, _record, index) => index + 1,
    },
    {
      title: 'Account Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'Account No',
      dataIndex: 'account_no',
      key: 'account_no',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance) => (
        <span style={{ color: balance < 0 ? 'red' : ' ' }}>BDT {balance}</span>
      ),
    },
  ];

  return (
    <div className='dashboard-table'>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '18px', fontWeight: '500' }}>
          Current Balance Status
        </p>
      </div>
      <DesignCompoent>
        <Table
          bordered
          size='small'
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey={'id'}
          scroll={{ x: true }}
        />
      </DesignCompoent>
    </div>
  );
};

export default DashboardTable;
