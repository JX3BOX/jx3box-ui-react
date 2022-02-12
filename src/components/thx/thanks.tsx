import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Jx3BoxContext } from '@components/provider';
import ThanksCoin, { ThanksCoinProps, makeThanksCoinProps } from './thanks-coin';
import ThanksFavorite from './thanks-favorite';
import ThanksLike, { makeThanksLikeProps, ThanksLikeProps } from './thanks-like';
import { getBoxcoinStatus, getPostBoxcoinConfig } from '@service/thanks';
import ThanksShare from './thanks-share';
import ThanksRecord from './thanks-record';
import EventEmitter from '@utils/event-emitter';

export const thanksRecordEvnetKey = 'updateRecord';
export const thanksRecordEventEmitter = new EventEmitter();

export interface ThanksContextValue {
  adminPoints: Array<number>;
  adminLeft: number;
  userPoints: Array<number>;
  setUserPoints: React.Dispatch<React.SetStateAction<Array<number>>>;
  userLeft: number;
  setUserLeft: React.Dispatch<React.SetStateAction<number>>;
}

export type ThanksProps = {} & ThanksLikeProps & ThanksCoinProps;

/**
 * Thanks 组件
 *
 * @todo
 * 当用户打赏的时候 前端应该直接渲染
 * 所以前端在打赏之后在本地直接添加一条打赏记录
 *
 * 把打赏模块的 hook 写在 Thanks component 中
 * 在分发到各个需要的子模块
 *
 * @param props
 * @returns
 */
const Thanks: React.FC<ThanksProps> = props => {
  const { postType } = props;
  const { isLogin } = useContext(Jx3BoxContext);

  /**
   * 盒币开关
   * @param coinEnable
   *
   * 管理员点数
   * @param adminPoints
   *
   * 管理员剩余
   * @param adminLeft
   *
   * 用户点数
   * @param userPoints
   *
   * 用户剩余
   * @param userLeft
   */
  const [coinEnable, setCoinEnable] = useState(false);
  const [adminPoints, setAdminPoints] = useState([100]);
  const [adminLeft, setAdminLeft] = useState(0);
  const [userPoints, setUserPoints] = useState([100]);
  const [userLeft, setUserLeft] = useState(0);

  useEffect(() => {
    /**
     * 请求后端是否开启了盒币开关
     * @method getBoxcoinStatus
     */
    getBoxcoinStatus().then(result => {
      setCoinEnable(!!~~result.data.data.val);
    });

    if (isLogin) {
      getPostBoxcoinConfig(postType).then(result => {
        setAdminPoints(result.data.data.limit.admin_points || [10, 1000]);
        setAdminLeft(result.data.data.asManagerBoxCoinRemain || 0);
        setUserPoints(result.data.data.limit.user_points || [10, 1000]);
        setUserLeft(result.data.data.asUserBoxCoinRemain || 0);
      });
    }
  }, [isLogin, postType]);

  const [thanksCoinProps, baseThanksProps] = useMemo(
    () => [makeThanksCoinProps(props), makeThanksLikeProps(props)],
    [props, makeThanksLikeProps, makeThanksCoinProps]
  );

  /**
   * Thanks 组件内部通用的上下文
   * @param thanksContextValue
   */
  const thanksContextValue: ThanksContextValue = useMemo(
    () => ({
      adminPoints,
      adminLeft,
      userPoints,
      setUserPoints,
      userLeft,
      setUserLeft,
    }),
    [adminPoints, adminLeft, userPoints, userLeft]
  );

  return (
    <div className='w-thx'>
      <div className='w-thx-panel'>
        <ThanksLike {...baseThanksProps} />
        <ThanksFavorite {...baseThanksProps} />
        {coinEnable && <ThanksCoin {...thanksCoinProps} thanksContextValue={thanksContextValue} />}
        <ThanksShare {...baseThanksProps} />
      </div>

      <div className='w-thx-records'>
        <ThanksRecord {...baseThanksProps} />
      </div>

      <div className='w-thx-copyright'>
        &copy;
        所有原创作品，著作权归作者所有，所有未经授权的非署名转载或抄袭将有权追究法律责任，所有法律事务由专聘律师代理。
        <br />
        签约作者独家特约稿件，及所有魔盒官方评分作品用户一经兑现则视为有偿付费稿件，所有商业稿件的转载引用需同时征得魔盒平台授权。
      </div>
    </div>
  );
};

export default Thanks;
