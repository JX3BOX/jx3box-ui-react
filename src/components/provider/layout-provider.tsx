import React from 'react';

export interface Jx3BoxLayoutContextProps {
  /**
   * 新增 breadcrumbVisible 是否显示面包屑
   * @param breadcrumbVisible
   */
  breadcrumbVisible: boolean;
  setBreadcrumbVisible: (visible: boolean) => void;
  /**
   * 左侧边栏是否显示
   * @param leftSidebarVisible
   *
   * 左侧边栏 hook
   * @param leftSiderHook
   */
  leftSidebarVisible: boolean;
  leftSiderHook: {
    show: () => void;
    hide: () => void;
    toggle: () => void;
  };

  /**
   * 右侧边栏是否显示
   * @param rightSidebarVisible
   *
   * 右侧边栏 hook
   * @param leftSiderHook
   */
  rightSidebarVisible: boolean;
  rightSiderHook: {
    show: () => void;
    hide: () => void;
  };
}

/**
 * =================================================================================
 * =================================================================================
 *
 * @todo Rebuild Layout module!!
 *
 * 目前的计算方式太sb了 使用context计算 这样在使用的时候不用显示指定 visible了
 */
export const Jx3BoxLayoutContext = React.createContext<Jx3BoxLayoutContextProps>({
  breadcrumbVisible: false,
  setBreadcrumbVisible: () => {},

  leftSidebarVisible: false,
  leftSiderHook: {
    show: () => null,
    hide: () => null,
    toggle: () => null,
  },

  rightSidebarVisible: false,
  rightSiderHook: {
    show: () => null,
    hide: () => null,
  },
});
