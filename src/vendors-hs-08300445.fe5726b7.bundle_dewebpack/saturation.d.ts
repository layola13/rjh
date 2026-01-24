import { PureComponent, Component, CSSProperties, MouseEvent, TouchEvent } from 'react';

/**
 * HSL色彩空间表示
 */
export interface HSL {
  /** 色相 (0-360) */
  h: number;
  /** 饱和度 (0-1) */
  s: number;
  /** 亮度 (0-1) */
  l: number;
}

/**
 * HSV色彩空间表示
 */
export interface HSV {
  /** 色相 (0-360) */
  h: number;
  /** 饱和度 (0-1) */
  s: number;
  /** 明度 (0-1) */
  v: number;
}

/**
 * 颜色变化计算结果
 */
export interface ColorChangeData {
  hsl: HSL;
  hsv: HSV;
  hex?: string;
  rgb?: { r: number; g: number; b: number; a?: number };
}

/**
 * 自定义指针组件的Props
 */
export interface CustomPointerProps extends SaturationProps {}

/**
 * 饱和度选择器样式配置
 */
export interface SaturationStyle {
  /** 色彩背景层样式 */
  color?: CSSProperties;
  /** 白色渐变层样式 */
  white?: CSSProperties;
  /** 黑色渐变层样式 */
  black?: CSSProperties;
  /** 指针容器样式 */
  pointer?: CSSProperties;
  /** 指针圆点样式 */
  circle?: CSSProperties;
}

/**
 * 饱和度选择器组件属性
 */
export interface SaturationProps {
  /** HSL色彩值 */
  hsl: HSL;
  /** HSV色彩值 */
  hsv: HSV;
  /** 颜色变化回调 */
  onChange?: (data: ColorChangeData, event: MouseEvent | TouchEvent) => void;
  /** 自定义样式 */
  style?: SaturationStyle;
  /** 边框圆角 */
  radius?: string;
  /** 阴影效果 */
  shadow?: string;
  /** 自定义指针组件 */
  pointer?: React.ComponentType<CustomPointerProps>;
}

/**
 * 饱和度选择器内部状态
 */
interface SaturationState {}

/**
 * 饱和度选择器组件
 * 用于在HSV/HSL色彩空间中调整颜色的饱和度和明度
 * 
 * @example
 *