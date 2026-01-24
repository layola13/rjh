/**
 * Vue Intersection Observer Directive
 * 使用 IntersectionObserver API 监听元素的可见性变化
 * 
 * @example
 * // 基本用法
 * <div v-intersect="onIntersect"></div>
 * 
 * @example
 * // 高级用法（带选项）
 * <div v-intersect="{
 *   handler: onIntersect,
 *   options: { threshold: 0.5 }
 * }"></div>
 * 
 * @example
 * // 使用修饰符
 * <div v-intersect.once.quiet="onIntersect"></div>
 */

import { DirectiveOptions } from 'vue';

/**
 * Intersection Observer 回调函数类型
 */
export type IntersectHandler = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
  isIntersecting: boolean
) => void;

/**
 * Intersect 指令的绑定值类型
 */
export type IntersectValue =
  | IntersectHandler
  | {
      /** 交叉变化时的回调函数 */
      handler: IntersectHandler;
      /** IntersectionObserver 的配置选项 */
      options?: IntersectionObserverInit;
    };

/**
 * 指令修饰符
 */
export interface IntersectModifiers {
  /** 只触发一次后自动解绑 */
  once?: boolean;
  /** 静默模式：首次初始化时不触发回调 */
  quiet?: boolean;
}

/**
 * 元素上附加的观察者数据
 */
interface IntersectObserveData {
  /** 是否已初始化（首次触发后为 true） */
  init: boolean;
  /** IntersectionObserver 实例 */
  observer: IntersectionObserver;
}

/**
 * 扩展的 HTML 元素类型，包含私有的观察者数据
 */
declare global {
  interface HTMLElement {
    _observe?: IntersectObserveData;
  }
}

/**
 * Intersect 指令
 * 
 * 监听元素与视口的交叉状态，基于 IntersectionObserver API
 * 
 * @remarks
 * - 当元素进入或离开视口时触发回调
 * - 支持 `.once` 修饰符：触发一次后自动解绑
 * - 支持 `.quiet` 修饰符：首次初始化时不触发回调
 * - 可传入 IntersectionObserver 的配置选项（root, rootMargin, threshold 等）
 * 
 * @public
 */
export const Intersect: DirectiveOptions;

/**
 * 默认导出 Intersect 指令
 * @public
 */
declare const _default: DirectiveOptions;
export default _default;