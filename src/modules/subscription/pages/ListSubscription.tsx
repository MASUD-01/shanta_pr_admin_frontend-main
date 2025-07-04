/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
import {
  Card,
  Row,
  Table,
  Col,
  DatePicker,
  theme,
  Form,
  Select,
  Modal,
  Typography,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { generatePagination } from '../../../common/TablePagination';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';
import { debounce } from 'lodash';
import SetQueyInUrl from '../../../common/applayout/utils/SetQueyInUrl';
import { useForm } from 'antd/es/form/Form';
import { useGetAllSubsCriptionQuery } from '../api/subscriptionEndpoints';
import { SubscriptionListTableColumn } from '../utils/SubscriptionListTableColumn';
import {
  ISubscriptionFilter,
  ISubscriptionListType,
} from '../type/subscriptiontype';
import { useGetEmployeesQuery } from '../../Configuration/Employee/api/employeeEndPoint';
import { SelectProduct } from '../../../common/fromItemCommon/SelectCustomField';
import EditSubcription from '../component/EditSubcription';
import RenewSubscription from '../component/RenewSubscription';

const ListSubscription = () => {
  const [form] = useForm();
  const { searchParams, setSearchParams } = SetQueyInUrl();
  const l_start_date = searchParams.get('l_start_date');
  const status = searchParams.get('status');
  const l_end_date = searchParams.get('l_end_date');
  const e_start_date = searchParams.get('e_start_date');
  const e_end_date = searchParams.get('e_end_date');
  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');
  const client_id = searchParams.get('client_id');
  const product_id = searchParams.get('product_id');
  const last_collected_by = searchParams.get('last_collected_by');
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

  const [filterItem, setFilterItem] = useState<ISubscriptionFilter>({
    status: status ? status : '',
    client_id: client_id ? Number(client_id) : 0,
    product_id: product_id ? Number(product_id) : 0,
    last_collected_by: last_collected_by ? Number(last_collected_by) : 0,
    start_date: start_date ? start_date : undefined,
    end_date: end_date ? end_date : undefined,
    invoice_no: '',
    limit: limit ? Number(limit) : 100,
    skip: skip ? skip : '0',
  });

  const valuesWithData: any = {} as ISubscriptionFilter;
  for (const key of Object.keys(filterItem) as (keyof ISubscriptionFilter)[]) {
    if (filterItem.hasOwnProperty(key) && filterItem[key]) {
      valuesWithData[key] = filterItem[key];
    }
  }
  const { data, isFetching, isLoading } =
    useGetAllSubsCriptionQuery(valuesWithData);
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

  const [searchEmployee, setSearchEmployee] = useState('');

  const handleSearchEmployee = useMemo(
    () =>
      debounce((searchEmployee) => {
        setSearchEmployee(searchEmployee);
      }, 500),
    []
  );
  const { data: employees } = useGetEmployeesQuery(
    searchEmployee
      ? {
          name: searchEmployee,
        }
      : {}
  );

  interface ModalState {
    isOpen: boolean;
    data: Record<string, any>; // You can adjust this based on the actual shape of `data`
    renewsubscription: 'edit' | 'renew' | '';
  }

  const [isModalVisible, setIsModalVisible] = useState<ModalState>({
    isOpen: false,
    data: {},
    renewsubscription: '',
  });
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
      title={
        <Row
          align={'middle'}
          justify={'space-between'}
          style={{ paddingBottom: 10 }}
        >
          <Col xs={24} sm={24} md={4}>
            <Typography.Title
              level={4}
              style={{ fontWeight: 'bold', marginTop: 10 }}
            >
              Subscription List ({data?.total || 0})
            </Typography.Title>
          </Col>
          <Col xs={24} sm={24} md={16} lg={18} xl={19} xxl={15}>
            <Form form={form} style={{ width: '100%' }} layout='vertical'>
              <Row gutter={[5, 5]} style={{ marginTop: '0px' }} justify={'end'}>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <div>
                    <Typography.Text>Select Employee</Typography.Text>
                  </div>
                  <Select
                    allowClear
                    showSearch
                    placeholder='Employee by'
                    style={{ width: '100%' }}
                    options={
                      employees?.data?.length
                        ? employees?.data?.map((employee) => ({
                            value: employee.id,
                            label: employee.name,
                          }))
                        : []
                    }
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                      (option?.label?.toLowerCase() ?? '')?.includes(
                        input?.toLowerCase()
                      )
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '').localeCompare(optionB?.label ?? '')
                    }
                    onSearch={handleSearchEmployee}
                    onChange={(e: any) => {
                      if (!e) {
                        setSearchEmployee('');
                        setFilterItem((prevState) => ({
                          ...prevState,
                          last_collected_by: 0,
                        }));
                      }
                    }}
                    onSelect={(e: any) =>
                      setFilterItem((prevState) => ({
                        ...prevState,
                        last_collected_by: e,
                      }))
                    }
                  />
                </Col>

                <Col xs={24} sm={12} md={6} lg={8} xl={8} xxl={7}>
                  <div>
                    <Typography.Text>Created date</Typography.Text>
                  </div>
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    defaultValue={[
                      start_date ? dayjs(start_date) : undefined,
                      end_date ? dayjs(end_date) : undefined,
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
          </Col>
        </Row>
      }
    >
      <div
        style={{
          border: '1px solid #F5F5F5',
          borderRadius: 5,
          padding: '0 6px',
        }}
      >
        <Form form={form} layout='vertical'>
          <Row gutter={[5, 5]} justify={'end'}>
            <Col xs={24} sm={24} md={24} lg={6} xl={5}>
              <Form.Item name={'status'} label='Select Status'>
                <Select
                  defaultValue={status}
                  placeholder={'Select status'}
                  showSearch
                  allowClear
                  style={{
                    padding: '0',
                    margin: '0',
                    border: '0',
                    width: '100%',
                  }}
                  optionFilterProp='roleMobile'
                  filterOption={(input, option) =>
                    (option!.children as unknown as string).includes(input)
                  }
                  onSelect={(e) => {
                    setFilterItem((prevState) => ({
                      ...prevState,
                      status: e,
                    }));
                  }}
                  onChange={(e) =>
                    setFilterItem((prevState) => ({
                      ...prevState,
                      status: e,
                    }))
                  }
                >
                  <Select.Option value={'active'}>Active</Select.Option>
                  <Select.Option value={'inactive'}>InActive</Select.Option>
                  <Select.Option value={'expired'}>Expired</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={5}>
              <SelectProduct
                defaultValue={product_id ? Number(product_id) : undefined}
                name={'product_id'}
                label='Select Product'
                handleSelect={(e) =>
                  setFilterItem((prevState) => ({
                    ...prevState,
                    product_id: e,
                  }))
                }
              />
            </Col>

            <Col
              xs={24}
              sm={12}
              md={24}
              lg={6}
              xl={6}
              xxl={4}
              style={{ paddingTop: '5px' }}
            >
              <div style={{ paddingBottom: '4px' }}>Payment date</div>
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                defaultValue={[
                  l_start_date ? dayjs(l_start_date) : undefined,
                  l_end_date ? dayjs(l_end_date) : undefined,
                ]}
                onChange={(e) => {
                  if (e?.length) {
                    setFilterItem({
                      ...filterItem,
                      l_start_date: dayjs(e[0]).format('YYYY-MM-DD'),
                      l_end_date: dayjs(e[1]).format('YYYY-MM-DD'),
                    });
                  } else {
                    setFilterItem({
                      ...filterItem,
                      l_start_date: '',
                      l_end_date: '',
                    });
                  }
                }}
              />
            </Col>
            <Col
              xs={24}
              sm={12}
              md={24}
              lg={8}
              xl={5}
              xxl={4}
              style={{ paddingTop: '5px' }}
            >
              <div style={{ paddingBottom: '4px' }}>Expire date</div>
              <DatePicker.RangePicker
                style={{ width: '100%' }}
                defaultValue={[
                  e_start_date ? dayjs(e_start_date) : undefined,
                  e_end_date ? dayjs(e_end_date) : undefined,
                ]}
                onChange={(e) => {
                  if (e?.length) {
                    setFilterItem({
                      ...filterItem,
                      e_start_date: dayjs(e[0]).format('YYYY-MM-DD'),
                      e_end_date: dayjs(e[1]).format('YYYY-MM-DD'),
                    });
                  } else {
                    setFilterItem({
                      ...filterItem,
                      e_start_date: '',
                      e_end_date: '',
                    });
                  }
                }}
              />
            </Col>
          </Row>
        </Form>
      </div>
      <Table
        className={
          themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
        }
        rowKey={'id'}
        size='small'
        bordered
        columns={SubscriptionListTableColumn({ setIsModalVisible })}
        dataSource={data?.data?.length ? data?.data : []}
        loading={isLoading || isFetching}
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
        summary={(pageData) => {
          let last_paid_amount_total = 0;
          pageData?.forEach(({ last_paid_amount }) => {
            last_paid_amount_total += Number(last_paid_amount);
          });
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell align='end' index={0} colSpan={8}>
                  <Typography.Text
                    style={{ textAlign: 'end', fontWeight: 'bold' }}
                  >
                    Total
                  </Typography.Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} align='center'>
                  <Typography.Text style={{ fontWeight: '500' }}>
                    {last_paid_amount_total}
                  </Typography.Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}></Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
      {isModalVisible?.isOpen &&
        isModalVisible?.renewsubscription === 'edit' && (
          <Modal
            title='Subscription Form'
            open={isModalVisible.isOpen}
            onOk={() => setIsModalVisible({ ...isModalVisible, isOpen: false })}
            onCancel={() =>
              setIsModalVisible({ ...isModalVisible, isOpen: false })
            }
            footer={null}
            width={600}
          >
            <EditSubcription
              record={isModalVisible.data as ISubscriptionListType}
              setIsModalVisible={setIsModalVisible}
            />
          </Modal>
        )}
      {isModalVisible.isOpen &&
        isModalVisible.renewsubscription === 'renew' && (
          <Modal
            title={`Renew subscription for next ${
              isModalVisible?.data?.period === '1_year'
                ? '1 year'
                : `${parseInt(isModalVisible?.data?.period)} month`
            }`}
            open={isModalVisible.isOpen}
            onOk={() => setIsModalVisible({ ...isModalVisible, isOpen: false })}
            onCancel={() =>
              setIsModalVisible({ ...isModalVisible, isOpen: false })
            }
            footer={null}
            width={600}
          >
            <RenewSubscription
              record={isModalVisible.data as ISubscriptionListType}
              setIsModalVisible={setIsModalVisible}
            />
          </Modal>
        )}
    </Card>
  );
};

export default ListSubscription;
