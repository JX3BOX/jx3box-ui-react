import { CLIENT_TYPE_STD, CLIENT_TYPE_ORIGIN, APPLICATION_AGENT } from './constants';

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
 * 返回当前环境是否是app环境
 * @returns
 */
export const isApp = () => window.navigator.userAgent.indexOf(APPLICATION_AGENT) >= 0;
