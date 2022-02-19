import React, { useEffect, useState } from 'react';
import { getBreadcrumb } from '../../service/breadcrumb';

export interface BreadCrumbBEProps {
  name: string;
}

/**
 * @todo 从后端请求 breadcrumb 相应模块的数据并展示
 *
 * @returns BreadCrumbBE
 */
const BreadCrumbBE: React.FC<BreadCrumbBEProps> = props => {
  const { name } = props;
  const [backendHtml, setBackendHtml] = useState('');

  useEffect(() => {
    getBreadcrumb(name).then(result => {
      if (result.data.code === 200) {
        setBackendHtml(result.data.data?.breadcrumb?.html);
      }
    });
  }, [name, getBreadcrumb]);

  return <div className='c-crumb' dangerouslySetInnerHTML={{ __html: backendHtml }} />;
};

export default BreadCrumbBE;
