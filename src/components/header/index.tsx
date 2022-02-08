import React from 'react';
import './index.less';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className='jx3box-header'>
      <h1>JX3BOX header</h1>
    </header>
  );
};

export default Header;
