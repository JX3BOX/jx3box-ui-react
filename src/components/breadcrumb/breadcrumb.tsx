import React, { useContext, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { Jx3BoxLayoutContext } from '@components/provider/layout-provider';
import { isApp } from '@utils/utils';
import Menu from '../../assets/bread/menu.svg';

const Breadcrumb = () => {
  const { hasLeftSidebar, leftSiderHook, setBreadcrumbVisible } = useContext(Jx3BoxLayoutContext);
  const { toggle } = leftSiderHook;
  /**
   * 如果使用了 Breadcrumb
   * 则初始化的时候设置 setBreadcrumbVisible true
   * @method setBreadcrumbVisible
   */
  useEffect(() => {
    setBreadcrumbVisible(true);
  }, []);

  /**
   * useMemo 计算出最终的 breadcrumb classNames
   * @param breadcrumbCls
   */
  const breadcrumbCls = useMemo(
    () =>
      classNames('c-breadcrumb', {
        ['withoutLeft']: !hasLeftSidebar,
      }),
    [hasLeftSidebar]
  );

  if (isApp()) {
    return null;
  }
  return (
    <div className={breadcrumbCls}>
      {hasLeftSidebar && (
        <div className='u-menu' onClick={toggle}>
          <Menu />
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
