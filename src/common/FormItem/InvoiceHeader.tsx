/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Typography } from 'antd';
import TOAB_LOGO from '../../assets/invoice-logo.png';

export const GetInfo = () => {
  return {
    logoProp: {
      height: 70,
      padding: 10,
      borderRadius: 12,
    },
  };
};

export const ReceiptHeader = () => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <img style={GetInfo().logoProp} src={TOAB_LOGO} alt={'TOAB_LOGO'} />
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {/* <QRCode
            size={110}
            color='black'
            iconSize={25}
            bordered={false}
            // icon={orgInfo?.org_logo || '/m360Ict_Logo.png'}
            value={`
Name: ${'BAB'}
Address: ${''}
Mobile No: ${''}
`}
          /> */}
          <div style={{ marginLeft: '15px' }}>
            <Typography.Title
              style={{
                display: 'block',
                fontFamily: "'Source Sans Pro', sans-serif",
                fontSize: '14px',
              }}
            >
              {'Tour Operators Association of Bangladesh (TOAB)'}
            </Typography.Title>

            <Typography.Text
              style={{
                display: 'block',
                fontSize: '12px',
                fontFamily: "'Source Sans Pro', sans-serif",
              }}
            >
              {' '}
              <strong> Address :</strong>
              {
                '2nd FLOOR, Azam Khan Business Center, 105/E West Agargaon, Kamal Soroni Rd, Dhaka 1207'
              }
            </Typography.Text>
            <Typography.Text
              style={{
                display: 'block',
                fontSize: '12px',
                fontFamily: "'Source Sans Pro', sans-serif",
              }}
            >
              <strong> Mobile :</strong> {'01933-331522'}
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InvoiceHeader = () => {
  return (
    <Row
      style={{
        fontFamily: "'Roboto', sans-serif",
        borderBottom: '1px solid #000000',
        marginBottom: '10px',
      }}
      justify={'space-between'}
      align='middle'
    >
      <Col style={{ display: 'flex', alignItems: 'center', maxWidth: '30%' }}>
        <img src={TOAB_LOGO} alt={'TOAB_LOGO'} style={GetInfo().logoProp} />
      </Col>

      <Col
        style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: '50%',
        }}
      >
        <div
          className='info'
          style={{
            textAlign: 'right',
            marginBottom: '1rem',
          }}
        >
          <Typography.Title level={3} style={{}}>
            {'M360 ICT Property Management'}
          </Typography.Title>

          <Typography.Text
            style={{
              display: 'block',
              fontSize: '14px',
              fontFamily: "'Source Sans Pro', sans-serif",
            }}
          >
            <strong>Address: </strong>
            {'House-74,Road-07,Block-H,Banani,Dhaka-1212'}
          </Typography.Text>

          <Typography.Text
            style={{
              display: 'block',
              fontSize: '14px',
              fontFamily: "'Source Sans Pro', sans-serif",
            }}
          >
            <strong>Mobile:</strong> {'+8809638336699'}
          </Typography.Text>
          <Typography.Text
            style={{
              display: 'block',
              fontSize: '14px',
              fontFamily: "'Source Sans Pro', sans-serif",
            }}
          >
            {' '}
            <strong>Email:</strong> {'info@m360ict.com'}
          </Typography.Text>
        </div>
      </Col>
    </Row>
  );
};
