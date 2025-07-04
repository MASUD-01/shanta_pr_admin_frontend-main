import { motion } from 'framer-motion';
import { Button, Form, Input } from 'antd';
import loginImage from '../../../../public/shantaLogo.jpg';
import { useMatchOtpMutation } from '../api/forgetApi';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const MatchOtp = ({ setStateSuccess }: any) => {
  const [matchOtp, { data, isSuccess, isLoading }] = useMatchOtpMutation();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  console.log(data);
  const onFinish = (values: any) => {
    const body = { email, otp: values.otp, type: 'reset_user' };
    matchOtp(body);
  };

  useEffect(() => {
    if (isSuccess) {
      setStateSuccess((prevState: any) => ({
        ...prevState,
        successMatchOtp: true,
      }));
      localStorage.setItem('reset_token', data?.token);
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
                      Match OTP
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
                  name='otp'
                  label='Enter OTP'
                  rules={[{ required: true, message: 'Please enter otp!' }]}
                >
                  <Input
                    placeholder='Enter OTP'
                    style={{ border: 'none' }}
                    type='number'
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
                  Next
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

export default MatchOtp;
