/**
 * jQuery事件解绑方法的类型定义
 * Module: module_off
 * Original ID: off
 */

/**
 * jQuery事件对象接口
 */
interface JQueryEventObject {
  /** 阻止默认行为 */
  preventDefault?: () => void;
  /** 事件处理对象 */
  handleObj?: EventHandlerObject;
  /** 事件委托目标元素 */
  delegateTarget?: Element;
}

/**
 * 事件处理器对象接口
 */
interface EventHandlerObject {
  /** 命名空间 */
  namespace?: string;
  /** 原始事件类型 */
  origType: string;
  /** CSS选择器 */
  selector?: string;
  /** 事件处理函数 */
  handler: EventHandler;
}

/**
 * 事件处理函数类型
 */
type EventHandler = (event: JQueryEventObject) => void | boolean;

/**
 * 事件映射对象类型
 * 键为事件名称，值为事件处理函数
 */
interface EventMap {
  [eventType: string]: EventHandler;
}

/**
 * jQuery实例接口
 */
interface JQuery {
  /**
   * 移除事件处理器
   * 
   * @param eventObject - jQuery事件对象，包含事件详细信息
   * @param selector - 可选的CSS选择器，用于事件委托
   * @param handler - 可选的事件处理函数
   * @returns jQuery实例，支持链式调用
   */
  off(eventObject: JQueryEventObject, selector?: string, handler?: EventHandler): this;

  /**
   * 批量移除多个事件处理器
   * 
   * @param events - 事件映射对象，键为事件类型，值为处理函数
   * @param selector - 可选的CSS选择器
   * @returns jQuery实例，支持链式调用
   */
  off(events: EventMap, selector?: string): this;

  /**
   * 移除指定类型的事件处理器
   * 
   * @param eventType - 事件类型字符串（如 "click.namespace"）
   * @param selector - 可选的CSS选择器或事件处理函数
   * @param handler - 可选的事件处理函数
   * @returns jQuery实例，支持链式调用
   */
  off(eventType?: string, selector?: string | EventHandler, handler?: EventHandler): this;

  /**
   * 遍历集合中的每个元素
   * 
   * @param callback - 对每个元素执行的回调函数
   * @returns jQuery实例
   */
  each(callback: (this: Element) => void): this;
}

/**
 * jQuery静态事件工具
 */
interface JQueryEventStatic {
  /**
   * 从DOM元素移除事件监听器
   * 
   * @param element - 目标DOM元素
   * @param eventType - 事件类型
   * @param handler - 事件处理函数
   * @param selector - 可选的CSS选择器
   */
  remove(element: Element, eventType?: string, handler?: EventHandler, selector?: string): void;
}

/**
 * jQuery静态接口
 */
interface JQueryStatic {
  /** 事件相关的静态方法 */
  event: JQueryEventStatic;
}

/**
 * jQuery工厂函数
 * 
 * @param selector - CSS选择器或DOM元素
 * @returns jQuery实例
 */
declare function jQuery(selector: string | Element): JQuery;

/**
 * jQuery命名空间（别名 $）
 */
declare const b: typeof jQuery & JQueryStatic;