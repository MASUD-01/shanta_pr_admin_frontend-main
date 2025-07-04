/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Select, Table, DatePicker, theme } from 'antd';
import { TransactionsHistoryTableColumns } from '../utils/TransactionsHistoryTableColumns';
import {
  useGetAllAccountQuery,
  useTransactionsHistoryQuery,
} from '../api/AccountEndPoints';
import { generatePagination } from '../../../common/TablePagination';
import { useEffect, useState } from 'react';
import { IFilterItem } from '../types/AccountTypes';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';

const TransactionsHistory = () => {
  const themeGlobal = useSelector(globalTheme);
  const [pagination, setPagination] = useState({
    current: 0,
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

  const [filterItem, setFilterItem] = useState<IFilterItem>({
    start_date: '',
    end_date: '',
    account_id: 0,
  });
  const { data: accounts } = useGetAllAccountQuery({});

  const valuesWithData: any = {} as IFilterItem;

  for (const key of Object.keys(filterItem) as (keyof IFilterItem)[]) {
    if (filterItem.hasOwnProperty(key) && filterItem[key]) {
      valuesWithData[key] = filterItem[key];
    }
  }
  const { data, isLoading, isFetching } = useTransactionsHistoryQuery({
    ...valuesWithData,
    ...filter,
  });
  return (
    <>
      <Card
        headStyle={{
          backgroundColor:
            themeGlobal.theme === theme.defaultAlgorithm
              ? '#C3E6CB'
              : '#121212',
        }}
        title={`Transactions History (${data?.total || 0})`}
        extra={
          <Row gutter={[5, 5]}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Select
                allowClear
                showSearch
                placeholder={'Select account'}
                style={{ width: '100%' }}
                onChange={(e) =>
                  setFilterItem({ ...filterItem, account_id: e })
                }
                options={
                  accounts?.data?.length
                    ? accounts?.data?.map((account) => ({
                        value: account.id,
                        label: account.name,
                      }))
                    : []
                }
                optionFilterProp='children'
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
              />
            </Col>
            <Col xs={24} md={12} xxl={12}>
              {' '}
              <DatePicker.RangePicker
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
                style={{ width: '100%' }}
                format='DD-MM-YYYY'
              />
            </Col>
          </Row>
        }
      >
        <Table
          className={
            themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
          }
          size='small'
          bordered
          rowKey={'id'}
          dataSource={data?.data?.length ? data?.data : []}
          columns={TransactionsHistoryTableColumns()}
          pagination={{
            ...generatePagination(
              Number(data?.total),
              setPagination,
              pagination
            ),
            current: Number(page),
            showSizeChanger: true,
            defaultPageSize: 100,
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
                ((pagination.current || 1) - 1) * (pagination.pageSize || 100),
              limit: pagination.pageSize!,
            });
          }}
          loading={isLoading || isFetching}
        />
      </Card>
    </>
  );
};

export default TransactionsHistory;
