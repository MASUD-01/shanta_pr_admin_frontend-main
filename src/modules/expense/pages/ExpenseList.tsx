/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Table,
  theme,
  Typography,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCommonModal } from '../../../app/slice/modalSlice';
import CreateExpense from '../components/CreateExpense';
import { ExpenseTableColumns } from '../utils/ExpenseTableColumns';
import { useGetExpenseQuery } from '../api/expenseEndPoint';
import { generatePagination } from '../../../common/TablePagination';
import { CreateButton } from '../../../common/submitButton/CommonButton';
import { useEffect, useMemo, useState } from 'react';
import { useGetMeQuery } from '../../../app/api/userApi/userApi';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { globalTheme } from '../../../app/slice/themeSlice';
import { useForm, useWatch } from 'antd/es/form/Form';
import SetQueyInUrl from '../../../common/applayout/utils/SetQueyInUrl';
import SelectSubHead from '../components/SelectSubHead';
import SelectHead from '../components/SelectHead';

export interface FilterItem {
  start_date?: string;
  end_date?: string;
  head_id?: number;
  sub_head_id?: number;
  limit?: number;
  skip?: string;
}

const ExpenseList = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const getTodayDate = () => dayjs().format('YYYY-MM-DD');
  const getExpenseHead = useWatch('head_id', form);
  const themeGlobal = useSelector(globalTheme);
  const { searchParams, setSearchParams } = SetQueyInUrl();
  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');
  const head_id = searchParams.get('head_id');
  const sub_head_id = searchParams.get('sub_head_id');
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

  useEffect(() => {
    setFilter({
      limit: Number(pageSize),
      skip: skipValue,
    });
  }, [page, pageSize, skipValue]);

  const [filterItem, setFilterItem] = useState<FilterItem>({
    start_date: start_date ? start_date : getTodayDate(),
    end_date: end_date ? end_date : getTodayDate(),
    head_id: Number(head_id),
    sub_head_id: Number(sub_head_id),
    limit: limit ? Number(limit) : 100,
    skip: skip ? skip : '0',
  });

  const valuesWithData: any = {} as FilterItem;
  for (const key of Object.keys(filterItem) as (keyof FilterItem)[]) {
    if (filterItem.hasOwnProperty(key) && filterItem[key]) {
      valuesWithData[key] = filterItem[key];
    }
  }
  const { data, isLoading, isFetching } = useGetExpenseQuery({
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
  useEffect(() => {
    if (head_id) {
      form.setFieldValue('head_id', Number(head_id));
    }
    if (sub_head_id) {
      form.setFieldValue('sub_head_id', Number(sub_head_id));
    }
  }, []);

  const { data: profile } = useGetMeQuery();
  const profileInfo = profile?.data?.permissions?.modules;

  const expenseList = profileInfo?.find(
    (i: any) => i?.module_name === 'Expense'
  );

  const expenseSub = expenseList?.sub_modules?.find(
    (i: any) => i?.sub_module_name === 'List/Create Expenses'
  );

  const showModal = () => {
    dispatch(
      setCommonModal({
        title: 'Create Expense',
        content: <CreateExpense />,
        show: true,
        width: 1000,
      })
    );
  };

  const debouncesSetSearchValue = useMemo(
    () =>
      debounce((e: any) => {
        console.log(e.target.value);
        setFilterItem((prevFilter: any) => ({
          ...prevFilter,
          note: e.target.value,
        }));
      }, 500),
    []
  );

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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography.Title level={5} style={{ margin: 0 }}>
                {`Expense History (${data?.total || 0})`}
              </Typography.Title>

              {expenseSub?.permissions?.write && (
                <CreateButton name='Add new' onClick={showModal} />
              )}
            </div>

            <Form form={form}>
              <Row
                gutter={[5, 5]}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '20px 0px',
                }}
              >
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={20}>
                  <Row gutter={[8, 8]}>
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
                      <Input
                        allowClear
                        placeholder='Search by note'
                        onChange={debouncesSetSearchValue}
                      />
                    </Col>
                    <SelectHead
                      name='head_id'
                      md={12}
                      lg={4}
                      onChange={(e) => {
                        setFilterItem({
                          ...filterItem,
                          head_id: e,
                          sub_head_id: !e ? e : undefined,
                        });
                        if (!e || e) {
                          form.setFieldValue('sub_head_id', undefined);
                        }
                      }}
                    />
                    <SelectSubHead
                      name='sub_head_id'
                      getExpenseHead={getExpenseHead}
                      md={12}
                      lg={4}
                      onChange={(e) =>
                        setFilterItem({ ...filterItem, sub_head_id: e })
                      }
                    />
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={5}>
                      <Form.Item
                        name='date'
                        initialValue={[
                          start_date ? dayjs(start_date) : dayjs(),
                          end_date ? dayjs(end_date) : dayjs(),
                        ]}
                      >
                        <DatePicker.RangePicker
                          style={{ width: '100%' }}
                          format='YYYY-MM-DD'
                          onChange={(e) => {
                            if (e?.length) {
                              setFilterItem({
                                ...filterItem,
                                start_date: dayjs(e[0]).format('YYYY-MM-DD'),
                                end_date: dayjs(e[1]).format('YYYY-MM-DD'),
                              });
                            } else {
                              setFilterItem({
                                ...filterItem,
                                start_date: '',
                                end_date: '',
                              });
                            }
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </div>
          <div
            className={
              themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
            }
            style={{ marginTop: '25px' }}
          >
            <Table
              size='small'
              bordered
              rowKey={'id'}
              dataSource={data?.data?.length ? data?.data : []}
              columns={ExpenseTableColumns(expenseSub)}
              pagination={{
                ...generatePagination(
                  Number(data?.total),
                  setPagination,
                  pagination
                ),
                current: Number(page),
                showSizeChanger: true,
                defaultPageSize: limit ? Number(limit) : 100,
                pageSizeOptions: ['50', '100', '200', '300', '400', '500'],
                total: data ? Number(data?.total) : 0,
                showTotal: (total) => `Total ${total} `,
              }}
              scroll={{ x: true }}
              onChange={(pagination) => {
                setSearchParams({
                  ...valuesWithData,
                  limit: pagination.pageSize,
                  skip: String(Number((pagination.current || 1) - 1)),
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
      </div>
    </>
  );
};

export default ExpenseList;
