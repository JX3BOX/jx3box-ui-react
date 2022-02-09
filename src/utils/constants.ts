/**
 * 客户端版本
 * @param CLIENT_TYPE_STD 正式服
 * @param CLIENT_TYPE_ORIGIN 怀旧服
 *
 * @param CLIENT_STD_URL 正式服官网链接
 * @param CLIENT_ORIGIN_URL 怀旧服官网链接
 */
export const CLIENT_TYPE_STD = 'std';
export const CLIENT_TYPE_ORIGIN = 'origin';
export const CLIENT_STD_URL = 'www.jx3box.com';
export const CLIENT_ORIGIN_URL = 'origin.jx3box.com';

export const CLIENT_SWITCH_DATA = [
  {
    name: '正式服',
    client: CLIENT_TYPE_STD,
  },
  {
    name: '怀旧服',
    client: CLIENT_TYPE_ORIGIN,
  },
];

/**
 * 应该是剑三魔盒app标识
 * @param APPLICATION_AGENT
 */
export const APPLICATION_AGENT = 'jx3boxApp';
