/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { Card, Row, Table, Col, DatePicker, Input, theme } from 'antd';
import { QuotationListTableColumns } from '../utils/QuotationListTableColumns';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { generatePagination } from '../../../common/TablePagination';
import { useGetAllQuotationQuery } from '../api/quotationEndPoint';
import { debounce } from 'lodash';
import { debounceTime } from '../../../helpers/constant';
import { IQuotationFilter } from '../types/quotationTypes';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';
import SetQueyInUrl from '../../../common/applayout/utils/SetQueyInUrl';

const QuotationList = () => {
  const { searchParams, setSearchParams } = SetQueyInUrl();
  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');
  const limit = searchParams.get('limit');
  const skip = searchParams.get('skip');
  const themeGlobal = useSelector(globalTheme);
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

  const [filterItem, setFilterItem] = useState<IQuotationFilter>({
    key: '',
    start_date: start_date
      ? start_date
      : dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    end_date: end_date ? end_date : dayjs().format('YYYY-MM-DD'),
    limit: limit ? Number(limit) : 100,
    skip: skip ? skip : '0',
  });
  const handelInputChange = debounce(
    (value: string, key: keyof IQuotationFilter) => {
      setFilterItem((prevState: any) => ({
        ...prevState,
        [key]: value,
      }));
    },
    debounceTime
  );

  const valuesWithData: any = {} as IQuotationFilter;
  for (const key of Object.keys(filterItem) as (keyof IQuotationFilter)[]) {
    if (filterItem.hasOwnProperty(key) && filterItem[key]) {
      valuesWithData[key] = filterItem[key];
    }
  }
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
  const { data, isLoading, isFetching } =
    useGetAllQuotationQuery(valuesWithData);
  return (
    <Card
      styles={{
        header: {
          backgroundColor:
            themeGlobal.theme === theme.defaultAlgorithm
              ? '#C3E6CB'
              : '#121212',
        },
      }}
      title={`Quotation List (${data?.total || 0})`}
      extra={
        <Row gutter={[5, 5]}>
          <Col xs={24} md={9} xl={12}>
            <Input
              placeholder='Search by quotation no'
              onChange={(e) => handelInputChange(e.target.value, 'key')}
            />
          </Col>
          <Col xs={24} md={9} xl={12}>
            <DatePicker.RangePicker
              defaultValue={[
                start_date ? dayjs(start_date) : dayjs().subtract(1, 'month'),
                end_date ? dayjs(end_date) : dayjs(),
              ]}
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
          </Col>
        </Row>
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
          loading={isLoading || isFetching}
          rowKey={'id'}
          dataSource={data?.data?.length ? data?.data : []}
          columns={QuotationListTableColumns()}
          scroll={{ x: true }}
          pagination={{
            ...generatePagination(
              Number(data?.total),
              setPagination,
              pagination
            ),
            defaultPageSize: limit ? Number(limit) : 100,
            current: Number(page),
            showSizeChanger: true,
            pageSizeOptions: ['50', '100', '200', '300', '400', '500'],
            total: data ? Number(data?.total) : 0,
            showTotal: (total) => `Total ${total} `,
          }}
          onChange={(pagination) => {
            setSearchParams({
              ...valuesWithData,
              limit: pagination.pageSize,
              skip: String(Number((pagination.current || 1) - 1)),
            });
            setFilter({
              ...filter,
              skip:
                ((pagination.current || 1) - 1) * (pagination.pageSize || 100),
              limit: pagination.pageSize!,
            });
          }}
        />
      </div>
    </Card>
  );
};

export default QuotationList;
