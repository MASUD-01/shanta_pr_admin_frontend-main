/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from 'antd';
import dayjs from 'dayjs';
import { IClientBillAdjustment } from '../types/ClientBillTypes';
import { useGetMeQuery } from '../../../../../app/api/userApi/userApi';
import { useDeleteClientBillAdjMutation } from '../api/ClientBillAdjustmentEndpoint';
import { DeleteIcon } from '../../../../../common/icon/Icon';

export const ClientBillAdjTableColumns =
  (): TableProps<IClientBillAdjustment>['columns'] => {
    const { data: profile } = useGetMeQuery();
    const profileInfo = profile?.data?.permissions?.modules;

    const accounts = profileInfo?.find(
      (i: any) => i?.module_name === 'Accounts'
    );

    const balanceAdjust = accounts?.sub_modules?.find(
      (i) => i?.sub_module_name === 'Client Balance Adjustment'
    );

    const [deleteClientBillAdj] = useDeleteClientBillAdjMutation();
    const confirm = (id: number) => {
      if (id) {
        deleteClientBillAdj(id);
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
        width: 150,
        render: (date) => {
          return dayjs(date).format('DD-MM-YYYY');
        },
      },
      {
        title: 'Client Name',
        dataIndex: 'client_name',
        key: 'client_name',
        width: 400,
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
