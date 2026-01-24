/**
 * Swatches 颜色选择器组件的 TypeScript 类型定义
 * @module Swatches
 */

import React from 'react';
import { CSSProperties } from 'react';

/**
 * 颜色变化事件的数据结构
 */
export interface ColorResult {
  /** 十六进制颜色值 */
  hex: string;
  /** 颜色来源标识 */
  source: string;
}

/**
 * 颜色变化事件的回调函数类型
 */
export type ColorChangeHandler = (color: ColorResult, event: React.MouseEvent) => void;

/**
 * 色块悬停事件的回调函数类型
 */
export type SwatchHoverHandler = (color: ColorResult, event: React.MouseEvent) => void;

/**
 * Swatches 组件的样式配置
 */
export interface SwatchesStyles {
  /** 选择器容器样式 */
  picker?: CSSProperties;
  /** 滚动容器样式 */
  overflow?: CSSProperties;
  /** 主体内容区域样式 */
  body?: CSSProperties;
  /** 清除浮动样式 */
  clear?: CSSProperties;
}

/**
 * Swatches 颜色选择器组件的属性
 */
export interface SwatchesProps {
  /** 
   * 选择器宽度
   * @default 320
   */
  width?: string | number;
  
  /** 
   * 选择器高度
   * @default 240
   */
  height?: string | number;
  
  /** 
   * 颜色变化时的回调函数
   */
  onChange?: ColorChangeHandler;
  
  /** 
   * 鼠标悬停在色块上时的回调函数
   */
  onSwatchHover?: SwatchHoverHandler;
  
  /** 
   * 颜色数组，每个子数组代表一行颜色
   * @default 默认包含 Material Design 调色板
   */
  colors?: string[][];
  
  /** 
   * 当前选中的十六进制颜色值
   */
  hex?: string;
  
  /** 
   * 自定义样式对象
   * @default {}
   */
  styles?: SwatchesStyles;
  
  /** 
   * 自定义 CSS 类名
   * @default ""
   */
  className?: string;
}

/**
 * Swatches 颜色选择器组件
 * 提供预设的颜色调色板供用户选择
 */
export declare const Swatches: React.FC<SwatchesProps>;

/**
 * 使用 ColorWrap 高阶组件包装后的 Swatches 组件
 * 这是默认导出，包含了颜色管理的额外功能
 */
declare const SwatchesWithColorWrap: React.ComponentType<SwatchesProps>;

export default SwatchesWithColorWrap;