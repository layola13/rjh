/**
 * Intersection Observer 指令
 * 用于Vue组件，监听元素与视口的交叉状态
 */

/**
 * Intersection Observer 回调函数
 * @param entries - IntersectionObserver条目数组
 * @param observer - IntersectionObserver实例
 * @param isIntersecting - 是否正在交叉（是否可见）
 */
export type IntersectHandler = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
  isIntersecting: boolean
) => void;

/**
 * Intersect 指令配置选项
 */
export interface IntersectDirectiveValue {
  /**
   * 交叉状态变化时的回调函数
   */
  handler: IntersectHandler;
  
  /**
   * IntersectionObserver 配置选项
   */
  options?: IntersectionObserverInit;
}

/**
 * 指令修饰符
 */
export interface IntersectModifiers {
  /**
   * 静默模式 - 初始化时不触发回调
   */
  quiet?: boolean;
  
  /**
   * 只执行一次 - 触发后自动解绑
   */
  once?: boolean;
}

/**
 * 元素上挂载的观察者数据
 */
export interface IntersectObserveData {
  /**
   * 是否已初始化
   */
  init: boolean;
  
  /**
   * IntersectionObserver 实例
   */
  observer: IntersectionObserver;
}

/**
 * 扩展的 HTMLElement，包含观察者数据
 */
export interface IntersectElement extends HTMLElement {
  _observe?: IntersectObserveData;
}

/**
 * Vue 指令绑定对象
 */
export interface IntersectBinding {
  /**
   * 指令绑定的值
   */
  value: IntersectHandler | IntersectDirectiveValue;
  
  /**
   * 指令修饰符
   */
  modifiers?: IntersectModifiers;
}

/**
 * Intersect 指令定义
 */
export interface IntersectDirective {
  /**
   * 元素插入DOM时的钩子
   * @param el - 绑定指令的元素
   * @param binding - 指令绑定对象
   */
  inserted(el: IntersectElement, binding: IntersectBinding): void;
  
  /**
   * 指令解绑时的钩子
   * @param el - 绑定指令的元素
   */
  unbind(el: IntersectElement): void;
}

/**
 * Intersect 指令实例
 */
export const Intersect: IntersectDirective;

/**
 * 默认导出
 */
export default Intersect;