import { Card, DatePicker, Row, Table, theme } from 'antd';
import { useParams } from 'react-router-dom';
import { useSubscriptionTrackingQuery } from '../api/subscriptionEndpoints';
import TrackingTable from '../utils/TrackingTable';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { globalTheme } from '../../../app/slice/themeSlice';

const SubscriptionTrackingReportPage = () => {
  const themeGlobal = useSelector(globalTheme);
  const { id } = useParams();
  const [filterItem, setFilterItem] = useState<any>({
    id,
    from_date: dayjs().format('YYYY-MM-DD'),
    to_date: dayjs().add(1, 'month').format('YYYY-MM-DD'),
  });

  const { data } = useSubscriptionTrackingQuery(filterItem);

  return (
    <Card
      style={{ padding: '20px' }}
      size='small'
      title={
        <Row justify={'space-between'} style={{ paddingBottom: 10 }}>
          <h2>Subscription Tracking</h2>{' '}
          <div>
            <DatePicker.RangePicker
              allowClear={false}
              style={{ width: '100%' }}
              defaultValue={[dayjs(), dayjs().add(1, 'month')]}
              onChange={(e) => {
                if (e?.length) {
                  setFilterItem({
                    ...filterItem,
                    from_date: dayjs(e[0]).format('YYYY-MM-DD'),
                    to_date: dayjs(e[1]).format('YYYY-MM-DD'),
                  });
                } else {
                  setFilterItem({
                    ...filterItem,
                    from_date: '',
                    to_date: '',
                  });
                }
              }}
            />
          </div>
        </Row>
      }
    >
      <div
        style={{
          marginBottom: '20px',
          backgroundColor:
            themeGlobal.theme === theme.defaultAlgorithm ? '#E3F2FD' : '', // Updated background color for consistency
          padding: '20px',
          borderRadius: '12px', // Slightly more rounded corners for a softer look
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', // Slightly deeper shadow for better depth
          backgroundImage:
            themeGlobal.theme === theme.defaultAlgorithm
              ? 'linear-gradient(135deg, #F1F8FF 100%, #BBDEFB 100%)' // Top-left to bottom-right for default theme
              : '',
        }}
      >
        <div>
          <h3
            style={{
              display: 'inline',
              fontSize: '22px', // Slightly larger text for prominence
              fontWeight: '700', // Bolder font
              color: '#1976D2', // Primary color for title
            }}
          >
            Client :
          </h3>
          <div
            style={{
              display: 'inline',
              fontSize: '20px',
              fontWeight: 'bold',
              color:
                themeGlobal.theme === theme.defaultAlgorithm ? '#424242' : '', // Darker color for better readability
              marginLeft: '10px', // Spacing between title and content
            }}
          >
            {data?.data?.client_name} ({data?.data?.client_no})
          </div>
        </div>
        <div>
          <h3
            style={{
              display: 'inline',
              fontSize: '22px', // Slightly larger text for prominence
              fontWeight: '700', // Bolder font
              color: '#1976D2', // Primary color for title
            }}
          >
            Product :
          </h3>
          <div
            style={{
              display: 'inline',
              fontSize: '20px',
              fontWeight: 'bold',
              color:
                themeGlobal.theme === theme.defaultAlgorithm ? '#424242' : '', // Darker color for better readability
              marginLeft: '10px', // Spacing between title and content
            }}
          >
            {data?.data?.product_name}
          </div>
        </div>
      </div>

      <Table
        className={
          themeGlobal.theme === theme.defaultAlgorithm ? 'custom-table' : ''
        }
        columns={TrackingTable()}
        dataSource={data?.data?.tracking}
        rowKey='id'
        pagination={false}
        rowClassName={(__, index) => {
          return index % 2
            ? themeGlobal.theme === theme.defaultAlgorithm
              ? 'custom-row-theme-other'
              : ''
            : themeGlobal.theme === theme.defaultAlgorithm
            ? 'custom-row-theme-default'
            : '';
        }}
      />
    </Card>
  );
};

export default SubscriptionTrackingReportPage;
