import utils from './utils';
import bind from './bind';
import Axios from './Axios';
import mergeConfig from './mergeConfig';
import defaults from './defaults';
import Cancel from './Cancel';
import CancelToken from './CancelToken';
import isCancel from './isCancel';
import spread from './spread';

interface AxiosStatic extends Function {
  Axios: typeof Axios;
  create(config?: any): any;
  Cancel: typeof Cancel;
  CancelToken: typeof CancelToken;
  isCancel: typeof isCancel;
  all<T>(promises: Array<Promise<T>>): Promise<T[]>;
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
}

function createInstance(defaultConfig: any): AxiosStatic {
  const context = new Axios(defaultConfig);
  const instance = bind(Axios.prototype.request, context) as AxiosStatic;
  
  utils.extend(instance, Axios.prototype, context);
  utils.extend(instance, context);
  
  return instance;
}

const axios = createInstance(defaults);

axios.Axios = Axios;

axios.create = function create(instanceConfig?: any): any {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

axios.Cancel = Cancel;
axios.CancelToken = CancelToken;
axios.isCancel = isCancel;

axios.all = function all<T>(promises: Array<Promise<T>>): Promise<T[]> {
  return Promise.all(promises);
};

axios.spread = spread;

export default axios;