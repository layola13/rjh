/**
 * jQuery v3.2.1 Type Definitions
 * @see https://jquery.com/
 * @see https://api.jquery.com/
 */

declare global {
  interface Window {
    jQuery: JQueryStatic;
    $: JQueryStatic;
  }
}

/**
 * jQuery静态方法接口
 */
interface JQueryStatic {
  /** jQuery版本号 */
  readonly fn: JQuery;
  readonly jquery: string;
  
  /** 选择器函数 */
  (selector: string, context?: Element | Document | JQuery): JQuery;
  (element: Element): JQuery;
  (elementArray: Element[]): JQuery;
  (object: {}): JQuery;
  (html: string, ownerDocument?: Document): JQuery;
  (html: string, attributes: Object): JQuery;
  (): JQuery;
  
  /** 工具方法 */
  each<T>(array: T[], callback: (index: number, value: T) => void | boolean): T[];
  extend(target: any, ...objects: any[]): any;
  isFunction(obj: any): obj is Function;
  isArray(obj: any): obj is any[];
  isWindow(obj: any): obj is Window;
  isNumeric(value: any): boolean;
  type(obj: any): string;
  parseHTML(data: string, context?: Document, keepScripts?: boolean): any[];
  
  /** Ajax方法 */
  ajax(settings: JQueryAjaxSettings): JQueryXHR;
  get(url: string, data?: any, success?: Function, dataType?: string): JQueryXHR;
  post(url: string, data?: any, success?: Function, dataType?: string): JQueryXHR;
}

/**
 * jQuery实例方法接口
 */
interface JQuery {
  /** DOM操作 */
  find(selector: string): JQuery;
  filter(selector: string | Function): JQuery;
  eq(index: number): JQuery;
  first(): JQuery;
  last(): JQuery;
  
  /** 属性操作 */
  attr(attributeName: string): string;
  attr(attributeName: string, value: string | number): this;
  css(propertyName: string): string;
  css(propertyName: string, value: string | number): this;
  
  /** 事件处理 */
  on(events: string, handler: Function): this;
  off(events?: string, handler?: Function): this;
  click(handler?: Function): this;
  
  /** 动画效果 */
  show(duration?: number, complete?: Function): this;
  hide(duration?: number, complete?: Function): this;
  animate(properties: Object, duration?: number, complete?: Function): this;
  
  [index: number]: Element;
  length: number;
}

/**
 * Ajax设置接口
 */
interface JQueryAjaxSettings {
  url?: string;
  type?: string;
  data?: any;
  success?: (data: any, textStatus: string, jqXHR: JQueryXHR) => void;
  error?: (jqXHR: JQueryXHR, textStatus: string, errorThrown: string) => void;
  complete?: (jqXHR: JQueryXHR, textStatus: string) => void;
}

/**
 * XMLHttpRequest包装接口
 */
interface JQueryXHR extends XMLHttpRequest {
  done(callback: Function): this;
  fail(callback: Function): this;
  always(callback: Function): this;
}

declare const jQuery: JQueryStatic;
declare const $: JQueryStatic;

export = jQuery;
export as namespace jQuery;