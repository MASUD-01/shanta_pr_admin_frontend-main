/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { Button, ConfigProvider, Form, Input } from 'antd';
import loginImage from '../../../../public/shantaLogo.jpg';
import { MdOutlineEmail } from 'react-icons/md';
import { Link, useSearchParams } from 'react-router-dom';
import { useGetOTPMutation } from '../api/forgetApi';
import { useEffect } from 'react';
import SupportDetails from './SupportDetails';

const GetOtp = ({ setStateSuccess }: any) => {
  const [getOTP, { isSuccess, isLoading }] = useGetOTPMutation();
  const [_searchParams, setSearchParams] = useSearchParams();
  const onFinish = (values: any) => {
    const body = {
      email: values.email,
      type: 'reset_user',
    };

    console.log(body);
    getOTP(body);
    setSearchParams({ email: values?.email });
  };

  useEffect(() => {
    if (isSuccess) {
      setStateSuccess((prevState: any) => ({
        ...prevState,
        successOtp: true,
      }));
    }
  }, [isSuccess]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorBgContainer: '#107A9F',
            activeBg: '#107A9F',
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
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Form
              onFinish={onFinish}
              name='loginForm'
              initialValues={{ remember: true }}
              style={{
                maxWidth: 400,
                margin: 'auto',
                width: '500px',
                marginTop: '100px',
                border: '1px solid #ddd',
                padding: '20px',
                borderRadius: '5px',
              }}
              layout='vertical'
            >
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
                    height={80}
                    width={250}
                    style={{
                      marginBottom: '10px',
                    }}
                    src={loginImage}
                    alt=''
                  />{' '}
                  <div style={{ textAlign: 'center', paddingBottom: '15px' }}>
                    <p
                      style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: 'black',
                      }}
                    >
                      Forgot Password
                    </p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '6px',
                }}
              >
                <Form.Item
                  name='email'
                  label={
                    <span style={{ color: 'black' }}>Enter email address</span>
                  }
                  rules={[
                    { required: true, message: 'Please input your email!' },
                  ]}
                >
                  <Input
                    placeholder='Enter email address'
                    style={{ border: 'none' }}
                    prefix={<MdOutlineEmail />}
                  />
                </Form.Item>
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
                    background:
                      'linear-gradient(135deg, #27CCF5 0%, #53D9F7 50%, #1A98BF 100%)',
                  }}
                >
                  Get OTP
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
                    <Link
                      style={{
                        color: '#107A9F',
                        fontSize: '15px',
                        fontWeight: 'bold',
                      }}
                      to='/login'
                    >
                      Go Back
                    </Link>
                  </span>
                </div>
              </div>
              <SupportDetails />
            </Form>
          </div>
        </motion.div>{' '}
      </motion.div>
    </ConfigProvider>
  );
};

export default GetOtp;
