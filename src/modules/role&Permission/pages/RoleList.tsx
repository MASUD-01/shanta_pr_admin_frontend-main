/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Row, Table, theme } from 'antd';
import { generatePagination } from '../../../common/TablePagination';
import { useState } from 'react';
import { useGetRolePermissionQuery } from '../api/RolePermissionEndPoint';
import { RoleTableColumns } from '../uitls/RoleTableColumns';
import CreateRolePermission from '../components/CreateRolePermission';
import { useGetMeQuery } from '../../../app/api/userApi/userApi';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';

const RoleList = () => {
  const themeGlobal = useSelector(globalTheme);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  });
  const { data, isLoading } = useGetRolePermissionQuery();

  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;

  const administrationList = profileInfo?.find(
    (i: any) => i?.module_name === 'Administration'
  );

  const roleSub = administrationList?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'Role List'
  );

  const [showModal, setShowModal] = useState(false);

  // const dispatch = useAppDispatch();

  // const showModal = () => {
  //   dispatch(
  //     setCommonModal({
  //       title: "Create Role & Permission ",
  //       content: <CreateAdmin />,
  //       show: true,
  //       // width: "800px",
  //     })
  //   );
  // };

  return (
    <>
      <Row justify='center' align='middle' style={{ maxWidth: 'auto' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            styles={{
              header: {
                backgroundColor:
                  themeGlobal.theme === theme.defaultAlgorithm
                    ? '#C3E6CB'
                    : '#121212',
              },
            }}
            title={`Role Permission List (${data?.total || 0})`}
            extra={
              roleSub?.permissions?.write && (
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Button type='primary' onClick={() => setShowModal(true)}>
                    Create
                  </Button>
                </Col>
              )
            }
          >
            <div className='color'>
              <Table
                className={
                  themeGlobal.theme === theme.defaultAlgorithm
                    ? 'custom-table'
                    : ' '
                }
                rowKey={'id'}
                size='small'
                bordered
                loading={isLoading}
                columns={RoleTableColumns}
                dataSource={data?.data?.length ? data?.data : []}
                scroll={{ x: true }}
                pagination={generatePagination(
                  Number(data?.total),
                  setPagination,
                  pagination
                )}
              />
            </div>
          </Card>
        </Col>
        {showModal == true && (
          <CreateRolePermission
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </Row>
    </>
  );
};

export default RoleList;
