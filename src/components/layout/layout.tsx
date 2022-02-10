import {
  Jx3BoxLayoutContext,
  Jx3BoxLayoutContextProps,
} from '@components/provider/layout-provider';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';

export interface BasicLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { className, ...rests } = props;
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);

  /**
   * 用useMemo计算出layout的cls方便后续计算
   * @param basicLayoutCls
   */
  const basicLayoutCls = useMemo(
    () =>
      classNames(className, 'c-layout', {
        ['c-layout-left-sidebar-open']: leftSidebarVisible,
      }),
    [leftSidebarVisible]
  );

  /**
   * 实现 Jx3BoxLayoutContextProps
   * @param {Jx3BoxLayoutContextProps} contextValue
   */
  const contextValue: Jx3BoxLayoutContextProps = useMemo(
    () => ({
      leftSidebarVisible,
      leftSiderHook: {
        show: () => setLeftSidebarVisible(true),
        hide: () => setLeftSidebarVisible(false),
        toggle: () => setLeftSidebarVisible(prevLeftSidebarVisible => !prevLeftSidebarVisible),
      },
    }),
    [leftSidebarVisible]
  );

  return (
    <Jx3BoxLayoutContext.Provider value={contextValue}>
      <section className={basicLayoutCls} {...rests}>
        {props.children}
      </section>
    </Jx3BoxLayoutContext.Provider>
  );
};

export default BasicLayout;
