import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import { Jx3BoxLayoutContext } from '@components/provider/layout-provider';

/**
 *
 * @param props
 * @returns
 */
const LayoutMain: React.FC<{}> = props => {
  const { leftSidebarVisible, rightSidebarVisible } = useContext(Jx3BoxLayoutContext);

  /**
   * 使用 useMemo 计算最终的 mainClassNames
   * @param mainCls
   */
  const mainCls = useMemo(
    () =>
      classNames('c-main', {
        ['without-left']: !leftSidebarVisible,
        ['without-right']: !rightSidebarVisible,
      }),
    [leftSidebarVisible, rightSidebarVisible]
  );

  return <main className={mainCls}>{props.children}</main>;
};

export default LayoutMain;
