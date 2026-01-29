interface UploadOptions {
  file: Blob | File;
  filename: string;
  action: string;
  method: string;
  data?: Record<string, any>;
  headers?: Record<string, string | null>;
  withCredentials?: boolean;
  onProgress?: (event: ProgressEvent) => void;
  onError: (error: Error, response?: any) => void;
  onSuccess: (response: any, xhr: XMLHttpRequest) => void;
}

interface ProgressEvent extends Event {
  loaded: number;
  total: number;
  percent?: number;
}

interface UploadError extends Error {
  status: number;
  method: string;
  url: string;
}

function parseResponse(xhr: XMLHttpRequest): any {
  const responseText = xhr.responseText || xhr.response;
  if (!responseText) {
    return responseText;
  }
  
  try {
    return JSON.parse(responseText);
  } catch (error) {
    return responseText;
  }
}

function createUploadError(options: UploadOptions, xhr: XMLHttpRequest): UploadError {
  const message = `cannot ${options.method} ${options.action} ${xhr.status}'`;
  const error = new Error(message) as UploadError;
  error.status = xhr.status;
  error.method = options.method;
  error.url = options.action;
  return error;
}

export default function upload(options: UploadOptions): { abort: () => void } {
  const xhr = new XMLHttpRequest();

  if (options.onProgress && xhr.upload) {
    xhr.upload.onprogress = (event: ProgressEvent) => {
      if (event.total > 0) {
        event.percent = (event.loaded / event.total) * 100;
      }
      options.onProgress?.(event);
    };
  }

  const formData = new FormData();

  if (options.data) {
    Object.keys(options.data).forEach((key) => {
      const value = options.data![key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      } else {
        formData.append(key, value);
      }
    });
  }

  if (options.file instanceof Blob) {
    formData.append(options.filename, options.file, (options.file as File).name);
  } else {
    formData.append(options.filename, options.file);
  }

  xhr.onerror = (event: ProgressEvent) => {
    options.onError(event as any);
  };

  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return options.onError(createUploadError(options, xhr), parseResponse(xhr));
    }
    return options.onSuccess(parseResponse(xhr), xhr);
  };

  xhr.open(options.method, options.action, true);

  if (options.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = options.headers ?? {};
  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  Object.keys(headers).forEach((key) => {
    if (headers[key] !== null) {
      xhr.setRequestHeader(key, headers[key]!);
    }
  });

  xhr.send(formData);

  return {
    abort: () => {
      xhr.abort();
    }
  };
}