/**
 * 获取元素相对于文档左侧的偏移量（包含滚动距离）
 * @param element - 目标DOM元素
 * @returns 元素距离文档左边缘的像素值
 */
export function getOffsetLeft(element: HTMLElement): number;

/**
 * 表示元素位置的坐标对象
 */
interface Position {
  /** 距离左边缘的像素值 */
  left: number;
  /** 距离顶部边缘的像素值 */
  top: number;
}

/**
 * 获取元素相对于视口的边界矩形位置
 * @param element - 目标DOM元素
 * @returns 包含left和top属性的位置对象
 * @internal
 */
declare function getBoundingPosition(element: HTMLElement): Position;

/**
 * 获取窗口的水平滚动距离
 * @param window - 窗口对象（Window或父窗口）
 * @returns 水平滚动的像素值
 * @internal
 */
declare function getScrollLeft(window: Window): number;