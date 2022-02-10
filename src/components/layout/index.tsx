import React from 'react';
import BasicLayout, { BasicLayoutProps } from './layout';
import LeftSidebar from './left-sidebar';

interface LayoutType extends React.FC<BasicLayoutProps> {
  LeftSidebar: typeof LeftSidebar;
}

const Layout = BasicLayout as LayoutType;
Layout.LeftSidebar = LeftSidebar;

export default Layout;
