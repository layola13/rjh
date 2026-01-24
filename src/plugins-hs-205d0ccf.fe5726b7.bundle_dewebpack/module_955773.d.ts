/**
 * 圆形图标组件的类型声明
 * @module RoundIcon
 */

import type React from 'react';
import type { IconType } from './icon-types';

/**
 * 圆形图标组件的属性接口
 */
export interface RoundIconProps {
  /**
   * 点击事件处理函数
   * @default () => {}
   */
  onClick?: () => void;

  /**
   * 自定义样式类名
   * @optional
   */
  className?: string;

  /**
   * 图标类型
   * @required
   */
  type: IconType;

  /**
   * 图标旁边显示的文本内容
   * @optional
   */
  text?: string;
}

/**
 * 圆形图标组件
 * 
 * 渲染一个带有图标和可选文本的圆形容器，支持主题样式和点击交互
 * 
 * @param props - 组件属性
 * @returns React 元素
 * 
 * @example
 *