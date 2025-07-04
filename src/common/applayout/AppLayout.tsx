import { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  FullscreenOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import {
  Layout,
  Button,
  theme,
  Typography,
  Popover,
  Grid,
  Divider,
} from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../app/store/store';
import { setLogout } from '../../app/features/userSlice';
import { useGetMeQuery } from '../../app/api/userApi/userApi';
import { api } from '../../app/api/userApi/api';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { globalTheme, setTheme } from '../../app/slice/themeSlice';
import LayoutMenu from './LayoutMenu';
const { useBreakpoint } = Grid;
const { Header, Sider, Content } = Layout;
export const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const { data: profile } = useGetMeQuery();
  const themeGlobal = useSelector(globalTheme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(api.util.resetApiState());
    dispatch(setLogout());
    navigate('/login');
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // const rootSubmenuKeys =
  //   // user && user?.permissions?.modules?.map((item: any) => item?.key);
  //   user && user?.permissions?.modules?.map((item: any) => item?.key);

  // const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
  //   const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  //   if (rootSubmenuKeys) {
  //     if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
  //       setOpenKeys(keys);
  //     } else {
  //       setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //     }
  //   }
  // };
  // const handleClick: MenuProps['onClick'] = (e) => {
  //   setCurrentSelection(e.key);
  // };

  //   for full screen
  const handleFullscreenToggle = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  const enterFullscreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };
  const handleDarkTheme = () => {
    dispatch(setTheme(theme.darkAlgorithm));
  };
  const handleLightTheme = () => {
    dispatch(setTheme(theme.defaultAlgorithm));
  };
  const content = (
    <div>
      <Link to='/settings/profile'>
        <Button color='primary' icon={<UserOutlined />}>
          Profile
        </Button>
      </Link>
      <br />
      <Link to='/login'>
        <Button
          danger
          style={{ marginTop: '10px' }}
          color='primary'
          icon={<LogoutOutlined />}
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </Link>
    </div>
  );

  const handleResizeStart = (e: any) => {
    e.preventDefault();
    const startX = e.clientX;

    const handleResizeDrag = (e: any) => {
      const newWidth = sidebarWidth + (e.clientX - startX);
      setSidebarWidth(newWidth);
    };

    const handleResizeEnd = () => {
      document.removeEventListener('mousemove', handleResizeDrag);
      document.removeEventListener('mouseup', handleResizeEnd);
    };

    document.addEventListener('mousemove', handleResizeDrag);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const grid = useBreakpoint();

  useEffect(() => {
    if (grid.xs) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [grid.xs]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={sidebarWidth}
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint='lg'
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
          // minWidth: `${collapsed ? "80px" : "235px"}`,
          display: `${
            grid.xs && !collapsed ? 'block' : grid.md ? 'block' : 'none'
          }`,
        }}
        className={
          themeGlobal.theme === theme.defaultAlgorithm
            ? 'main-custom-sidebar'
            : 'main-sidebar'
        }
      >
        <div
          className={
            themeGlobal.theme === theme.defaultAlgorithm
              ? 'custom-sidebar'
              : 'sidebar'
          }
          style={{
            lineHeight: '50px',
            fontWeight: 500,
          }}
        >
          {collapsed ? (
            <Typography className='side-bar-logo'>
              Property Management
            </Typography>
          ) : (
            <Typography className='side-bar-logo'>
              {profile?.data?.name && (
                <>
                  {/* {profile.data.company_name.length > 9
                    ? `${profile.data.company_name.slice(0, 9)}`
                    : profile.data.company_name}{' '} */}
                  Property Management
                </>
              )}
            </Typography>
          )}
        </div>
        {collapsed ? (
          ''
        ) : (
          <>
            {/* <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                gap: 10,
              }}
            >
              <img
                height={45}
                width={45}
                style={{ borderRadius: '50%', border: '1px solid #dfdfdf' }}
                src={
                  profile?.data?.company_logo
                    ? imageURL + profile?.data?.company_logo
                    : '../../assets/demo-erp-logo.png'
                }
                alt=''
              />
              <div>
                <Typography.Text
                  style={{
                    fontWeight: 600,
                    lineHeight: 1,

                    display: 'block',
                  }}
                >
                  Hello!
                </Typography.Text>
                <Typography.Text
                  style={{
                    display: 'block',
                  }}
                >
                  {profile?.data?.first_name + ' ' + profile?.data?.last_name}{' '}
                </Typography.Text>
                <p>
                  <Typography.Text
                    style={{
                      fontWeight: 600,
                      lineHeight: 1,
                    }}
                  >
                    <LiveTime />{' '}
                  </Typography.Text>
                </p>
              </div>
            </div> */}
            <Divider style={{ margin: 0 }} />
          </>
        )}
        <div className='resize-handle' onMouseDown={handleResizeStart} />
        <LayoutMenu collapsed={collapsed} />
        {/* <Menu
          mode='inline'
          // items={menuItems(user)}
          items={navigationMenu}
          style={{ marginTop: '15px' }}
          selectedKeys={[currentSelection]}
          openKeys={openKeys}
          defaultSelectedKeys={['/']}
          onOpenChange={onOpenChange}
          onClick={handleClick}
        /> */}
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />{' '}
            {!grid.xs && (
              <Button
                type='primary'
                style={{ border: 'none', marginLeft: '5px' }}
                onClick={() => navigate(-1)}
                shape='circle'
                size='small'
                icon={<LeftOutlined />}
              />
            )}
            {!grid.xs && (
              <Button
                style={{ border: 'none', marginLeft: '10px' }}
                onClick={() => navigate(1)}
                shape='circle'
                size='small'
                icon={<RightOutlined />}
                type='primary'
              />
            )}
          </div>
          <div style={{ flex: 1, paddingLeft: '10px' }}>
            {/* <DesignCompoent>
              <Alert
                showIcon={false}
                type='warning'
                banner
                message={
                  <Marquee pauseOnHover gradient={false}>
                    Notice Will be show here
                  </Marquee>
                }
              />
            </DesignCompoent> */}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              padding: '10px',
            }}
          >
            <Button
              icon={<FullscreenOutlined />}
              type='dashed'
              onClick={handleFullscreenToggle}
            />
            <>
              {themeGlobal.theme === theme.defaultAlgorithm ? (
                <Button
                  onClick={() => {
                    handleDarkTheme();
                  }}
                  icon={<BsFillMoonStarsFill />}
                  type='dashed'
                />
              ) : (
                <Button
                  onClick={() => {
                    handleLightTheme();
                  }}
                  icon={<BsFillSunFill />}
                  type='dashed'
                />
              )}
            </>

            <Popover content={content}>
              <Button
                icon={<UserOutlined />}
                type='dashed'
                style={{
                  marginRight: '20px',
                }}
              />
            </Popover>
          </div>
        </Header>

        <Content
          style={{
            padding: 24,
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>

        <Footer
          style={{
            textAlign: 'center',
            padding: 8,
            margin: 0,
            fontSize: 13,
            background:
              themeGlobal.theme === theme.defaultAlgorithm
                ? 'rgba(255, 255, 255, 9)'
                : '#121212',
          }}
        >
          <Typography.Title
            level={5}
            style={{
              margin: 0,
            }}
          >
            Support Details: 09638-336699, 01958398325, 01958398313, +880
            1958-398308, (10:00AM to 06:00PM) | Email: sup.m360ict@gmail.com
          </Typography.Title>
          <strong style={{ fontSize: '12px' }}>
            Copyright © {new Date().getFullYear()}. All Rights Reserved. Design
            & Developed by{' '}
            <a
              href='https://www.m360ict.com/'
              target='_blank'
              style={{ letterSpacing: 1 }}
            >
              M360ICT
            </a>
          </strong>
        </Footer>
      </Layout>
    </Layout>
  );
};

