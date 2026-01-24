/**
 * HTTP 请求工具模块
 * 提供基于 Axios 的请求封装，支持取消令牌和中止信号
 */

import { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';

/**
 * 获取 Axios 取消令牌源
 * @returns 新的取消令牌源，用于取消请求
 */
export function getCancelToken(): CancelTokenSource;

/**
 * 使用取消令牌发起请求
 * @param config - Axios 请求配置
 * @param cancelTokenSource - 取消令牌源
 * @returns Promise 包装的响应结果
 */
export function requestWithCancelToken<T = any>(
  config: AxiosRequestConfig,
  cancelTokenSource: CancelTokenSource
): Promise<AxiosResponse<T>>;

/**
 * 创建 AbortController 实例
 * @returns 新的 AbortController，用于中止请求
 */
export function createAbortController(): AbortController;

/**
 * 使用中止信号发起请求
 * @param config - Axios 请求配置
 * @param abortController - 中止控制器
 * @returns Promise 包装的响应结果
 */
export function requestWithAbortSignal<T = any>(
  config: AxiosRequestConfig,
  abortController: AbortController
): Promise<AxiosResponse<T>>;

/**
 * 默认导出的 Axios 实例
 * 预配置的请求客户端
 */
declare const axiosInstance: AxiosInstance;
export default axiosInstance;