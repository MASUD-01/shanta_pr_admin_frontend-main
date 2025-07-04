/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, Row, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../../../app/features/userSlice';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '../../../app/api/userApi/userApi';
import { imageURL } from '../../../app/slice/baseQuery';
import { BiLogOutCircle } from 'react-icons/bi';
import { setCommonModal } from '../../../app/slice/modalSlice';
import UpdateProfile from './UpdateProfile';
import { api } from '../../../app/api/userApi/api';
import UpdatePassword from './UpdatePassword';

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(api.util.resetApiState());
    dispatch(setLogout());
    navigate('/login');
  };
  const dispatch = useDispatch();
  const { data: profile } = useGetMeQuery();

  const showModal = (record: any) => {
    dispatch(
      setCommonModal({
        title: 'Update Profile',
        content: <UpdateProfile record={record.data} />,
        show: true,
      })
    );
  };

  const showModal2 = () => {
    dispatch(
      setCommonModal({
        title: 'Update Password',
        content: <UpdatePassword />,
        show: true,
      })
    );
  };
  return (
    <Card
      style={{
        boxShadow: '0 0 20px 3px rgba(150,190,238,.15)',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
      title={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            overflow: 'hidden',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
            }}
          >
            <ArrowLeftOutlined
              onClick={() => {
                window.history.back();
              }}
            />
            <span style={{ paddingLeft: '10px' }}>Profile</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ padding: '10px 0px' }}>
              <Tag color={profile?.data?.status ? 'green' : 'red'}>
                {profile?.data?.status ? 'Active' : 'Inactive'}
              </Tag>
            </p>

            <Button
              size='small'
              type='primary'
              style={{
                background: '#00b4e9',
                fontSize: '15px',
                marginRight: '20px',
              }}
              onClick={() => showModal(profile)}
            >
              Update Profile
            </Button>
            <Button
              size='small'
              type='primary'
              style={{
                background: '#00b4e9',
                fontSize: '15px',
              }}
              onClick={showModal2}
            >
              Change Password
            </Button>
          </div>
        </div>
      }
    >
      <Row>
        <Col
          xs={24}
          md={10}
          lg={6}
          style={{
            textAlign: 'center',
            alignSelf: 'center',
          }}
        >
          <Avatar
            size={{ xs: 60, sm: 80, md: 100, lg: 120, xl: 160, xxl: 180 }}
            src={
              profile?.data?.photo
                ? imageURL + profile?.data?.photo
                : '../../../assets/male_Avatar.jpg'
            }
            alt={`${profile?.data?.photo}'s Avatar`}
          />
        </Col>
        <Col xs={24} md={14} lg={18}>
          {/* Display user information */}
          <div style={{ marginBottom: '10px' }}>
            <p>Name: {profile?.data?.name}</p>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <p>Email: {profile?.data?.email}</p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <p>Phone Number: {profile?.data?.phone_number}</p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <p>
              Role:{' '}
              <Tag
                color={
                  profile?.data?.role === 'admin'
                    ? 'green'
                    : profile?.data?.role === 'Super Admin'
                    ? 'green'
                    : 'red'
                }
              >
                {profile?.data?.role || 'N/A'}
              </Tag>
            </p>
          </div>
        </Col>
        <Divider />
        <Col
          xs={24}
          style={{
            textAlign: 'end',
          }}
        >
          <Button onClick={() => handleLogout()} icon={<BiLogOutCircle />}>
            Logout
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Profile;
