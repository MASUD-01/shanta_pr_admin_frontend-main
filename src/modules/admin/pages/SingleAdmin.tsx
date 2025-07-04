import {
  Typography,
  Row,
  Col,
  Card,
  Space,
  Descriptions,
  Avatar,
  Tag,
} from 'antd';
import { useParams } from 'react-router-dom';
import { useGetSingleAdminQuery } from '../api/adminEndPoint';
import { useAppDispatch } from '../../../app/store/store';
import { ISingleAdmin } from '../types/adminTypes';
import { setCommonModal } from '../../../app/slice/modalSlice';
import UpdateAdmin from '../components/UpdateAdmin';
import GlobalLoader from '../../../app/utils/GlobalLoader';
import { imageURL } from '../../../app/slice/baseQuery';
import { PrimaryButton } from '../../../common/submitButton/CommonButton';
import { useGetMeQuery } from '../../../app/api/userApi/userApi';

const SingleAdmin = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleAdminQuery(Number(id));
  const singleAdmin = (data?.data as ISingleAdmin) ?? {};
  const dispatch = useAppDispatch();

  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;

  const administrationList = profileInfo?.find(
    (i: any) => i?.module_name === 'Administration'
  );

  const administrationSub = administrationList?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'Admin'
  );

  const showModal = () => {
    dispatch(
      setCommonModal({
        title: 'Update admin ',
        content: <UpdateAdmin singleAdmin={singleAdmin} />,
        show: true,
        // width: "800px",
      })
    );
  };

  return (
    <>
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <>
          <Row style={{ marginTop: '1rem' }} gutter={[16, 16]}>
            <Col xl={6} lg={24} xs={24}>
              <Card bordered={false} style={{ height: '100%' }}>
                <Space
                  direction='vertical'
                  style={{ width: '100%', height: '100%' }}
                >
                  <Space
                    direction='vertical'
                    style={{ textAlign: 'center', width: '100%' }}
                  >
                    <Avatar
                      src={
                        singleAdmin.photo
                          ? imageURL + singleAdmin.photo
                          : `https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=2000`
                      }
                      style={{ width: '180px', height: '180px' }}
                    />
                    <Typography.Title level={5}>
                      {singleAdmin.username}
                    </Typography.Title>
                  </Space>
                </Space>
              </Card>
            </Col>

            <Col xl={18} xs={24}>
              <Card
                bordered={false}
                title={'Admin Details'}
                extra={
                  administrationSub?.permissions?.update && (
                    <PrimaryButton name='Update' onClick={showModal} />
                  )
                }
                style={{ height: '100%' }}
              >
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Descriptions
                    labelStyle={{ fontSize: '16px' }}
                    bordered={true}
                    column={2}
                    size='middle'
                  >
                    <Descriptions.Item label='Name'>
                      {singleAdmin.first_name} {singleAdmin.last_name}
                    </Descriptions.Item>
                    <Descriptions.Item label='Email Address'>
                      {singleAdmin.email || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label='Status'>
                      <Tag
                        color={singleAdmin.user_status ? 'success' : 'error'}
                      >
                        {singleAdmin.user_status
                          ? 'Active'
                          : 'Inactive' || 'N/A'}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label='Role'>
                      <Tag
                        color={
                          singleAdmin.role_name === 'super_admin'
                            ? '#d9f7be'
                            : singleAdmin.role_name === 'admin'
                            ? '#e6f4ff'
                            : '#fff7e6'
                        }
                        style={{ color: 'black' }}
                      >
                        {singleAdmin.role_name || 'N/A'}
                      </Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default SingleAdmin;
