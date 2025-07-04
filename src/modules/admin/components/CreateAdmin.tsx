import { LockOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Button, Col, Input, Row, Upload, Select } from 'antd';
import { useCreateAdminMutation } from '../api/adminEndPoint';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCommonModal } from '../../../app/slice/modalSlice';
import { useGetRolePermissionQuery } from '../../role&Permission/api/RolePermissionEndPoint';

const CreateAdmin = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [createAdmin, { isLoading, isSuccess }] = useCreateAdminMutation();
  const { data: getRolPermissionData } = useGetRolePermissionQuery();

  // const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    // values.company_id = user?.company_id;
    const formData = new FormData();

    for (const key in values) {
      if (values[key]) {
        if (key === 'photo') {
          formData.append(key, values[key]?.file);
        } else {
          formData.append(key, values[key]);
        }
      }
    }
    createAdmin({ data: formData });
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCommonModal());
      form.resetFields();
    }
  }, [dispatch, form, isSuccess]);

  return (
    <>
      <Form onFinish={onFinish} layout='vertical' form={form}>
        <Row align={'middle'} gutter={[5, 5]}>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name='first_name'
              rules={[{ required: true }]}
              label='First Name'
              required
            >
              <Input placeholder='First Name' type='text' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Form.Item
              name='last_name'
              rules={[{ required: true }]}
              label='Last Name'
              required
            >
              <Input placeholder='Last Name' type='text' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name='email'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not a valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
              label='Email'
              required
            >
              <Input placeholder='Email' type='email' />
            </Form.Item>
          </Col>{' '}
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name='phone_number'
              rules={[{ required: true }]}
              label='Phone'
              required
            >
              <Input placeholder='Phone' type='number' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label='Select Role'
              name='role_id'
              rules={[{ required: true }]}
            >
              <Select placeholder='Select Role'>
                {getRolPermissionData?.data?.map((i) => (
                  <Option key={i?.id} value={i?.id}>
                    {i.name}
                  </Option>
                ))}
              </Select>
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
              name='password'
              label='Password'
              rules={[
                {
                  required: true,
                  message: 'Please enter your password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder='Password'
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
            Create
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateAdmin;
