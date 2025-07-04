import React from 'react';
import { Breadcrumb, Col, Row, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

const BreadCrumb: React.FC = () => {
  const { pathname } = useLocation();
  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbItems = [
    {
      title: (
        <Link to='/'>
          <Row align={'middle'} gutter={[5, 0]}>
            <Col>
              {' '}
              <AiOutlineHome />
            </Col>
            <Col>
              {' '}
              <span>Dashboard</span>
            </Col>
          </Row>
        </Link>
      ),
    },
    ...pathSegments.map((segment, index) => {
      const routePath = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const isLastSegment = index === pathSegments.length - 1;

      return {
        title: isLastSegment ? (
          <Typography.Text strong>{capitalize(segment)}</Typography.Text>
        ) : (
          <Link to={routePath}>{capitalize(segment)}</Link>
        ),
      };
    }),
  ];

  return <Breadcrumb separator='❯' items={breadcrumbItems} />;
};

export default BreadCrumb;
