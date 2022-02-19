import React from 'react';
import ApplicationChecker from '../hook/application-checker';
import HeaderLogo from './header-logo';
import HeaderSearch from './header-search';
import HeaderSwitch from './header-switch';
import HeaderNav from './header-nav';
import HeaderUser from './header-user';

interface HeaderProps {}
/**
 * 剑三魔盒 Common Header 组件
 *
 * @return {*}
 */
const Header: React.FC<HeaderProps> = () => {
  return (
    <>
      <ApplicationChecker />

      <header className='c-header' id='c-header'>
        <div className='c-header-inner'>
          <HeaderLogo />
          <HeaderSearch />
          <HeaderSwitch />
          <HeaderNav />
          <HeaderUser />
        </div>
      </header>
    </>
  );
};

export default Header;
