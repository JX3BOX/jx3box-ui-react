import React from 'react';
import BasicLayout, { BasicLayoutProps } from './layout';
import LeftSidebar from './left-sidebar';
import RightSidebar from './right-sidebar';
import Main from './main';

interface LayoutType extends React.FC<BasicLayoutProps> {
  LeftSidebar: typeof LeftSidebar;
  RightSidebar: typeof RightSidebar;
  Main: typeof Main;
}

const Layout = BasicLayout as LayoutType;

Layout.LeftSidebar = LeftSidebar;
Layout.RightSidebar = RightSidebar;
Layout.Main = Main;

export default Layout;
