import { SendOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Button, Col, Input, Row, Upload, Select } from 'antd';
import { ISingleAdmin } from '../types/adminTypes';
import { useEffect } from 'react';
import { useUpdateAdminMutation } from '../api/adminEndPoint';
import { useAppDispatch } from '../../../app/store/store';
import { setCommonModal } from '../../../app/slice/modalSlice';
import { useGetRolePermissionQuery } from '../../role&Permission/api/RolePermissionEndPoint';

const UpdateAdmin = ({ singleAdmin }: { singleAdmin: ISingleAdmin }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useAppDispatch();
  const [updateAdmin, { isLoading, isSuccess }] = useUpdateAdminMutation();
  const { data: getRolPermissionData } = useGetRolePermissionQuery();

  useEffect(() => {
    if (singleAdmin) {
      form.setFieldValue('first_name', singleAdmin.first_name);
      form.setFieldValue('last_name', singleAdmin.last_name);
      form.setFieldValue('phone_number', singleAdmin.phone_number);
      form.setFieldValue('email', singleAdmin.email);
      form.setFieldValue('role_id', singleAdmin.role_id);
      form.setFieldValue('status', singleAdmin.user_status ? 'true' : 'false');
    }
  }, [form, singleAdmin]);

  const onFinish = (values: any) => {
    const formData = new FormData();
    const { ...rest } = values;

    for (const key in rest) {
      if (rest[key]) {
        if (key === 'photo') {
          formData.append(key, rest[key]?.file);
        } else {
          formData.append(key, rest[key]);
        }
      }
    }
    updateAdmin({ data: formData, id: singleAdmin.user_id });
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields(['photo']);
      dispatch(setCommonModal());
    }
  }, [isSuccess]);

  return (
    <div style={{ paddingTop: '15px' }}>
      <Form onFinish={onFinish} layout='vertical' form={form}>
        <Row align={'middle'} gutter={[5, 5]}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item name='first_name' label='First Name'>
              <Input placeholder='First Name' type='text' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item name='last_name' label='Last Name'>
              <Input placeholder='Last Name' type='text' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name='phone_number' label='Phone'>
              <Input placeholder='Phone' type='text' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name='email' label='Email'>
              <Input
                disabled={singleAdmin.main_user}
                placeholder='Email'
                type='email'
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name='photo' label='Photo'>
              <Upload
                accept='image/png, image/jpeg, image/jpg, image/webp'
                listType='picture'
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label='Select Role'
              name='role_id'
              rules={[{ required: true }]}
            >
              <Select
                placeholder='Select Role'
                disabled={singleAdmin.main_user}
              >
                {getRolPermissionData?.data?.map((i) => (
                  <Option key={i?.id} value={i?.id}>
                    {i.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item name='status' label='Status'>
              <Select
                disabled={singleAdmin.main_user}
                options={[
                  { value: 'true', label: 'Active' },
                  { value: 'false', label: 'Inactive' },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Button
            htmlType='submit'
            type='primary'
            icon={<SendOutlined />}
            loading={isLoading}
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdateAdmin;
