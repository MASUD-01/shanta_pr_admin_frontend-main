/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
import { Card, Table, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMeQuery } from '../../../../../app/api/userApi/userApi';
import { useGetClientBillAdjQuery } from '../api/ClientBillAdjustmentEndpoint';
import { setCommonModal } from '../../../../../app/slice/modalSlice';
import { PrimaryButton } from '../../../../../common/submitButton/CommonButton';
import { PlusOutlined } from '@ant-design/icons';
import { ClientBillAdjTableColumns } from '../utils/ClientBillAdjTableColumns';
import { generatePagination } from '../../../../../common/TablePagination';
import AddClientBalance from '../components/AddClientBalance';
import { globalTheme } from '../../../../../app/slice/themeSlice';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ClientBillAdjustment = () => {
  const dispatch = useDispatch();
  const themeGlobal = useSelector(globalTheme);
  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;
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

  const account = profileInfo?.find((i: any) => i?.module_name === 'Accounts');

  const balanceAdjustment = account?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'Client Balance Adjustment'
  );

  const { data, isLoading } = useGetClientBillAdjQuery({ ...filter });
  const showModal = () => {
    dispatch(
      setCommonModal({
        title: 'Add Adjust Client Balance',
        content: <AddClientBalance />,
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
        title={`Client Balance Adjustment (${data?.total || 0})`}
        extra={
          balanceAdjustment?.permissions?.write ? (
            <PrimaryButton
              name='Adjust Client Balance'
              icon={<PlusOutlined />}
              onClick={showModal}
            />
          ) : null
        }
      >
        <div>
          <Table
            className={
              themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
            }
            size='small'
            bordered
            rowKey={'id'}
            dataSource={data?.data?.length ? data?.data : []}
            columns={ClientBillAdjTableColumns()}
            scroll={{ x: true }}
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
            loading={isLoading}
          />
        </div>
      </Card>
    </>
  );
};

export default ClientBillAdjustment;
