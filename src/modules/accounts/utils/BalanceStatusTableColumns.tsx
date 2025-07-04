import { TableProps } from 'antd';
import { IAllAccount } from '../types/AccountTypes';

export const BalanceStatusTableColumns =
  (): TableProps<IAllAccount>['columns'] => {
    return [
      {
        title: 'SL',
        width: 20,
        render: (_text, _record, index) => <>{index + 1}</>,
      },
      {
        title: 'Bank Name',
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
        render: (amount) => {
          const amountValue = parseFloat(amount);
          return (
            <p style={{ color: amountValue < 0 ? 'red' : 'inherit' }}>
              {amountValue || 0}
            </p>
          );
        },
      },
    ];
  };
