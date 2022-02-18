import React, { useCallback, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Menu, Dropdown } from 'antd';
import { makeHeaderNavData, checkNavHasChildren } from '@utils/utils';
import { getMenu } from '@service/header';
import navData from '@data/nav.json';
import { HeaderNavData } from '@utils/types';
import { Jx3BoxContext } from '@components/provider';

export interface HeaderNavLinkProps {
  item: HeaderNavData;
  className?: string;
}

/**
 * 当前nav是否聚焦
 * @param link
 * @returns
 */
const checkCurrentNavFocus = (link: string) => location.pathname.includes(link);

/**
 * HeaderNavLink
 * 导航头Link组件
 *
 * @param {HeaderNavLinkProps} { item, className, ...rest }
 * @return {*}
 */
const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({ item, className, children, ...rest }) => {
  const navLinkCls = classNames('u-item', className, {
    ['on']: checkCurrentNavFocus(item.link),
  });

  return (
    <a href={item.link} className={navLinkCls} {...rest}>
      {item.label}
      {item.desc && <span>{item.desc}</span>}
      {children}
    </a>
  );
};

const HeaderNav = () => {
  const { client } = useContext(Jx3BoxContext);
  const [nav, setNav] = useState([] as HeaderNavData[]);

  useEffect(() => {
    getMenu('nav').then(result => {
      if (result.data) {
        setNav(makeHeaderNavData(result.data?.data?.val || navData));
      }
    });
  }, []);

  /**
   * 返回当前 nav 是否可以渲染
   * @param item
   * @param client
   * @returns
   */
  const checkCurrentNavClient = useCallback(
    (item: HeaderNavData) => {
      return item.client === 'all' ? true : item.client === client;
    },
    [client]
  );

  const makeActiveCls = useCallback(
    item =>
      classNames('u-item el-dropdown-link', {
        ['on']: location.pathname.includes(item.link),
      }),
    []
  );

  if (nav.length <= 0) {
    return null;
  }

  return (
    <nav className='c-header-nav'>
      {nav.map(item => {
        if (checkCurrentNavClient(item)) {
          if (checkNavHasChildren(item)) {
            const dropdownMenu = (
              <Menu className='c-header-menu'>
                {item.children.map((subItem, subIndex) => {
                  if (checkCurrentNavClient(subItem)) {
                    return (
                      <Menu.Item
                        className='u-menu-item'
                        key={`header-nav-drop-${subItem.key}-${subIndex}`}
                      >
                        <HeaderNavLink item={subItem} />
                      </Menu.Item>
                    );
                  }
                  return null;
                })}
              </Menu>
            );

            return (
              <div className='u-item-box' key={`header-nav-${item.key}`}>
                <Dropdown overlay={dropdownMenu} trigger={['hover']}>
                  <HeaderNavLink item={item} className={makeActiveCls(item)}>
                    <i className='el-icon-arrow-down el-icon--right' />
                  </HeaderNavLink>
                </Dropdown>
              </div>
            );
          }
          return (
            <div className='u-item-box' key={`header-nav-${item.key}`}>
              <HeaderNavLink item={item} />
            </div>
          );
        }
        return null;
      })}
    </nav>
  );
};

export default HeaderNav;
