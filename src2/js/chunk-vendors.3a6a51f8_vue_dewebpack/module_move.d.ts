/**
 * Module: module_move
 * 处理触摸移动事件的溢出检查模块
 */

/**
 * 触摸事件参数类型
 */
interface TouchMoveEvent {
  // 具体属性需要根据实际使用场景补充
  [key: string]: unknown;
}

/**
 * 溢出检查返回类型
 */
type OverflowCheckResult = boolean | void | unknown;

/**
 * 执行触摸移动的溢出检查
 * @param event - 触摸移动事件对象
 * @returns 溢出检查的结果
 */
declare function moduleMove(event: TouchMoveEvent): OverflowCheckResult;

export { moduleMove, TouchMoveEvent, OverflowCheckResult };