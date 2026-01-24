/**
 * React图标组件模块
 * 
 * 该模块导出一个带有ref转发的React图标组件，基于通用图标包装器实现
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 
 * 定义了图标组件接受的所有可配置属性
 */
export interface IconProps {
  /**
   * 图标的尺寸大小
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | number;

  /**
   * 图标的颜色值
   * 支持CSS颜色值或主题颜色标识
   */
  color?: string;

  /**
   * 自定义类名
   * 用于添加额外的样式类
   */
  className?: string;

  /**
   * 图标的可访问性标签
   * 用于屏幕阅读器等辅助技术
   */
  'aria-label'?: string;

  /**
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;

  /**
   * 内联样式对象
   */
  style?: React.CSSProperties;

  /**
   * 其他任意HTML SVG属性
   */
  [key: string]: unknown;
}

/**
 * 图标的SVG路径数据或配置
 * 
 * 内部使用的图标数据结构
 */
export interface IconDefinition {
  /**
   * SVG路径数据
   */
  path: string | string[];

  /**
   * 视图盒子尺寸
   */
  viewBox?: string;

  /**
   * 图标的宽高比
   */
  aspectRatio?: number;
}

/**
 * 带有ref转发的图标组件类型
 * 
 * 该组件允许父组件通过ref访问底层的SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * 这是一个经过ref转发包装的React函数组件，接受IconProps属性
 * 并将ref传递给内部的SVG元素
 * 
 * @example
 *