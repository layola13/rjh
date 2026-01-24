/**
 * 触摸事件处理模块
 * @module module_start
 */

/**
 * 触摸事件处理器类型
 * @param event - 触摸事件对象
 */
export type TouchEventHandler = (event: TouchEvent) => void;

/**
 * 溢出检查结果
 */
export interface OverflowCheckResult {
  /** 是否发生溢出 */
  hasOverflow: boolean;
  /** 溢出的方向 */
  direction?: 'horizontal' | 'vertical' | 'both';
}

/**
 * 事件处理工具类
 */
export interface EventUtils {
  /**
   * 检查触摸事件是否导致溢出
   * @param event - 触摸事件对象
   * @param handler - 触摸开始事件处理器
   * @returns 溢出检查结果
   */
  overflowCheck(event: TouchEvent, handler: TouchEventHandler): OverflowCheckResult | void;

  /**
   * 触摸开始事件处理器
   * @param event - 触摸事件对象
   */
  onTouchStart(event: TouchEvent): void;
}

/**
 * 处理触摸开始事件并执行溢出检查
 * @param event - 触摸事件对象
 * @returns 溢出检查的结果
 */
export declare function handleTouchStart(event: TouchEvent): OverflowCheckResult | void;

/**
 * 事件工具实例
 */
export declare const eventUtils: EventUtils;