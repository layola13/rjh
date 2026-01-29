export interface AxiosErrorConfig {
  [key: string]: unknown;
}

export interface AxiosResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosErrorConfig;
  request?: unknown;
}

export interface AxiosRequest {
  [key: string]: unknown;
}

export interface AxiosError extends Error {
  config: AxiosErrorConfig;
  code?: string;
  request?: AxiosRequest;
  response?: AxiosResponse;
  isAxiosError: boolean;
  toJSON: () => AxiosErrorJSON;
}

export interface AxiosErrorJSON {
  message: string;
  name: string;
  description?: string;
  number?: number;
  fileName?: string;
  lineNumber?: number;
  columnNumber?: number;
  stack?: string;
  config: AxiosErrorConfig;
  code?: string;
}

export default function enhanceAxiosError(
  error: AxiosError,
  config: AxiosErrorConfig,
  code: string | undefined,
  request: AxiosRequest | undefined,
  response: AxiosResponse | undefined
): AxiosError {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function(): AxiosErrorJSON {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code
    };
  };

  return error;
}