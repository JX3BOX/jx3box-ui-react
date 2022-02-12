/* eslint-disable camelcase */
import qs from 'qs';
import { $helper } from '@jx3box/jx3box-common/js/request';
import { handleNotificationPromise } from './interceptors';

/**
 * 返回传入post的收藏数
 * @param postType
 * @param postId
 * @returns
 */
export const hasFavorite = (postType: string | number, postId: string | number) =>
  handleNotificationPromise(
    $helper().get('/api/post/favorite/favorited', {
      params: {
        post_type: postType,
        post_id: postId,
      },
    })
  );

/**
 * 添加收藏传入的post
 * @param postType
 * @param postId
 * @returns
 */
export const addFavorite = (postType: string | number, postId: string | number) =>
  handleNotificationPromise(
    $helper().post(
      '/api/post/favorite',
      qs.stringify({
        post_type: postType,
        post_id: postId,
        cancel: 0,
      })
    )
  );

/**
 * 取消收藏传入的post
 * @param postType
 * @param postId
 * @returns
 */
export const cancelFavorite = (postType: string | number, postId: string | number) =>
  handleNotificationPromise(
    $helper().post(
      '/api/post/favorite',
      qs.stringify({
        post_type: postType,
        post_id: postId,
        cancel: 1,
      })
    )
  );
