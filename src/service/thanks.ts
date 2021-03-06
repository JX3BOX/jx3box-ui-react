import { $pay, $cms } from '@jx3box/jx3box-common/js/request';
import { getInterceptor } from './interceptors';

export const getPostBoxcoinRecords = (postType, postId, params) =>
  $pay().get(`/api/inspire/article/${postType}/${postId}/history`, {
    params,
  });

export const grantBoxcoin = (postType, postId, userId, count, data) =>
  $pay().post(
    `/api/inspire/article/${postType}/${postId}/manager2creator/${userId}/coins/${count}`,
    data
  );

export const rewardBoxcoin = (postType, postId, userId, count, data) =>
  getInterceptor('pay')(
    $pay().post(
      `/api/inspire/article/${postType}/${postId}/user2creator/${userId}/coins/${count}`,
      data
    )
  );

export const recoveryBoxcoin = id => $pay().delete(`/api/inspire/coins/log/${id}/recovery`);

export const getPostBoxcoinConfig = postType =>
  $pay().get(`/api/inspire/article/${postType}/boxcoin/limit`);

/**
 * 返回盒币开关
 * @returns
 */
export const getBoxcoinStatus = () =>
  $cms().get('/api/cms/config', {
    params: {
      key: 'boxcoin',
    },
  });

export const getChargeLink = () => '/vip/boxcoin?redirect=' + location.href;
