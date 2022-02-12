import { AxiosResponse } from 'axios';
import { notification } from 'antd';
import { tuple } from '@utils/types';

const InterceptorTypes = tuple('helper', 'pay');
export type InterceptorType = typeof InterceptorTypes[number];

const makeHelperErrorContext = errorResponse => {
  return `[${errorResponse.data.code}]${errorResponse.data.message}`;
};

/**
 * helperPromiseInterceptor
 *
 * 添加一个 error notification promise handler
 *
 * @param promise
 * @returns
 */
export const helperPromiseInterceptor = (promise: Promise<AxiosResponse>): Promise<any> => {
  return promise
    .then(result => result)
    .catch(error => {
      if (error.data && error.data.code !== 200 && error.data.message) {
        notification.error({ message: makeHelperErrorContext(error) });
        return Promise.reject(error);
      }
      notification.error({ message: '网络请求异常' });
      return Promise.reject(error);
    });
};

const makePayErrorContext = errorResponse => {
  return `[${errorResponse.data.code}]${errorResponse.data.msg}`;
};

export const payPromiseInterceptor = (promise: Promise<AxiosResponse>): Promise<any> => {
  return promise
    .then(result => result)
    .catch(error => {
      if (error.data.code !== 200 && error.data.msg) {
        notification.error({ message: makePayErrorContext(error) });
        return Promise.reject(error);
      }
      notification.error({ message: '接口异常' });
      return Promise.reject(error);
    });
};

export const getInterceptor = (interceptorType: InterceptorType) => {
  switch (interceptorType) {
    case 'helper':
      return helperPromiseInterceptor;
    case 'pay':
      return payPromiseInterceptor;
  }
};
