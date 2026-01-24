/**
 * 事件监听器包装类
 * 封装单个DOM元素的事件绑定和解绑操作
 */
declare class EventElement {
  /**
   * 关联的DOM元素
   */
  element: Element;

  /**
   * 事件映射表
   * 键为事件名称，值为该事件的所有监听器函数数组
   */
  events: Record<string, EventListener[]>;

  /**
   * 构造函数
   * @param element - 需要管理事件的DOM元素
   */
  constructor(element: Element);

  /**
   * 绑定事件监听器
   * @param eventName - 事件名称（如 'click', 'scroll' 等）
   * @param listener - 事件处理函数
   */
  bind(eventName: string, listener: EventListener): void;

  /**
   * 解绑事件监听器
   * @param eventName - 事件名称
   * @param listener - 可选，指定要移除的事件处理函数。若不提供则移除该事件的所有监听器
   */
  unbind(eventName: string, listener?: EventListener): void;

  /**
   * 解绑所有事件监听器
   */
  unbindAll(): void;
}

/**
 * 事件管理器
 * 管理多个DOM元素的事件绑定，提供统一的事件操作接口
 */
declare class EventManager {
  /**
   * 管理的所有事件元素包装器
   */
  eventElements: EventElement[];

  /**
   * 构造函数
   */
  constructor();

  /**
   * 获取或创建指定元素的事件包装器
   * @param element - DOM元素
   * @returns 该元素对应的EventElement实例
   */
  eventElement(element: Element): EventElement;

  /**
   * 为指定元素绑定事件监听器
   * @param element - 目标DOM元素
   * @param eventName - 事件名称
   * @param listener - 事件处理函数
   */
  bind(element: Element, eventName: string, listener: EventListener): void;

  /**
   * 为指定元素解绑事件监听器
   * @param element - 目标DOM元素
   * @param eventName - 事件名称
   * @param listener - 可选，指定要移除的事件处理函数
   */
  unbind(element: Element, eventName: string, listener?: EventListener): void;

  /**
   * 解绑所有管理的元素的所有事件监听器
   */
  unbindAll(): void;

  /**
   * 为指定元素绑定一次性事件监听器（触发后自动解绑）
   * @param element - 目标DOM元素
   * @param eventName - 事件名称
   * @param listener - 事件处理函数
   */
  once(element: Element, eventName: string, listener: EventListener): void;
}

/**
 * 默认导出EventManager类
 */
export = EventManager;