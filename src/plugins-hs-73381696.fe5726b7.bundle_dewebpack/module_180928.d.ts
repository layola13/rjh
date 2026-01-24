import { Component, ReactNode, PointerEvent } from 'react';

/**
 * 拖拽方向枚举
 */
export enum AutoScrollDirection {
  /** 无滚动 */
  None = 0,
  /** 向上滚动 */
  Up = 1,
  /** 向下滚动 */
  Down = 3
}

/**
 * 拖拽组件的属性接口
 */
export interface DragDropListProps {
  /** 拖拽项的选择器 */
  nodeSelector: string;
  
  /** 拖拽手柄的选择器（可选，默认使用 nodeSelector） */
  handleSelector?: string;
  
  /** 需要忽略的元素选择器 */
  ignoreSelector?: string;
  
  /** 组件的 CSS 类名 */
  className?: string;
  
  /** 是否启用自动滚动 */
  enableScroll?: boolean;
  
  /** 自动滚动速度（像素/次） */
  scrollSpeed: number;
  
  /** 拖拽结束回调 */
  onDragEnd?: (fromIndex: number, toIndex: number) => void;
  
  /** 子元素 */
  children?: ReactNode;
}

/**
 * 拖拽组件的状态接口
 */
export interface DragDropListState {
  /** 拖拽起始索引 */
  fromIndex: number;
  
  /** 拖拽目标索引 */
  toIndex: number;
}

/**
 * 拖拽列表组件
 * 
 * 提供拖拽排序功能，支持自动滚动和自定义拖拽手柄
 * 
 * @example
 *