/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
import { Card, Col, DatePicker, Form, Row, Table, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCommonModal } from '../../../app/slice/modalSlice';
import { PlusOutlined } from '@ant-design/icons';
import CreateTransferBalance from '../components/CreateTransferBalance';
import { useGetTransferBalanceQuery } from '../api/transferBalanceEndPoint';
import { BalanceTransferTableColumns } from '../utils/BalanceTransferTableColumns';
import { PrimaryButton } from '../../../common/submitButton/CommonButton';
import { useGetMeQuery } from '../../../app/api/userApi/userApi';
import { useEffect, useState } from 'react';
import { generatePagination } from '../../../common/TablePagination';
import { globalTheme } from '../../../app/slice/themeSlice';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import SetQueyInUrl from '../../../common/applayout/utils/SetQueyInUrl';
import { ISearchBalanceTransfer } from './ClientBillAdjustment/types/ClientBillTypes';
import CommSearchInput from '../../../common/Input/CommSearchInput';
import CommonAccountSelect from '../components/CommonAccountSelect';

const BalanceTransfer = () => {
  const themeGlobal = useSelector(globalTheme);
  const dispatch = useDispatch();

  const oneMonthAgoDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
  const todayDate = dayjs().format('YYYY-MM-DD');
  const [form] = useForm();
  const { searchParams, setSearchParams } = SetQueyInUrl();
  const from_date = searchParams.get('from_date');
  const to_date = searchParams.get('to_date');
  const from_account = searchParams.get('from_account');
  const to_account = searchParams.get('to_account');
  const limit = searchParams.get('limit');
  const skip = searchParams.get('skip');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  });
  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '100';
  const skipValue = (Number(page) - 1) * Number(pageSize);

  const [filter, setFilter] = useState<any>({
    limit: Number(pageSize),
    skip: skipValue,
  });
  const [filterItem, setFilterItem] = useState<ISearchBalanceTransfer>({
    from_date: from_date ? from_date : oneMonthAgoDate,
    to_date: to_date ? to_date : todayDate,
    from_account: from_account ? from_account : undefined,
    to_account: to_account ? to_account : undefined,
    limit: limit ? Number(limit) : 100,
    skip: skip ? skip : '0',
    balance_transfer_no: '',
  });
  useEffect(() => {
    setFilter({
      limit: Number(pageSize),
      skip: skipValue,
    });
  }, [page, pageSize, skipValue]);

  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;

  const account = profileInfo?.find((i: any) => i?.module_name === 'Accounts');

  const balanceTransfer = account?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'Balance Transfer'
  );
  const valuesWithData: any = {} as ISearchBalanceTransfer;
  for (const key of Object.keys(
    filterItem
  ) as (keyof ISearchBalanceTransfer)[]) {
    if (filterItem.hasOwnProperty(key) && filterItem[key]) {
      valuesWithData[key] = filterItem[key];
    }
  }
  const { data, isLoading, isFetching } = useGetTransferBalanceQuery({
    ...valuesWithData,
  });

  useEffect(() => {
    setSearchParams(valuesWithData);
  }, [filterItem]);
  useEffect(() => {
    if (limit && skip) {
      setFilterItem({
        ...filterItem,
        limit: Number(limit),
        skip: String(skip),
      });
    }
  }, [filter]);
  const showModal = () => {
    dispatch(
      setCommonModal({
        title: 'Transfer Balance',
        content: <CreateTransferBalance />,
        show: true,
        // width: 1000,
      })
    );
  };
  return (
    <>
      <div
        style={{
          borderTopRightRadius: '7px',
          borderTopLeftRadius: '7px',
          padding: '15px 24px',
          backgroundColor:
            themeGlobal.theme === theme.defaultAlgorithm
              ? '#C3E6CB'
              : '#121212',
          marginBottom: '-5px',
        }}
      >
        <Row align={'middle'}>
          <Col xs={24} sm={24} md={8} lg={6}></Col>
          <Col xs={24} sm={24} md={16} lg={18}>
            <Form form={form}>
              <Row
                gutter={[5, 5]}
                align={'middle'}
                justify={'end'}
                style={{ marginTop: '0px' }}
              >
                <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                  <CommSearchInput
                    placeholder='Search by bal_tx_no.'
                    onChange={(e) => {
                      setFilterItem((prev) => ({
                        ...prev,
                        balance_transfer_no: e,
                      }));
                    }}
                  />
                </Col>

                <CommonAccountSelect
                  margin={'0px'}
                  name={'from_account'}
                  md={12}
                  lg={8}
                  xl={6}
                  placeholder='Search by from account'
                  onSelect={(e: string) =>
                    setFilterItem((prev) => ({
                      ...prev,
                      from_account: e,
                    }))
                  }
                />

                <CommonAccountSelect
                  margin={'0px'}
                  name={'to_account'}
                  md={12}
                  lg={8}
                  xl={6}
                  placeholder='Search by to account'
                  onSelect={(e: string) =>
                    setFilterItem((prev) => ({
                      ...prev,
                      to_account: e,
                    }))
                  }
                />

                <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                  <DatePicker.RangePicker
                    defaultValue={[
                      from_date
                        ? dayjs(from_date)
                        : dayjs().subtract(1, 'month'),
                      to_date ? dayjs(to_date) : dayjs(),
                    ]}
                    style={{ width: '100%' }}
                    format='YYYY-MM-DD'
                    onChange={(e) => {
                      if (e?.length) {
                        setFilterItem({
                          ...filterItem,
                          from_date: dayjs(e[0]).format('YYYY-MM-DD'),
                          to_date: dayjs(e[1]).format('YYYY-MM-DD'),
                        });
                      } else {
                        setFilterItem({
                          ...filterItem,
                          from_date: '',
                          to_date: '',
                        });
                      }
                    }}
                  />
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
      <Card
        styles={{}}
        title={`Balance Transfer (${data?.total || 0})`}
        extra={
          balanceTransfer?.permissions?.write ? (
            <PrimaryButton
              name='Transfer Balance'
              icon={<PlusOutlined />}
              onClick={showModal}
            />
          ) : null
        }
      >
        <>
          <Table
            className={
              themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
            }
            size='small'
            bordered
            rowKey={'id'}
            loading={isLoading || isFetching}
            dataSource={data?.data?.length ? data?.data : []}
            columns={BalanceTransferTableColumns()}
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
          />
        </>
      </Card>
    </>
  );
};

export default BalanceTransfer;
