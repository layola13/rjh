interface AxiosErrorJSON {
  message: string;
  name: string;
  description?: string;
  number?: number;
  fileName?: string;
  lineNumber?: number;
  columnNumber?: number;
  stack?: string;
  config: unknown;
  code?: string;
}

interface AxiosError extends Error {
  config: unknown;
  code?: string;
  request?: unknown;
  response?: unknown;
  isAxiosError: boolean;
  toJSON(): AxiosErrorJSON;
}

export default function enhanceAxiosError(
  error: AxiosError,
  config: unknown,
  code: string | undefined,
  request: unknown,
  response: unknown
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
      description: (this as any).description,
      number: (this as any).number,
      fileName: (this as any).fileName,
      lineNumber: (this as any).lineNumber,
      columnNumber: (this as any).columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code
    };
  };

  return error;
}