export const permission = {
  id: 92,
  username: 'demo-customer',
  first_name: 'Demo',
  last_name: 'Customer',
  email: 'mi.moon5860@gmail.com',
  photo: 'user_files/1725436446870-548959341.jpg',
  status: true,
  phone_number: '01878023033',
  role_id: 90,
  role_name: 'Customer Super Admin',
  company_id: 126,
  company_name: 'Demo ERP',
  company_status: 'active',
  company_email: 'moon.m360ict@gmail.com',
  company_phone: '01958398325',
  company_address: 'Banani, Dhaka',
  company_logo: 'company_files/1719472261779-288866422.png',
  company_signature: 'company_files/1731394830186-27023108.png',
  company_created_at: '2024-06-27T07:11:01.910Z',
  permissions: {
    username: 'demo-customer',
    user_id: 92,
    company_id: 126,
    role_name: 'Customer Super Admin',
    role_id: 90,
    modules: [
      {
        module_id: 1,
        module_name: 'Dashboards',
        sub_modules: [
          {
            permissions: {
              read: true,
              write: true,
              delete: true,
              update: true,
            },
            sub_module_id: 45,
            sub_module_name: 'Dashboard',
          },
        ],
      },
      {
        module_id: 2,
        module_name: 'Invoice',
        sub_modules: [
          {
            permissions: {
              read: true,
              write: true,
              delete: true,
              update: true,
            },
            sub_module_id: 46,
            sub_module_name: 'Create Invoice',
          },
          {
            permissions: {
              read: true,
              write: true,
              delete: true,
              update: true,
            },
            sub_module_id: 47,
            sub_module_name: 'View Invoices',
          },
        ],
      },
      //   {
      //     module_id: 3,
      //     module_name: 'Quotation',
      //     sub_modules: [
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 48,
      //         sub_module_name: 'Create Quotation',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 49,
      //         sub_module_name: 'View Quotations',
      //       },
      //     ],
      //   },
      //   {
      //     module_id: 4,
      //     module_name: 'Money Receipt',
      //     sub_modules: [
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 50,
      //         sub_module_name: 'Create Money Receipt',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 51,
      //         sub_module_name: 'View Money Receipts',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 52,
      //         sub_module_name: 'Advance Return',
      //       },
      //     ],
      //   },
      //   {
      //     module_id: 5,
      //     module_name: 'Accounts',
      //     sub_modules: [
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 53,
      //         sub_module_name: 'LIst/Create Accounts',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 54,
      //         sub_module_name: 'Balance Adjustment',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 55,
      //         sub_module_name: 'Balance Transfer',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 56,
      //         sub_module_name: 'Client Balance Adjustment',
      //       },
      //     ],
      //   },
      //   {
      //     module_id: 6,
      //     module_name: 'Client',
      //     sub_modules: [
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 57,
      //         sub_module_name: 'View Clients',
      //       },
      //     ],
      //   },
      //   {
      //     module_id: 7,
      //     module_name: 'Cheque Management',
      //     sub_modules: [
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 58,
      //         sub_module_name: 'View Cheques',
      //       },
      //     ],
      //   },
      //   {
      //     module_id: 8,
      //     module_name: 'Loan Investment',
      //     sub_modules: [
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 59,
      //         sub_module_name: 'Authority',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 60,
      //         sub_module_name: 'Loan Information',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 61,
      //         sub_module_name: 'Loan Instalment',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 62,
      //         sub_module_name: 'Investment',
      //       },
      //     ],
      //   },
      //   {
      //     module_id: 9,
      //     module_name: 'Expense',
      //     sub_modules: [
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 63,
      //         sub_module_name: 'List/Create Expenses',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 64,
      //         sub_module_name: 'Expense Head',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 65,
      //         sub_module_name: 'Expense Sub Head',
      //       },
      //     ],
      //   },
      //   {
      //     module_id: 10,
      //     module_name: 'Payroll',
      //     sub_modules: [
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 66,
      //         sub_module_name: 'List/Create Payroll',
      //       },
      //     ],
      //   },
      //   {
      //     module_id: 11,
      //     module_name: 'Configuration',
      //     sub_modules: [
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 67,
      //         sub_module_name: 'Employee',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 68,
      //         sub_module_name: 'Department',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 69,
      //         sub_module_name: 'Client Category',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 70,
      //         sub_module_name: 'Product',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 71,
      //         sub_module_name: 'Source',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 87,
      //         sub_module_name: 'Designation',
      //       },
      //     ],
      //   },
      //   {
      //     module_id: 12,
      //     module_name: 'Report',
      //     sub_modules: [
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 72,
      //         sub_module_name: 'Client Ledger',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 73,
      //         sub_module_name: 'Due/Advance',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 74,
      //         sub_module_name: 'Sales Report',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 75,
      //         sub_module_name: 'Collection Report',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 76,
      //         sub_module_name: 'Profit/Loss',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 77,
      //         sub_module_name: 'Expense Report',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 78,
      //         sub_module_name: 'Account Report',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 79,
      //         sub_module_name: 'Balance Status',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 80,
      //         sub_module_name: 'Discount Report',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 86,
      //         sub_module_name: 'Subscription Report',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 88,
      //         sub_module_name: 'Account Ledger',
      //       },
      //     ],
      //   },
      //   {
      //     module_id: 13,
      //     module_name: 'Administration',
      //     sub_modules: [
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 81,
      //         sub_module_name: 'Admin',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 82,
      //         sub_module_name: 'Role List',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 83,
      //         sub_module_name: 'Audit Trail',
      //       },
      //     ],
      //   },
      //   {
      //     module_id: 14,
      //     module_name: 'Subscription',
      //     sub_modules: [
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 84,
      //         sub_module_name: 'Create Subscription',
      //       },
      //       {
      //         permissions: {
      //           read: true,
      //           write: true,
      //           delete: true,
      //           update: true,
      //         },
      //         sub_module_id: 85,
      //         sub_module_name: 'View Subscription',
      //       },
      //     ],
      //   },
    ],
  },
};
