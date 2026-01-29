interface RequestConfig {
  cancelToken?: CancelToken;
  headers?: Record<string, any>;
  data?: any;
  method?: string;
  transformRequest?: TransformFunction | TransformFunction[];
  transformResponse?: TransformFunction | TransformFunction[];
  adapter?: AdapterFunction;
}

interface ResponseData {
  data: any;
  headers: Record<string, any>;
}

interface ErrorResponse {
  response?: ResponseData;
}

type TransformFunction = (data: any, headers?: Record<string, any>) => any;
type AdapterFunction = (config: RequestConfig) => Promise<ResponseData>;

interface CancelToken {
  throwIfRequested(): void;
}

interface Utils {
  merge(...args: any[]): any;
  forEach<T>(arr: T[], callback: (item: T) => void): void;
}

import utils from './utils';
import transformData from './transformData';
import isCancel from './isCancel';
import defaults from './defaults';

function throwIfCancellationRequested(config: RequestConfig): void {
  config.cancelToken?.throwIfRequested();
}

export default function dispatchRequest(config: RequestConfig): Promise<ResponseData> {
  throwIfCancellationRequested(config);

  config.headers = config.headers || {};

  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method!] || {},
    config.headers
  );

  const methodsToDelete = ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'];
  utils.forEach(methodsToDelete, (method: string) => {
    delete config.headers![method];
  });

  const adapter = config.adapter || defaults.adapter;

  return adapter(config).then(
    (response: ResponseData) => {
      throwIfCancellationRequested(config);
      response.data = transformData(
        response.data,
        response.headers,
        config.transformResponse
      );
      return response;
    },
    (error: ErrorResponse) => {
      if (!isCancel(error)) {
        throwIfCancellationRequested(config);
        if (error?.response) {
          error.response.data = transformData(
            error.response.data,
            error.response.headers,
            config.transformResponse
          );
        }
      }
      return Promise.reject(error);
    }
  );
}