import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Dropdown } from 'antd';
import { Jx3BoxContext } from '@components/provider';
import { __imgPath } from '@jx3box/jx3box-common/data/jx3box.json';
import Logo from '../../assets/header/logo.svg';
import boxData from '../../data/box.json';
import HeaderSearch from './header-search';
import { filterHeaderBoxDataByClient, getTarget } from '@utils/utils';
import { getMenu } from '@service/header';
import { BoxDataItem } from '@utils/types';

const homeIcon = __imgPath + 'image/box/home.svg';

const getBoxIcon = iconPath => __imgPath + 'image/box/' + iconPath;

const HeaderLogo = () => {
  const { client } = useContext(Jx3BoxContext);
  /**
   * 魔盒首页 menu 开关相关逻辑
   * @param menuVisible
   */
  const [menuVisible, setMenuVisible] = useState(true);
  const closeMenu = useCallback(() => setMenuVisible(false), []);
  const onMenuVisibleChange = useCallback(nextVisible => {
    setMenuVisible(nextVisible);
  }, []);

  const [boxDataList, setBoxDataList] = useState([] as BoxDataItem[]);

  /**
   * 请求 header box 数据
   * @method useEffect
   */
  useEffect(() => {
    getMenu('box').then(result => {
      setBoxDataList(result.data?.data?.val || boxData);
    });
  }, []);

  /**
   * 获得当前版本要渲染的box列表
   * @param renderBoxData
   */
  const renderBoxData = useMemo(
    () => boxDataList.filter(item => filterHeaderBoxDataByClient(item, client)),
    [boxDataList, client]
  );

  const headerBoxOverlay = useMemo(
    () => (
      <div id='c-header-box' className='c-jx3box c-header-jx3box' onClick={closeMenu}>
        <HeaderSearch />
        <ul className='u-list'>
          <li>
            <a className='u-item' href='/index'>
              <img className='u-pic' src={homeIcon} />
              <img className='u-pic-hover' src={homeIcon} />
              <span className='u-txt'>首页</span>
            </a>
          </li>

          {renderBoxData.map(item => (
            <li key={item.uuid} className={item.lf ? 'u-app-start' : ''}>
              <a className='u-item' href={item.href} target={getTarget(item.href)}>
                <img className='u-pic' src={getBoxIcon(item.img)} />
                <span className='u-txt'>{item.abbr}</span>
              </a>
            </li>
          ))}
        </ul>
        <span className='u-close' onClick={closeMenu}>
          <i className='el-icon-upload2'></i>
          <span>收起</span>
        </span>
      </div>
    ),
    [renderBoxData]
  );
  return (
    <Dropdown
      visible={menuVisible}
      overlay={headerBoxOverlay}
      overlayClassName='c-jx3box-wrapper'
      trigger={['click', 'contextMenu']}
      onVisibleChange={onMenuVisibleChange}
    >
      <div className='c-header-logo' id='c-header-logo' title='点击展开魔盒矩阵'>
        <i className='u-pic'>
          <Logo />
        </i>
        <span className='u-txt'>魔盒</span>
      </div>
    </Dropdown>
  );
};

export default HeaderLogo;
