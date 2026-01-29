interface AxiosRequestConfig {
  validateStatus?: (status: number) => boolean;
  [key: string]: unknown;
}

interface AxiosResponse {
  status: number;
  config: AxiosRequestConfig;
  request: unknown;
  [key: string]: unknown;
}

type ResolveCallback = (response: AxiosResponse) => void;
type RejectCallback = (error: Error) => void;

function createAxiosError(
  message: string,
  config: AxiosRequestConfig,
  code: null,
  request: unknown,
  response: AxiosResponse
): Error {
  const error = new Error(message) as Error & {
    config?: AxiosRequestConfig;
    code?: null;
    request?: unknown;
    response?: AxiosResponse;
  };
  error.config = config;
  error.code = code;
  error.request = request;
  error.response = response;
  return error;
}

export function settle(
  resolve: ResolveCallback,
  reject: RejectCallback,
  response: AxiosResponse
): void {
  const validateStatus = response.config.validateStatus;
  
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(
      createAxiosError(
        `Request failed with status code ${response.status}`,
        response.config,
        null,
        response.request,
        response
      )
    );
  }
}