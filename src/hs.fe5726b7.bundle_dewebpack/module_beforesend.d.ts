/**
 * AJAX 请求发送前的钩子模块
 * @module beforeSend
 */

/**
 * jQuery AJAX 设置接口
 */
interface AjaxSettings {
  url?: string;
  method?: string;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  contentType?: string;
  dataType?: string;
  [key: string]: unknown;
}

/**
 * jQuery XMLHttpRequest 包装器接口
 */
interface JQueryXHR {
  readyState: number;
  status: number;
  statusText: string;
  responseText: string;
  responseJSON?: unknown;
  setRequestHeader(name: string, value: string): void;
  abort(statusText?: string): void;
  [key: string]: unknown;
}

/**
 * 事件扩展数据接口
 */
interface BeforeLoadEventData {
  jqXHR: JQueryXHR;
  ajaxSettings: AjaxSettings;
  [key: string]: unknown;
}

/**
 * 事件触发器接口
 */
interface EventTrigger {
  _trigger(
    eventName: string,
    nativeEvent: Event | null,
    extraData: BeforeLoadEventData
  ): boolean | void;
}

/**
 * 工具函数接口（类似 jQuery.extend）
 */
interface UtilityExtend {
  extend<T, U>(target: T, source: U): T & U;
  extend<T, U, V>(target: T, source1: U, source2: V): T & U & V;
}

/**
 * 在 AJAX 请求发送前触发事件钩子
 * 
 * @param jqXHR - jQuery XMLHttpRequest 对象
 * @param ajaxSettings - AJAX 请求配置对象
 * @returns 事件处理结果，返回 false 可取消请求
 * 
 * @example
 *