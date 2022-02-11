import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Button } from 'antd';
import { FormOutlined, InfoCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { publishLink } from '@jx3box/jx3box-common/js/utils';
import { feedback } from '@jx3box/jx3box-common/data/jx3box.json';
import { Jx3BoxLayoutContext } from '@components/provider/layout-provider';
import { isApp } from '@utils/utils';
import Menu from '../../assets/bread/menu.svg';
import BreadCrumbBE from './breadcrumb-backend';

export interface BreadcrumbProps {
  /**
   * 面包屑标题
   * @param name
   *
   * 点击 title 跳转的链接
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
  root: string;
  slug: string;
  crumbEnable?: boolean;
  publishEnable?: boolean;
  feedbackEnable?: boolean;
  overlayEnable?: boolean;
  logo?: ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = props => {
  const { hasLeftSidebar, leftSiderHook, setBreadcrumbVisible } = useContext(Jx3BoxLayoutContext);
  const { toggle } = leftSiderHook;
  const {
    name,
    root,
    slug,
    logo,
    crumbEnable,
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
  const [breadcrumbCls, channelCls] = useMemo(
    () => [
      classNames('c-breadcrumb', {
        ['withoutLeft']: !hasLeftSidebar,
        ['isOverlay']: overlayEnable && isOverlay,
      }),
      classNames('u-channel', {
        ['on']: hasLeftSidebar,
      }),
    ],
    [hasLeftSidebar, isOverlay, overlayEnable]
  );

  /**
   * 组装 publishLink 跳转链接
   * @param onPublishLink
   */
  const onPublishLink = useMemo(() => publishLink(slug), [publishLink, slug]);

  if (!isApp()) {
    return (
      <div className={breadcrumbCls}>
        {hasLeftSidebar && (
          <div className='u-menu' onClick={toggle}>
            <Menu />
          </div>
        )}

        <a className={channelCls} href={root}>
          <i className='u-channel-logo'>{logo}</i>
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
            <Button className='u-feedback' href={feedback} type='primary'>
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
