import React, { useContext, useEffect, useMemo } from 'react';
import { isApp } from '@utils/utils';
import classNames from 'classnames';
import Close from '../../assets/leftsidebar/close.svg';
import Open from '../../assets/leftsidebar/open.svg';
import { Jx3BoxLayoutContext } from '@components/provider/layout-provider';

/**
 *
 * @param withoutBread 是否有面包屑组件和计算sidebar高度有关
 * @export
 * @interface LeftSidebarProps
 */
export interface LeftSidebarProps {
  withoutBread?: boolean;
  children?: any;
}

const LeftSidebar: React.FC<LeftSidebarProps> = props => {
  const { withoutBread = true } = props;
  const { leftSidebarVisible, leftSiderHook } = useContext(Jx3BoxLayoutContext);
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
        ['without-bread']: withoutBread,
      }),
    [leftSidebarVisible, withoutBread]
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
