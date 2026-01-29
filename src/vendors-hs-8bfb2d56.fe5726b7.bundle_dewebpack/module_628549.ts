import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';

const axiosInstance: AxiosInstance = axios.create();

export function getCancelToken(): CancelTokenSource {
  return axios.CancelToken.source();
}

export function requestWithCancelToken<T = any>(
  config: AxiosRequestConfig,
  cancelTokenSource: CancelTokenSource
): Promise<AxiosResponse<T>> {
  return axiosInstance({
    ...config,
    cancelToken: cancelTokenSource.token
  });
}

export function createAbortController(): AbortController {
  return new AbortController();
}

export function requestWithAbortSignal<T = any>(
  config: AxiosRequestConfig,
  controller: AbortController
): Promise<AxiosResponse<T>> {
  return axiosInstance({
    ...config,
    signal: controller.signal
  });
}

export default axiosInstance;