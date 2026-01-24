/**
 * 鼠标滚轮事件处理模块
 * @module module_mousewheel
 * @description 处理鼠标滚轮交互，支持步进式数值调整和防抖动机制
 */

/**
 * 鼠标滚轮处理器的配置选项
 */
interface MousewheelOptions {
  /** 每次滚轮滚动时的步进值 */
  step: number;
}

/**
 * 鼠标滚轮处理器接口
 * @description 提供基于滚轮的交互功能，包含旋转状态管理和事件处理
 */
interface MousewheelHandler {
  /** 当前是否处于旋转（滚动）状态 */
  spinning: boolean;
  
  /** 配置选项 */
  options: MousewheelOptions;
  
  /** 鼠标滚轮防抖定时器 */
  mousewheelTimer: number | undefined;
  
  /**
   * 开始滚动操作
   * @param event - 原始事件对象
   * @returns 是否成功启动滚动
   */
  _start(event: Event): boolean;
  
  /**
   * 执行旋转/滚动操作
   * @param delta - 滚动增量值（正值向上，负值向下）
   * @param event - 原始事件对象
   */
  _spin(delta: number, event: Event): void;
  
  /**
   * 停止滚动操作
   * @param event - 原始事件对象
   */
  _stop(event: Event): void;
  
  /**
   * 延迟执行回调函数
   * @param callback - 延迟执行的回调
   * @param delay - 延迟时间（毫秒）
   * @returns 定时器ID
   */
  _delay(callback: () => void, delay: number): number;
  
  /**
   * 处理鼠标滚轮事件
   * @param event - 滚轮事件对象
   * @param delta - 滚轮滚动的方向和强度（正值向上，负值向下）
   * @returns 事件是否被成功处理
   */
  handleMousewheel(event: Event, delta: number): boolean;
}

/**
 * 处理鼠标滚轮事件的核心方法
 * @this {MousewheelHandler} 滚轮处理器实例上下文
 * @param event - 触发的事件对象
 * @param delta - 滚轮滚动增量（正数表示向上滚动，负数表示向下滚动）
 * @returns 如果事件未处理则返回 false
 * 
 * @remarks
 * - 自动管理旋转状态的开始和停止
 * - 实现100ms防抖，避免频繁触发停止事件
 * - 根据滚动方向应用配置的步进值
 */
declare function handleMousewheel(
  this: MousewheelHandler,
  event: Event,
  delta: number
): boolean;