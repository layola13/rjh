/**
 * Intersectable Mixin Options
 * 配置项用于定义在元素可见时需要调用的方法名称
 */
export interface IntersectableOptions {
  /**
   * 当元素进入视口时需要调用的方法名称列表
   * Array of method names to be called when the element becomes visible in viewport
   */
  onVisible: string[];
}

/**
 * Intersectable Mixin
 * 可交互混入，用于监听元素与视口的交集变化
 * 
 * @description
 * 该混入提供了基于 IntersectionObserver API 的视口监听功能。
 * 当元素进入视口时，会自动调用配置的回调方法。
 * 
 * @param options - 配置项，指定元素可见时需要触发的方法
 * @returns Vue 组件扩展，包含生命周期钩子和观察逻辑
 * 
 * @remarks
 * - 仅在支持 IntersectionObserver 的浏览器环境中有效
 * - 不支持的环境会返回一个空的 mixin（仅保留 name）
 * - 会在 mounted 时自动注册观察者，destroyed 时自动清理
 * 
 * @example
 *