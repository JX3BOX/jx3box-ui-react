import { isApp } from '@utils/utils';
import React from 'react';

export interface RightSidebarProps {
  children?: any;
}

const RightSidebar: React.FC<RightSidebarProps> = props => {
  if (!isApp()) {
    return <aside className='c-sidebar-right c-sidebar'>{props.children}</aside>;
  }
  return null;
};

export default RightSidebar;
