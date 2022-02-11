import React, { useContext, useEffect, useMemo } from 'react';
import { isApp } from '@utils/utils';
import classNames from 'classnames';
import Close from '../../assets/leftsidebar/close.svg';
import Open from '../../assets/leftsidebar/open.svg';
import { Jx3BoxLayoutContext } from '@components/provider/layout-provider';

const LeftSidebar: React.FC<any> = props => {
  const { breadcrumbVisible, leftSidebarVisible, leftSiderHook } = useContext(Jx3BoxLayoutContext);
  const { show, hide, toggle } = leftSiderHook;

  /**
   * 在初始化的时候设置为false
   * 在 leftSidebar 的 useeffect 中设置为 true
   * 卸载的时候隐藏掉
   *
   * @param leftSidebarVisible
   */
  useEffect(() => {
    show();
    return () => hide();
  }, []);

  /**
   * 用 useMemo 计算出sidebar的最终classNames
   * @param sidebarCls
   */
  const sidebarCls = useMemo(
    () =>
      classNames('c-sidebar-left', 'c-sidebar', {
        ['isopen']: leftSidebarVisible,
        ['isclose']: !leftSidebarVisible,
        ['without-bread']: !breadcrumbVisible,
      }),
    [leftSidebarVisible, breadcrumbVisible]
  );

  if (!isApp()) {
    return (
      <aside className={sidebarCls}>
        <div className='c-sidebar-left-inner'>
          {props.children &&
            React.cloneElement(props.children, { leftSidebarVisible, toggleLeftSidebar: toggle })}
        </div>

        <span title='收起侧边栏' className='c-sidebar-left-toggle' onClick={toggle}>
          {leftSidebarVisible ? <Close /> : <Open />}
        </span>
      </aside>
    );
  }
  return null;
};

export default LeftSidebar;
