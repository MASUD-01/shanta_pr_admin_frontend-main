/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { InvoiceHeader } from '../invoice/InVoiceHeader';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import TitleCenter from '../invoice/TitleCenter';
const a4sizeStyle: React.CSSProperties = {
  minHeight: '100vh',
  // width: "11.5in",
  fontSize: '11px',
  // height: '200px',
  background: '#fff',
  boxSizing: 'border-box',
  padding: '0 15px',
};

type Props = {
  extraInfo?: any;
  printRef: React.RefObject<HTMLDivElement>;
  children: JSX.Element;
  title: string;
  isPrintFooterShowing?: boolean;
  fromDate?: string;
  toDate?: string;
};

const CommonViewReport = ({
  printRef,
  children,
  extraInfo,
  title,
  isPrintFooterShowing,
  fromDate,
  toDate,
}: Props) => {
  const printDate = dayjs().format('DD-MM-YYYY ');
  return (
    <>
      <div
        ref={printRef}
        style={{
          ...a4sizeStyle,
          position: 'relative',
        }}
      >
        <Typography.Text
          style={{
            display: 'block',
            fontSize: '11px',
            fontFamily: "'Source Sans Pro', sans-serif",
            position: 'absolute',
            top: 0,
            right: 5,
          }}
        >
          Print Date : {printDate}
        </Typography.Text>
        <header>
          <div style={{ border: '0.1px solid white' }}>
            <InvoiceHeader />
          </div>

          {title ? <TitleCenter title={title} /> : ''}

          <div style={{ textAlign: 'start', marginBottom: '20px' }}>
            {' '}
            {extraInfo && extraInfo}
          </div>
        </header>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontFamily: "'Source Sans Pro', sans-serif",
            boxSizing: 'border-box',
            position: 'relative',
          }}
        >
          {fromDate && toDate && (
            <span style={{ fontSize: '15px' }}>
              Report Date: {fromDate} - {toDate}{' '}
            </span>
          )}
          {children}
          {/* bottom part  */}
          {isPrintFooterShowing && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography.Text
                style={{
                  marginLeft: '10px',
                  borderTop: '1px dashed gray',
                  fontFamily: "'Source Sans Pro', sans-serif",
                }}
              >
                Customer Signature
              </Typography.Text>

              <Typography.Text
                style={{
                  marginRight: '10px',
                  borderTop: '1px dashed gray',
                  fontFamily: "'Source Sans Pro', sans-serif",
                }}
              >
                Authority Signature
              </Typography.Text>
            </div>
          )}
        </div>
        <div
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '12px' }}>
            {' '}
            This is Software Generated Print,
            <br />
            M360 Property Management Developed By: M360 ICT
          </p>
        </div>
      </div>
    </>
  );
};

export default CommonViewReport;
