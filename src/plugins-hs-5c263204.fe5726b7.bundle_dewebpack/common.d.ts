import React from 'react';

/**
 * 矩形区域坐标信息
 */
export interface Rect {
  /** 左边距离（px） */
  left: number;
  /** 上边距离（px） */
  top: number;
  /** 宽度（px） */
  width: number;
  /** 高度（px） */
  height: number;
}

/**
 * 弹窗位置枚举
 */
export type PopupPlacement = 
  | 'top' 
  | 'bottom' 
  | 'left' 
  | 'right' 
  | 'top-start' 
  | 'top-end' 
  | 'bottom-start' 
  | 'bottom-end';

/**
 * 提示类型
 */
export type TipType = 'popup' | 'tooltip';

/**
 * 提示配置信息
 */
export interface Tip {
  /** 提示类型，默认为 'popup' */
  type?: TipType;
  /** 目标元素是否可点击 */
  targetEnableClick?: boolean;
  /** 工具提示的额外配置（当 type 为 'tooltip' 时使用） */
  [key: string]: unknown;
}

/**
 * 遮罩层属性
 */
export interface MaskProps {
  /** 矩形区域或 'all' 表示全屏遮罩 */
  rect: Rect | 'all';
}

/**
 * Common 组件属性
 */
export interface CommonProps {
  /** 高亮显示的矩形区域 */
  rect: Rect;
  /** 弹窗内容（React 节点） */
  popup: React.ReactNode;
  /** 弹窗位置 */
  popupPlacement: PopupPlacement;
  /** 提示配置 */
  tip: Tip;
}

/**
 * 工具提示包装器属性
 */
export interface ToolTipWrapperProps {
  /** 提示配置 */
  tip: Tip;
}

/**
 * 新手引导通用组件
 * 
 * 提供高亮区域、遮罩层和弹窗/工具提示的完整新手引导解决方案
 * 
 * @param props - 组件属性
 * @returns 新手引导 UI 组件
 * 
 * @example
 *