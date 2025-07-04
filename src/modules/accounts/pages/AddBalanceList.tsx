/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
import { Card, Table, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCommonModal } from '../../../app/slice/modalSlice';
import AddBalance from '../components/AddBalance';
import { PlusOutlined } from '@ant-design/icons';
import { useGetAddBalanceQuery } from '../api/AddBalanceEndPoint';
import { BalanceListTableColumns } from '../utils/BalanceListTableColumns';
import { generatePagination } from '../../../common/TablePagination';
import { PrimaryButton } from '../../../common/submitButton/CommonButton';
import { useGetMeQuery } from '../../../app/api/userApi/userApi';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { globalTheme } from '../../../app/slice/themeSlice';

const AddBalanceList = () => {
  const themeGlobal = useSelector(globalTheme);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  });

  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    pageSize: '100',
  });
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '100';
  const skipValue = (Number(page) - 1) * Number(pageSize);

  const [filter, setFilter] = useState<any>({
    limit: Number(pageSize),
    skip: skipValue,
  });

  useEffect(() => {
    setFilter({
      limit: Number(pageSize),
      skip: skipValue,
    });
  }, [page, pageSize, skipValue]);

  const dispatch = useDispatch();

  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;

  const account = profileInfo?.find((i: any) => i?.module_name === 'Accounts');

  const balanceAdjustment = account?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'Balance Adjustment'
  );

  const { data, isLoading, isFetching } = useGetAddBalanceQuery({ ...filter });
  const showModal = () => {
    dispatch(
      setCommonModal({
        title: 'Add Balance',
        content: <AddBalance />,
        show: true,
        width: 700,
      })
    );
  };
  return (
    <>
      <Card
        styles={{
          header: {
            backgroundColor:
              themeGlobal.theme === theme.defaultAlgorithm
                ? '#C3E6CB'
                : '#121212',
          },
        }}
        title={`Adjust Balance History (${data?.total || 0})`}
        extra={
          balanceAdjustment?.permissions?.write ? (
            <PrimaryButton
              name='Add Balance'
              icon={<PlusOutlined />}
              onClick={showModal}
            />
          ) : null
        }
      >
        <div
          className={
            themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
          }
        >
          <Table
            size='small'
            bordered
            rowKey={'id'}
            dataSource={data?.data?.length ? data?.data : []}
            columns={BalanceListTableColumns()}
            pagination={{
              ...generatePagination(
                Number(data?.total),
                setPagination,
                pagination
              ),
              current: Number(page),
              showSizeChanger: true,
              defaultPageSize: pageSize ? Number(pageSize) : 100,
              pageSizeOptions: ['50', '100', '200', '300', '400', '500'],
              total: data ? Number(data?.total) : 0,
              showTotal: (total) => `Total ${total} `,
            }}
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
            loading={isLoading || isFetching}
          />
        </div>
      </Card>
    </>
  );
};

export default AddBalanceList;
