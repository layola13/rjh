/**
 * Progress 进度条组件类型定义
 * 用于展示操作进度，支持线形、圆形、仪表盘等多种展示形式
 */

import * as React from 'react';

/**
 * 进度条类型
 */
export type ProgressType = 'line' | 'circle' | 'dashboard';

/**
 * 进度条状态
 */
export type ProgressStatus = 'normal' | 'exception' | 'active' | 'success';

/**
 * 进度条尺寸
 */
export type ProgressSize = 'default' | 'small';

/**
 * 线条端点样式
 */
export type StrokeLinecap = 'round' | 'square' | 'butt';

/**
 * 间隙位置（仪表盘模式）
 */
export type GapPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * 文本布局方向
 */
export type Direction = 'ltr' | 'rtl';

/**
 * 成功进度配置
 */
export interface SuccessProps {
  /** 成功进度百分比 */
  percent?: number;
  /** 成功进度条颜色 */
  strokeColor?: string;
}

/**
 * 进度条组件属性
 */
export interface ProgressProps {
  /** 自定义类名前缀 */
  prefixCls?: string;
  
  /** 额外的 CSS 类名 */
  className?: string;
  
  /** 进度条类型 */
  type?: ProgressType;
  
  /** 当前进度百分比 (0-100) */
  percent?: number;
  
  /** 自定义进度文本格式化函数 */
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  
  /** 进度条状态 */
  status?: ProgressStatus;
  
  /** 是否显示进度数值或状态图标 */
  showInfo?: boolean;
  
  /** 进度条线的颜色，支持渐变色 */
  strokeColor?: string | string[] | Record<string, string>;
  
  /** 进度条线的宽度（像素） */
  strokeWidth?: number;
  
  /** 线条端点样式 */
  strokeLinecap?: StrokeLinecap;
  
  /** 未完成部分的颜色 */
  trailColor?: string;
  
  /** 画布宽度（circle/dashboard 类型适用，像素） */
  width?: number;
  
  /** 圆形进度条缺口角度 (0-360) */
  gapDegree?: number;
  
  /** 圆形进度条缺口位置 */
  gapPosition?: GapPosition;
  
  /** 进度条尺寸 */
  size?: ProgressSize;
  
  /** 步骤数（line 类型适用） */
  steps?: number;
  
  /** 成功进度条配置 */
  success?: SuccessProps;
  
  /** 文本方向 */
  direction?: Direction;
  
  /**
   * @deprecated 已废弃，请使用 success.percent 代替
   */
  successPercent?: number;
}

/**
 * 进度条组件
 * 
 * @example
 *