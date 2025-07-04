/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Form, Row, Col, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { LockOutlined } from '@ant-design/icons';
import { useUpdatePasswordMutation } from '../../../app/api/userApi/userApi';
import SubmitButton from '../../../common/submitButton/SubmitButton';
import { setCommonModal } from '../../../app/slice/modalSlice';

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const [updatePass, { isLoading, isSuccess, isError }] =
    useUpdatePasswordMutation();
  const dispatch = useDispatch();

  // Custom validation rule to check if old and new passwords are the same

  // Custom validation rule to check if new password and confirm password match
  const validateConfirmPassword = (_: any, value: any) => {
    if (value !== form.getFieldValue('new_password')) {
      return Promise.reject('The two passwords that you entered do not match!');
    }
    return Promise.resolve();
  };

  const onFinish = async (values: any) => {
    const { password, new_password } = values;
    const body: any = {
      password,
      new_password,
    };
    await updatePass(body);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(setCommonModal());
    } else if (isError) {
      message.error('Failed to update password. Please try again.');
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Form hideRequiredMark form={form} onFinish={onFinish} layout='vertical'>
        <Row align={'middle'} gutter={[5, 16]}>
          <Col span={8}>
            <Form.Item
              label='Old Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please enter your Old Password!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder='Old Password'
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='New Password'
              name='new_password'
              rules={[
                {
                  required: true,
                  message: 'Please enter your New Password!',
                },
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve(); // Skip validation if the field is empty (already handled by `required`)
                    }

                    const hasNumber = /[0-9]/.test(value);
                    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                    const hasCapitalLetter = /[A-Z]/.test(value);

                    if (value === form.getFieldValue('password')) {
                      return Promise.reject(
                        new Error(
                          'Old password and new password cannot be same!'
                        )
                      );
                    }
                    if (!hasNumber) {
                      return Promise.reject(
                        new Error('Password must include at least one number.')
                      );
                    }

                    if (!hasSymbol) {
                      return Promise.reject(
                        new Error('Password must include at least one symbol.')
                      );
                    }

                    if (!hasCapitalLetter) {
                      return Promise.reject(
                        new Error(
                          'Password must include at least one capital letter.'
                        )
                      );
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder='New Password'
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label='Confirm Password'
              name='confirm_password'
              rules={[
                {
                  message: 'Please confirm your New Password!',
                },
                {
                  validator: validateConfirmPassword,
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder='Confirm Password'
              />
            </Form.Item>
          </Col>
        </Row>

        <SubmitButton loading={isLoading} />
      </Form>
    </>
  );
};

export default UpdatePassword;
