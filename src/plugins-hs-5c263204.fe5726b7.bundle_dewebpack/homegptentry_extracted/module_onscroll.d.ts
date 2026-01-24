/**
 * 滚动方向枚举
 * 定义容器可滚动的方向状态
 */
export enum ScrollDirection {
  /** 无滚动空间 */
  None = 'none',
  /** 可向右滚动 */
  Right = 'right',
  /** 可向左滚动 */
  Left = 'left',
  /** 可双向滚动 */
  Both = 'both'
}

/**
 * 滚动容器引用接口
 * 扩展标准HTML元素的滚动相关属性
 */
export interface ScrollableElement {
  /** 内容的总宽度（包括不可见部分） */
  scrollWidth: number;
  /** 元素的可见宽度 */
  clientWidth: number;
  /** 当前水平滚动位置 */
  scrollLeft: number;
}

/**
 * 滚动状态更新器类型
 * 用于更新UI中的滚动状态
 */
export type ScrollStateUpdater = (direction: ScrollDirection) => void;

/**
 * 处理滚动事件并更新滚动方向状态
 * 
 * @description
 * 检测容器的滚动位置并确定可滚动方向：
 * - 如果内容宽度小于等于容器宽度，则无滚动空间
 * - 如果滚动位置在最左侧，则只能向右滚动
 * - 如果滚动位置在最右侧，则只能向左滚动
 * - 否则可以双向滚动
 * 
 * @param currentElement - 当前滚动容器的引用
 * @param updateScrollState - 更新滚动状态的回调函数
 * 
 * @example
 *