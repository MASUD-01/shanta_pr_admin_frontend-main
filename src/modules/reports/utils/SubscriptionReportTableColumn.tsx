/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, TableProps, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { ISubscriptionReport } from '../types/reportTypes';
import Tksign from '../../../common/symbol/Tksign';
import { MdOutlineSpatialTracking } from 'react-icons/md';
export const SubscriptionReportTableColumn =
  (): TableProps<ISubscriptionReport>['columns'] => {
    return [
      {
        title: 'SL',
        width: 20,
        render: (_text, _record, index) => index + 1,
      },
      {
        title: 'Product Name',
        dataIndex: 'product_name',
        key: 'product_name',
        width: 120,
      },
      {
        title: 'Client Name',
        dataIndex: 'client_name',
        key: 'client_name',
        width: 250,
        render: (text, record) => {
          return text ? (
            <Link to={`/client/list/${record.client_id}`}>
              {text} [{record?.client_no}]
            </Link>
          ) : (
            ' '
          );
        },
      },

      {
        title: 'Phone,Email,Address',
        dataIndex: 'client_email',
        key: 'client_email',
        width: 120,
        render: (__, data) => (
          <Row>
            <Col>{data.client_phone}</Col>
            {data.client_phone && data.client_email ? ', ' : ''}
            <Col>{data.client_email}</Col>
            {(data.client_phone || data.client_email) && data.client_address
              ? ', '
              : ''}
            <Col>{data.client_address}</Col>
          </Row>
        ),
      },
      {
        title: 'Sold Date',
        dataIndex: 'sold_date',
        key: 'sold_date',
        width: 120,
        render: (sold_date) => {
          return dayjs(sold_date).format('DD-MMM-YYYY');
        },
      },
      {
        title: 'Payment Date',
        dataIndex: 'last_payment_date',
        key: 'last_payment_date',
        width: 120,
        render: (last_payment_date) => {
          return dayjs(last_payment_date).format('DD-MMM-YYYY');
        },
      },
      {
        title: 'Expire Date',
        dataIndex: 'expire_date',
        key: 'expire_date',
        width: 120,
        render: (expire_date) => {
          return dayjs(expire_date).format('DD-MMM-YYYY');
        },
      },

      {
        title: (
          <span>
            Subscription ( <Tksign width={9} /> )
          </span>
        ),
        dataIndex: 'subscription_amount',
        key: 'subscription_amount',
        width: 130,
      },
      {
        title: (
          <span>
            Last Paid ( <Tksign width={9} /> )
          </span>
        ),
        dataIndex: 'last_paid_amount',
        key: 'last_paid_amount',
        width: 120,
        render: (__, data) => (
          <Typography.Text type='success'>
            {data.last_paid_amount}
          </Typography.Text>
        ),
      },

      {
        title: 'Collected by',
        dataIndex: 'last_collected_by_name',
        key: 'last_collected_by_name',
        width: 120,
      },
      {
        title: 'Status',
        dataIndex: 'last_collected_by_name',
        key: 'last_collected_by_name',
        width: 90,
        align: 'center',
        render: (_, data) => (
          <Tag
            color={
              data.status === 'active'
                ? 'green'
                : data.status === 'inactive'
                ? 'red'
                : 'cyan'
            }
          >
            {data.status === 'active'
              ? 'Active'
              : data.status === 'inactive'
              ? 'InActive'
              : 'Expired'}
          </Tag>
        ),
      },
      {
        title: 'Remark',
        dataIndex: 'last_feedback',
        key: 'last_feedback',
        width: 220,
      },
      {
        title: 'Tracking',
        dataIndex: 'last_feedback',
        key: 'last_feedback',
        width: 80,
        align: 'center',
        render: (__, data) => (
          <Link to={`/reports/subscription_tracking/${data.id}`}>
            <MdOutlineSpatialTracking fontSize={25} />
          </Link>
        ),
      },
    ];
  };
