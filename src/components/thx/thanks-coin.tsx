import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Tooltip, Modal, Space, Radio, Input, notification } from 'antd';
import User from '@jx3box/jx3box-common/js/user';
import { Jx3BoxContext } from '@components/provider';
import { getChargeLink, rewardBoxcoin } from '@service/thanks';
import { ThanksContextValue } from './thanks';
import Heart from '../../assets/widget/heart1.svg';
export interface ThanksCoinProps {
  postType: string | number;
  postId: string | number;
  userId: string | number;
}

export const makeThanksCoinProps = (props): ThanksCoinProps => ({
  postType: props.postType,
  postId: props.postId,
  userId: props.userId,
});

const makePointsToRadioOptions = points =>
  points.map(item => ({
    label: (
      <>
        <b>{item}</b>盒币
      </>
    ),
    value: item,
  }));

const ThanksCoin: React.FC<ThanksCoinProps & { thanksContextValue: ThanksContextValue }> =
  props => {
    const { postId, postType } = props;
    const { isLogin, user, client } = useContext(Jx3BoxContext);
    const { thanksContextValue, userId } = props;
    const { userLeft, setUserLeft, userPoints } = thanksContextValue;

    const [coinVisile, setCoinVisible] = useState(false);
    const showCoinModal = useCallback(() => setCoinVisible(true), []);
    const hideCoinModal = useCallback(() => setCoinVisible(false), []);

    /**
     * 要打赏的盒币数量
     * @param coinValue
     *
     * 修改打赏金额的callback
     * @method onChangeCoinValue
     */
    const [coinValue, setCoinValue] = useState(0);
    const onChangeCoinValue = useCallback(event => setCoinValue(event.target.value), []);

    /**
     * 寄语
     * @param coinRemark
     * 修改寄语
     * @method onChangeCoinRemark
     */
    const [coinRemark, setCoinRemark] = useState('辛苦了，谢谢大大！');
    const onChangeCoinRemark = useCallback(event => setCoinRemark(event.target.value), []);

    /**
     * 打赏
     * @method submitReward
     */
    const submitReward = useCallback(() => {
      rewardBoxcoin(postType, postId, userId, coinValue, {
        remark: coinRemark,
        client: client,
      })
        .then(() => {
          notification.success({
            message: '操作成功',
          });
          /**
           * 大赏之后
           * 扣除用户相应额度
           * 将新增的打赏记录同步出去
           */
          setUserLeft(prevUserLeft => prevUserLeft - coinValue);
        })
        .finally(() => {
          hideCoinModal();
        });
    }, [postType, postId, userId, coinValue, coinRemark, client, setUserLeft, hideCoinModal]);

    /**
     * 如果用户处于未登录状态则跳转到登录
     * 如果已经登录则打开modal
     * @method tryOpenCoinModal
     */
    const tryOpenCoinModal = useCallback(() => {
      if (!isLogin) {
        return User.toLogin();
      }
      showCoinModal();
    }, [isLogin, showCoinModal]);

    /**
     * 计算出 Radio Group 的 props
     * @param userPointsRadioGroupProps
     */
    const userPointsRadioGroupProps: any = useMemo(
      () => ({
        optionType: 'button',
        value: coinValue,
        onChange: onChangeCoinValue,
        options: makePointsToRadioOptions(userPoints),
      }),
      [userPoints, coinValue, onChangeCoinValue]
    );

    /**
     * 打赏用户和被打赏用户不能是同一人
     * 用户当前盒币必须大于打赏盒币
     * 打赏金额不能为0
     * 寄语不能为空
     * @param canUserSubmit
     */
    const disabledSubmitToken = useMemo(() => {
      const selfToken = user.uid === userId;
      const enoughToken = userLeft >= coinValue;
      return !selfToken && enoughToken && coinValue > 0 && coinRemark !== '';
    }, [user, userId, userLeft, coinValue, coinRemark]);

    return (
      <div className='w-boxcoin-user'>
        <Tooltip title='投币' placement='top'>
          <div className='w-boxcoin-block' onClick={tryOpenCoinModal}>
            <Heart />
          </div>
        </Tooltip>

        <Modal
          visible={coinVisile}
          className='w-boxcoin-pop'
          cancelText='取消'
          okText='确定'
          title='投币打赏'
          onOk={submitReward}
          onCancel={hideCoinModal}
          okButtonProps={{ size: 'large', disabled: !disabledSubmitToken }}
          cancelButtonProps={{ size: 'large' }}
        >
          <div className='w-boxcoin-user-content'>
            <div className='u-left'>
              <em className='u-label'>当前拥有盒币</em>
              <b>{userLeft}</b>
              <a className='u-charge' href={getChargeLink()} rel='noreferrer' target='_blank'>
                [充值]
              </a>
            </div>

            <div className='u-list'>
              <em className='u-label'>❤️ 打赏</em>
              <div className='u-points'>
                <Space size='large'>
                  <Radio.Group {...userPointsRadioGroupProps} />
                </Space>
              </div>
            </div>

            <div className='u-msg'>
              <em className='u-label'>📝 寄语</em>
              <div className='u-input'>
                <Input
                  value={coinRemark}
                  onChange={onChangeCoinRemark}
                  placeholder='请输入寄语（必填）'
                  minLength={2}
                  maxLength={30}
                  showCount={true}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  };

export default ThanksCoin;
