import React from 'react';
import { isApp } from '@utils/utils';
import { getAboutUrl, getFeedbackUrl } from '@service/footer';
import Flag from '../../assets/footer/china.svg';

const Footer: React.FC<{}> = () => {
  if (isApp()) {
    return null;
  }
  return (
    <footer className='c-footer' id='c-footer'>
      <div className='c-footer-left'>
        <span className='u-flag'>
          <img src={Flag} />
        </span>

        <a href='https://beian.miit.gov.cn/' rel='noreferrer' className='u-beian' target='_blank'>
          湘ICP备2021002288号
        </a>
      </div>
      <div className='c-footer-right'>
        <a className='u-about' href={getAboutUrl()} rel='noreferrer' target='_blank'>
          关于我们
        </a>
        <em>|</em>
        <a className='u-doc' href='/tool/#/?subtype=4' target='_blank'>
          帮助文档
        </a>
        <em>|</em>
        <a className='u-log' href='https://github.com/JX3BOX' rel='noreferrer' target='_blank'>
          代码仓库
        </a>
        <em>|</em>
        <a className='u-feedback' href={getFeedbackUrl()} rel='noreferrer' target='_blank'>
          反馈建议
        </a>
      </div>
      <slot></slot>
    </footer>
  );
};

export default Footer;
