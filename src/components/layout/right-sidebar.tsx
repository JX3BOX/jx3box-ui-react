import React, { useContext, useEffect } from 'react';
import { Jx3BoxContext } from '@components/provider';
import { isApp } from '@utils/utils';

interface RightSidebarProps {}

const RightSidebar: React.FC<RightSidebarProps> = props => {
  const { rightSiderHook } = useContext(Jx3BoxContext);
  const { show, hide } = rightSiderHook;

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

  if (!isApp()) {
    return <aside className='c-sidebar-right c-sidebar'>{props.children}</aside>;
  }
  return null;
};

export default RightSidebar;
