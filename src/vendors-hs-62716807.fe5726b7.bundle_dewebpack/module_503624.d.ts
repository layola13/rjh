/**
 * Steps 进度条组件类型定义
 * Module: module_503624
 * Original ID: 503624
 */

import React from 'react';

/**
 * 进度条尺寸类型
 */
export type ProgressSize = 'default' | 'small';

/**
 * Steps 进度条组件属性接口
 */
export interface StepsProgressProps {
  /**
   * 进度条尺寸
   * @default 'default'
   */
  size?: ProgressSize;

  /**
   * 步骤总数
   */
  steps: number;

  /**
   * 当前进度百分比 (0-100)
   * @default 0
   */
  percent?: number;

  /**
   * 进度条线宽（高度）
   * @default 8
   */
  strokeWidth?: number;

  /**
   * 激活状态的进度条颜色
   */
  strokeColor?: string;

  /**
   * 未激活状态的进度条颜色（轨道颜色）
   */
  trailColor?: string;

  /**
   * 样式类名前缀
   */
  prefixCls: string;

  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * Steps 进度条组件
 * 
 * 根据步骤数和百分比渲染分段式进度条
 * 
 * @param props - 组件属性
 * @returns React 元素
 * 
 * @example
 *