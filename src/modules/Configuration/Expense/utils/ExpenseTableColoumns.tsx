import { TableProps } from 'antd';
import {
  IExpenseHead,
  IExpenseSubHead,
  ISubHeadModuloePermission,
} from '../types/ExpenseTypes';
import { DeleteIcon, EditButton } from '../../../../common/icon/Icon';
import {
  useDeleteExpenseHeadMutation,
  useDeleteExpenseSubHeadMutation,
} from '../api/ExpenseEndPoint';
import { useDispatch } from 'react-redux';
import { setCommonModal } from '../../../../app/slice/modalSlice';
import UpdateExpenseHead from '../components/UpdateExpenseHead';
import UpdateExpenseSubHead from '../components/UpdateExpenseSubHead';

export const ExpenseHeadTableColumns = (
  expenseSub: ISubHeadModuloePermission | undefined
): TableProps<IExpenseHead>['columns'] => {
  const dispatch = useDispatch();
  const [deleteExpenseHead] = useDeleteExpenseHeadMutation();
  const confirm = (id: number) => {
    if (id) {
      deleteExpenseHead(id);
    }
  };
  const showModal = (record: IExpenseHead) => {
    dispatch(
      setCommonModal({
        title: 'Edit Head of Expenses',
        content: <UpdateExpenseHead record={record} />,
        show: true,
      })
    );
  };

  return [
    {
      title: 'SL',
      dataIndex: 'SL',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Expense Head ID',
      dataIndex: 'expense_head_id',
      key: 'expense_head_id',
    },
    {
      title: 'Head of Expense Name',
      dataIndex: 'name',
      key: 'name',
      width: '50%',
    },
    {
      title: 'Actions',
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {expenseSub?.permissions?.update && (
            <EditButton onClick={() => showModal(record)} />
          )}
          {expenseSub?.permissions?.delete && (
            <DeleteIcon
              title='Delete source'
              onConfirm={() => confirm(record.id)}
            />
          )}
        </div>
      ),
    },
  ];
};

export const ExpenseSubTableColumns = (
  expenseSub: ISubHeadModuloePermission | undefined
): TableProps<IExpenseSubHead>['columns'] => {
  const dispatch = useDispatch();
  const [deleteExpenseSubHead] = useDeleteExpenseSubHeadMutation();
  const confirm = (id: number) => {
    if (id) {
      deleteExpenseSubHead(id);
    }
  };
  const showModal = (record: IExpenseSubHead) => {
    dispatch(
      setCommonModal({
        title: 'Edit Head of Expenses',
        content: <UpdateExpenseSubHead record={record} />,
        show: true,
      })
    );
  };
  return [
    {
      title: 'SL',
      dataIndex: 'SL',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Expense Sub Head Id',
      dataIndex: 'expense_sub_head_id',
      key: 'expense_sub_head_id',
    },
    {
      title: 'Expense Sub Head Name',
      dataIndex: 'expense_sub_head_name',
      key: 'expense_sub_head_name',
    },
    {
      title: 'Expense Head Name',
      dataIndex: 'expense_head_name',
      key: 'expense_head_name',
      render: (_, data) =>
        data.expense_head_name &&
        `${data.expense_head_name} [${data.expense_head_id}]`,
    },
    {
      title: 'Expense Head Id',
      dataIndex: 'expense_head_id',
      key: 'expense_head_id',
    },
    {
      title: 'Actions',
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {expenseSub?.permissions?.update && (
            <EditButton onClick={() => showModal(record)} />
          )}
          {expenseSub?.permissions?.delete && (
            <DeleteIcon
              title='Delete source'
              onConfirm={() => confirm(record.id)}
            />
          )}
        </div>
      ),
    },
  ];
};
