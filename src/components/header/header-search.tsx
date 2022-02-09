import React, { useContext, useMemo } from 'react';
import { isMobileSize } from '@utils/utils';
import { Jx3BoxContext } from '@components/provider';
import SearchKeySlash from '../../assets/header/search-key-slash.svg';
import { getSearchUrl } from '@service/header';

const HeaderSearch = () => {
  const { client } = useContext(Jx3BoxContext);

  const [formActionUrl, formTarget] = useMemo(
    () => [getSearchUrl(), isMobileSize() ? '_self' : '_blank'],
    [getSearchUrl, isMobileSize]
  );

  return (
    <div className='c-header-search' id='c-header-search'>
      <div className='c-search'>
        <form className='u-form' target={formTarget} action={formActionUrl}>
          <input className='u-text' type='text' autoComplete='off' name='q' placeholder='搜索..' />
          <input type='hidden' name='client' value={client} />

          <i className='u-btn'>
            <SearchKeySlash />
          </i>
        </form>
      </div>
    </div>
  );
};

export default HeaderSearch;
