/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import { Card, Row, Table, Col, DatePicker, theme, Form } from 'antd';
import { CostSheetListTableColumns } from '../utils/CostSheetListTableColumns';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useGetAllInvoiceQuery } from '../api/invoiceEndpoints';
import { IInvoiceFilter } from '../types/invoiceTypes';
import { generatePagination } from '../../../common/TablePagination';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';
import SetQueyInUrl from '../../../common/applayout/utils/SetQueyInUrl';
import { useForm } from 'antd/es/form/Form';
import CommSearchInput from '../../../common/Input/CommSearchInput';

const PricingAndCostSheetList = () => {
  const [form] = useForm();
  const { searchParams, setSearchParams } = SetQueyInUrl();
  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');
  const client_id = searchParams.get('client_id');
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

  const [filter, setFilter] = useState<{ limit: number; skip: number }>({
    limit: Number(pageSize),
    skip: skipValue,
  });
  useEffect(() => {
    setFilter({
      limit: Number(pageSize),
      skip: skipValue,
    });
  }, [page, pageSize, skipValue]);

  const [filterItem, setFilterItem] = useState<IInvoiceFilter>({
    client_id: client_id ? Number(client_id) : 0,
    start_date: start_date ? start_date : dayjs().format('YYYY-MM-DD'),
    end_date: end_date ? end_date : dayjs().format('YYYY-MM-DD'),
    invoice_no: '',
    limit: limit ? Number(limit) : 100,
    skip: skip ? skip : '0',
  });

  const valuesWithData: any = {} as IInvoiceFilter;
  for (const key of Object.keys(filterItem) as (keyof IInvoiceFilter)[]) {
    if (filterItem.hasOwnProperty(key) && filterItem[key]) {
      valuesWithData[key] = filterItem[key];
    }
  }
  const { data, isFetching, isLoading } = useGetAllInvoiceQuery(valuesWithData);
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
    if (client_id) form.setFieldValue('client_id', Number(client_id));
  }, []);

  return (
    <Card
      styles={{
        header: {
          backgroundColor:
            themeGlobal.theme === theme.defaultAlgorithm
              ? '#FFFFFF'
              : '#121212',
        },
      }}
      title={`Pricing & Cost sheet list`}
      extra={
        <Form form={form}>
          <Row
            gutter={[5, 5]}
            style={{ marginTop: '0px' }}
            align={'middle'}
            justify={'end'}
          >
            <Col xs={24} sm={12} md={8} lg={10}>
              <CommSearchInput
                placeholder='Search by Building Name'
                onChange={(e) => {
                  setFilterItem((prev) => ({
                    ...prev,
                    invoice_no: e,
                  }));
                }}
              />
            </Col>
  
            <Col xs={24} sm={12} md={9} lg={13}>
              <DatePicker.RangePicker
                defaultValue={[
                  start_date ? dayjs(start_date) : dayjs(),
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
        </Form>
      }
    >
      <Table
        className={
          themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
        }
        rowKey={'id'}
        size='small'
        bordered
        columns={CostSheetListTableColumns()}
        dataSource={
          data?.data?.length
            ? data?.data
            : [
                {
                  date: '05-jun-2025',
                  building_name: 'shapno bilash',
                  costsheetname: 'expense shanta bilash',
                },
              ]
        }
        // loading={isLoading || isFetching}
        pagination={{
          ...generatePagination(Number(data?.total), setPagination, pagination),
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
              ((pagination.current || 1) - 1) * (pagination.pageSize || 100),
            limit: pagination.pageSize!,
          });
        }}
      />
    </Card>
  );
};

export default PricingAndCostSheetList;
