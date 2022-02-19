import React, { useCallback } from 'react';
import { Popover, Tooltip } from 'antd';
import QRCode from 'qrcode.react';
import ShareIcon from '../../assets/widget/share2.svg';
import { getShareLink } from '../../utils/utils';
import Weibo from '../../assets/widget/weibo.svg';
import QQ from '../../assets/widget/qq.svg';
import Qzone from '../../assets/widget/qzone.svg';
import TieBA from '../../assets/widget/tieba.svg';

const ThanksShareList = [
  {
    name: '微博',
    key: 'weibo',
    Icon: Weibo,
  },
  {
    name: 'QQ',
    key: 'qq',
    Icon: QQ,
  },
  {
    name: 'QQ空间',
    key: 'qzone',
    Icon: Qzone,
  },
  {
    name: '贴吧',
    key: 'tieba',
    Icon: TieBA,
  },
];

export interface ThanksShareProps {
  postType: string | number;
  postId: string | number;
  meta?: any;
}

const getQRCodeUrl = () => document.location.href;

const ThanksShare: React.FC<ThanksShareProps> = props => {
  const { meta } = props;
  /**
   * 先获得要分享的 Link
   * 新开一个页面到 Link
   * @method onShareHandle
   */
  const onShareHandle = useCallback(
    (shareKey: string) => {
      const getLink = getShareLink(shareKey);
      window.open(getLink(meta), '_blank');
    },
    [meta]
  );

  /**
   * 分享 Popover 的内容
   * @param sharePopverContent
   */
  const sharePopverContent = (
    <div className='u-share2-content'>
      <div className='u-share2-content-main'>
        {ThanksShareList.map(item => (
          <div
            onClick={() => onShareHandle(item.key)}
            key={item.key}
            className='u-share2-item'
            title='分享'
          >
            <img src={item.Icon} />
            <div className='u-share2-name'>{item.name}</div>
          </div>
        ))}
      </div>

      <div className='u-share2-wechat'>
        <QRCode value={getQRCodeUrl()} className='u-pic' size={75} level='H' />
        <span>微信扫一扫分享</span>
      </div>
    </div>
  );

  return (
    <div className='w-share2'>
      <Popover
        overlayClassName='u-share2-pop'
        content={sharePopverContent}
        placement='right'
        trigger={['hover']}
      >
        <Tooltip placement='top' className='item' title='分享'>
          <div className='u-icon'>
            <img src={ShareIcon} />
          </div>
        </Tooltip>
      </Popover>
    </div>
  );
};

export default ThanksShare;
