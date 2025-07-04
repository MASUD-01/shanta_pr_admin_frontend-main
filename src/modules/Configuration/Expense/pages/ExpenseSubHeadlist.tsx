/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Input, Row, Table, theme, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCommonModal } from '../../../../app/slice/modalSlice';
import CreateExpenseSubHead from '../components/CreateExpenseSubHead';
import { ExpenseSubTableColumns } from '../utils/ExpenseTableColoumns';
import { useSearchParams } from 'react-router-dom';
import { IExpenseParams } from '../types/ExpenseTypes';
import { useEffect, useState } from 'react';
import { useGetExpenseSubHeadQuery } from '../api/ExpenseEndPoint';
import { CreateButton } from '../../../../common/submitButton/CommonButton';
import { useGetMeQuery } from '../../../../app/api/userApi/userApi';
import { generatePagination } from '../../../../common/TablePagination';
import { debounce } from 'lodash';
import { globalTheme } from '../../../../app/slice/themeSlice';

const ExpenseSubHeadlist = () => {
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

  const { data, isLoading, isFetching } = useGetExpenseSubHeadQuery({
    ...filter,
  });

  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;

  const expenseSubList = profileInfo?.find(
    (i: any) => i?.module_name === 'Expense'
  );

  const expenseSub = expenseSubList?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'Expense Sub Head'
  );

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
        title: 'Create Expense Sub Head',
        content: <CreateExpenseSubHead />,
        show: true,
      })
    );
  };

  return (
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
              {`Expense Sub Head List (${data?.total || 0})`}
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
              marginTop: '20px',
            }}
          >
            <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
              <Input
                placeholder='Search by sub head'
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
            themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
          }
          style={{ marginTop: '25px' }}
        >
          <Table
            loading={isLoading || isFetching}
            size='small'
            bordered
            rowKey={'id'}
            dataSource={data?.data?.length ? data?.data : []}
            columns={ExpenseSubTableColumns(expenseSub)}
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
          />
        </div>
      </Card>
    </div>
  );
};

export default ExpenseSubHeadlist;
