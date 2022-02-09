import { __imgPath } from '@jx3box/jx3box-common/data/jx3box.json';
import { $cms } from '@jx3box/jx3box-common/js/https.js';

/**
 * 返回传入的uid用户是否是超级作者
 * @param uid
 * @returns
 */
export const getSuperAuthor = uid => $cms().get('/api/cms/user/is_super_author/' + uid);

/**
 * 获取超级作者图标
 * @returns
 */
export const getSuperAuthorIcon = () => __imgPath + 'image/user/' + 'superauthor.svg';

/**
 * 获取vip链接
 * @returns
 */
export const getVipUrl = (): string => '/vip/premium?from=header_usermenu';
