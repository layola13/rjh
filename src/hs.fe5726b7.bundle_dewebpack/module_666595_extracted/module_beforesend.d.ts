/**
 * Module: beforeSend
 * 
 * AJAX请求发送前的钩子函数，用于在请求发送前触发自定义事件
 * 
 * @remarks
 * 该模块提供了一个标准的beforeSend回调实现，用于：
 * - 在AJAX请求发送前触发"beforeLoad"事件
 * - 合并jqXHR对象、AJAX设置和其他上下文信息
 * - 允许在请求发送前进行拦截或修改
 */

/**
 * jQuery XMLHttpRequest对象接口
 */
interface JQueryXHR {
  readyState: number;
  status: number;
  statusText: string;
  responseText: string;
  responseXML: Document | null;
  setRequestHeader(name: string, value: string): void;
  getAllResponseHeaders(): string;
  abort(statusText?: string): void;
}

/**
 * jQuery AJAX设置选项接口
 */
interface AjaxSettings {
  url?: string;
  type?: string;
  method?: string;
  dataType?: string;
  data?: unknown;
  contentType?: string | boolean;
  timeout?: number;
  headers?: Record<string, string>;
  beforeSend?: (jqXHR: JQueryXHR, settings: AjaxSettings) => boolean | void;
  [key: string]: unknown;
}

/**
 * beforeLoad事件的数据载荷接口
 */
interface BeforeLoadEventData {
  /** jQuery XMLHttpRequest对象 */
  jqXHR: JQueryXHR;
  /** AJAX请求的配置选项 */
  ajaxSettings: AjaxSettings;
  [key: string]: unknown;
}

/**
 * 触发器返回值类型
 * 返回false可以取消后续操作
 */
type TriggerResult = boolean | void;

/**
 * AJAX请求发送前的钩子函数
 * 
 * @param jqXHR - jQuery XMLHttpRequest对象
 * @param ajaxSettings - AJAX请求的配置选项
 * @returns 如果返回false则取消请求，否则继续执行
 * 
 * @example
 *