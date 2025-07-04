/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Input, Row, Table, theme, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCommonModal } from '../../../../app/slice/modalSlice';
import CreateExpenseHead from '../components/CreateExpenseHead';

import { ExpenseHeadTableColumns } from '../utils/ExpenseTableColoumns';
import { useSearchParams } from 'react-router-dom';
import { IExpenseParams } from '../types/ExpenseTypes';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useGetExpenseHeadQuery } from '../api/ExpenseEndPoint';
import { CreateButton } from '../../../../common/submitButton/CommonButton';
import { useGetMeQuery } from '../../../../app/api/userApi/userApi';
import { generatePagination } from '../../../../common/TablePagination';
import { globalTheme } from '../../../../app/slice/themeSlice';

const ExpenseHeadlist = () => {
  const themeGlobal = useSelector(globalTheme);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    pageSize: '100',
  });

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  });

  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;

  const expenseList = profileInfo?.find(
    (i: any) => i?.module_name === 'Expense'
  );

  const expenseSub = expenseList?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'Expense Head'
  );

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '100';
  const skipValue = (Number(page) - 1) * Number(pageSize);
  const [searchValue, setSearchValue] = useState('');

  const [filter, setFilter] = useState<IExpenseParams>({
    limit: Number(pageSize),
    skip: skipValue,
  });
  useEffect(() => {
    setFilter({
      limit: Number(pageSize),
      skip: skipValue,
    });
  }, [page, pageSize, skipValue]);
  const { data, isLoading } = useGetExpenseHeadQuery({ ...filter });
  useEffect(() => {
    const onSearchDebounced = debounce(() => {
      if (searchValue.trim() !== '') {
        setFilter((prevFilter) => ({
          ...prevFilter,
          name: searchValue,
        }));
      } else {
        setFilter((prevFilter) => ({
          ...prevFilter,
          name: undefined,
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
        title: 'Create Expense Head',
        content: <CreateExpenseHead />,
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
                {`Expense Head List (${data?.total || 0})`}
              </Typography.Title>
              {expenseSub?.permissions?.write && (
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
                  placeholder='Search by head name'
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
                  : ''
              }
              style={{ marginTop: '25px' }}
              loading={isLoading}
              size='small'
              bordered
              rowKey={'id'}
              dataSource={data?.data?.length ? data?.data : []}
              columns={ExpenseHeadTableColumns(expenseSub)}
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
      </div>
    </>
  );
};

export default ExpenseHeadlist;
