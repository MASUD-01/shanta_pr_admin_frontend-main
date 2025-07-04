/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Input, Row, Table, theme, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCommonModal } from '../../../../app/slice/modalSlice';
import CreateDepartment from '../components/CreateDepartment';
import { useGetDepartmentQuery } from '../api/departmentEndPoint';
import { DepartmentTableColumns } from '../utils/DepartmentTableColumns';
import { useSearchParams } from 'react-router-dom';
import { IDepartmentParams } from '../types/departmentTypes';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { tablePagination } from '../../../../common/TablePagination';
import { CreateButton } from '../../../../common/submitButton/CommonButton';
import { useGetMeQuery } from '../../../../app/api/userApi/userApi';
import { globalTheme } from '../../../../app/slice/themeSlice';

const DepartmentList = () => {
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

  const departmentSub = configList?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'Department'
  );

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '100';
  const skipValue = Number(page) * Number(pageSize);
  const [filter, setFilter] = useState<IDepartmentParams>({
    limit: 100,
    skip: skipValue - 100,
  });
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading, isFetching } = useGetDepartmentQuery({ ...filter });

  useEffect(() => {
    const onSearchDebounced = debounce(() => {
      if (searchValue.trim() !== '') {
        setFilter((prevFilter) => ({
          ...prevFilter,
          name: searchValue,
          skip: 0,
        }));
      } else {
        setFilter((prevFilter) => ({
          ...prevFilter,
          name: undefined,
          skip: skipValue - 100,
        }));
      }
    }, 500);
    onSearchDebounced();
    return () => {
      onSearchDebounced.cancel();
    };
  }, [searchValue, skipValue]);
  const showModal = () => {
    dispatch(
      setCommonModal({
        title: 'Create Department',
        content: <CreateDepartment />,
        show: true,
        width: 700,
      })
    );
  };

  return (
    <>
      <div>
        <Card>
          <div
            style={{
              // backgroundColor: "#C3E6CB",
              padding: '10px 4px 4px  4px',
              borderRadius: '10px 10px 0px 0px',
            }}
            className={
              themeGlobal.theme === theme.defaultAlgorithm
                ? 'custom-header'
                : 'header-dark'
            }
          >
            <Row
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography.Title level={5} style={{ margin: 0 }}>
                {`Department List (${data?.total || 0})`}
              </Typography.Title>
              {departmentSub?.permissions?.write && (
                <CreateButton name='Add New' onClick={showModal} />
              )}
            </Row>
            <Row
              gutter={[5, 5]}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '20px 0px',
              }}
            >
              <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
                <Input
                  placeholder='Search by department '
                  onChange={(e) =>
                    e.target.value
                      ? setSearchValue(e.target.value)
                      : setSearchValue('')
                  }
                />
              </Col>
            </Row>
          </div>
          <>
            <Table
              className={
                themeGlobal.theme === theme.defaultAlgorithm
                  ? 'custom-table'
                  : ' '
              }
              style={{ marginTop: '25px' }}
              rowKey={'id'}
              size='small'
              loading={isLoading || isFetching}
              bordered
              dataSource={data?.data?.length ? data?.data : []}
              columns={DepartmentTableColumns(departmentSub)}
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
                Number(data?.total) !== undefined && Number(data?.total) > 100
                  ? {
                      ...tablePagination,
                      current: Number(page),
                    }
                  : false
              }
            />
          </>
        </Card>
      </div>
    </>
  );
};

export default DepartmentList;
