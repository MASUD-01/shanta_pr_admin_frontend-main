/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Table, theme } from 'antd';
import { useGetAdminQuery } from '../api/adminEndPoint';
import { useAppDispatch } from '../../../app/store/store';
import { setCommonModal } from '../../../app/slice/modalSlice';
import CreateAdmin from '../components/CreateAdmin';
import { AdminTableColumns } from '../utils/AdminTableColumns';
import { PrimaryButton } from '../../../common/submitButton/CommonButton';
import { generatePagination } from '../../../common/TablePagination';
import { useState } from 'react';
import { useGetMeQuery } from '../../../app/api/userApi/userApi';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';

const AdminList = () => {
  const themeGlobal = useSelector(globalTheme);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  });
  const { data, isLoading } = useGetAdminQuery();
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
        title: 'Create admin ',
        content: <CreateAdmin />,
        show: true,
      })
    );
  };
  return (
    <>
      <Row justify='center' align='middle' style={{ maxWidth: 'auto' }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            title={`Admin List (${data?.total || 0})`}
            styles={{
              header: {
                backgroundColor:
                  themeGlobal.theme === theme.defaultAlgorithm
                    ? '#C3E6CB'
                    : '#121212',
              },
            }}
            style={{
              boxShadow: '0 0 0 1px rgba(0,0,0,.05)',
              marginBottom: '1rem',
            }}
            extra={
              administrationSub?.permissions?.write && (
                <PrimaryButton name=' Create admin' onClick={showModal} />
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
                columns={AdminTableColumns()}
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
      </Row>
    </>
  );
};

export default AdminList;
