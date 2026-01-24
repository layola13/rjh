/**
 * 查找与选择器匹配的最近祖先元素
 * @template TElement - 元素类型
 */
interface ClosestMethod<TElement extends Node = HTMLElement> {
  /**
   * 从当前元素开始，沿 DOM 树向上遍历，返回匹配选择器的第一个祖先元素（包括自身）
   * 
   * @param selector - CSS 选择器字符串或 jQuery 对象
   * @param context - 可选的上下文元素，作为遍历的边界（不包含该元素）
   * @returns 包含匹配元素的 jQuery 对象
   * 
   * @example
   *