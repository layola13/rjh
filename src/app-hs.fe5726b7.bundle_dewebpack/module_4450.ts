import * as utils from './utils';
import normalizeHeaderName from './normalizeHeaderName';

interface Headers {
  [key: string]: string | undefined;
}

interface TransformFunction {
  (data: any, headers?: Headers): any;
}

interface AxiosDefaults {
  adapter?: any;
  transformRequest: TransformFunction[];
  transformResponse: TransformFunction[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  validateStatus: (status: number) => boolean;
  headers: {
    common: Headers;
    delete?: Headers;
    get?: Headers;
    head?: Headers;
    post?: Headers;
    put?: Headers;
    patch?: Headers;
    [key: string]: Headers | undefined;
  };
}

const DEFAULT_CONTENT_TYPE = 'application/x-www-form-urlencoded';
const JSON_CONTENT_TYPE = 'application/json;charset=utf-8';
const FORM_URLENCODED_CONTENT_TYPE = 'application/x-www-form-urlencoded;charset=utf-8';

const defaultContentTypeHeaders: Headers = {
  'Content-Type': DEFAULT_CONTENT_TYPE
};

function setContentTypeIfUnset(headers: Headers | undefined, contentType: string): void {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = contentType;
  }
}

function getDefaultAdapter(): any {
  let adapter: any;
  
  if (typeof XMLHttpRequest !== 'undefined' || 
      (typeof process !== 'undefined' && 
       Object.prototype.toString.call(process) === '[object process]')) {
    adapter = require('./adapters/xhr');
  }
  
  return adapter;
}

const defaults: AxiosDefaults = {
  adapter: getDefaultAdapter(),
  
  transformRequest: [function transformRequestData(data: any, headers?: Headers): any {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    
    if (utils.isFormData(data) || 
        utils.isArrayBuffer(data) || 
        utils.isBuffer(data) || 
        utils.isStream(data) || 
        utils.isFile(data) || 
        utils.isBlob(data)) {
      return data;
    }
    
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, FORM_URLENCODED_CONTENT_TYPE);
      return data.toString();
    }
    
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, JSON_CONTENT_TYPE);
      return JSON.stringify(data);
    }
    
    return data;
  }],
  
  transformResponse: [function transformResponseData(data: any): any {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (error) {
        // Ignore parse errors
      }
    }
    return data;
  }],
  
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  
  validateStatus: function validateStatus(status: number): boolean {
    return status >= 200 && status < 300;
  },
  
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
};

const methodsWithoutData: string[] = ['delete', 'get', 'head'];
utils.forEach(methodsWithoutData, (method: string): void => {
  defaults.headers[method] = {};
});

const methodsWithData: string[] = ['post', 'put', 'patch'];
utils.forEach(methodsWithData, (method: string): void => {
  defaults.headers[method] = utils.merge(defaultContentTypeHeaders);
});

export default defaults;