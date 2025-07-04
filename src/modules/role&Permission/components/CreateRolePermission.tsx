/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Checkbox, Drawer, Form, Input, Tag, Tree } from 'antd';
import { useEffect, useState } from 'react';
import {
  useCreateRolePermissionMutation,
  useGetAllModuleQuery,
} from '../api/RolePermissionEndPoint';
import { CheckboxProps } from 'antd/lib';

const CreateRolePermission = ({ setShowModal, showModal }: any) => {
  const [form] = Form.useForm();
  const { data: allModule } = useGetAllModuleQuery();
  const [createRolerPermission, { isLoading, isSuccess }] =
    useCreateRolePermissionMutation();
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

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

  const onCheck = (checkedKeysValue: React.Key[]) => {
    setCheckedKeys(checkedKeysValue);
    setSelectAllChecked(
      checkedKeysValue.length === calculateTotalKeys(treeData).length
    );
  };

  const onSelect = (selectedKeysValue: React.Key[], _info: any) => {
    setSelectedKeys(selectedKeysValue);
  };

  const onSelectAllChange: CheckboxProps['onChange'] = (e) => {
    const checked = e.target.checked;

    setSelectAllChecked(checked);
    if (checked) {
      const allKeys = calculateTotalKeys(treeData);
      setCheckedKeys(allKeys);
    } else {
      setCheckedKeys([]);
    }
  };

  const calculateTotalKeys = (data: any) => {
    const keys: React.Key[] = [];
    data.forEach((item: any) => {
      keys.push(item.key);
      if (item.children) {
        keys.push(...calculateTotalKeys(item.children));
      }
    });
    return keys;
  };

  const onFinish = (values: any) => {
    const formData = {
      name: values?.name,
      sub_modules: checkedKeys,
    };
    createRolerPermission(formData as any);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setShowModal(false);
    }
  }, [form, isSuccess, setShowModal]);

  return (
    <div>
      <Drawer
        width={750}
        title='Create Role & Permissions'
        onClose={() => {
          form.resetFields();
          setShowModal(false);
        }}
        open={showModal}
      >
        <Form onFinish={onFinish} layout='vertical' form={form}>
          <Form.Item
            name='name'
            rules={[{ required: true }]}
            label='Role Name'
            required
          >
            <Input placeholder='Role Name' type='text' />
          </Form.Item>

          <Form.Item>
            <Checkbox onChange={onSelectAllChange} checked={selectAllChecked}>
              Select All Role & Permissions
            </Checkbox>
          </Form.Item>

          <Form.Item label='Select Role Permissions' name='sub_module_ids'>
            <Tree
              checkable
              onCheck={onCheck as any}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
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
              htmlType='submit'
              loading={isLoading}
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default CreateRolePermission;
