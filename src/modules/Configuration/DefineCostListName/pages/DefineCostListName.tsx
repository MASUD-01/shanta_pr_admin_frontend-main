/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetDefineCostListNameQuery } from '../api/definedcostlistnameApiEndpoint';
import { setCommonModal } from '../../../../app/slice/modalSlice';
import CreateCostListName from '../components/CreateCostListName';
import { PrimaryButton } from '../../../../common/submitButton/CommonButton';
import { DeleteIcon } from '../../../../common/icon/Icon';
import { tablePagination } from '../../../../common/TablePagination';

const DefineCostListName = () => {
  //   const themeGlobal = useSelector(globalTheme);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({
    page: '',
    pageSize: '',
  });

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '100';
  const skipValue = Number(page) * Number(pageSize);
  const [filter, setFilter] = useState<any>({
    limit: 100,
    skip: skipValue - 100,
  });
  const { data, isLoading } = useGetDefineCostListNameQuery({ ...filter });
  const showModal = () => {
    dispatch(
      setCommonModal({
        title: 'Create Costing Name',
        content: <CreateCostListName />,
        show: true,
        width: 500,
      })
    );
  };

  return (
    <>
      <div>
        <Card
          title={`Create Costing Name List (${data?.total || 0})`}
          style={{
            boxShadow: '0 0 0 1px rgba(0,0,0,.05)',
            marginBottom: '1rem',
          }}
          extra={
            <Row gutter={[5, 5]}>
              <Col xs={24} md={24} xxl={24}>
                <PrimaryButton
                  name='Add New'
                  icon={<PlusOutlined />}
                  onClick={showModal}
                />
              </Col>
            </Row>
          }
        >
          <div
          // className={
          //   themeGlobal.theme === theme.defaultAlgorithm ? 'custom-tab' : ' '
          // }
          >
            <Table
              rowKey={'id'}
              size='small'
              loading={isLoading}
              bordered
              dataSource={[
                {
                  costing_name: 'Utility Costs',
                },
                {
                  costing_name: 'Monthly Operating Costs',
                },
              ]}
              columns={[
                {
                  title: 'SL',
                  key: 'id',
                  render: (_text, _record, index) => index + 1,
                },
                {
                  title: 'Costing Name',
                  dataIndex: 'costing_name',
                  key: 'service_name',
                },

                {
                  title: 'Actions',
                  render: (record) => (
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                    >
                      {/* <EditButton onClick={() => showModal(record)} /> */}

                      <DeleteIcon
                        title='Delete source'
                        onConfirm={() => confirm(record.id)}
                      />
                    </div>
                  ),
                },
              ]}
              scroll={{ x: true }}
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
              pagination={
                Number(data?.total) !== undefined && Number(data?.total) > 50
                  ? {
                      ...tablePagination,
                      current: Number(page),
                    }
                  : false
              }
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default DefineCostListName;
