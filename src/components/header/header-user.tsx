import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Dropdown, Tooltip, Menu } from 'antd';
import { getLoginUrl, getRegisterUrl } from '@service/header';
import { makeUsername, makeVipExpireTime } from '@utils/utils';
import { getSuperAuthorIcon } from '@service/user';
import {
  Jx3BoxUserContextWrapper,
  Jx3BoxUserContext,
  Jx3BoxUserContextProps,
} from '@components/provider';
import Msg from '../../assets/header/msg.svg';
import Add from '../../assets/header/add.svg';

interface HeaderUserProps extends Jx3BoxUserContextProps {}

const HeaderUser = (props: HeaderUserProps) => {
  const {
    isLogin,
    links,
    unread,
    user,
    isSuperAuthor,
    isVip,
    isPro,
    assets,
    panel,
    isEditor,
    logout,
  } = props;

  /**
   * 返回当前panel是否显示
   * @method makePanelShown
   * @returns boolean
   */
  const makePanelShown = useCallback(item => isEditor || !item.onlyAdmin, [isEditor]);

  /**
   * 使用 useMemo 对vip和pro进行渲染相关的优化
   * @param {string} proType pro类型
   * @param {string} proText pro文字
   * @param {string} vipCls vip classnames
   * @param {number} expireTime 过期天数
   */
  const [proType, proText, vipCls, expireTime] = useMemo(
    () => [
      isPro ? '专业版' : '高级版',
      isPro ? 'PRO' : 'PRE',
      classNames('i-icon-vip', {
        ['on']: isVip || isPro,
      }),
      makeVipExpireTime(isPro ? assets.pro_expire_date : assets.expire_date),
    ],
    [isVip, isPro, assets, makeVipExpireTime]
  );

  /**
   * 点击用户出现的蒙层 使用 useMemo 优化渲染
   * @param userProfileOverlay
   */
  const userProfileOverlay = useMemo(
    () => (
      <Menu id='u-profile-menu-overlay'>
        <Menu.Item className='c-header-profile' key='u-me'>
          <a className='u-me' href={links.homepage}>
            <b>{makeUsername(user.name)}</b>
            {isSuperAuthor && (
              <img
                src={getSuperAuthorIcon()}
                className='u-superauthor-profile'
                alt='superauthor'
                title='签约作者'
              />
            )}
            <em>(UID : {user.uid})</em>
          </a>
        </Menu.Item>

        <Menu.Item key='u-vip'>
          <a className='u-vip' href='/vip/premium?from=header_usermenu' target='_blank'>
            <i className={vipCls}>{proType}</i>
            <span className='u-vip-type'>
              {isVip || isPro ? <span className='u-vip-left'>{expireTime}天</span> : '升级账号类型'}
            </span>
          </a>
        </Menu.Item>
        <hr />

        {panel.map(
          item =>
            makePanelShown(item) && (
              <Menu.Item key={`panel-${item.label}`}>
                <a href={item.link}>{item.label}</a>
              </Menu.Item>
            )
        )}
        <hr />
        <Menu.Item key='setting'>
          <a href={links.profile}>设置</a>
        </Menu.Item>
        <Menu.Item key='logout'>
          <a onClick={logout}>登出</a>
        </Menu.Item>
      </Menu>
    ),
    [
      user,
      links,
      proType,
      proText,
      vipCls,
      expireTime,
      isEditor,
      logout,
      makeUsername,
      getSuperAuthorIcon,
    ]
  );

  if (!isLogin) {
    return (
      <div className='c-header-user' id='c-header-user'>
        <div className='c-header-login'>
          <a className='u-register u-default' href={getRegisterUrl()}>
            注册
          </a>
          <em>|</em>
          <a className='u-login u-default' href={getLoginUrl()}>
            登录
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className='c-header-user' id='c-header-user'>
      <div className='c-header-msg' id='c-header-msg'>
        <Tooltip title='我的消息' placement='bottom'>
          <a className='u-msg' href={links.msg}>
            <i className='u-icon u-icon-msg'>
              {unread && <i className='u-pop' />}
              <Msg />
            </i>
          </a>
        </Tooltip>
      </div>

      <div className='c-header-panel' id='c-header-panel'>
        <Tooltip title='发布中心' placement='bottom'>
          <a className='u-post' href={links.publish}>
            <Add className='u-add' />
          </a>
        </Tooltip>
      </div>

      <div className='c-header-info'>
        <Dropdown overlay={userProfileOverlay} trigger={['click']}>
          <div className='c-header-profile' id='c-header-profile'>
            <img className='u-avatar' src={user.avatar} />
            <span className='u-dropdown' />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

/**
 * 用 Jx3BoxUserContextWrapper 包裹
 * @returns React.Component HeaderUserWithWrapper
 */
const HeaderUserWithWrapper = () => (
  <Jx3BoxUserContextWrapper>
    <Jx3BoxUserContext.Consumer>
      {({ ...userContextProps }) => <HeaderUser {...userContextProps} />}
    </Jx3BoxUserContext.Consumer>
  </Jx3BoxUserContextWrapper>
);

export default HeaderUserWithWrapper;
