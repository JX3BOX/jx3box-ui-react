import React from 'react';

export interface Jx3BoxLayoutContextProps {
  leftSidebarVisible: boolean;
  leftSiderHook: {
    show: () => void;
    hide: () => void;
    toggle: () => void;
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
  leftSidebarVisible: false,
  leftSiderHook: {
    show: () => null,
    hide: () => null,
    toggle: () => null,
  },
});
