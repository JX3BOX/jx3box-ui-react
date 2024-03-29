import React, { useContext, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { isApp } from '../../utils/utils';
import Close from '../../assets/leftsidebar/close.svg';
import Open from '../../assets/leftsidebar/open.svg';
import { Jx3BoxContext } from '../provider';

interface LeftSidebarProps {
  children?: React.ReactNode;
}

const LeftSidebar: React.FC<LeftSidebarProps> = props => {
  const { breadcrumbVisible, leftSidebarVisible, leftSiderHook } = useContext(Jx3BoxContext);
  const { show, hide, toggle, setHasLeftSidebar } = leftSiderHook;

  /**
   * 在初始化的时候设置为false
   * 在 leftSidebar 的 useeffect 中设置为 true
   * 卸载的时候隐藏掉
   *
   * @param leftSidebarVisible
   */
  useEffect(() => {
    setHasLeftSidebar(true);

    /**
     * 在大于 1024 的屏幕初始化的时候才显示 LeftSidebar
     */
    if (window.innerWidth > 1024) {
      show();
    }
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
        <div className='c-sidebar-left-inner'>{props.children}</div>

        <span title='收起侧边栏' className='c-sidebar-left-toggle' onClick={toggle}>
          {leftSidebarVisible ? <img src={Close} /> : <img src={Open} />}
        </span>
      </aside>
    );
  }
  return null;
};

LeftSidebar.displayName = 'LeftSidebar';

export default LeftSidebar;
