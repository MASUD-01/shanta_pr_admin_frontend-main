/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, TableProps } from 'antd';
import { IExpense } from '../types/expenseType';
import dayjs from 'dayjs';

import { DeleteIcon, EditButton } from '../../../common/icon/Icon';
import { useDeleteExpenseMutation } from '../api/expenseEndPoint';
import { useDispatch } from 'react-redux';
import { setCommonModal } from '../../../app/slice/modalSlice';
import UpdateExpense from '../components/UpdateExpense';
import { CustomLink } from '../../../common/CustomLink';
import { EyeOutlined } from '@ant-design/icons';

export const ExpenseTableColumns = (
  expenseSub: any
): TableProps<IExpense>['columns'] => {
  const dispatch = useDispatch();

  const showModal = (record: any) => {
    dispatch(
      setCommonModal({
        title: 'Edit Expense',
        content: <UpdateExpense record={record} />,
        show: true,
      })
    );
  };

  const [deleteExpense] = useDeleteExpenseMutation();
  const confirm = (id: number) => {
    if (id) {
      deleteExpense(id);
    }
  };
  return [
    {
      title: 'SL',
      width: 20,
      render: (_text, _record, index) => index + 1,
    },

    {
      title: 'Expense No.',
      dataIndex: 'expense_no',
      key: 'expense_no',
      width: 100,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('DD-MM-YYYY'),
      width: 100,
    },
    {
      title: 'Head',
      dataIndex: 'expense_head_name',
      key: 'expense_head_name',
      width: 100,
    },
    {
      title: 'Sub Head',
      dataIndex: 'expense_sub_head_name',
      key: 'expense_sub_head_name',
      width: 100,
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      width: 80,
      render: (_, record) => {
        return `${record?.method} (${record?.account_name})`;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
    },

    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      width: 250,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      width: 60,
      key: 'id',
      render: (id, record) => {
        return (
          <Space size='middle'>
            <CustomLink to={`${id}`}>
              <EyeOutlined style={{ fontSize: '18px', color: '#08c' }} />
            </CustomLink>
            {expenseSub?.permissions?.update && (
              <EditButton onClick={() => showModal(record)} />
            )}

            {expenseSub?.permissions?.delete && (
              <DeleteIcon
                title='Delete expense'
                onConfirm={() => confirm(id)}
              />
            )}
          </Space>
        );
      },
    },
  ];
};
