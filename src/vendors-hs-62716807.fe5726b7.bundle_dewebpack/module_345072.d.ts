/**
 * 判断对象是否为 Window 对象
 * @param element - 待检查的对象
 * @returns 如果是 Window 对象返回 true，否则返回 false
 */
export function isWindow(element: unknown): element is Window;

/**
 * 获取元素的滚动位置
 * @param element - 目标元素，可以是 Window、Document 或 HTMLElement
 * @param isVertical - 是否获取垂直方向的滚动位置。true 获取 scrollTop，false 获取 scrollLeft
 * @returns 滚动位置的数值，如果在非浏览器环境返回 0
 * 
 * @example
 *