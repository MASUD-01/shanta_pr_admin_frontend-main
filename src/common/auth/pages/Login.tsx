import { Button, ConfigProvider, Form, Input } from 'antd';
import loginImage from '../../../../public/shantaLogo.png';
import { useLoginMutation } from '../../../app/api/userApi/api';
import { LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CiUser } from 'react-icons/ci';

type IInputs = {
  email: string;
  password: string;
};
const Login = () => {
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const navigate = useNavigate();
  const onFinish = (values: IInputs) => {
    const body = {
      email: values.email,
      password: values.password,
    };

    login(body as any);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorBgContainer: '#7F7F19',
            activeBg: '#7F7F19',
            colorPrimary: 'white',
            colorText: 'white',
            colorTextPlaceholder: '#d0d0d0',
            hoverBorderColor: 'white',
            activeBorderColor: 'white',
            colorIcon: 'white',
          },
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            style={{
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                maxWidth: 350,
                margin: 'auto',
                width: '500px',
                marginTop: '100px',
                border: '1px solid #ddd',
                padding: '20px',
                borderRadius: '5px',
              }}
            >
              <Form onFinish={onFinish} initialValues={{ remember: true }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: '10px',
                  }}
                >
                  <div>
                    <img
                      height={300}
                      width={250}
                      style={{
                        marginBottom: '10px',
                      }}
                      src={loginImage}
                      alt=''
                    />
                    <div style={{ textAlign: 'center' }}>
                      <p
                        style={{
                          fontSize: '22px',
                          fontWeight: 'bold',
                          color: 'black',
                        }}
                      >
                        Login <br /> Property Management
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  style={
                    {
                      // padding: '6px',
                    }
                  }
                >
                  <Form.Item
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ]}
                  >
                    <Input
                      size='large'
                      placeholder='Enter your username or email'
                      style={{ border: 'none' }}
                      prefix={<CiUser />}
                    />
                  </Form.Item>

                  <Form.Item
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                    noStyle
                  >
                    <Input.Password
                      size='large'
                      prefix={<LockOutlined />}
                      placeholder='Password'
                    />
                  </Form.Item>
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '5px 0px',
                    borderBottom: '1px solid gray',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <span>
                      <Link
                        style={{
                          color: '#7F7F19',
                          fontSize: '15px',
                          fontWeight: 'bold',
                        }}
                        // to='/forget-password'
                        to=''
                      >
                        Forget Password
                      </Link>
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'center', padding: '0px 0 15px 0px' }}>
                  {' '}
                  <Button
                    htmlType='submit'
                    type='primary'
                    loading={isLoading}
                    style={{
                      color: 'white',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      width: '40%',
                      // background:
                      //   'linear-gradient(135deg, #27CCF5 0%, #53D9F7 50%, #1A98BF 100%)',
                    }}
                  >
                    Sign in
                  </Button>
                </div>
              </Form>

              {/* <SupportDetails /> */}
            </div>
          </div>
        </motion.div>{' '}
      </motion.div>
    </ConfigProvider>
  );
};

export default Login;
