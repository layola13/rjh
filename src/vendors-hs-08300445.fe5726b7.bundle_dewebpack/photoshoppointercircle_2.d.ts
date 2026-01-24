/**
 * Photoshop风格的圆形指针组件
 * 用于颜色选择器中显示当前选中位置的指针
 */

import React from 'react';

/**
 * HSL颜色模型
 */
interface HSL {
  /** 色相 (Hue): 0-360 */
  h: number;
  /** 饱和度 (Saturation): 0-1 */
  s: number;
  /** 亮度 (Lightness): 0-1 */
  l: number;
}

/**
 * PhotoshopPointerCircle组件的属性
 */
interface PhotoshopPointerCircleProps {
  /** HSL颜色值，用于根据亮度调整指针样式 */
  hsl: HSL;
}

/**
 * 指针样式定义
 */
interface PickerStyle {
  width: string;
  height: string;
  borderRadius: string;
  boxShadow: string;
  transform: string;
}

/**
 * 样式对象结构
 */
interface Styles {
  picker: PickerStyle;
}

/**
 * 样式变体定义
 */
interface StyleVariants {
  default: Styles;
  'black-outline': Partial<Styles>;
}

/**
 * Photoshop风格的圆形颜色选择器指针
 * 
 * @description
 * 渲染一个12x12像素的圆形指针，根据背景亮度自动切换边框颜色：
 * - 当亮度 > 0.5 时使用黑色边框
 * - 当亮度 ≤ 0.5 时使用白色边框
 * 
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *