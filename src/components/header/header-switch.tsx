import React, { useCallback, useContext, useMemo, useState } from 'react';
import classNames from 'classnames';
import { Jx3BoxContext } from '../provider';
import { CLIENT_SWITCH_DATA, CLIENT_TYPE_ORIGIN } from '../../utils/constants';

/**
 * <HeaderSwitch/>
 *
 * 切换魔盒版本组件
 *
 * @return {*}
 */
const HeaderSwitch = () => {
  const { client, changeJx3BoxClient } = useContext(Jx3BoxContext);
  const [currentClient, setCurrentClient] = useState(client);

  /**
   * 移动鼠标时设置色块offset
   * @param activeCls
   */
  const activeCls = useMemo(
    () =>
      classNames('u-active', {
        ['isOffset']: currentClient === CLIENT_TYPE_ORIGIN,
      }),
    [currentClient]
  );

  /**
   * 根据item以及client版本计算出对应的className
   * @method makeClientCls
   */
  const makeClientCls = useCallback(
    item =>
      classNames('u-item', {
        [`u-${item.client}`]: true,
        ['on']: item.client === client,
      }),
    [client]
  );

  const onMouseEnter = item => {
    setCurrentClient(item.client);
  };

  const onMouseLeave = useCallback(() => {
    setCurrentClient(client);
  }, [client]);

  return (
    <div className='c-header-origin'>
      <i className={activeCls}></i>
      <i className='u-div'></i>

      {CLIENT_SWITCH_DATA.map(item => {
        return (
          <span
            className={makeClientCls(item)}
            key={item.client}
            data-client={item.client}
            onMouseEnter={() => onMouseEnter(item)}
            onMouseLeave={onMouseLeave}
            onClick={() => changeJx3BoxClient(item.client)}
          >
            {item.name}
          </span>
        );
      })}
    </div>
  );
};

export default HeaderSwitch;
