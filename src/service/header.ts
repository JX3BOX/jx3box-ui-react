import axios from 'axios';
import { $helper, $cms } from '@jx3box/jx3box-common/js/request';
import { __dataPath, __Root, __Links } from '@jx3box/jx3box-common/data/jx3box.json';
import { CLIENT_TYPE_STD } from '@utils/constants';
import { isSTDClient } from '@utils/utils';

/**
 * 返回传入文件的请求地址
 * @param file
 * @returns
 */
const makeBoxFileUrl = (file: string) => `data/box/${file}`;

/**
 * 根据魔盒版本返回对应的导航数据
 * @param client
 * @returns
 */
export const getNav = (client = CLIENT_TYPE_STD) => {
  const filename = isSTDClient(client) ? 'header_nav_origin.json' : 'header_nav.json';
  return axios.get(__dataPath + makeBoxFileUrl(filename));
};

/**
 * 根据魔盒版本返回对应的box组件数据
 * @param client
 * @returns
 */
export const getBox = (client = CLIENT_TYPE_STD) => {
  const filename = isSTDClient(client) ? 'box_origin.json' : 'box.json';
  return axios.get(__dataPath + makeBoxFileUrl(filename));
};

/**
 * 返回panel组件数据
 * @returns
 */
export const getPanel = () => axios.get(__dataPath + makeBoxFileUrl('header_panel.json'));

/**
 * 获取消息
 * @returns
 */
export const getMsg = () => $helper({ mute: true }).get('/api/messages/unread_total');

/**
 * 返回传入menu key对应的config
 * @param key
 * @returns
 */
export const getMenu = key => $cms().get(`/api/cms/config/menu/${key}`);

/**
 * 获取搜索链接
 * @returns string
 */
export const getSearchUrl = (): string => __Root + 'search';

/**
 * 获取注册链接
 * @returns string
 */
export const getRegisterUrl = (): string => __Links.account.register + '?redirect=' + location.href;

/**
 * 获取登录链接
 * @returns string
 */
export const getLoginUrl = (): string => __Links.account.login + '?redirect=' + location.href;

/**
 * 返回传入用户主页Url
 * @param uid
 * @returns
 */
export const getHomepageUrl = uid => '/author/' + uid;
