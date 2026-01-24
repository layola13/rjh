/**
 * 清理模块的dispose函数
 * 用于移除渲染后的观察者和自定义事件观察者
 * @module module_dispose
 */

/**
 * Observable 观察者接口
 * @typeParam T 观察者回调函数的类型
 */
interface Observable<T> {
  /**
   * 移除指定的观察者
   * @param observer 要移除的观察者回调
   */
  remove(observer: T): void;
}

/**
 * 渲染目标对象接口
 */
interface RenderTarget {
  /**
   * 渲染后事件的可观察对象
   */
  onAfterRenderObservable: Observable<AfterRenderCallback>;
}

/**
 * 事件源对象接口
 */
interface EventSource {
  /**
   * 自定义事件的可观察对象
   * @private
   */
  _customEventObservable: Observable<CustomEventCallback>;
}

/**
 * 渲染后回调函数类型
 */
type AfterRenderCallback = () => void;

/**
 * 自定义事件回调函数类型
 */
type CustomEventCallback = () => void;

/**
 * 清理资源的dispose函数
 * @param target 渲染目标对象
 * @param eventSource 事件源对象
 * @param afterRenderObserver 要移除的渲染后观察者
 * @param customEventObserver 要移除的自定义事件观察者
 */
declare function moduleDispose(
  target: RenderTarget,
  eventSource: EventSource,
  afterRenderObserver: AfterRenderCallback,
  customEventObserver: CustomEventCallback
): void;

export { moduleDispose, RenderTarget, EventSource, AfterRenderCallback, CustomEventCallback, Observable };