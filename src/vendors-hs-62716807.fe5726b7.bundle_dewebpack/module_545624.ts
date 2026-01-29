import utils from './utils';
import bind from './helpers/bind';
import Axios from './core/Axios';
import mergeConfig from './core/mergeConfig';
import defaults from './defaults';
import Cancel from './cancel/Cancel';
import CancelToken from './cancel/CancelToken';
import isCancel from './cancel/isCancel';
import spread from './helpers/spread';

interface AxiosInstance {
  (config: any): Promise<any>;
  (url: string, config?: any): Promise<any>;
  defaults: any;
  interceptors: any;
  request(config: any): Promise<any>;
  get(url: string, config?: any): Promise<any>;
  delete(url: string, config?: any): Promise<any>;
  head(url: string, config?: any): Promise<any>;
  options(url: string, config?: any): Promise<any>;
  post(url: string, data?: any, config?: any): Promise<any>;
  put(url: string, data?: any, config?: any): Promise<any>;
  patch(url: string, data?: any, config?: any): Promise<any>;
}

interface AxiosStatic extends AxiosInstance {
  Axios: typeof Axios;
  create(config?: any): AxiosInstance;
  Cancel: typeof Cancel;
  CancelToken: typeof CancelToken;
  isCancel: typeof isCancel;
  all<T>(values: Array<T | Promise<T>>): Promise<T[]>;
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
}

function createInstance(defaultConfig: any): AxiosInstance {
  const context = new Axios(defaultConfig);
  const instance = bind(Axios.prototype.request, context);
  
  utils.extend(instance, Axios.prototype, context);
  utils.extend(instance, context);
  
  return instance as AxiosInstance;
}

const axios = createInstance(defaults) as AxiosStatic;

axios.Axios = Axios;

axios.create = function create(instanceConfig?: any): AxiosInstance {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

axios.Cancel = Cancel;
axios.CancelToken = CancelToken;
axios.isCancel = isCancel;

axios.all = function all<T>(promises: Array<T | Promise<T>>): Promise<T[]> {
  return Promise.all(promises);
};

axios.spread = spread;

export default axios;