interface UtilsModule {
  forEach: <T>(arr: T[], fn: (item: T) => void) => void;
  isObject: (val: unknown) => boolean;
  deepMerge: (...objects: any[]) => any;
}

interface ConfigOptions {
  url?: string;
  method?: string;
  params?: any;
  data?: any;
  headers?: any;
  auth?: any;
  proxy?: any;
  baseURL?: string;
  transformRequest?: any;
  transformResponse?: any;
  paramsSerializer?: any;
  timeout?: number;
  withCredentials?: boolean;
  adapter?: any;
  responseType?: string;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: (status: number) => boolean;
  maxRedirects?: number;
  httpAgent?: any;
  httpsAgent?: any;
  cancelToken?: any;
  socketPath?: string;
  [key: string]: any;
}

const DIRECT_MERGE_KEYS: Array<keyof ConfigOptions> = [
  'url',
  'method',
  'params',
  'data'
];

const DEEP_MERGE_KEYS: Array<keyof ConfigOptions> = [
  'headers',
  'auth',
  'proxy'
];

const DEFAULT_MERGE_KEYS: Array<keyof ConfigOptions> = [
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

export default function mergeConfig(
  defaultConfig: ConfigOptions,
  customConfig: ConfigOptions = {}
): ConfigOptions {
  const utils: UtilsModule = require('./utils');
  const result: ConfigOptions = {};

  utils.forEach(DIRECT_MERGE_KEYS, (key) => {
    if (customConfig[key] !== undefined) {
      result[key] = customConfig[key];
    }
  });

  utils.forEach(DEEP_MERGE_KEYS, (key) => {
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

  utils.forEach(DEFAULT_MERGE_KEYS, (key) => {
    if (customConfig[key] !== undefined) {
      result[key] = customConfig[key];
    } else if (defaultConfig[key] !== undefined) {
      result[key] = defaultConfig[key];
    }
  });

  const allKnownKeys = [
    ...DIRECT_MERGE_KEYS,
    ...DEEP_MERGE_KEYS,
    ...DEFAULT_MERGE_KEYS
  ];

  const customKeys = Object.keys(customConfig).filter(
    (key) => allKnownKeys.indexOf(key) === -1
  );

  utils.forEach(customKeys, (key) => {
    if (customConfig[key] !== undefined) {
      result[key] = customConfig[key];
    } else if (defaultConfig[key] !== undefined) {
      result[key] = defaultConfig[key];
    }
  });

  return result;
}