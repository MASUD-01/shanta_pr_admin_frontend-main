import { Button, theme, Popover } from 'antd';
import { useSelector } from 'react-redux';
import { globalTheme, setTheme } from '../../app/slice/themeSlice';

import {
  FullscreenOutlined,
  LeftOutlined,
  LogoutOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/store/store';
import { setLogout } from '../../app/features/userSlice';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { useState } from 'react';
import { api } from '../../app/api/userApi/api';
// import useIsMobile from '../utils/useIsMobile';
// import Notifications from '../Notification/Notification';
// import MUSAFIR from './../../assets/musafir_travel.png';

const NavBar = () => {
  // const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const themeGlobal = useSelector(globalTheme);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleDarkTheme = () => {
    dispatch(setTheme(theme.darkAlgorithm));
  };
  const handleLightTheme = () => {
    dispatch(setTheme(theme.defaultAlgorithm));
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(api.util.resetApiState());
    dispatch(setLogout());
    navigate('/login');
  };

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

  const content = (
    <div>
      <Link to='/setting/profile'>
        <Button color='primary' icon={<UserOutlined />}>
          Profile
        </Button>
      </Link>
      <br />
      <Link to='/login'>
        <Button
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

  return (
    <div
      style={{
        // position: "fixed",
        width: ` 100%`,
        zIndex: 9999,
        marginBottom: '20px',
        background: colorBgContainer,

        // top: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          padding: '10px',
        }}
      >
        <div>
          <Button
            type='primary'
            style={{ border: 'none' }}
            onClick={() => navigate(-1)}
            shape='circle'
            size='small'
            icon={<LeftOutlined />}
          />
          <Button
            style={{ border: 'none', marginLeft: '10px' }}
            onClick={() => navigate(1)}
            shape='circle'
            size='small'
            icon={<RightOutlined />}
            type='primary'
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            gap: 20,
          }}
        >
          <Button
            icon={<FullscreenOutlined />}
            type='dashed'
            onClick={handleFullscreenToggle}
          />
          <div>
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
          </div>
          {/* <Notifications /> */}

          <Popover content={content}>
            <Button icon={<UserOutlined />} type='dashed' />
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
