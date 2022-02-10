import { __Root, feedback } from '@jx3box/jx3box-common/data/jx3box.json';

/**
 * 返回 about 链接
 * @returns
 */
export const getAboutUrl = () => __Root + 'about';

/**
 * 返回反馈链接
 * @returns
 */
export const getFeedbackUrl = () => feedback + '&subject=' + location.href;
