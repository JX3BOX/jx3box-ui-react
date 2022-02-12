import React from 'react';

export interface ThanksProps {}

const Thanks: React.FC<ThanksProps> = () => {
  return (
    <div className='w-thx'>
      <div className='w-thx-panel'></div>

      <div className='w-thx-copyright'>
        &copy;
        所有原创作品，著作权归作者所有，所有未经授权的非署名转载或抄袭将有权追究法律责任，所有法律事务由专聘律师代理。
        <br />
        签约作者独家特约稿件，及所有魔盒官方评分作品用户一经兑现则视为有偿付费稿件，所有商业稿件的转载引用需同时征得魔盒平台授权。
      </div>
    </div>
  );
};

export default Thanks;
