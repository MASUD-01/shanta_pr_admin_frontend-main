/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, TableProps } from 'antd';
import dayjs from 'dayjs';
import { DeleteIcon, EyeIcon } from '../../../common/icon/Icon';
import { Link } from 'react-router-dom';
import { IMoneyReceipt } from '../types/moneyReceiptTypes';
import { useDeleteMoneyReceiptMutation } from '../api/moneyReceiptEndPoint';
import { CustomLink } from '../../../common/CustomLink';
import { useGetMeQuery } from '../../../app/api/userApi/userApi';

export const MoneyReceiptTableColumns =
  (): TableProps<any>['columns'] => {
    const { data: profile } = useGetMeQuery();
    const profileInfo = profile?.data?.permissions?.modules;

    const moneyReceipt = profileInfo?.find(
      (i: any) => i?.module_name === 'Money Receipt'
    ) as any;

    const [deleteMoneyReceipt] = useDeleteMoneyReceiptMutation();
    const confirm = (id: number) => {
      if (id) {
        deleteMoneyReceipt(id);
      }
    };
    return [
      {
        title: 'SL',
        width: 20,
        render: (_text, _record, index) => <>{index + 1}</>,
      },
      {
        title: 'Receipt No',
        dataIndex: 'money_receipt_no',
        key: 'money_receipt_no',
        width: 100,
      },
      {
        title: 'Payment Date',
        dataIndex: 'payment_date',
        key: 'payment_date',
        width: 120,
        render: (payment_date) => {
          return dayjs(payment_date).format('DD-MMM-YYYY');
        },
      },

      {
        title: 'Owner Name',
        dataIndex: 'client_name',
        key: 'client_name',
        width: 250,
    
      },
      {
        title: 'Account Name',
        dataIndex: 'account_name',
        key: 'account_name',
      },

      {
        title: 'Payment Type',
        dataIndex: 'payment_method',
        width: 120,
        key: 'payment_method',
      },
      {
        title: 'Paid Amount',
        dataIndex: 'paid_amount',
        key: 'paid_amount',
      },

      {
        title: 'Actions',
        dataIndex: 'id',
        key: 'id',
        width: 50,
        render: (id) => (
          <Space size='middle'>
            <CustomLink to={`${id}`}>
              <EyeIcon />
            </CustomLink>
            {moneyReceipt?.sub_modules[1]?.permissions?.delete && (
              <DeleteIcon
                title='Delete money receipt'
                onConfirm={() => confirm(id)}
              />
            )}
          </Space>
        ),
      },
    ];
  };
