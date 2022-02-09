import React from 'react';
import Logo from '../../assets/header/logo.svg';

const HeaderLogo = () => {
  return (
    <div className='c-header-logo' id='c-header-logo' title='点击展开魔盒矩阵'>
      <i className='u-pic'>
        <Logo />
      </i>
      <span className='u-txt'>魔盒</span>
    </div>
  );
};

export default HeaderLogo;
