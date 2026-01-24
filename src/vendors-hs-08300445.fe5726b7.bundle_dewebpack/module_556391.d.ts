/**
 * 粘性滚动条组件模块
 * 用于在表格或可滚动容器底部显示一个粘性的水平滚动条
 */

import type { Context, RefObject, CSSProperties, MouseEvent } from 'react';

/**
 * 滚动事件回调参数
 */
interface ScrollEventData {
  /** 水平滚动位置(像素) */
  scrollLeft: number;
}

/**
 * 布局状态
 */
interface LayoutState {
  /** 当前水平滚动位置(像素) */
  scrollLeft: number;
  /** 是否隐藏滚动条 */
  isHiddenScrollBar: boolean;
}

/**
 * 鼠标拖动状态
 */
interface DragState {
  /** 鼠标起始位置与滚动条位置的偏移量 */
  delta: number;
  /** 鼠标上一次的X坐标 */
  x: number;
}

/**
 * 粘性滚动条组件属性
 */
export interface StickyScrollBarProps {
  /** 滚动体DOM引用 */
  scrollBodyRef: RefObject<HTMLElement>;
  
  /** 滚动事件回调函数 */
  onScroll: (data: ScrollEventData) => void;
  
  /** 滚动偏移量(像素),用于调整滚动条位置 */
  offsetScroll: number;
  
  /** 滚动容器元素,可以是窗口或特定DOM元素 */
  container: Window | HTMLElement;
}

/**
 * 粘性滚动条组件暴露的方法
 */
export interface StickyScrollBarHandle {
  /** 
   * 设置滚动条的水平滚动位置
   * @param scrollLeft - 目标滚动位置(像素)
   */
  setScrollLeft(scrollLeft: number): void;
}

/**
 * 表格配置上下文类型
 */
interface TableContextValue {
  /** CSS类名前缀 */
  prefixCls: string;
}

/**
 * 粘性滚动条组件
 * 
 * @description
 * 当表格或可滚动容器的内容宽度超过可视区域时,在底部显示一个粘性的水平滚动条。
 * 支持鼠标拖动滚动,并能根据容器的可见性自动显示/隐藏。
 * 
 * @example
 *