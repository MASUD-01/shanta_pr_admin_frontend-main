/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Drawer, Form, Input, Tag, Tree, message } from 'antd';
import { useEffect, useState } from 'react';
import {
  useGetAllModuleQuery,
  useGetSingleRoleQuery,
  useUpdateRoleAndPermissionMutation,
} from '../api/RolePermissionEndPoint';

const UpdateRole = ({ open, setOpen, id }: any) => {
  const [form] = Form.useForm();
  const { data: allModule } = useGetAllModuleQuery();
  const { data: singleRole } = useGetSingleRoleQuery(Number(id));
  const [updateRolendPermission, { isSuccess, isLoading }] =
    useUpdateRoleAndPermissionMutation();

  const preSelected = singleRole?.data?.modules?.map((module: any) => ({
    title: module.module_name,
    key: `${module.module_id}`,

    children: module.sub_modules.map((subModule: any) => ({
      title: subModule.sub_module_name,
      key: `${module.module_id}_${subModule.sub_module_id}`,

      children: Object.entries(subModule.permissions)
        .filter(([_, isAllowed]) => isAllowed)
        .map(([permission, isAllowed]) => ({
          title: permission,
          key: `${subModule.sub_module_id}_${permission}`,
          isAllowed: isAllowed,
        })),
    })),
  }));

  const initialCheckedKeys =
    preSelected?.flatMap((item: any) =>
      item.children
        ? item.children.flatMap((child: any) =>
            child.children ? child.children.map((key: any) => key.key) : []
          )
        : []
    ) || [];

  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(
    initialCheckedKeys || ''
  );
  const unSelectedItem = [...initialCheckedKeys];

  checkedKeys.forEach((i) => {
    const index = unSelectedItem.indexOf(i);
    if (index !== -1) {
      unSelectedItem.splice(index, 1);
    }
  });
  const updatedUnSelectedItem = unSelectedItem.map((item) => `${item}_update`);

  const initialCheckedKeysSet = new Set(initialCheckedKeys);

  const newData = checkedKeys.filter((key) => !initialCheckedKeysSet.has(key));
  const updatedNewData = newData
    ?.filter(
      (item): item is string => typeof item === 'string' && item.includes('_')
    )
    ?.map((item) => `${item}_update`);

  const [submitDeleteKeys, setSubmitDeleteKeys] = useState<any[]>([]);

  const [_selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const treeData = allModule?.data?.map((moduleList: any, index: any) => ({
    title: (
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '2px',
          fontWeight: '600',
        }}
      >
        <span
          style={{
            border: '1px solid',
            borderRadius: '9999px',
            padding: '2px 6px',
          }}
        >
          {index + 1}
        </span>
        <span>{moduleList.module_name}</span>
      </div>
    ),
    key: `${moduleList.module_id}`,
    children: moduleList?.sub_modules?.map((list: any) => ({
      title: list?.sub_module_name,
      key: `${list?.sub_module_id}`,
      children: [
        {
          title: <Tag color='blue'>Read</Tag>,
          key: `${list?.sub_module_id}_read`,
        },
        {
          title: <Tag color='cyan'>Write</Tag>,
          key: `${list?.sub_module_id}_write`,
        },
        {
          title: <Tag color='green'>Update</Tag>,
          key: `${list?.sub_module_id}_update`,
        },
        {
          title: <Tag color='red'>Delete</Tag>,
          key: `${list?.sub_module_id}_delete`,
        },
      ],
    })),
  }));

  //   console.log("checkedKeys", checkedKeys);

  const onCheck = (checkedKeysValue: React.Key[]) => {
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue: React.Key[], _info: any) => {
    console.log('selectedKeysValue', selectedKeysValue);

    setSelectedKeys(selectedKeysValue);
  };
  useEffect(() => {
    if (singleRole) {
      form.setFieldValue('role_name', singleRole?.data?.role_name);
    }
  }, [singleRole]);

  const onFinish = (values: any) => {
    const ID = Number(singleRole?.data?.role_id);

    if (updatedNewData && updatedUnSelectedItem) {
      const UpdateDeleteRoles = {
        name: values.role_name,
        add_ids: updatedNewData,
        del_ids: updatedUnSelectedItem,
      };
      updateRolendPermission({ id: ID, data: UpdateDeleteRoles });
    } else if (
      updatedUnSelectedItem &&
      updatedUnSelectedItem.length > 0 &&
      newData.length <= 0
    ) {
      const DeleteRoles = {
        name: values.role_name,
        del_ids: updatedUnSelectedItem,
        add_ids: [],
      };
      //   console.log("DeleteRoles", DeleteRoles);
      updateRolendPermission({ id: ID, data: DeleteRoles });
    } else if (
      updatedNewData &&
      updatedNewData.length > 0 &&
      submitDeleteKeys.length <= 0
    ) {
      const updateRoles = {
        name: values.role_name,
        add_ids: updatedNewData,
        del_ids: [],
      };
      //   console.log("updateRoles", updateRoles);
      updateRolendPermission({
        id: ID,
        data: updateRoles,
      });
    } else {
      message.success('Up to date');
    }
  };
  useEffect(() => {
    if (isSuccess === true) {
      setOpen(false);
      setSubmitDeleteKeys([]);
    }
  }, [form, isSuccess, setOpen]);

  return (
    <div>
      <Drawer
        width={750}
        title='Create Role & Permissions'
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <Form onFinish={onFinish} layout='vertical' form={form}>
          <Form.Item
            name='role_name'
            rules={[{ required: true }]}
            label='Role Name'
            required
          >
            <Input placeholder='Role Name' type='text' />
          </Form.Item>

          <Form.Item name='addd' label='Update Role Permissions'>
            <Tree
              checkable
              onCheck={onCheck as any}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              //   selectedKeys={selectedKeys}
              treeData={treeData}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 18 }} className='ml-1'>
            <Button
              style={{
                backgroundColor: '#01adad',
                color: 'white',
                borderRadius: '50px',
                width: '150px',
              }}
              // type="primary"
              htmlType='submit'
              loading={isLoading}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default UpdateRole;
