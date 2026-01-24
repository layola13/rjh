/**
 * Draggable 组件的类型定义
 * 提供可拖拽功能的 React 组件
 */

import React from 'react';

/**
 * 二维坐标位置
 */
export interface Position {
  /** X 轴坐标（像素） */
  x: number;
  /** Y 轴坐标（像素） */
  y: number;
}

/**
 * Draggable 组件的属性接口
 */
export interface DraggableProps {
  /**
   * 子元素内容
   */
  children?: React.ReactNode;

  /**
   * 附加的 CSS 类名
   */
  className?: string;

  /**
   * 点击事件处理器（仅在非拖拽状态下触发）
   */
  onClick?: () => void;

  /**
   * 默认初始位置
   * @default { x: 0, y: 0 }
   */
  defaultPosition?: Position;

  /**
   * 位置变化回调函数
   * @param position - 当前位置坐标
   */
  onPositionChange?: (position: Position) => void;

  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;
}

/**
 * 可拖拽组件
 * 
 * @remarks
 * 该组件允许用户通过鼠标拖拽来移动其包裹的内容。
 * 自动区分点击和拖拽操作，仅在拖拽距离超过阈值时阻止点击事件。
 * 
 * @example
 *