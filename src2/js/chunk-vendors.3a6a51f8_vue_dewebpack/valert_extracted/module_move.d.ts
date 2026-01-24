/**
 * Module: module_move
 * 处理触摸移动事件的溢出检查
 * 
 * @module move
 */

/**
 * 触摸事件处理器类型
 */
type TouchMoveHandler = (event: TouchEvent) => void;

/**
 * 溢出检查函数
 * 
 * @param target - 目标元素或事件对象
 * @param callback - 触摸移动回调函数
 * @returns 检查结果（具体类型待确认）
 */
declare function move(target: HTMLElement | TouchEvent): unknown;

export default move;