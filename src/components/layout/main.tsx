import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { Jx3BoxLayoutContext } from '@components/provider/layout-provider';

/**
 * Layout 主显示容器 LayoutMain
 *
 * 通过
 * leftSidebarVisible
 * rightSidebarVisible
 * breadcrumbVisible 计算出实际容器组件的布局
 *
 * @param props
 * @returns
 */
const LayoutMain: React.FC<{}> = props => {
  const { breadcrumbVisible, leftSidebarVisible, rightSidebarVisible } =
    useContext(Jx3BoxLayoutContext);

  /**
   * 使用 useMemo 计算最终的 mainClassNames
   * @param mainCls
   */
  const mainCls = useMemo(
    () =>
      classNames('c-main', {
        ['without-left']: !leftSidebarVisible,
        ['without-right']: !rightSidebarVisible,
        ['without-bread']: !breadcrumbVisible,
      }),
    [leftSidebarVisible, rightSidebarVisible, breadcrumbVisible]
  );

  return <main className={mainCls}>{props.children}</main>;
};

export default LayoutMain;
