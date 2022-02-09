import { useEffect } from 'react';
import { isApp } from '@utils/utils';

const ENV_APPLICATION = 'env-app';

/**
 * <ApplicationChecker />
 *
 * @todo 校验是否是appliction环境如果是的话进行操作
 *
 * 我不懂为什么这么操作从 jx3box-common-ui copy
 *
 * @return {*}
 */
const ApplicationChecker = () => {
  useEffect(() => {
    if (isApp()) {
      document.documentElement.classList.add(ENV_APPLICATION);
    }
  }, []);

  return null;
};

export default ApplicationChecker;
