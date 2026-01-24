/**
 * Hue Slider Component
 * 用于选择颜色色相值的滑块组件
 * @module Hue
 */

import { PureComponent, Component, CSSProperties, ReactElement } from 'react';

/**
 * HSL颜色模型接口
 */
export interface HSL {
  /** 色相值 (0-360) */
  h: number;
  /** 饱和度 (0-1) */
  s: number;
  /** 亮度 (0-1) */
  l: number;
  /** 可选的透明度 (0-1) */
  a?: number;
}

/**
 * 颜色变化事件数据
 */
export interface ColorChangeData {
  /** HSL颜色值 */
  hsl: HSL;
  /** 十六进制颜色值 */
  hex?: string;
  /** RGB颜色值 */
  rgb?: {
    r: number;
    g: number;
    b: number;
    a?: number;
  };
  /** 原始事件对象 */
  source?: string;
}

/**
 * Hue组件的属性接口
 */
export interface HueProps {
  /** 当前HSL颜色值 */
  hsl: HSL;
  
  /** 滑块方向，默认为 'horizontal' */
  direction?: 'horizontal' | 'vertical';
  
  /** 颜色变化时的回调函数 */
  onChange?: (color: ColorChangeData, event: MouseEvent | TouchEvent) => void;
  
  /** 自定义指针组件 */
  pointer?: React.ComponentType<HueProps>;
  
  /** 边框圆角，例如 '2px' */
  radius?: string;
  
  /** 阴影样式，例如 'inset 0 0 0 1px rgba(0,0,0,.15)' */
  shadow?: string;
}

/**
 * Hue组件的状态接口（内部使用）
 */
interface HueState {
  // 该组件无需维护状态
}

/**
 * Hue滑块组件
 * 提供水平或垂直方向的色相选择滑块
 * 
 * @example
 *