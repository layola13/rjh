interface InterceptorManager<T> {
  forEach(fn: (interceptor: Interceptor<T>) => void): void;
}

interface Interceptor<T> {
  fulfilled: (value: T) => T | Promise<T>;
  rejected: (error: any) => any;
}

interface RequestConfig {
  url?: string;
  method?: string;
  params?: any;
  paramsSerializer?: (params: any) => string;
  data?: any;
  [key: string]: any;
}

interface AxiosInterceptors {
  request: InterceptorManager<RequestConfig>;
  response: InterceptorManager<any>;
}

type PromiseChainHandler = ((value: any) => any) | undefined;

class Axios {
  defaults: RequestConfig;
  interceptors: AxiosInterceptors;

  constructor(defaults: RequestConfig) {
    this.defaults = defaults;
    this.interceptors = {
      request: new InterceptorManagerImpl<RequestConfig>(),
      response: new InterceptorManagerImpl<any>()
    };
  }

  request(url: string, config?: RequestConfig): Promise<any>;
  request(config: RequestConfig): Promise<any>;
  request(urlOrConfig: string | RequestConfig, config?: RequestConfig): Promise<any> {
    let finalConfig: RequestConfig;

    if (typeof urlOrConfig === 'string') {
      finalConfig = config ?? {};
      finalConfig.url = urlOrConfig;
    } else {
      finalConfig = urlOrConfig ?? {};
    }

    finalConfig = mergeConfig(this.defaults, finalConfig);

    if (finalConfig.method) {
      finalConfig.method = finalConfig.method.toLowerCase();
    } else if (this.defaults.method) {
      finalConfig.method = this.defaults.method.toLowerCase();
    } else {
      finalConfig.method = 'get';
    }

    const chain: PromiseChainHandler[] = [dispatchRequest, undefined];
    let promise: Promise<any> = Promise.resolve(finalConfig);

    this.interceptors.request.forEach((interceptor: Interceptor<RequestConfig>) => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.forEach((interceptor: Interceptor<any>) => {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }

  getUri(config: RequestConfig): string {
    const mergedConfig = mergeConfig(this.defaults, config);
    return buildURL(mergedConfig.url ?? '', mergedConfig.params, mergedConfig.paramsSerializer)
      .replace(/^\?/, '');
  }

  delete(url: string, config?: RequestConfig): Promise<any> {
    return this.request(merge(config ?? {}, { method: 'delete', url }));
  }

  get(url: string, config?: RequestConfig): Promise<any> {
    return this.request(merge(config ?? {}, { method: 'get', url }));
  }

  head(url: string, config?: RequestConfig): Promise<any> {
    return this.request(merge(config ?? {}, { method: 'head', url }));
  }

  options(url: string, config?: RequestConfig): Promise<any> {
    return this.request(merge(config ?? {}, { method: 'options', url }));
  }

  post(url: string, data?: any, config?: RequestConfig): Promise<any> {
    return this.request(merge(config ?? {}, { method: 'post', url, data }));
  }

  put(url: string, data?: any, config?: RequestConfig): Promise<any> {
    return this.request(merge(config ?? {}, { method: 'put', url, data }));
  }

  patch(url: string, data?: any, config?: RequestConfig): Promise<any> {
    return this.request(merge(config ?? {}, { method: 'patch', url, data }));
  }
}

class InterceptorManagerImpl<T> implements InterceptorManager<T> {
  private interceptors: Interceptor<T>[] = [];

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(fn);
  }
}

function merge<T extends Record<string, any>>(target: T, source: T): T {
  return { ...target, ...source };
}

function mergeConfig(defaults: RequestConfig, config: RequestConfig): RequestConfig {
  return { ...defaults, ...config };
}

function buildURL(url: string, params?: any, paramsSerializer?: (params: any) => string): string {
  // Implementation from module 3483
  return url;
}

function dispatchRequest(config: RequestConfig): Promise<any> {
  // Implementation from module 3367
  return Promise.resolve(config);
}

export default Axios;