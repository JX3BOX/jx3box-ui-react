import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import { postStat, getStat } from '@jx3box/jx3box-common/js/stat';
import LikeIcon from '../../assets/widget/like2.svg';

export interface ThanksLikeProps {
  postType: string | number;
  postId: string | number;
}

const ThanksLike: React.FC<ThanksLikeProps> = props => {
  const { postId, postType } = props;
  const [likeCount, setLikeCount] = useState(0);
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  /**
   * 初始化组件的时候请求当前 post 的获赞情况
   * @method useEffect
   */
  useEffect(() => {
    getStat(postType, postId).then(result => {
      setLikeCount(result.data?.likes || 0);
    });
  }, [postType, postId]);

  /**
   * 点赞操作
   * @method addLike
   */
  const addLike = useCallback(() => {
    if (!alreadyLiked) {
      postStat(postType, postId, 'likes');
      setAlreadyLiked(true);
    }
  }, [postId, postType, alreadyLiked]);

  /**
   * 使用 useMemo 计算出最终的 Like component classNames
   * @param likeCls
   */
  const likeCls = useMemo(
    () =>
      classNames('w-like2', {
        ['disabled']: alreadyLiked,
      }),
    [alreadyLiked]
  );

  return (
    <div className={likeCls} onClick={addLike}>
      <Tooltip title='点赞' placement='top'>
        <div>
          <LikeIcon />
          {likeCount !== 0 && (
            <span className='u-count' v-if='count'>
              {likeCount}
            </span>
          )}
        </div>
      </Tooltip>
    </div>
  );
};

export default ThanksLike;
