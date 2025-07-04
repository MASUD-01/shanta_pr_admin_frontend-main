import './App.css';
import { RouterProvider } from 'react-router-dom';
import CommonModal from './common/modal/CommonModal';
import { App, ConfigProvider, theme } from 'antd';
import { useAppSelector } from './app/store/store';
import { globalTheme } from './app/slice/themeSlice';
import { useRef } from 'react';
import Routers from './Routers';

function MyApp() {
  const themeApp = useAppSelector(globalTheme);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  return (
    <ConfigProvider
      theme={{
        algorithm: themeApp.theme,
        token: {
          colorPrimary: '#7F7F19',
          // colorTextSecondary: 'red',
          colorBgContainer:
            themeApp.theme === theme.defaultAlgorithm ? '#ffffff' : '#121212', //#0b1120cc, #0d1117
        },

        components: {
          Menu: {
            itemSelectedBg: '#d5d57a',
            itemActiveBg: '#d5d57a',
            itemSelectedColor: 'black',
          },
        },
      }}
      getPopupContainer={() => modalContainerRef.current as HTMLElement}
    >
      <App>
        <div ref={modalContainerRef}>
          <RouterProvider router={Routers()} />
          <CommonModal />
        </div>
      </App>
    </ConfigProvider>
  );
}

export default MyApp;
