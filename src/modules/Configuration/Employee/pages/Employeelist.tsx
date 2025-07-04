/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Row, Table, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setCommonModal } from '../../../../app/slice/modalSlice';
import CreateEmployee from '../components/CreateEmployee';
import { EmployeeTableColumns } from '../utils/EmployeeTableColumns';
import { useGetEmployeesQuery } from '../api/employeeEndPoint';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { IEmployeeParams } from '../types/employeeTypes';
import { tablePagination } from '../../../../common/TablePagination';
import { useGetMeQuery } from '../../../../app/api/userApi/userApi';
import { globalTheme } from '../../../../app/slice/themeSlice';

const EmployeeList = () => {
  const themeGlobal = useSelector(globalTheme);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({
    page: '',
    pageSize: '',
  });

  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;

  const configList = profileInfo?.find(
    (i: any) => i?.module_name === 'Configuration'
  );

  const employeeSub = configList?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'Employee'
  );

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '100';
  const skipValue = Number(page) * Number(pageSize);
  const [filter, setFilter] = useState<IEmployeeParams>({
    limit: 100,
    skip: skipValue - 100,
  });
  const { data, isLoading } = useGetEmployeesQuery({ ...filter });

  const showModal = () => {
    dispatch(
      setCommonModal({
        title: 'Create Employee',
        content: <CreateEmployee />,
        show: true,
        width: 1000,
      })
    );
  };

  return (
    <>
      <div>
        <Card
          styles={{
            header: {
              backgroundColor:
                themeGlobal.theme === theme.defaultAlgorithm
                  ? '#C3E6CB'
                  : '#121212',
            },
          }}
          title={`Employee List (${data?.total || 0})`}
          style={{
            boxShadow: '0 0 0 1px rgba(0,0,0,.05)',
            marginBottom: '1rem',
          }}
          extra={
            employeeSub?.permissions?.write && (
              <Row gutter={[16, 24]}>
                <Col xs={24} md={12} xxl={12}>
                  <Button
                    style={{ background: 'green' }}
                    onClick={showModal}
                    type='primary'
                    icon={<PlusOutlined />}
                  >
                    Employee
                  </Button>
                </Col>
                {/* <Col xs={24} md={12} xxl={12}>
                  <Button
                    style={{ background: "blue" }}
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModalInc}
                  >
                    Increment
                  </Button>
                </Col> */}
              </Row>
            )
          }
        >
          <div
            className={
              themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
            }
          >
            <Table
              rowKey={'id'}
              size='small'
              bordered
              loading={isLoading}
              dataSource={data?.data?.length ? data.data : []}
              columns={EmployeeTableColumns(employeeSub)}
              scroll={{ x: true }}
              onChange={(pagination) => {
                setSearchParams({
                  page: String(pagination.current),
                  pageSize: String(pagination.pageSize),
                });
                setFilter({
                  ...filter,
                  skip:
                    ((pagination.current || 1) - 1) *
                    (pagination.pageSize || 100),
                  limit: pagination.pageSize!,
                });
              }}
              pagination={
                Number(data?.total) !== undefined && Number(data?.total) > 50
                  ? {
                      ...tablePagination,
                      current: Number(page),
                    }
                  : false
              }
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default EmployeeList;
