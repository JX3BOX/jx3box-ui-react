/* eslint-disable camelcase */
import React from 'react';
import User from '@jx3box/jx3box-common/js/user';
import { getCurrentClient } from '../../utils/utils';
import { __Links, __Root, __imgPath } from '@jx3box/jx3box-common/data/jx3box.json';
import { Jx3BoxUser, Jx3BoxUserAssets, UserLinks } from '../../utils/types';

/**
 * ===========================================================================
 * ===========================================================================
 *
 * Jx3BoxContext Usage
 *
 * Jx3BoxLayoutContextProps 与 layout 有关
 * 涉及计算容器宽度 容器高度等
 * 因为 左 - 中 - 右 的设计布局
 * 有一定的耦合如果手动指定的话会比较麻烦
 * 所以把这部分的逻辑抽离出来直接使用
 *
 * Jx3BoxUserContextProps 与用户有关
 * 可以直接使用用户的一些数据
 * 后续可以自己添加
 * 因为我们的项目在初始化的时候就已经可以拿到
 * 用户大部分数据了 [登录登出均是跳链]
 * 所以目前来看没有数据错误的风险
 *
 * Jx3BoxContext
 * 剩下的是 client 和 changeJx3BoxClient
 * client 是魔盒版本[正式版 - 怀旧服版]
 * changeJx3BoxClient(targetVersion) 传入要切换的版本即可跳转
 * 因为也是跳链行为所以初始化拿到的值即是最终值
 */

interface Jx3BoxLayoutContextProps {
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

interface Jx3BoxUserContextProps {
  /**
   * 是否登录
   * @param isLogin
   */
  isLogin: boolean;
  /**
   * 退出登录
   * @param logout
   */
  logout: () => void;
  user: Jx3BoxUser;
  /**
   * 是否编辑
   * @param isEditor
   */
  isEditor: boolean;
  /**
   * 是否有未读消息
   * @param unread
   */
  unread: boolean;
  /**
   * 是否是超级作者?
   * @param isSuperAuthor
   */
  isSuperAuthor: boolean;
  /**
   * 用户设置面板
   * @param panel
   */
  panel: any[];
  /**
   *
   * 用户会员相关
   * @param assets
   */
  assets: Jx3BoxUserAssets;
  /**
   * 跳链相关
   * @param links
   */
  links: UserLinks;
  /**
   * 是否是 vip
   * @param isVip
   *
   * 是否是 Pro vip
   * @param isPro
   */
  isVip: boolean;
  isPro: boolean;

  isSuperAdmin: boolean;
}

interface ChangeJx3BoxClientInterface {
  (targetClient: string): void;
}

export type Jx3BoxContextProps = {
  /**
   *
   * 刚看了剑三魔盒官网切换正式服/怀旧服其实是跳链行为
   *
   * 所以必然会触发重新渲染
   *
   * 在context中只需要保存初始化的值就可以了
   *
   * @param client 当前魔盒版本
   * @param  {ChangeJx3BoxClientInterface} changeJx3BoxClient 切换魔盒版本
   */
  client: string;
  changeJx3BoxClient: ChangeJx3BoxClientInterface;
} & Jx3BoxLayoutContextProps &
  Jx3BoxUserContextProps;

/**
 * 创建组件全局Context
 *
 * @param {Jx3BoxContextProps} Jx3BoxContext
 */
export const Jx3BoxContext = React.createContext<Jx3BoxContextProps>({
  /**
   * basic context stuff
   */
  client: getCurrentClient(),
  changeJx3BoxClient: () => null,

  /**
   * layout context stuff
   */
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
  /**
   * user context stuff
   */
  isLogin: User.isLogin(),
  user: User.getInfo(),
  logout: () => {},
  isEditor: false,
  unread: false,
  panel: [],
  assets: {} as any,
  isSuperAuthor: false,
  links: {} as any,
  isVip: false,
  isPro: false,
  isSuperAdmin: false,
});
