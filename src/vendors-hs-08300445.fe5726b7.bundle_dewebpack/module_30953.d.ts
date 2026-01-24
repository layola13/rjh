/**
 * 自动滚动 Hook 类型定义
 * 用于处理拖拽或鼠标交互时的边缘自动滚动功能
 */

import type { RefObject } from 'react';

/**
 * 坐标类型（X 或 Y）
 */
type CoordinateType = 'pageX' | 'pageY';

/**
 * 滚动偏移类型（水平或垂直）
 */
type ScrollOffsetType = 'scrollX' | 'scrollY';

/**
 * 鼠标或触摸事件类型
 */
type PointerEvent = MouseEvent | TouchEvent;

/**
 * 扩展的鼠标事件（用于标记已处理的虚拟事件）
 */
interface VirtualHandledMouseEvent extends MouseEvent {
  _virtualHandled?: boolean;
}

/**
 * 从事件中获取页面坐标（X 或 Y）
 * 
 * @param event - 鼠标或触摸事件
 * @param isHorizontal - true 返回 X 坐标，false 返回 Y 坐标
 * @returns 相对于视口的坐标值（已减去滚动偏移）
 */
export function getPageXY(event: PointerEvent, isHorizontal: boolean): number;

/**
 * 自动滚动 Hook
 * 当鼠标在元素边缘附近时，自动滚动容器
 * 
 * @param enabled - 是否启用自动滚动
 * @param elementRef - 需要滚动的元素引用
 * @param onScroll - 滚动回调函数，接收滚动速度作为参数
 * 
 * @example
 *