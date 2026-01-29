import isFormData from './utils/isFormData';
import settle from './core/settle';
import buildURL from './helpers/buildURL';
import buildFullPath from './core/buildFullPath';
import parseHeaders from './helpers/parseHeaders';
import isURLSameOrigin from './helpers/isURLSameOrigin';
import createError from './core/createError';
import cookies from './helpers/cookies';

interface AuthConfig {
  username?: string;
  password?: string;
}

interface RequestConfig {
  data?: unknown;
  headers: Record<string, string>;
  auth?: AuthConfig;
  baseURL?: string;
  url: string;
  method: string;
  params?: unknown;
  paramsSerializer?: (params: unknown) => string;
  timeout: number;
  responseType?: XMLHttpRequestResponseType;
  withCredentials?: boolean;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  timeoutErrorMessage?: string;
  onDownloadProgress?: (progressEvent: ProgressEvent) => void;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  cancelToken?: {
    promise: Promise<unknown>;
  };
}

interface ResponseData {
  data: unknown;
  status: number;
  statusText: string;
  headers: Record<string, string> | null;
  config: RequestConfig;
  request: XMLHttpRequest;
}

export default function xhrAdapter(config: RequestConfig): Promise<ResponseData> {
  return new Promise((resolve, reject) => {
    let requestData = config.data;
    const requestHeaders = config.headers;

    if (isFormData(requestData)) {
      delete requestHeaders['Content-Type'];
    }

    const request = new XMLHttpRequest();

    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(
      config.method.toUpperCase(),
      buildURL(fullPath, config.params, config.paramsSerializer),
      true
    );

    request.timeout = config.timeout;

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      const responseHeaders = 'getAllResponseHeaders' in request
        ? parseHeaders(request.getAllResponseHeaders())
        : null;

      const responseData: ResponseData = {
        data: config.responseType && config.responseType !== 'text'
          ? request.response
          : request.responseText,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, responseData);
      request = null;
    };

    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));
      request = null;
    };

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request));
      request = null;
    };

    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request));
      request = null;
    };

    if (isStandardBrowserEnv()) {
      const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath))
        && config.xsrfCookieName
        ? cookies.read(config.xsrfCookieName)
        : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName!] = xsrfValue;
      }
    }

    if ('setRequestHeader' in request) {
      forEach(requestHeaders, (value: string, key: string) => {
        if (requestData === undefined && key.toLowerCase() === 'content-type') {
          delete requestHeaders[key];
        } else {
          request.setRequestHeader(key, value);
        }
      });
    }

    if (config.withCredentials !== undefined) {
      request.withCredentials = !!config.withCredentials;
    }

    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (error) {
        if (config.responseType !== 'json') {
          throw error;
        }
      }
    }

    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      config.cancelToken.promise.then((cancel: unknown) => {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    request.send(requestData as Document | XMLHttpRequestBodyInit | null);
  });
}

function isStandardBrowserEnv(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function forEach<T extends Record<string, unknown>>(
  obj: T,
  fn: (value: unknown, key: string) => void
): void {
  if (obj === null || obj === undefined) {
    return;
  }

  Object.keys(obj).forEach(key => {
    fn(obj[key], key);
  });
}