import { Component, ReactNode, RefObject } from 'react';

/**
 * 滚动条事件类型映射
 * 将原生 PerfectScrollbar 事件名映射到组件的 prop 回调名
 */
export interface ScrollbarEventMap {
  /** Y轴滚动事件 */
  'ps-scroll-y': 'onScrollY';
  /** X轴滚动事件 */
  'ps-scroll-x': 'onScrollX';
  /** 向上滚动事件 */
  'ps-scroll-up': 'onScrollUp';
  /** 向下滚动事件 */
  'ps-scroll-down': 'onScrollDown';
  /** 向左滚动事件 */
  'ps-scroll-left': 'onScrollLeft';
  /** 向右滚动事件 */
  'ps-scroll-right': 'onScrollRight';
  /** Y轴到达顶部事件 */
  'ps-y-reach-start': 'onYReachStart';
  /** Y轴到达底部事件 */
  'ps-y-reach-end': 'onYReachEnd';
  /** X轴到达左侧事件 */
  'ps-x-reach-start': 'onXReachStart';
  /** X轴到达右侧事件 */
  'ps-x-reach-end': 'onXReachEnd';
}

/**
 * PerfectScrollbar 配置选项
 */
export interface PerfectScrollbarOptions {
  /** 滚动条最小长度 */
  minScrollbarLength?: number;
  /** 滚动条最大长度 */
  maxScrollbarLength?: number;
  /** 是否使用原生滚动行为 */
  useBothWheelAxes?: boolean;
  /** 滚动速度 */
  wheelSpeed?: number;
  /** 滚动传播 */
  wheelPropagation?: boolean;
  /** 是否抑制滚动X */
  suppressScrollX?: boolean;
  /** 是否抑制滚动Y */
  suppressScrollY?: boolean;
  /** 滚动X的拖拽距离 */
  scrollXMarginOffset?: number;
  /** 滚动Y的拖拽距离 */
  scrollYMarginOffset?: number;
  [key: string]: unknown;
}

/**
 * 滚动事件回调函数类型
 * @param container 滚动容器的 DOM 元素
 */
export type ScrollEventHandler = (container: HTMLElement) => void;

/**
 * ScrollbarContainer 组件的属性接口
 */
export interface ScrollbarContainerProps {
  /** 子元素内容 */
  children: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** PerfectScrollbar 配置选项 */
  option?: PerfectScrollbarOptions;
  /** 容器 ref 回调 */
  containerRef?: (element: HTMLElement | null) => void;
  /** Y轴滚动时触发 */
  onScrollY?: ScrollEventHandler;
  /** X轴滚动时触发 */
  onScrollX?: ScrollEventHandler;
  /** 向上滚动时触发 */
  onScrollUp?: ScrollEventHandler;
  /** 向下滚动时触发 */
  onScrollDown?: ScrollEventHandler;
  /** 向左滚动时触发 */
  onScrollLeft?: ScrollEventHandler;
  /** 向右滚动时触发 */
  onScrollRight?: ScrollEventHandler;
  /** Y轴到达顶部时触发 */
  onYReachStart?: ScrollEventHandler;
  /** Y轴到达底部时触发 */
  onYReachEnd?: ScrollEventHandler;
  /** X轴到达左侧时触发 */
  onXReachStart?: ScrollEventHandler;
  /** X轴到达右侧时触发 */
  onXReachEnd?: ScrollEventHandler;
}

/**
 * 完美滚动条容器组件
 * 封装 PerfectScrollbar 库，提供 React 组件接口
 */
export default class ScrollbarContainer extends Component<ScrollbarContainerProps> {
  /** 默认属性值 */
  static defaultProps: Partial<ScrollbarContainerProps>;
  /** 属性类型验证 */
  static propTypes: Record<string, unknown>;

  /**
   * 设置垂直滚动位置
   * @param scrollTop 滚动距离
   * @returns 是否设置成功
   */
  setScrollTop(scrollTop: number): boolean;

  /**
   * 设置水平滚动位置
   * @param scrollLeft 滚动距离
   * @returns 是否设置成功
   */
  setScrollLeft(scrollLeft: number): boolean;
}