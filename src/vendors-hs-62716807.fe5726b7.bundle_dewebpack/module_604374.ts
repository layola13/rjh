interface Headers {
  [key: string]: string;
}

interface DefaultConfig {
  adapter: any;
  transformRequest: Array<(data: any, headers: Headers) => any>;
  transformResponse: Array<(data: any) => any>;
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  validateStatus: (status: number) => boolean;
  headers: {
    common: Headers;
    [method: string]: Headers;
  };
}

import * as utils from './utils';
import normalizeHeaderName from './normalizeHeaderName';
import xhrAdapter from './adapters/xhr';

const DEFAULT_CONTENT_TYPE: Headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers: Headers, value: string): void {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter(): any {
  let adapter: any;
  if (
    typeof XMLHttpRequest !== 'undefined' ||
    (typeof process !== 'undefined' &&
      Object.prototype.toString.call(process) === '[object process]')
  ) {
    adapter = xhrAdapter;
  }
  return adapter;
}

const defaults: DefaultConfig = {
  adapter: getDefaultAdapter(),

  transformRequest: [
    function (data: any, headers: Headers): any {
      normalizeHeaderName(headers, 'Accept');
      normalizeHeaderName(headers, 'Content-Type');

      if (
        utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
      ) {
        return data;
      }

      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }

      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
      }

      if (utils.isObject(data)) {
        setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
        return JSON.stringify(data);
      }

      return data;
    }
  ],

  transformResponse: [
    function (data: any): any {
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (error) {
          // Ignore parse errors
        }
      }
      return data;
    }
  ],

  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,

  validateStatus: function (status: number): boolean {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], (method: string) => {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], (method: string) => {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

export default defaults;