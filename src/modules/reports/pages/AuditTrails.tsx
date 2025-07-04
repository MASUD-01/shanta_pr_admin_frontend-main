/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  Col,
  DatePicker,
  Input,
  Row,
  Table,
  TableProps,
  theme,
  // Typography,
} from 'antd';
import { useMemo, useState } from 'react';
import { useGetAuditTrailQuery } from '../api/auditTrailsEndPoints';
import dayjs from 'dayjs';
import { generatePagination } from '../../../common/TablePagination';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';
import { debounce } from 'lodash';
// const { Title } = Typography;

interface DataType {
  id: number;
  created_at: string;
  details: string;
}

const AuditTrails = () => {
  const themeGlobal = useSelector(globalTheme);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
  });
  const [filterItem, setFilterItem] = useState({
    // limit: 100,
    // skip: 0,
    start_date: '',
    end_date: '',
    key: '',
  });

  const valuesWithData: any = {} as any;
  // for (const key of Object.keys(filterItem) as (keyof any)[]) {
  //   if (filterItem.hasOwnProperty(key) && filterItem[key]) {
  //     valuesWithData[key] = filterItem[key];
  //   }
  // }
  for (const key of Object.keys(filterItem) as (keyof typeof filterItem)[]) {
    if (
      Object.prototype.hasOwnProperty.call(filterItem, key) &&
      filterItem[key]
    ) {
      valuesWithData[key] = filterItem[key];
    }
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Date / Time',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => (
        <div className='responsive-container'>
          <p>
            {dayjs(text).format('DD-MM-YYYY') || 'N/A'}
            <span
              className='time-badge'
              style={{ color: 'black', minWidth: '60px' }}
            >
              {dayjs(text).format('hh:mm a')}
            </span>
          </p>
        </div>
      ),
    },

    {
      title: 'Username',
      dataIndex: 'created_by',
      key: 'created_by',
      render: (text) => <p>{text || 'N/A'}</p>,
    },
    {
      title: 'Details',
      dataIndex: 'log',
      key: 'log',
      render: (text) => <p>{text || 'N/A'}</p>,
    },
  ];

  const {
    data: auditTrails,
    isLoading,
    isFetching,
  } = useGetAuditTrailQuery(valuesWithData);
  const debouncesSetSearchValue = useMemo(
    () =>
      debounce((e: any) => {
        setFilterItem({ ...filterItem, key: e.target.value });
      }, 500),
    []
  );
  return (
    <>
      <div>
        <Card
          styles={{
            header: {
              backgroundColor:
                themeGlobal.theme === theme.defaultAlgorithm
                  ? '#C3E6CB'
                  : '#121212',
            },
          }}
          title='Audit Trail'
          extra={
            <Row gutter={[16, 24]}>
              <Col xs={24} sm={24} md={12} xl={12}>
                <Input
                  allowClear
                  placeholder='Search'
                  onChange={debouncesSetSearchValue}
                />
              </Col>

              <Col xs={24} sm={24} md={12} xl={12}>
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
                />
              </Col>
            </Row>
          }
        >
          <div>
            <Table
              size='small'
              bordered
              rowKey={'id'}
              dataSource={auditTrails?.data}
              columns={columns}
              scroll={{ x: true }}
              pagination={generatePagination(
                Number(auditTrails?.total),
                setPagination,
                pagination
              )}
              loading={isLoading || isFetching}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default AuditTrails;
