import { ColumnsType } from 'antd/es/table';
import { CustomLink } from '../../../common/CustomLink';
import { EyeIcon } from '../../../common/icon/Icon';
import { IGetAllRolePermissionList } from '../types/rolePermission';
import { Badge } from 'antd';
import { VscVerifiedFilled } from 'react-icons/vsc';
export const RoleTableColumns: ColumnsType<IGetAllRolePermissionList> = [
  {
    title: 'SL',
    dataIndex: 'id',
    key: 'id',
    render: (_text: string, _record: any, index: number) => index + 1,
    width: 20,
  },
  //   {
  //     title: "Image",
  //     dataIndex: "name",
  //     key: "name",
  //     render: (text) => (
  //       <span style={{ fontSize: "16px" }}>
  //         <Avatar
  //           style={{ marginRight: "1.5rem" }}
  //           src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkPvW6SHxfmMHwaL4-z9L2tOI0tP3qKLjh0tON9fRxZA&s`}
  //         />
  //         {text}
  //       </span>
  //     ),
  //   },

  {
    title: 'Role Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) =>
      record.main_role ? (
        <Badge
          offset={[10, 0]}
          count={
            <VscVerifiedFilled size={18} title='Main Role' color='#57BA6D' />
          }
        >
          {record.name}
        </Badge>
      ) : (
        <span>{record.name}</span>
      ),
  },
  {
    title: 'Action',
    key: 'id',
    render: (record) => (
      <CustomLink to={`${record.id}`}>
        <EyeIcon />
      </CustomLink>
    ),
  },
];
