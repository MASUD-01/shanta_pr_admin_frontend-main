/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu, MenuProps } from 'antd';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getOpenKeys,
  navigationMenu,
  renderMenuItem,
} from '../utilities/navigationMenu';

interface Props {
  collapsed: boolean;
}
const LayoutMenu: React.FC<Props> = ({ collapsed }) => {
  const location = useLocation();
  const defaultOpenKeys = getOpenKeys(navigationMenu, location.pathname);
  const [stateOpenKeys, setStateOpenKeys] = useState([location.pathname]);
  const getLevelKeys = (items1: any[]) => {
    const key: Record<string, number> = {};
    const func = (items2: any[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };
  const levelKeys = getLevelKeys(navigationMenu?.map(renderMenuItem));

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    // console.log(openKeys, 'op');
    // const length = openKeys?.length;
    // const lastElement = openKeys[length - 1];
    // setStateOpenKeys([lastElement]);

    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );

    // // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  useEffect(() => {
    const url = '/' + location.pathname.split('/')[1];
    setStateOpenKeys([url]);
  }, []);

  return (
    <Menu
      mode='inline'
      items={navigationMenu}
      selectedKeys={[location.pathname]}
      defaultOpenKeys={defaultOpenKeys}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      onSelect={(e) => {
        if (e.key === '/') {
          setStateOpenKeys([]);
        }
      }}
      //   style={{ paddingLeft: 5, paddingRight: 5 }}
    />
  );
};

export default LayoutMenu;
