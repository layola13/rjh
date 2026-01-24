/**
 * 触摸开始事件处理函数，在触摸开始时执行溢出检查
 * @param touchEvent - 触摸事件对象
 * @returns 溢出检查的结果
 */
declare function moduleStart(touchEvent: TouchEvent): boolean | void;

/**
 * 事件处理工具类，提供溢出检查和触摸事件处理功能
 */
declare namespace EventHandler {
  /**
   * 执行溢出检查
   * @param event - 事件对象
   * @param handler - 事件处理函数
   * @returns 检查结果
   */
  function overflowCheck(
    event: TouchEvent,
    handler: (event: TouchEvent) => void
  ): boolean | void;

  /**
   * 触摸开始事件处理器
   * @param event - 触摸事件对象
   */
  function onTouchStart(event: TouchEvent): void;
}

export { moduleStart, EventHandler };