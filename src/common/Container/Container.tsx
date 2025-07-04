import { Card } from 'antd';
import React from 'react';
import BreadCrumb from '../BreadCrump/BreadCrump';

type IProps = {
  children: React.ReactNode;
};
const Container = ({ children }: IProps) => {
  return (
    <>
      <Card size='small' style={{ marginBottom: '20px' }}>
        <BreadCrumb />
      </Card>
      {children}
    </>
  );
};

export default Container;
