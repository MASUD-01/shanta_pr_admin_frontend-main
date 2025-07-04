import { motion } from 'framer-motion';
import { Button, Form, Input } from 'antd';
import loginImage from '../../../../public/shantaLogo.jpg';
import { useResetPasswordMutation } from '../api/forgetApi';
import { Link, useNavigate } from 'react-router-dom';
import notification from '../../Notification/notification';
import { useEffect } from 'react';
import { LockOutlined } from '@ant-design/icons';

const ResetPassword = () => {
  const [resetPassword, { isSuccess, isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const forgetToken = localStorage.getItem('reset_token');
  const onFinish = (values: any) => {
    const { password, password2 } = values;
    if (password?.length < 8) {
      return notification('Password must be at least 8 characters', 'error');
    }
    if (password !== password2) {
      return notification('Password does not match', 'error');
    }
    const body = { token: forgetToken, password };

    resetPassword(body);
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem('reset_token');
      navigate('/login');
    }
  }, [isSuccess]);
  return (
    <>
      <motion.div
        // className="login-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          // className="registration-form login-form-container"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            style={{
              backgroundColor: '#292525',
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Form
              onFinish={onFinish}
              initialValues={{ remember: true }}
              style={{
                maxWidth: 350,
                margin: 'auto',
                width: '500px',
                marginTop: '100px',
                border: '1px solid #ddd',
                padding: '20px',
                borderRadius: '5px',
                backgroundColor: 'white',
              }}
              layout='vertical'
            >
              <div
                style={{
                  display: 'flex',
                  // flexDirection: "column",
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingBottom: '10px',
                }}
              >
                <div>
                  <img
                    height={80}
                    width={250}
                    style={{
                      marginBottom: '10px',
                    }}
                    src={loginImage}
                    alt=''
                  />{' '}
                  <div style={{ textAlign: 'center', paddingBottom: '15px' }}>
                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      Reset Password
                    </p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#cdcbcb',
                  padding: '6px',
                  marginBottom: '1rem',
                }}
              >
                <Form.Item
                  name='password'
                  label='Enter new password'
                  rules={[
                    { required: true, message: 'Please enter password!' },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder='Enter new password'
                    style={{ border: 'none' }}
                  />
                </Form.Item>
                <Form.Item
                  name='password2'
                  label='Retype new password'
                  rules={[
                    { required: true, message: 'Please retype new password!' },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder='Retype password'
                    style={{ border: 'none' }}
                  />
                </Form.Item>
              </div>
              <div style={{ textAlign: 'center', padding: '15px 0px' }}>
                {' '}
                <Button
                  htmlType='submit'
                  type='primary'
                  loading={isLoading}
                  style={{ width: '40%' }}
                >
                  Submit
                </Button>
              </div>
              <div
                style={{
                  textAlign: 'center',
                  padding: '10px 10px',
                  borderTop: '1px solid gray',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span>
                    <Link to='/login'>Go Back</Link>
                  </span>
                </div>
              </div>
            </Form>
          </div>
        </motion.div>{' '}
      </motion.div>
    </>
  );
};

export default ResetPassword;
