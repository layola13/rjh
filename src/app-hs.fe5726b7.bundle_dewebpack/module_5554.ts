interface MergeConfigOptions {
  url?: string;
  method?: string;
  params?: unknown;
  data?: unknown;
  headers?: Record<string, unknown>;
  auth?: Record<string, unknown>;
  proxy?: Record<string, unknown>;
  baseURL?: string;
  transformRequest?: unknown;
  transformResponse?: unknown;
  paramsSerializer?: unknown;
  timeout?: number;
  withCredentials?: boolean;
  adapter?: unknown;
  responseType?: string;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: unknown) => void;
  onDownloadProgress?: (progressEvent: unknown) => void;
  maxContentLength?: number;
  validateStatus?: (status: number) => boolean;
  maxRedirects?: number;
  httpAgent?: unknown;
  httpsAgent?: unknown;
  cancelToken?: unknown;
  socketPath?: string;
  [key: string]: unknown;
}

interface Utils {
  forEach<T>(arr: T[], fn: (item: T) => void): void;
  isObject(val: unknown): boolean;
  deepMerge(...args: unknown[]): unknown;
}

import utils from './utils';

export default function mergeConfig(
  defaultConfig: MergeConfigOptions,
  customConfig: MergeConfigOptions = {}
): MergeConfigOptions {
  const result: MergeConfigOptions = {};

  const valueFromCustomConfigKeys: (keyof MergeConfigOptions)[] = [
    'url',
    'method',
    'params',
    'data'
  ];

  const mergeDeepPropertiesKeys: (keyof MergeConfigOptions)[] = [
    'headers',
    'auth',
    'proxy'
  ];

  const defaultToCustomConfigKeys: (keyof MergeConfigOptions)[] = [
    'baseURL',
    'url',
    'transformRequest',
    'transformResponse',
    'paramsSerializer',
    'timeout',
    'withCredentials',
    'adapter',
    'responseType',
    'xsrfCookieName',
    'xsrfHeaderName',
    'onUploadProgress',
    'onDownloadProgress',
    'maxContentLength',
    'validateStatus',
    'maxRedirects',
    'httpAgent',
    'httpsAgent',
    'cancelToken',
    'socketPath'
  ];

  utils.forEach(valueFromCustomConfigKeys, (key) => {
    if (customConfig[key] !== undefined) {
      result[key] = customConfig[key];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, (key) => {
    if (utils.isObject(customConfig[key])) {
      result[key] = utils.deepMerge(defaultConfig[key], customConfig[key]);
    } else if (customConfig[key] !== undefined) {
      result[key] = customConfig[key];
    } else if (utils.isObject(defaultConfig[key])) {
      result[key] = utils.deepMerge(defaultConfig[key]);
    } else if (defaultConfig[key] !== undefined) {
      result[key] = defaultConfig[key];
    }
  });

  utils.forEach(defaultToCustomConfigKeys, (key) => {
    if (customConfig[key] !== undefined) {
      result[key] = customConfig[key];
    } else if (defaultConfig[key] !== undefined) {
      result[key] = defaultConfig[key];
    }
  });

  const allKnownKeys = valueFromCustomConfigKeys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToCustomConfigKeys);

  const otherKeys = Object.keys(customConfig).filter(
    (key) => allKnownKeys.indexOf(key) === -1
  );

  utils.forEach(otherKeys, (key) => {
    if (customConfig[key] !== undefined) {
      result[key] = customConfig[key];
    } else if (defaultConfig[key] !== undefined) {
      result[key] = defaultConfig[key];
    }
  });

  return result;
}