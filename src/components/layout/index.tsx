import React from 'react';
import BasicLayout, { BasicLayoutProps } from './layout';
import LeftSidebar from './left-sidebar';
import RightSidebar from './right-sidebar';

interface LayoutType extends React.FC<BasicLayoutProps> {
  LeftSidebar: typeof LeftSidebar;
  RightSidebar: typeof RightSidebar;
}

const Layout = BasicLayout as LayoutType;

Layout.LeftSidebar = LeftSidebar;
Layout.RightSidebar = RightSidebar;

export default Layout;
