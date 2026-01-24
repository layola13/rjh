/**
 * 扩展过渡动画工具
 * 用于创建元素展开/收起的过渡效果
 */

/**
 * 扩展过渡钩子集合
 * 包含 Vue 过渡组件所需的所有生命周期钩子
 */
export interface ExpandTransitionHooks {
  /**
   * 进入动画前的钩子
   * @param element - 正在执行动画的 DOM 元素
   */
  beforeEnter(element: ExpandTransitionElement): void;

  /**
   * 进入动画执行时的钩子
   * @param element - 正在执行动画的 DOM 元素
   */
  enter(element: ExpandTransitionElement): void;

  /**
   * 进入动画完成后的钩子
   * @param element - 正在执行动画的 DOM 元素
   */
  afterEnter(element: ExpandTransitionElement): void;

  /**
   * 进入动画被取消时的钩子
   * @param element - 正在执行动画的 DOM 元素
   */
  enterCancelled(element: ExpandTransitionElement): void;

  /**
   * 离开动画执行时的钩子
   * @param element - 正在执行动画的 DOM 元素
   */
  leave(element: ExpandTransitionElement): void;

  /**
   * 离开动画完成后的钩子
   * @param element - 正在执行动画的 DOM 元素
   */
  afterLeave(element: ExpandTransitionElement): void;

  /**
   * 离开动画被取消时的钩子
   * @param element - 正在执行动画的 DOM 元素
   */
  leaveCancelled(element: ExpandTransitionElement): void;
}

/**
 * 扩展过渡元素
 * 扩展了 HTMLElement，添加了过渡动画所需的私有属性
 */
export interface ExpandTransitionElement extends HTMLElement {
  /**
   * 父节点引用（可能为 null）
   * @internal
   */
  _parent?: HTMLElement | null;

  /**
   * 初始样式缓存
   * @internal
   */
  _initialStyle?: ExpandTransitionInitialStyle;
}

/**
 * 初始样式缓存对象
 * 用于在动画完成后恢复元素的原始样式
 */
export interface ExpandTransitionInitialStyle {
  /** 过渡属性值 */
  transition: string;
  /** 溢出属性值 */
  overflow: string;
  /** 宽度或高度属性值 */
  [dimensionKey: string]: string;
}

/**
 * 创建扩展过渡动画配置
 * 
 * @param expandedParentClass - 展开状态时添加到父元素的 CSS 类名，默认为空字符串
 * @param isHorizontal - 是否为横向扩展（true 为宽度动画，false 为高度动画），默认为 false
 * @returns 包含所有过渡钩子的配置对象
 * 
 * @example
 *