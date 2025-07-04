/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleRoleQuery } from '../api/RolePermissionEndPoint';
import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd';
import UpdateRole from '../components/UpdateRolePermission';
import { useGetMeQuery } from '../../../app/api/userApi/userApi';

const SingleRole = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;

  const administrationList = profileInfo?.find(
    (i: any) => i?.module_name === 'Administration'
  );

  const roleSub = administrationList?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'Role List'
  );

  const { data: singleRole } = useGetSingleRoleQuery(Number(id));
  const getStatusColor = (value: string) => {
    switch (value) {
      case 'read':
        return 'blue';
      case 'write':
        return 'cyan';
      case 'update':
        return 'green';
      case 'delete':
        return 'red';
      default:
        return '';
    }
  };

  const getStatusText = (value: string) => {
    switch (value) {
      case 'read':
        return 'Read';
      case 'write':
        return 'Write';
      case 'update':
        return 'Update';
      case 'delete':
        return 'Delete';
      default:
        return 'N/A';
    }
  };

  return (
    <div>
      <Row justify='center' align='middle' style={{ maxWidth: 'auto' }}>
        <Col xl={24} lg={24} xs={24}>
          <div style={{ marginBottom: '10px' }}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* <BackButton /> */}
                <Typography.Title level={4} style={{ textAlign: 'center' }}>
                  Role Name : {singleRole?.data?.role_name || 'N/A'}
                </Typography.Title>
                {roleSub?.permissions?.update &&
                  !singleRole?.data?.main_role && (
                    <Button
                      onClick={() => setOpen(true)}
                      type='primary'
                      style={{ borderRadius: '50px' }}
                    >
                      Update
                    </Button>
                  )}
              </div>
            </Card>
          </div>
          <Card bordered={false} style={{ height: '100%' }}>
            <Space
              direction='vertical'
              style={{ width: '100%', height: '100%' }}
            >
              <Space direction='vertical' style={{ width: '100%' }}>
                {/* <Typography.Title level={3} style={{ textAlign: "center" }}>
                  Role Name: {singleRole?.data?.role_name || "N/A"}
                </Typography.Title> */}

                {singleRole?.data?.modules.map(
                  (permission: any, index: number) => (
                    <Card
                      style={{
                        border: '1px solid #d9d9d9',
                        borderRadius: '2px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
                        marginBottom: '16px',
                      }}
                      key={permission.module_id}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                          }}
                        >
                          <span>{index + 1} &#41; Permission Group Name :</span>
                          <span>{permission.module_name || 'N/A'}</span>
                        </div>
                        <br />

                        {permission?.sub_modules?.map(
                          (submodule: any, index: number) => (
                            <div
                              key={submodule.sub_module_id}
                              style={{
                                marginLeft: '20px',
                                marginBottom: '16px',
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'baseline',
                                  gap: '8px',
                                }}
                              >
                                <span>{index + 1} &#46;</span>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '16px',
                                    // fontWeight: "bold",
                                  }}
                                >
                                  <span>
                                    Submodule Name (permission name) :
                                  </span>
                                  <span>
                                    {submodule.sub_module_name || 'N/A'}
                                  </span>
                                </div>
                              </div>

                              <div style={{ marginLeft: '20px' }}>
                                <div>
                                  {Object.entries(submodule?.permissions)
                                    .filter(
                                      ([_permission, isAllowed]) => isAllowed
                                    )
                                    .map(([permission], index) => (
                                      <Tag
                                        color={getStatusColor(permission)}
                                        key={index}
                                        style={{ marginBottom: '8px' }}
                                      >
                                        {getStatusText(permission)}
                                      </Tag>
                                    ))}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </Card>
                  )
                )}
              </Space>
            </Space>
          </Card>
        </Col>
      </Row>
      {open == true && (
        <UpdateRole
          open={open}
          setOpen={setOpen}
          id={id}
          singleRole={singleRole}
        />
      )}
    </div>
  );
};

export default SingleRole;
