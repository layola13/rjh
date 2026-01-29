interface RequestOptions {
  contentType?: string | false;
  xhrFields?: {
    withCredentials: boolean;
  };
  headers?: Record<string, string>;
  timeout?: number;
  uploadProgress?: (event: ProgressEvent) => void;
  dataType?: string;
  [key: string]: unknown;
}

interface AjaxSettings {
  url: string;
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  contentType?: string;
  data?: string;
  dataType?: string;
  timeout?: number;
  success: (data: unknown) => void;
  error: (xhr: XMLHttpRequest, textStatus: string, errorThrown: string) => void;
  xhr?: () => XMLHttpRequest;
  xhrFields?: {
    withCredentials: boolean;
  };
  headers?: Record<string, string>;
}

interface UrlModule {
  parseURL: (url: string) => { path: string };
  getApiSignature: (url: string, method: string, data?: unknown) => Record<string, string>;
}

interface UtilModule {
  Url: UrlModule;
}

interface HSAppModule {
  Util: UtilModule;
}

interface ConfigModule {
  dataTypes: string[];
  excludeCredentialsWhiteListCors: string[];
  credentialsWhiteListCors: string[];
  rewriteUrl: (url: string) => string;
}

interface ErrorString extends String {
  readyState?: number;
  status?: number;
}

interface AbortablePromise<T> extends Promise<T> {
  abort?: () => void;
}

declare const HSApp: HSAppModule;
declare const $: {
  ajax: (settings: AjaxSettings) => { abort: () => void };
  ajaxSettings: {
    xhr: () => XMLHttpRequest;
  };
};

type ErrorHandler = (xhr: XMLHttpRequest, textStatus: string, errorThrown: string) => void;

const config: ConfigModule = require(138357);
const errorHandlers: ErrorHandler[] = [];

function serializeData(data: unknown, options: RequestOptions): string {
  const { contentType } = options;
  
  if (contentType === false || (contentType && !contentType.includes('application/json')) || typeof data === 'string') {
    return data as string;
  }
  
  return JSON.stringify(data);
}

function formatErrorMessage(
  xhr: XMLHttpRequest,
  textStatus: string,
  errorThrown: string,
  requestUrl: string
): ErrorString {
  let message: string;
  
  try {
    const readyState = xhr.readyState;
    
    if (xhr.status === 0) {
      message = `status: 0, readyState: ${readyState}`;
    } else if (xhr.status && xhr.statusText) {
      let response: string | undefined;
      
      if (xhr.responseText) {
        response = xhr.responseText;
      } else if (xhr.responseXML) {
        response = new XMLSerializer().serializeToString(xhr.responseXML);
      }
      
      message = `reqUrl: ${requestUrl}, status: ${xhr.status}, readyState: ${readyState}, statusText: ${xhr.statusText}, response: ${response}, `;
    }
  } catch (error) {
    message = `reqUrl:${requestUrl}, `;
  }
  
  if (textStatus) {
    message += ` ${textStatus}`;
  }
  
  if (errorThrown) {
    message += ` ${errorThrown}`;
  }
  
  const errorString = new String(message) as ErrorString;
  errorString.readyState = xhr.readyState;
  errorString.status = xhr.status;
  
  return errorString;
}

function shouldIncludeCredentials(url: string): boolean {
  if (!url) {
    return false;
  }
  
  const urlMatch = /^http(s)?:\/\/(.*?)\//.exec(url);
  if (!urlMatch || urlMatch.length < 2) {
    return false;
  }
  
  const parsedUrl = HSApp.Util.Url.parseURL(url);
  
  for (const dataType of config.dataTypes) {
    if (parsedUrl.path.includes(dataType)) {
      return false;
    }
  }
  
  for (const excludedDomain of config.excludeCredentialsWhiteListCors) {
    if (urlMatch[0].includes(excludedDomain)) {
      return false;
    }
  }
  
  for (const whitelistedDomain of config.credentialsWhiteListCors) {
    if (urlMatch[2].includes(whitelistedDomain)) {
      return true;
    }
  }
  
  return false;
}

function invokeErrorHandlers(xhr: XMLHttpRequest, textStatus: string, errorThrown: string): void {
  errorHandlers.forEach((handler) => {
    handler(xhr, textStatus, errorThrown);
  });
}

