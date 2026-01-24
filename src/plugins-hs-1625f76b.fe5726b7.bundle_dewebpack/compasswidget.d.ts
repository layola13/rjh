import { Component, CSSProperties, MouseEvent } from 'react';

/**
 * 2D 坐标点
 */
interface Point {
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
}

/**
 * 位置配置
 */
interface Position {
  /** 距离顶部的像素值 */
  top: number;
  /** 距离左侧的像素值 */
  left: number;
}

/**
 * CompassWidget 组件的属性
 */
export interface CompassWidgetProps {
  /** 初始旋转角度 (0-360°) */
  degree?: number;
  /** 拖拽停止时的回调函数 */
  onDragStop: (degree: number) => void;
}

/**
 * CompassWidget 组件的状态
 */
interface CompassWidgetState {
  /** 当前旋转角度 (0-360°) */
  degree: number;
  /** 是否处于激活状态（鼠标悬停在指南针图标上） */
  active: boolean;
  /** 是否正在拖拽 */
  dragging: boolean;
  /** 是否显示组件 */
  show: boolean;
  /** 鼠标是否悬停在整个组件上 */
  isMouseOver: boolean;
}

/**
 * jQuery 拖拽事件对象
 */
interface DragEvent {
  /** 鼠标客户端 X 坐标 */
  clientX: number;
  /** 鼠标客户端 Y 坐标 */
  clientY: number;
}

/**
 * jQuery UI 拖拽位置信息
 */
interface DragUIPosition {
  position: {
    /** 元素顶部位置 */
    top: number;
    /** 元素左侧位置 */
    left: number;
  };
}

/**
 * 指南针小部件组件
 * 
 * 提供可拖拽旋转的指南针控件，用于设置旋转角度。
 * 
 * @example
 *