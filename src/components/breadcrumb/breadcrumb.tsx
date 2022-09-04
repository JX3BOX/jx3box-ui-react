import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Button } from 'antd';
import { FormOutlined, InfoCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { publishLink, getAppIcon } from '@jx3box/jx3box-common/js/utils';
import { feedback } from '@jx3box/jx3box-common/data/jx3box.json';
import Menu from '../../assets/bread/menu.svg';
import BreadCrumbBE from './breadcrumb-backend';
import { isApp } from '../../utils/utils';
import { Jx3BoxContext } from '../provider';

export interface BreadcrumbProps {
  /**
   * 面包屑标题
   * @param name
   *
   * 点击 title 跳转的链接
   * @todo 当root不传时，则root的链接使用 "/slug"
   * @param root
   *
   * 组装 publishLink 的请求地址
   * 请求 crumbBE 的地址
   * @param slug
   *
   * 是否显示 crumbBE 组件
   * @param crumbEnable
   *
   * 是否显示发布 Button
   * @param publishEnable
   *
   * 是否允许显示浮层
   * 如果为 ture
   * 则在滚动距离大于 200 的时候添加 isOverlay className
   * @param overlayEnable
   */
  name: string;
  slug: string;
  root?: string;
  crumbEnable?: boolean;
  publishEnable?: boolean;
  feedbackEnable?: boolean;
  overlayEnable?: boolean;
  logo?: ReactNode;
  children?: ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = props => {
  const { user, hasLeftSidebar, leftSidebarVisible, leftSiderHook, setBreadcrumbVisible } =
    useContext(Jx3BoxContext);
  const { toggle } = leftSiderHook;
  const {
    name,
    slug,
    logo,
    crumbEnable,
    root = `/${slug}`,
    publishEnable = true,
    feedbackEnable = true,
    overlayEnable = false,
  } = props;

  const [isOverlay, setIsOverlay] = useState(false);
  /**
   * 如果使用了 Breadcrumb
   * 则初始化的时候设置 setBreadcrumbVisible true
   * @method setBreadcrumbVisible
   */
  useEffect(() => {
    setBreadcrumbVisible(true);
  }, []);

  useEffect(() => {
    const onScrollEvent = () => {
      setIsOverlay(window.scrollY > 200 ? true : false);
    };

    if (overlayEnable) {
      window.addEventListener('scroll', onScrollEvent);
      return () => {
        window.removeEventListener('scroll', onScrollEvent);
      };
    }
  }, [overlayEnable]);

  /**
   * useMemo 计算出最终的 breadcrumb classNames
   * @param breadcrumbCls
   */
  const [breadcrumbCls, channelCls, menuControlCls] = useMemo(
    () => [
      classNames('c-breadcrumb', {
        ['withoutLeft']: !hasLeftSidebar,
        ['isOverlay']: overlayEnable && isOverlay,
      }),
      classNames('u-channel', {
        ['on']: hasLeftSidebar,
      }),
      classNames('u-toggle', {
        ['on']: leftSidebarVisible,
      }),
    ],
    [hasLeftSidebar, leftSidebarVisible, isOverlay, overlayEnable]
  );

  /**
   * 组装 publishLink 跳转链接
   * @param onPublishLink
   *
   * 组装 onFeedbackLink 跳转链接
   * @param onFeedbackLink
   */
  const [onPublishLink, onFeedbackLink] = useMemo(
    () => [publishLink(slug), feedback + '&subject=' + location.href + '?uid=' + user.uid],
    [publishLink, slug, feedback, user]
  );

  if (!isApp()) {
    return (
      <div className={breadcrumbCls}>
        {hasLeftSidebar && (
          <div className='u-menu' onClick={toggle}>
            <div className={menuControlCls}>
              <img src={Menu} />
            </div>
          </div>
        )}

        <a className={channelCls} href={root}>
          <i className='u-channel-logo'>{logo ? logo : <img src={getAppIcon(slug)} />}</i>
          <span className='u-title'>{name}</span>
        </a>

        {crumbEnable && <BreadCrumbBE name={slug} />}
        {props.children}
        <div className='u-op'>
          {publishEnable && (
            <Button className='u-publish' href={onPublishLink} type='primary'>
              <FormOutlined />
              <span>发布</span>
            </Button>
          )}

          {feedbackEnable && (
            <Button className='u-feedback' href={onFeedbackLink} type='primary'>
              <InfoCircleOutlined />
              <span>反馈</span>
            </Button>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default Breadcrumb;
