import React, { useContext, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { Jx3BoxLayoutContext } from '@components/provider/layout-provider';

const Breadcrumb = () => {
  const { leftSidebarVisible, setBreadcrumbVisible } = useContext(Jx3BoxLayoutContext);

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
        ['withoutLeft']: !leftSidebarVisible,
      }),
    []
  );

  return <div className={breadcrumbCls}>Breadcrumb</div>;
};

export default Breadcrumb;
