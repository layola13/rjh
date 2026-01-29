interface RequestConfig {
  cancelToken?: CancelToken;
  headers: Record<string, any>;
  data?: any;
  method: string;
  transformRequest?: Transform | Transform[];
  transformResponse?: Transform | Transform[];
  adapter?: Adapter;
}

interface Response<T = any> {
  data: T;
  headers: Record<string, any>;
}

interface ErrorResponse extends Error {
  response?: Response;
}

interface CancelToken {
  throwIfRequested(): void;
}

type Transform = (data: any, headers?: Record<string, any>) => any;
type Adapter = (config: RequestConfig) => Promise<Response>;

interface Utils {
  merge(...sources: Record<string, any>[]): Record<string, any>;
  forEach<T>(array: T[], callback: (item: T) => void): void;
}

function throwIfCancellationRequested(config: RequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

function dispatchRequest(
  config: RequestConfig,
  utils: Utils,
  transformData: (data: any, headers: Record<string, any>, transforms?: Transform | Transform[]) => any,
  isCancel: (error: any) => boolean,
  defaults: { adapter: Adapter }
): Promise<Response> {
  throwIfCancellationRequested(config);

  config.headers = config.headers || {};

  config.data = transformData(config.data, config.headers, config.transformRequest);

  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  const methodsToDelete = ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'];
  utils.forEach(methodsToDelete, (method: string) => {
    delete config.headers[method];
  });

  const adapter = config.adapter || defaults.adapter;

  return adapter(config).then(
    (response: Response) => {
      throwIfCancellationRequested(config);
      response.data = transformData(response.data, response.headers, config.transformResponse);
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

export default dispatchRequest;