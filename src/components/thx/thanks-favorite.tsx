import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import User from '@jx3box/jx3box-common/js/user';
import { Jx3BoxContext } from '../provider';
import { addFavorite, cancelFavorite, hasFavorite } from '../../service/favorite';
import StarIcon from '../../assets/widget/star.svg';

export interface ThanksFavoriteProps {
  postType: string | number;
  postId: string | number;
}

const ThanksFavorite: React.FC<ThanksFavoriteProps> = props => {
  const { isLogin } = useContext(Jx3BoxContext);
  const { postId, postType } = props;
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [alreadyFavorite, setAlreadyFavorite] = useState(false);

  useEffect(() => {
    /**
     * 请求当前post的收藏数并赋值
     * favorited > 0 说明收藏了否则未收藏
     * @mthod hasFavorite
     */
    hasFavorite(postType, postId).then(result => {
      if (result.data.data?.favorited > 0) {
        setAlreadyFavorite(result.data.data?.favorited > 0);
        setFavoriteCount(result.data.data?.total || 0);
      }
    });
  }, [postType, postId]);

  /**
   * 收藏
   * @method addLike
   */
  const doAddFavorite = useCallback(() => {
    addFavorite(postType, postId).then(() => {
      setAlreadyFavorite(true);
      setFavoriteCount(prevFavoriteCount => prevFavoriteCount + 1);
    });
  }, [postId, postType]);

  /**
   * 取消收藏
   * @method doCancelFavorite
   */
  const doCancelFavorite = useCallback(() => {
    cancelFavorite(postType, postId).then(() => {
      setAlreadyFavorite(false);
      setFavoriteCount(prevFavoriteCount => prevFavoriteCount - 1);
    });
  }, [isLogin, postId, postType]);

  const doFavoriteClickHandle = useCallback(() => {
    if (!isLogin) {
      return User.toLogin();
    }
    if (!alreadyFavorite) {
      return doAddFavorite();
    }
    doCancelFavorite();
  }, [isLogin, alreadyFavorite, doAddFavorite, doCancelFavorite]);

  /**
   * 使用 useMemo 计算出最终的 ThanksFavorite component classNames
   * @param likeCls
   */
  const [likeCls, favoriteText] = useMemo(
    () => [
      classNames('w-fav2', {
        ['disabled']: alreadyFavorite,
      }),
      alreadyFavorite ? '取消收藏' : '收藏',
    ],
    [alreadyFavorite]
  );
  return (
    <div className={likeCls} onClick={doFavoriteClickHandle}>
      <Tooltip title={favoriteText} placement='top'>
        <div>
          <img src={StarIcon} />
          {favoriteCount > 0 && <span className='u-count'>{favoriteCount}</span>}
        </div>
      </Tooltip>
    </div>
  );
};

export default ThanksFavorite;
