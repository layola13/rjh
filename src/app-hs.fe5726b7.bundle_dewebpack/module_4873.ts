interface RequestConfig {
  data?: any;
  headers: Record<string, string>;
  auth?: {
    username?: string;
    password?: string;
  };
  baseURL?: string;
  url: string;
  method: string;
  params?: any;
  paramsSerializer?: (params: any) => string;
  timeout: number;
  responseType?: XMLHttpRequestResponseType;
  withCredentials?: boolean;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  timeoutErrorMessage?: string;
  onDownloadProgress?: (progressEvent: ProgressEvent) => void;
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  cancelToken?: {
    promise: Promise<any>;
  };
}

interface ResponseData {
  data: any;
  status: number;
  statusText: string;
  headers: Record<string, string> | null;
  config: RequestConfig;
  request: XMLHttpRequest;
}

type ResolveFunction = (value: ResponseData) => void;
type RejectFunction = (reason: any) => void;

import { isFormData, forEach, isUndefined, isStandardBrowserEnv } from './utils';
import { handleResponse } from './response-handler';
import { buildURL } from './url-builder';
import { combineURLs } from './url-combiner';
import { parseHeaders } from './header-parser';
import { isURLSameOrigin } from './url-validator';
import { createError } from './error-factory';
import { cookies } from './cookies';

export default function xhrAdapter(config: RequestConfig): Promise<ResponseData> {
  return new Promise((resolve: ResolveFunction, reject: RejectFunction) => {
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

    const fullURL = combineURLs(config.baseURL, config.url);

    request.open(
      config.method.toUpperCase(),
      buildURL(fullURL, config.params, config.paramsSerializer),
      true
    );

    request.timeout = config.timeout;

    request.onreadystatechange = function handleLoad(): void {
      const DONE_STATE = 4;
      const NO_STATUS = 0;
      const FILE_PROTOCOL_PREFIX = 'file:';

      if (!request || request.readyState !== DONE_STATE) {
        return;
      }

      if (
        request.status === NO_STATUS &&
        !(request.responseURL && request.responseURL.indexOf(FILE_PROTOCOL_PREFIX) === 0)
      ) {
        return;
      }

      const responseHeaders =
        'getAllResponseHeaders' in request
          ? parseHeaders(request.getAllResponseHeaders())
          : null;

      const responseData: ResponseData = {
        data:
          config.responseType && config.responseType !== 'text'
            ? request.response
            : request.responseText,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request,
      };

      handleResponse(resolve, reject, responseData);
      request = null;
    };

    request.onabort = function handleAbort(): void {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));
      request = null;
    };

    request.onerror = function handleError(): void {
      reject(createError('Network Error', config, null, request));
      request = null;
    };

    request.ontimeout = function handleTimeout(): void {
      let timeoutErrorMessage = `timeout of ${config.timeout}ms exceeded`;

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request));
      request = null;
    };

    if (isStandardBrowserEnv()) {
      const xsrfValue =
        (config.withCredentials || isURLSameOrigin(fullURL)) && config.xsrfCookieName
          ? cookies.read(config.xsrfCookieName)
          : undefined;

      if (xsrfValue && config.xsrfHeaderName) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    if ('setRequestHeader' in request) {
      forEach(requestHeaders, (headerValue: string, headerName: string) => {
        const CONTENT_TYPE_HEADER = 'content-type';

        if (
          requestData === undefined &&
          headerName.toLowerCase() === CONTENT_TYPE_HEADER
        ) {
          delete requestHeaders[headerName];
        } else {
          request.setRequestHeader(headerName, headerValue);
        }
      });
    }

    if (!isUndefined(config.withCredentials)) {
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
      config.cancelToken.promise.then((cancel: any) => {
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

    request.send(requestData);
  });
}