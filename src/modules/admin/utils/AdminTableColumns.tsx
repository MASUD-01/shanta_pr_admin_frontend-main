import { ColumnsType } from 'antd/es/table';
import { Badge, Tag } from 'antd';
import { CustomLink } from '../../../common/CustomLink';
import { EyeIcon } from '../../../common/icon/Icon';
import { IUser } from '../types/adminTypes';
import { VscVerifiedFilled } from 'react-icons/vsc';
export const AdminTableColumns = (): ColumnsType<IUser> => {
  return [
    {
      title: 'SL',
      dataIndex: '',
      render: (_: any, __: any, index: any) => index + 1,
      width: 20,
    },
    {
      title: 'Name',
      render: (_, record) =>
        record.main_user ? (
          <Badge
            offset={[10, 0]}
            count={
              <VscVerifiedFilled size={18} title='Main Admin' color='#57BA6D' />
            }
          >
            {record.first_name} {record.last_name}
          </Badge>
        ) : (
          <span>
            {record.first_name} {record.last_name}
          </span>
        ),
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    // #e6f4ff
    {
      title: 'Role',
      dataIndex: 'user_role',
      key: 'user_role',
      render: (user_role) => (
        <Tag
          color={user_role ? '#d9f7be' : '#e6f4ff'}
          style={{ color: 'black' }}
        >
          {user_role ? user_role : 'User'}
        </Tag>
      ),
    },

    {
      title: 'Status',
      key: 'user_status',
      dataIndex: 'user_status',
      render: (user_status) => (
        <Tag color={user_status ? 'success' : 'error'}>
          {user_status ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'id',
      render: (record: any) => (
        <CustomLink to={`${record.id}`}>
          <EyeIcon />
        </CustomLink>
      ),
    },
  ];
};
