import React from 'react';

export interface Jx3BoxLayoutContextProps {
  /**
   * 新增 breadcrumbVisible 是否显示面包屑
   * @param breadcrumbVisible
   */
  breadcrumbVisible: boolean;
  setBreadcrumbVisible: (visible: boolean) => void;

  /**
   * 注意 hasLeftSidebar 和 leftSidebarVisible 的区别
   *
   * hasLeftSidebar = true 表示项目中使用了 LeftSidebar
   * leftSidebarVisible = true 表示当前 LeftSidebar 处于显示状态
   *
   * 是否有 leftSidebar
   * @param hasLeftSidebar
   *
   * 左侧边栏是否显示
   * @param leftSidebarVisible
   *
   * 左侧边栏 hook
   * @param leftSiderHook
   */
  hasLeftSidebar: boolean;
  leftSidebarVisible: boolean;
  leftSiderHook: {
    setHasLeftSidebar: (hasSidebar: boolean) => void;
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

  hasLeftSidebar: false,
  leftSidebarVisible: false,
  leftSiderHook: {
    setHasLeftSidebar: () => null,
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
