/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import User from '@jx3box/jx3box-common/js/user';
import { confirmClientVersion, getClientUrl, getCurrentClient } from '@utils/utils';
import { notification } from 'antd';
import { __Links, __Root, __imgPath } from '@jx3box/jx3box-common/data/jx3box.json';
import { Jx3BoxUser, Jx3BoxUserAssets, UserLinks } from '@utils/types';
import { getHomepageUrl, getMenu, getMsg } from '@service/header';
import panelData from '@data/panel.json';
import { getSuperAuthor } from '@service/user';

interface ChangeJx3BoxClientInterface {
  (targetClient: string): void;
}

const changeJx3BoxClient: ChangeJx3BoxClientInterface = (targetClient: string) => {
  const currentClient = getCurrentClient();
  if (confirmClientVersion(currentClient, targetClient)) {
    return;
  }
  location.href = location.href.replace(getClientUrl(currentClient), getClientUrl(targetClient));
};

export interface Jx3BoxContextProps {
  /**
   *
   * 刚看了剑三魔盒官网切换正式服/怀旧服其实是跳链行为
   *
   * 所以必然会触发重新渲染
   *
   * 在context中只需要保存初始化的值就可以了
   *
   * @param client 当前魔盒版本
   * @param  {ChangeJx3BoxClientInterface} changeJx3BoxClient 切换魔盒版本
   */
  client: string;
  changeJx3BoxClient: ChangeJx3BoxClientInterface;
}

/**
 * 创建组件全局Context
 *
 * @param {Jx3BoxContextProps} Jx3BoxContext
 */
export const Jx3BoxContext = React.createContext<Jx3BoxContextProps>({
  client: getCurrentClient(),
  changeJx3BoxClient,
});

/**
 * ====================================================================================
 * ====================================================================================
 * 把 userinfo 相关的逻辑单独抽离出来整理成一个 context 没有 redux 不是很方便
 *
 * 把所有和 user 相关的逻辑全部封装到这个 context 内部 并按照下面的方法使用
 *
 * ```javascript
 * const HeaderUserWithWrapper = () => (
    <Jx3BoxUserContextWrapper>
      <Jx3BoxUserContext.Consumer>
        {({ ...userContextProps }) => <HeaderUser {...userContextProps} />}
      </Jx3BoxUserContext.Consumer>
    </Jx3BoxUserContextWrapper>
  );
 * ```
 *
 * @param {Jx3BoxUserContextProps} Jx3BoxUserContext
 */

export interface Jx3BoxUserContextProps {
  isLogin: boolean;
  user: Jx3BoxUser;
  logout: () => void;
  isEditor: boolean;
  unread: boolean;
  isSuperAuthor: boolean;
  panel: any[];
  assets: Jx3BoxUserAssets;
  links: UserLinks;
  isVip: boolean;
  isPro: boolean;
}

const USER_EDITOR_INIT = false;
const USER_MSG_UNREAD_INIT = false;
const USER_PANEL_INIT = [];
const USER_SUPER_AUTHOR_INIT = false;
const USER_LINKS_INIT = {} as any;
const USER_VIP_INIT = false;
const USER_PRO_INIT = false;
const USER_ASSETS_INIT: Jx3BoxUserAssets = {
  expire_date: '2022-03-07T00:00:00+08:00',
  total_day: 395,
  was_vip: 0,
  pro_expire_date: '2022-03-07T00:00:00+08:00',
  pro_total_day: 366,
  was_pro: 0,
};

export const Jx3BoxUserContext = React.createContext<Jx3BoxUserContextProps>({
  isLogin: User.isLogin(),
  user: User.getInfo(),
  logout: () => {},
  isEditor: USER_EDITOR_INIT,
  unread: USER_MSG_UNREAD_INIT,
  panel: USER_PANEL_INIT,
  assets: USER_ASSETS_INIT,
  isSuperAuthor: USER_SUPER_AUTHOR_INIT,
  links: USER_LINKS_INIT,
  isVip: USER_VIP_INIT,
  isPro: USER_PRO_INIT,
});

export const Jx3BoxUserContextWrapper = ({ children }: any) => {
  /**
   * 是否编辑
   * @param isEditor
   *
   * 是否有未读消息
   * @param unread
   *
   * 用户设置面板
   * @param panel
   *
   * 用户会员相关
   * @param assets
   *
   * 跳链相关
   * @param links
   */
  const [isLogin, setIsLogin] = useState(User.isLogin());
  const [user] = useState(User.getInfo());
  const [isEditor, setIsEditor] = useState(USER_EDITOR_INIT);
  const [unread, setUnread] = useState(USER_MSG_UNREAD_INIT);
  const [panel, setPanel] = useState(USER_PANEL_INIT);
  const [assets, setAssets] = useState(USER_ASSETS_INIT);
  const [isSuperAuthor, setIsSuperAuthor] = useState(USER_SUPER_AUTHOR_INIT);
  const [links, setLinks] = useState(USER_LINKS_INIT as UserLinks);
  const [isVip, setIsVip] = useState(USER_VIP_INIT);
  const [isPro, setIsPro] = useState(USER_PRO_INIT);

  /**
   * 查看用户是否有未读消息
   * @method checkMsg
   */
  const checkMsg = useCallback(() => {
    getMsg().then(result => {
      setUnread(!!result.data.data.unread);
    });
  }, [getMsg]);

  /**
   * 请求设置面板;
   * @method checkMsg
   */
  const loadPanel = useCallback(() => {
    getMenu('panel').then(result => {
      setPanel(result.data?.data?.val || panelData);
    });
  }, [getMenu]);

  /**
   * 请求用户会员;
   * @method checkMsg
   */
  const loadAssets = () => {
    User.getAsset().then(data => {
      setAssets(data);
    });
  };

  /**
   * 查看用户权限
   * @method checkMsg
   */
  const checkSuperAuthor = useCallback(() => {
    getSuperAuthor(user?.uid).then(result => {
      setIsSuperAuthor(result.data.data);
    });
  }, [user]);

  const makeLinks = useCallback(() => {
    setLinks({
      msg: __Links.dashboard.msg,
      publish: __Links.dashboard.publish,
      dashboard: __Links.dashboard.home,
      profile: __Links.dashboard.profile,
      homepage: getHomepageUrl(user.uid),
    });
  }, [user]);

  useEffect(() => {
    makeLinks();

    if (isLogin) {
      // 如果登录了则请求用户其他状态
      setIsEditor(User.isEditor());

      checkMsg();

      loadPanel();

      loadAssets();

      checkSuperAuthor();
    }
  }, [isLogin]);

  useEffect(() => {
    /**
     * 设置用户魔盒是否VIP和PRO
     * @method setIsVip
     * @method setIsPro
     */
    setIsVip(User._isVIP(assets) || false);
    setIsPro(User._isPRO(assets) || false);
  }, [assets]);

  /**
   * 退出登录
   * @method logout
   */
  const logout = useCallback(() => {
    User.destroy()
      .then(() => {
        setIsLogin(false);

        if (location.href.indexOf('dashboard') > 0) {
          location.href = __Root;
        }
      })
      .then(() => {
        notification.success({
          message: '成功',
          description: '登出成功',
          type: 'success',
          duration: 1000,
        });
      });
  }, []);

  return (
    <Jx3BoxUserContext.Provider
      value={{
        isLogin,
        user,
        isEditor,
        assets,
        unread,
        panel,
        isSuperAuthor,
        links,
        isVip,
        isPro,
        logout,
      }}
    >
      {children}
    </Jx3BoxUserContext.Provider>
  );
};
