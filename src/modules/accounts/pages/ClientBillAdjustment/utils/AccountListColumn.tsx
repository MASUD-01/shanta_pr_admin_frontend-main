import { Space, TableProps } from 'antd';
import { useGetMeQuery } from '../../../../../app/api/userApi/userApi';
import { useDispatch } from 'react-redux';
import { useDeleteAccountMutation } from '../../../api/AccountEndPoints';
import { IAllAccount } from '../../../types/AccountTypes';
import { setCommonModal } from '../../../../../app/slice/modalSlice';
import EditAccount from '../../../components/EditAccount';
import { DeleteIcon, EditButton } from '../../../../../common/icon/Icon';
import { CustomLink } from '../../../../../common/CustomLink';
import { PrimaryButton } from '../../../../../common/submitButton/CommonButton';

const AccountListColumn = (): TableProps<any>['columns'] => {
  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;

  const account = profileInfo?.find(
    (i: any) => i?.module_name === 'Accounts'
  ) as any;
  const accounts = account?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'LIst/Create Accounts'
  ) as any;

  const dispatch = useDispatch();
  const [deleteAccount] = useDeleteAccountMutation();
  const confirm = (id: number) => {
    if (id) {
      deleteAccount(id);
    }
  };
  const showModal = (record: IAllAccount) => {
    dispatch(
      setCommonModal({
        title: 'Edit Account',
        content: <EditAccount data={record} />,
        show: true,
      })
    );
  };
  return [
    {
      title: 'SL',
      width: 20,
      render: (_text, _record, index) => <>{index + 1}</>,
    },
    {
      title: 'Account Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Bank Name',
      dataIndex: 'bank_name',
      key: 'bank_name',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'Account Type',
      dataIndex: 'account_type',
      key: 'account_type',
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
      render: (balance) => {
        const balanceValue = balance ? parseFloat(balance) : 0;
        return (
          <p style={{ color: balanceValue < 0 ? 'red' : 'inherit' }}>
            {balanceValue || 0}
          </p>
        );
      },
    },

    {
      title: 'Routing No.',
      dataIndex: 'routing_no',
      key: 'routing_no',
    },

    {
      title: 'Actions',
      align: 'center',
      render: (record) => (
        <Space size='middle'>
          {accounts?.permissions?.update && (
            <EditButton onClick={() => showModal(record)} />
          )}

          <CustomLink to={`/account/statement/${record?.id}`}>
            <PrimaryButton name='Statement' size='small' />
          </CustomLink>

          {accounts?.permissions?.delete && (
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
export default AccountListColumn;
