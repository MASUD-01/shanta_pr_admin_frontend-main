/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Input, Row, Table, theme, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCommonModal } from '../../../../app/slice/modalSlice';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { tablePagination } from '../../../../common/TablePagination';
import { CreateButton } from '../../../../common/submitButton/CommonButton';
import { useGetDesignationQuery } from '../api/DesignationEndPoints';
import { IDesignationParams } from '../types/DesignationTypes';
import { DesignationTableColumns } from '../utils/DesignationTableColumns';
import CreateDesignation from '../components/CreateDesignation';
import { globalTheme } from '../../../../app/slice/themeSlice';
import { useGetMeQuery } from '../../../../app/api/userApi/userApi';

const Designationlist = () => {
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

  const designationSub = configList?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'Designation'
  );
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '100';
  const skipValue = Number(page) * Number(pageSize);
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState<IDesignationParams>({
    limit: 100,
    skip: skipValue - 100,
  });
  const { data, isLoading, isFetching } = useGetDesignationQuery({ ...filter });
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
        title: 'Add Designation',
        content: <CreateDesignation />,
        show: true,
      })
    );
  };

  return (
    <>
      <div>
        <Card>
          <div
            style={{
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
                {`Designation List (${data?.total || 0})`}
              </Typography.Title>
              {designationSub?.permissions?.write && (
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
                  placeholder='Search'
                  onChange={(e) =>
                    e.target.value
                      ? setSearchValue(e.target.value)
                      : setSearchValue('')
                  }
                />
              </Col>
            </Row>
          </div>
          <div
            className={
              themeGlobal.theme === theme.defaultAlgorithm
                ? 'custom-table'
                : ' '
            }
            style={{ marginTop: '25px' }}
          >
            <Table
              loading={isLoading || isFetching}
              size='small'
              bordered
              rowKey={'id'}
              dataSource={data?.data?.length ? data?.data : []}
              columns={DesignationTableColumns(designationSub)}
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

export default Designationlist;
