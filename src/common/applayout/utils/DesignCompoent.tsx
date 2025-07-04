import { ConfigProvider, theme } from 'antd';
import React from 'react';
import { useAppSelector } from '../../../app/store/store';
import { globalTheme } from '../../../app/slice/themeSlice';

const DesignCompoent = ({
  children,
}: {
  title?: JSX.Element;
  children: React.ReactNode;
}) => {
  const themeApp = useAppSelector(globalTheme);
  const isDarkMode = themeApp.theme === theme.darkAlgorithm;
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: !isDarkMode ? '#337AB7' : '',
            headerColor: 'white',
          },
          Alert: {
            colorWarningBg: !isDarkMode ? '#E6FDFF' : '',
          },
          Input: {
            colorBgContainer: !isDarkMode ? '#4460ab' : '',
            activeBg: !isDarkMode ? '#4460ab' : '',
            colorPrimary: 'white',
            colorText: 'white',
            colorTextPlaceholder: !isDarkMode ? '#d0d0d0' : '',
            hoverBorderColor: 'white',
            activeBorderColor: 'white',
          },
          Select: {
            colorBgContainer: !isDarkMode ? '#4460ab' : '',
            colorPrimary: 'white',
            colorText: 'white',
            colorTextPlaceholder: !isDarkMode ? '#d0d0d0' : '',
            colorBgElevated: !isDarkMode ? '#4460ab' : '#1B1B1B',
            selectorBg: !isDarkMode ? '#4460ab' : '',
            optionSelectedBg: '#2A4796',
            colorPrimaryHover: 'white',
          },
          TreeSelect: {
            colorBgElevated: !isDarkMode ? '#4460ab' : '#1B1B1B',
            colorBgContainer: !isDarkMode ? '#4460ab' : '',
            colorPrimary: 'white',
            colorText: 'white',
            colorTextPlaceholder: !isDarkMode ? '#d0d0d0' : '',

            colorPrimaryHover: 'white',
          },
          DatePicker: {
            colorTextHeading: 'wheat',
            colorPrimaryBg: 'white',
            colorSuccessBg: 'white',
            colorPrimaryText: 'white',
            colorBgContainer: !isDarkMode ? '#4460ab' : '',
            colorBgTextActive: !isDarkMode ? 'green' : '',
            colorPrimaryHover: 'white',
            activeBorderColor: 'white',
            colorText: 'white',
            hoverBorderColor: 'white',
            colorBgElevated: !isDarkMode ? '#4460ab' : '#1B1B1B',
            cellActiveWithRangeBg: !isDarkMode ? '#55679C' : '',
            colorTextPlaceholder: 'white',
            colorTextDisabled: '#ECDFCC',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default DesignCompoent;
