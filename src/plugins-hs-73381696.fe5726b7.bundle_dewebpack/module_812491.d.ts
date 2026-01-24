/**
 * DOM 工具函数类型定义
 * 提供元素查找、滚动容器获取和索引计算功能
 */

/**
 * 向上查找最近的匹配选择器的祖先元素
 * @param element - 起始元素
 * @param selector - CSS 选择器字符串
 * @param boundary - 边界元素，搜索不会超过此元素
 * @returns 匹配的祖先元素，如果未找到或到达边界则返回 null
 */
export function closest(
  element: Element,
  selector: string,
  boundary: Element | null
): Element | null;

/**
 * 获取元素的可滚动祖先容器
 * 向上遍历 DOM 树，查找第一个具有滚动能力的元素
 * （overflow 为 auto 或 scroll 且内容溢出）
 * @param element - 起始元素
 * @returns 可滚动的祖先元素，如果未找到则返回 null
 */
export function getScrollElement(element: Element | null): Element | null;

/**
 * 获取元素在其父元素子节点列表中的索引位置
 * @param element - 目标元素
 * @param excludeSelector - 排除选择器，匹配此选择器的兄弟元素不参与计数
 * @returns 元素索引（从 0 开始），如果元素没有父节点则返回 -1
 */
export function getDomIndex(element: Element, excludeSelector: string): number;