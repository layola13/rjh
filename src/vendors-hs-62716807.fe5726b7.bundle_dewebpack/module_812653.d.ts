/**
 * 发送无响应的网络请求（用于数据上报/打点）
 * 优先使用 fetch HEAD 请求，降级到 Image 请求
 */

import { serialize, noop } from './utils';

/**
 * 请求参数对象
 */
interface RequestParams {
  /** 请求唯一标识 */
  z: number;
  /** 其他请求参数 */
  [key: string]: unknown;
}

/**
 * 全局窗口对象扩展
 */
interface WindowWithFetch extends Window {
  /** 自定义 fetch 实现 */
  __oFetch_?: typeof fetch;
  /** 动态图片请求缓存 */
  [key: `__request_hold_${number}`]: HTMLImageElement | undefined;
}

/**
 * 原始 fetch 函数引用
 */
const globalWindow = (typeof window === 'object' ? window : {}) as WindowWithFetch;
const originalFetch = globalWindow.__oFetch_ || globalWindow.fetch;
const fetchFunction = typeof originalFetch === 'function' ? originalFetch : undefined;

/**
 * 发送无需响应的请求（用于埋点上报等场景）
 * @param params - 请求参数对象或序列化后的字符串
 * @param baseUrl - 请求的基础 URL
 * @returns Promise（如果使用 fetch）或 undefined（如果使用 Image）
 */
export function sendBeacon(
  params: RequestParams | string,
  baseUrl: string
): Promise<Response> | undefined {
  let requestId = -1;
  let serializedParams: string;

  // 处理参数序列化
  if (typeof params === 'object') {
    requestId = params.z;
    serializedParams = serialize(params);
  } else {
    serializedParams = params;
  }

  const fullUrl = baseUrl + serializedParams;

  // 优先使用 fetch 发送 HEAD 请求
  if (fetchFunction) {
    return fetchFunction(fullUrl, {
      method: 'HEAD',
      mode: 'no-cors'
    }).catch(noop);
  }

  // 降级方案：使用 Image 对象发送请求
  if (globalWindow.document?.createElement) {
    const imageKey = `__request_hold_${requestId}` as const;
    const imageRequest = globalWindow[imageKey] = new Image();

    imageRequest.onload = imageRequest.onerror = (): void => {
      globalWindow[imageKey] = undefined;
    };

    imageRequest.src = fullUrl;
  }

  return undefined;
}

export default sendBeacon;