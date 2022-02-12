import { AxiosResponse } from 'axios';
import { notification } from 'antd';

const makeJx3HelperErrorContext = errorResponse => {
  return `[${errorResponse.data.code}]${errorResponse.data.message}`;
};

/**
 * handleNotificationPromise
 *
 * 添加一个 error notification promise handler
 *
 * @param promise
 * @returns
 */
export const handleNotificationPromise = (promise: Promise<AxiosResponse>): Promise<any> => {
  return promise
    .then(result => result)
    .catch(error => {
      if (error.data && error.data.code !== 200 && error.data.message) {
        notification.error({ message: makeJx3HelperErrorContext(error) });
        return Promise.reject(error);
      }
      notification.error({ message: '网络请求异常' });
      return Promise.reject(error);
    });
};