export const httpClient = {
  get(url: string, options?: RequestOptions): Promise<unknown> {
    const requestOptions = options ?? {};
    
    if (shouldIncludeCredentials(url)) {
      requestOptions.xhrFields = {
        withCredentials: true
      };
      
      const signature = HSApp.Util.Url.getApiSignature(url, 'GET');
      if (requestOptions.headers) {
        Object.assign(requestOptions.headers, signature);
      } else {
        requestOptions.headers = signature;
      }
    }
    
    const rewrittenUrl = config.rewriteUrl(url);
    
    return new Promise((resolve, reject) => {
      const ajaxSettings: AjaxSettings = {
        url: rewrittenUrl,
        type: 'GET',
        dataType: 'json',
        success: resolve,
        error: (xhr, textStatus, errorThrown) => {
          invokeErrorHandlers(xhr, textStatus, errorThrown);
          reject(formatErrorMessage(xhr, textStatus, errorThrown, rewrittenUrl));
        }
      };
      
      Object.assign(ajaxSettings, requestOptions);
      $.ajax(ajaxSettings);
    });
  },

  post(url: string, data: unknown, options?: RequestOptions): AbortablePromise<unknown> {
    const requestOptions = options ?? {};
    
    if (shouldIncludeCredentials(url)) {
      requestOptions.xhrFields = {
        withCredentials: true
      };
      
      const signature = HSApp.Util.Url.getApiSignature(url, 'POST', data);
      if (requestOptions.headers) {
        Object.assign(requestOptions.headers, signature);
      } else {
        requestOptions.headers = signature;
      }
    }
    
    const serializedData = serializeData(data, requestOptions);
    const rewrittenUrl = config.rewriteUrl(url);
    
    let ajaxRequest: { abort: () => void };
    
    const promise = new Promise((resolve, reject) => {
      const ajaxSettings: AjaxSettings = {
        url: rewrittenUrl,
        type: 'POST',
        contentType: 'application/json',
        data: serializedData,
        dataType: 'json',
        timeout: requestOptions.timeout ?? 0,
        success: resolve,
        error: (xhr, textStatus, errorThrown) => {
          invokeErrorHandlers(xhr, textStatus, errorThrown);
          const error = formatErrorMessage(xhr, textStatus, errorThrown, rewrittenUrl);
          reject(error);
        },
        xhr: () => {
          const xhr = $.ajaxSettings.xhr();
          if (requestOptions.uploadProgress) {
            xhr.upload.addEventListener('progress', requestOptions.uploadProgress, false);
          }
          return xhr;
        }
      };
      
      Object.assign(ajaxSettings, requestOptions);
      ajaxRequest = $.ajax(ajaxSettings);
    }) as AbortablePromise<unknown>;
    
    promise.abort = () => {
      ajaxRequest.abort();
    };
    
    return promise;
  },

  put(url: string, data: unknown, options?: RequestOptions): Promise<unknown> {
    const requestOptions = options ?? {};
    
    if (shouldIncludeCredentials(url)) {
      requestOptions.xhrFields = {
        withCredentials: true
      };
      
      const signature = HSApp.Util.Url.getApiSignature(url, 'PUT', data);
      if (requestOptions.headers) {
        Object.assign(requestOptions.headers, signature);
      } else {
        requestOptions.headers = signature;
      }
    }
    
    const serializedData = serializeData(data, requestOptions);
    const rewrittenUrl = config.rewriteUrl(url);
    
    return new Promise((resolve, reject) => {
      const ajaxSettings: AjaxSettings = {
        url: rewrittenUrl,
        type: 'PUT',
        contentType: 'application/json',
        data: serializedData,
        dataType: 'json',
        success: resolve,
        error: (xhr, textStatus, errorThrown) => {
          invokeErrorHandlers(xhr, textStatus, errorThrown);
          const error = formatErrorMessage(xhr, textStatus, errorThrown, rewrittenUrl);
          reject(error);
        },
        xhr: () => {
          const xhr = $.ajaxSettings.xhr();
          if (requestOptions.uploadProgress) {
            xhr.upload.addEventListener('progress', requestOptions.uploadProgress, false);
          }
          return xhr;
        }
      };
      
      Object.assign(ajaxSettings, requestOptions);
      $.ajax(ajaxSettings);
    });
  },

  delete(url: string, options?: RequestOptions): Promise<unknown> {
    const requestOptions = options ?? {};
    
    if (shouldIncludeCredentials(url)) {
      requestOptions.xhrFields = {
        withCredentials: true
      };
      
      const signature = HSApp.Util.Url.getApiSignature(url, 'DELETE');
      if (requestOptions.headers) {
        Object.assign(requestOptions.headers, signature);
      } else {
        requestOptions.headers = signature;
      }
    }
    
    const rewrittenUrl = config.rewriteUrl(url);
    
    return new Promise((resolve, reject) => {
      const ajaxSettings: AjaxSettings = {
        url: rewrittenUrl,
        type: 'DELETE',
        success: resolve,
        error: (xhr, textStatus, errorThrown) => {
          invokeErrorHandlers(xhr, textStatus, errorThrown);
          reject(formatErrorMessage(xhr, textStatus, errorThrown, rewrittenUrl));
        }
      };
      
      Object.assign(ajaxSettings, requestOptions);
      $.ajax(ajaxSettings);
    });
  },

  patch(url: string, data: unknown, options?: RequestOptions): Promise<unknown> {
    const requestOptions = options ?? {};
    const serializedData = serializeData(data, requestOptions);
    
    if (shouldIncludeCredentials(url)) {
      requestOptions.xhrFields = {
        withCredentials: true
      };
      
      const signature = HSApp.Util.Url.getApiSignature(url, 'PATCH', data);
      if (requestOptions.headers) {
        Object.assign(requestOptions.headers, signature);
      } else {
        requestOptions.headers = signature;
      }
    }
    
    const rewrittenUrl = config.rewriteUrl(url);
    
    return new Promise((resolve, reject) => {
      const ajaxSettings: AjaxSettings = {
        url: rewrittenUrl,
        type: 'PATCH',
        contentType: 'application/json',
        data: serializedData,
        dataType: 'json',
        success: resolve,
        error: (xhr, textStatus, errorThrown) => {
          invokeErrorHandlers(xhr, textStatus, errorThrown);
          const error = formatErrorMessage(xhr, textStatus, errorThrown, rewrittenUrl);
          reject(error);
        }
      };
      
      Object.assign(ajaxSettings, requestOptions);
      $.ajax(ajaxSettings);
    });
  },

  registerErrorHandler(handler: ErrorHandler): void {
    errorHandlers.push(handler);
  },

  unRegisterAllErrorHandlers(): void {
    errorHandlers.length = 0;
  }
};

export default httpClient;