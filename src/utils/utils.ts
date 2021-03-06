import { __imgPath } from '@jx3box/jx3box-common/data/jx3box.json';
import {
  CLIENT_TYPE_STD,
  CLIENT_TYPE_ORIGIN,
  APPLICATION_AGENT,
  CLIENT_ORIGIN_URL,
  CLIENT_STD_URL,
  SHARE_LINKS,
} from './constants';
import { HeaderNavData } from './types';

/**
 * 获取当前页面Client版本
 * @returns
 */
export const getCurrentClient = (): string =>
  location.href.includes(CLIENT_TYPE_ORIGIN) ? CLIENT_TYPE_ORIGIN : CLIENT_TYPE_STD;

/**
 * 返回当前客户端版本是否是正式服
 * @param client
 * @returns
 */
export const isSTDClient = (client: string): boolean => client === CLIENT_TYPE_STD;

/**
 * 返回当前客户端版本是否是怀旧服
 * @param client
 * @returns
 */
export const isOriginClient = (client: string): boolean => client === CLIENT_TYPE_ORIGIN;

/**
 * 返回传入版本对应的官网链接
 * @param client
 * @returns
 */
export const getClientUrl = (client: string): string =>
  client === CLIENT_TYPE_ORIGIN ? CLIENT_ORIGIN_URL : CLIENT_STD_URL;

/**
 * 返回当前环境是否是app环境
 * @returns
 */
export const isApp = (): boolean => window.navigator.userAgent.indexOf(APPLICATION_AGENT) >= 0;

/**
 * 返回当前屏幕尺寸是否是手机尺寸并不是返回当前设备是否为手机
 * @returns
 */
export const isMobileSize = (): boolean => window.innerWidth < 720;

/**
 * 确认当前client是否和目标client是否相同
 *
 * @param currentClient 当前client
 * @param targetClient 目标client
 * @returns
 */
export const confirmClientVersion = (currentClient: string, targetClient: string): boolean =>
  currentClient === targetClient;

/**
 * 返回不带 parentKey 的 item
 * @param item
 * @returns
 */
const filterFirstClassNavData = (item: HeaderNavData) => !item.parentKey;
/**
 * 返回带 parentKey 的 item
 * @param item
 * @returns
 */
const filterChildNavData = (item: HeaderNavData) => item.parentKey;

const insertIntoParentNav = (parent: HeaderNavData, item: HeaderNavData) => {
  if (!parent.children) {
    parent.children = [item];
    return;
  }
  parent.children.push(item);
};

/**
 * 过滤一遍 nav data
 * @param nav
 * @returns
 */
export const makeHeaderNavData = (navData: HeaderNavData[]) => {
  /**
   * 获取没有parentkey的navdata
   * @param firstClassNav
   */
  const firstClassNavData = navData.filter(filterFirstClassNavData);
  const childNavData = navData.filter(filterChildNavData);

  childNavData.forEach(childNavItem => {
    const currentParentkey = childNavItem.parentKey;
    const currentParent = firstClassNavData.find(parentItem => parentItem.key === currentParentkey);

    if (currentParent) {
      insertIntoParentNav(currentParent, childNavItem);
    }
  });

  return firstClassNavData;
};

/**
 * 判断导航是否还有子节点
 * @param item
 * @returns
 */
export const checkNavHasChildren = (item): boolean =>
  item.status && item.children && item.children.length > 0;

/**
 * 截取用户名
 * @param name
 * @returns
 */
export const makeUsername = (name: string) =>
  name ? (name.length < 5 ? name : name.slice(0, 4) + '..') : '匿名';

/**
 * 返回用户vip过期时间
 * @param time
 * @returns
 */
export const makeVipExpireTime = (time: any): number => {
  const vipExpireTime = new Date(time).getTime();
  const currentTime = new Date().getTime();
  const expireTime: number = ((vipExpireTime - currentTime) / 86400000) ^ 0;
  return expireTime;
};

/**
 * 返回 location
 * @returns
 */
export const getLocation = () => document.location;

/**
 * 返回 title
 * @param meta
 * @returns
 */
export const getTitle = (meta?: any) => meta?.title || document.title;

export const getSummary = (meta?: any) => meta?.summary || '';

export const getMetaValue = (meta, target, defaultValue = '') =>
  meta && meta[target] ? meta[target] : defaultValue;

export const getPic = (meta?: any) => meta?.banner || __imgPath + 'image/common/logo.png';

export const getWeiboShareLink = (meta?: any) =>
  SHARE_LINKS.weibo + `url=${getLocation()}` + `&title=${getTitle(meta)}` + `&pic=${getPic(meta)}`;

export const getQZoneShareLink = (meta?: any) =>
  SHARE_LINKS.qzone +
  `url=${getLocation()}` +
  `&title=${getTitle(meta)}` +
  '&sharesource=qzone' +
  `&summary=${getSummary(meta)}` +
  `&desc=${getMetaValue(meta, 'desc', '')}` +
  `&pics=${getPic(meta)}`;

export const getQQShareLink = (meta?: any) =>
  SHARE_LINKS.qq + `url=${getLocation()}` + `&title=${getTitle(meta)}` + `&pics=${getPic(meta)}`;

export const getTiebaShareLink = (meta?: any) =>
  SHARE_LINKS.tieba +
  `url=${getLocation()}` +
  `&title=${getTitle(meta)}` +
  `&summary=${getSummary(meta)}` +
  `&desc=${getMetaValue(meta, 'desc', '')}` +
  `&pic=${getPic(meta)}`;

export const getShareLink = (shareType: string) => {
  switch (shareType) {
    case 'qzone':
      return getQZoneShareLink;
    case 'qq':
      return getQQShareLink;
    case 'weibo':
      return getWeiboShareLink;
    case 'tieba':
      return getTiebaShareLink;
    default:
      return () => '';
  }
};

/**
 * 返回当前数据是否满足渲染条件
 * @param item
 * @param client
 * @returns
 */
export const filterHeaderBoxDataByClient = (item, client) =>
  item.status && (item.client === client || item.client === 'all');

export const getTarget = val =>
  window.innerWidth < 768 || val?.startsWith('/') ? '_self' : '_blank';
