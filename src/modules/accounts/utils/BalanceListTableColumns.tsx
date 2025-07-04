import { TableProps } from 'antd';
import { IAddBalance } from '../types/AccountTypes';
import dayjs from 'dayjs';

import { DeleteIcon } from '../../../common/icon/Icon';
import { useDeleteBalanceAdjustmentMutation } from '../api/AddBalanceEndPoint';
import { useGetMeQuery } from '../../../app/api/userApi/userApi';

export const BalanceListTableColumns =
  (): TableProps<IAddBalance>['columns'] => {
    const { data: profile } = useGetMeQuery();
    const profileInfo = profile?.data?.permissions?.modules;

    const accounts = profileInfo?.find(
      (i: any) => i?.module_name === 'Accounts'
    );

    const balanceAdjust = accounts?.sub_modules?.find(
      (i) => i?.sub_module_name === 'Balance Adjustment'
    );

    const [deleteBalanceAdjustment] = useDeleteBalanceAdjustmentMutation();
    const confirm = (id: number) => {
      if (id) {
        deleteBalanceAdjustment(id);
      }
    };

    return [
      {
        title: 'SL',
        width: 20,
        render: (_text, _record, index) => <>{index + 1}</>,
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: 120,
        render: (date) => {
          return dayjs(date).format('DD-MM-YYYY');
        },
      },
      {
        title: 'Account Name',
        dataIndex: 'account_name',
        key: 'account_name',
      },
      {
        title: 'Transaction Type',
        dataIndex: 'type',
        key: 'type',
        render: (type) => (type === 'IN' ? 'Credit' : 'Debit'),
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount) => {
          const amountValue = parseFloat(amount);
          return (
            <p style={{ color: amountValue < 0 ? 'red' : 'inherit' }}>
              {amountValue}
            </p>
          );
        },
      },

      {
        title: 'Action',
        key: 'action',
        render: ({ id }) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {balanceAdjust?.permissions?.delete && (
              <DeleteIcon onConfirm={() => confirm(id)} />
            )}
          </div>
        ),
      },
    ];
  };
