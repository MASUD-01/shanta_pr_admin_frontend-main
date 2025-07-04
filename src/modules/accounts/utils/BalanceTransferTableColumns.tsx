import { Space, TableProps } from 'antd';
import dayjs from 'dayjs';
import { IBalanceTransfer } from '../types/AccountTypes';
import { DeleteIcon } from '../../../common/icon/Icon';
import { useGetMeQuery } from '../../../app/api/userApi/userApi';
import { useDeleteBalanceTransferMutation } from '../api/transferBalanceEndPoint';

export const BalanceTransferTableColumns =
  (): TableProps<IBalanceTransfer>['columns'] => {
    const [deleteBalanceTransfer] = useDeleteBalanceTransferMutation();
    const confirm = (id: number) => {
      if (id) {
        deleteBalanceTransfer(id);
      }
    };

    const { data: profile } = useGetMeQuery();
    const profileInfo = profile?.data?.permissions?.modules;

    const account = profileInfo?.find(
      (i: any) => i?.module_name === 'Accounts'
    );

    const balanceTransfer = account?.sub_modules?.find(
      (i: any) => i?.sub_module_name === 'Balance Transfer'
    );

    return [
      {
        title: 'SL',
        width: 20,
        render: (_text, _record, index) => <>{index + 1}</>,
      },
      {
        title: 'Balance Transfer No.',
        dataIndex: 'balance_transfer_no',
        key: 'balance_transfer_no',
        width: 140,
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
        title: 'Transfer From',
        dataIndex: 'from_ac_name',
        key: 'from_ac_name',
      },
      {
        title: 'Transfer To',
        dataIndex: 'to_ac_name',
        key: 'to_ac_name',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount) => {
          const amountValue = parseFloat(amount);
          return (
            <p style={{ color: amountValue < 0 ? 'red' : 'inherit' }}>
              {amountValue || 0}
            </p>
          );
        },
      },
      // {
      //   title: "Transaction Details",
      //   dataIndex: "transaction_details",
      //   key: "transaction_details",
      // },

      {
        title: 'Actions',
        render: (record) => (
          <Space size='middle'>
            {balanceTransfer?.permissions.delete && (
              <DeleteIcon
                title='Delete account'
                onConfirm={() => confirm(record?.id)}
              />
            )}
          </Space>
        ),
      },
    ];
  };
