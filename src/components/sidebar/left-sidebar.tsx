import React, { useCallback, useMemo, useState } from 'react';
import { isApp } from '@utils/utils';
import classNames from 'classnames';
import Close from '../../assets/leftsidebar/close.svg';
import Open from '../../assets/leftsidebar/open.svg';

/**
 * LeftSidebar组件内包裹的内部组件会透传
 * leftSidebarVisible 和 toggleLeftSidebar props
 *
 * @export
 * @interface LeftSidebarInjectChildrenProps
 */
export interface LeftSidebarInjectChildrenProps {
  leftSidebarVisible: boolean;
  toggleLeftSidebar: () => void;
}

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

  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);

  /**
   * 切换 leftSidebar 显示/隐藏
   * @method toggleLeftSidebar
   */
  const toggleLeftSidebar = useCallback(
    () => setLeftSidebarVisible(prevSidebarVisible => !prevSidebarVisible),
    [setLeftSidebarVisible]
  );

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
            React.cloneElement(props.children, { leftSidebarVisible, toggleLeftSidebar })}
        </div>

        <span title='收起侧边栏' className='c-sidebar-left-toggle' onClick={toggleLeftSidebar}>
          {leftSidebarVisible ? <Close /> : <Open />}
        </span>
      </aside>
    );
  }
  return null;
};

export default LeftSidebar;
