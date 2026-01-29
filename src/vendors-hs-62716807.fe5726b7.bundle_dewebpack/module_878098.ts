interface InterceptorManager<T> {
  use(fulfilled: (value: T) => T | Promise<T>, rejected?: (error: unknown) => unknown): number;
  eject(id: number): void;
  forEach(fn: (interceptor: Interceptor<T>) => void): void;
}

interface Interceptor<T> {
  fulfilled: (value: T) => T | Promise<T>;
  rejected?: (error: unknown) => unknown;
}

interface RequestConfig {
  url?: string;
  method?: string;
  params?: Record<string, unknown>;
  paramsSerializer?: (params: Record<string, unknown>) => string;
  data?: unknown;
  [key: string]: unknown;
}

interface AxiosInterceptors {
  request: InterceptorManager<RequestConfig>;
  response: InterceptorManager<unknown>;
}

class Axios {
  defaults: RequestConfig;
  interceptors: AxiosInterceptors;

  constructor(defaultConfig: RequestConfig) {
    this.defaults = defaultConfig;
    this.interceptors = {
      request: createInterceptorManager<RequestConfig>(),
      response: createInterceptorManager<unknown>()
    };
  }

  request<T = unknown>(urlOrConfig?: string | RequestConfig, config?: RequestConfig): Promise<T> {
    let requestConfig: RequestConfig;

    if (typeof urlOrConfig === 'string') {
      requestConfig = config ?? {};
      requestConfig.url = urlOrConfig;
    } else {
      requestConfig = urlOrConfig ?? {};
    }

    requestConfig = mergeConfig(this.defaults, requestConfig);

    if (requestConfig.method) {
      requestConfig.method = requestConfig.method.toLowerCase();
    } else if (this.defaults.method) {
      requestConfig.method = this.defaults.method.toLowerCase();
    } else {
      requestConfig.method = 'get';
    }

    const chain: Array<((value: unknown) => unknown) | undefined> = [dispatchRequest, undefined];
    let promise: Promise<unknown> = Promise.resolve(requestConfig);

    this.interceptors.request.forEach((interceptor: Interceptor<RequestConfig>) => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.forEach((interceptor: Interceptor<unknown>) => {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift() as any, chain.shift() as any);
    }

    return promise as Promise<T>;
  }

  getUri(config?: RequestConfig): string {
    const mergedConfig = mergeConfig(this.defaults, config ?? {});
    return buildURL(mergedConfig.url ?? '', mergedConfig.params, mergedConfig.paramsSerializer)
      .replace(/^\?/, '');
  }

  delete<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(merge(config ?? {}, { method: 'delete', url }));
  }

  get<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(merge(config ?? {}, { method: 'get', url }));
  }

  head<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(merge(config ?? {}, { method: 'head', url }));
  }

  options<T = unknown>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(merge(config ?? {}, { method: 'options', url }));
  }

  post<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(merge(config ?? {}, { method: 'post', url, data }));
  }

  put<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(merge(config ?? {}, { method: 'put', url, data }));
  }

  patch<T = unknown>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(merge(config ?? {}, { method: 'patch', url, data }));
  }
}

function createInterceptorManager<T>(): InterceptorManager<T> {
  return new (class implements InterceptorManager<T> {
    use(fulfilled: (value: T) => T | Promise<T>, rejected?: (error: unknown) => unknown): number {
      throw new Error('Not implemented');
    }
    eject(id: number): void {
      throw new Error('Not implemented');
    }
    forEach(fn: (interceptor: Interceptor<T>) => void): void {
      throw new Error('Not implemented');
    }
  })();
}

function mergeConfig(defaults: RequestConfig, config: RequestConfig): RequestConfig {
  return { ...defaults, ...config };
}

function merge<T extends Record<string, unknown>>(target: T, ...sources: Partial<T>[]): T {
  return Object.assign({}, target, ...sources);
}

function buildURL(url: string, params?: Record<string, unknown>, paramsSerializer?: (params: Record<string, unknown>) => string): string {
  return url;
}

function dispatchRequest(config: RequestConfig): Promise<unknown> {
  return Promise.resolve(config);
}

export default Axios;