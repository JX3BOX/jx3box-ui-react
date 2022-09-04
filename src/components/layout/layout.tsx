import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { notification } from 'antd';
import User from '@jx3box/jx3box-common/js/user';
import { __Links, __Root, __imgPath } from '@jx3box/jx3box-common/data/jx3box.json';
import { USER_ASSETS_INIT } from '../../utils/constants';
import { Jx3BoxUserAssets, UserLinks } from '../../utils/types';
import { getHomepageUrl, getMenu, getMsg } from '../../service/header';
import { getSuperAuthor } from '../../service/user';
import panelData from '../../data/panel.json';
import { Jx3BoxContext, Jx3BoxContextProps } from '../../components/provider';
import { confirmClientVersion, getClientUrl, getCurrentClient } from '../../utils/utils';

const changeJx3BoxClient = (targetClient: string) => {
  const currentClient = getCurrentClient();
  if (confirmClientVersion(currentClient, targetClient)) {
    return;
  }
  location.href = location.href.replace(getClientUrl(currentClient), getClientUrl(targetClient));
};

export interface BasicLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { className, ...rests } = props;

  /**
   * 在初始化的时候设置为false
   * 在 breadcrumb 的 useeffect 中设置为 true
   *
   * @param breadcrumbVisible
   */
  const [breadcrumbVisible, setBreadcrumbVisible] = useState(false);

  /**
   * 是否使用了 LeftSidebar
   * @param hasLeftSidebar
   *
   * 在初始化的时候设置为false
   * 在 leftSidebar 的 useeffect 中设置为 true
   *
   * @param leftSidebarVisible
   */
  const [hasLeftSidebar, setHasLeftSidebar] = useState(false);
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(false);

  /**
   * 在初始化的时候设置为false
   * 在 rightSidebar 的 useeffect 中设置为 true
   *
   * @param rightSidebarVisible
   */
  const [rightSidebarVisible, setRightSidebarVisible] = useState(false);

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
   *
   * 是否是超级会员
   * @param isSuperAdmin
   */
  const [isLogin, setIsLogin] = useState(User.isLogin());
  const [user] = useState(User.getInfo());
  const [isEditor, setIsEditor] = useState(false);
  const [unread, setUnread] = useState(false);
  const [panel, setPanel] = useState([] as any[]);
  const [assets, setAssets] = useState(USER_ASSETS_INIT as Jx3BoxUserAssets);
  const [isSuperAuthor, setIsSuperAuthor] = useState(false);
  const [links, setLinks] = useState({} as UserLinks);
  const [isVip, setIsVip] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [isSuperAdmin] = useState(User.isSuperAdmin());

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
    getMenu('panel')
      .then(result => {
        setPanel(result.data?.data?.val || panelData);
      })
      .catch(() => setPanel(panelData));
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

  /**
   * 用 useMemo 计算出layout的cls方便后续计算
   * @param basicLayoutCls
   */
  const basicLayoutCls = useMemo(
    () =>
      classNames(className, 'c-layout', {
        ['c-layout-left-sidebar-open']: leftSidebarVisible,
      }),
    [leftSidebarVisible]
  );

  /**
   * 实现 Jx3BoxLayoutContextProps
   *
   * Fix calculate issue should add dependencies
   *
   * [hasLeftSidebar, leftSidebarVisible, rightSidebarVisible]
   *
   * @param {Jx3BoxLayoutContextProps} contextValue
   */
  const contextValue: Jx3BoxContextProps = useMemo(
    () => ({
      client: getCurrentClient(),
      changeJx3BoxClient,

      breadcrumbVisible,
      setBreadcrumbVisible,

      hasLeftSidebar,
      leftSidebarVisible,
      leftSiderHook: {
        setHasLeftSidebar,
        show: () => setLeftSidebarVisible(true),
        hide: () => setLeftSidebarVisible(false),
        toggle: () => setLeftSidebarVisible(prevLeftSidebarVisible => !prevLeftSidebarVisible),
      },

      rightSidebarVisible,
      rightSiderHook: {
        show: () => setRightSidebarVisible(true),
        hide: () => setRightSidebarVisible(false),
      },

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
      isSuperAdmin,
    }),
    [
      getCurrentClient,
      breadcrumbVisible,
      hasLeftSidebar,
      leftSidebarVisible,
      rightSidebarVisible,
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
      isSuperAdmin,
    ]
  );

  return (
    <Jx3BoxContext.Provider value={contextValue}>
      <section className={basicLayoutCls} {...rests}>
        {props.children}
      </section>
    </Jx3BoxContext.Provider>
  );
};

export default BasicLayout;
