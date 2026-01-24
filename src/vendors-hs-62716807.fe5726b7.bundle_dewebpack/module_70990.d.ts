/**
 * Merges two configuration objects with specific precedence rules for different property types.
 * This is typically used for merging Axios request configurations.
 * 
 * @template T - The type of the configuration object
 * @param defaultConfig - The default/base configuration object
 * @param instanceConfig - The instance/override configuration object
 * @returns The merged configuration object
 */
export function mergeConfig<T extends Record<string, any>>(
  defaultConfig: T,
  instanceConfig?: Partial<T>
): T;

/**
 * Configuration properties that are copied directly from instanceConfig if defined
 */
type DirectMergeProperties = 'url' | 'method' | 'params' | 'data';

/**
 * Configuration properties that are deep merged when both are objects
 */
type DeepMergeProperties = 'headers' | 'auth' | 'proxy';

/**
 * Configuration properties that prefer instanceConfig, then defaultConfig
 */
type ValueMergeProperties = 
  | 'baseURL'
  | 'url'
  | 'transformRequest'
  | 'transformResponse'
  | 'paramsSerializer'
  | 'timeout'
  | 'withCredentials'
  | 'adapter'
  | 'responseType'
  | 'xsrfCookieName'
  | 'xsrfHeaderName'
  | 'onUploadProgress'
  | 'onDownloadProgress'
  | 'maxContentLength'
  | 'validateStatus'
  | 'maxRedirects'
  | 'httpAgent'
  | 'httpsAgent'
  | 'cancelToken'
  | 'socketPath';

/**
 * Utility functions for object manipulation and type checking
 */
interface Utils {
  /**
   * Iterates over an array and executes a callback for each element
   */
  forEach<T>(array: T[], callback: (item: T) => void): void;
  
  /**
   * Checks if a value is an object
   */
  isObject(value: any): value is object;
  
  /**
   * Deep merges two or more objects
   */
  deepMerge<T>(...objects: Array<T | undefined>): T;
}

export default mergeConfig;