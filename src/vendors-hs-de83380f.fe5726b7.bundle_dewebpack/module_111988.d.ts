/**
 * 模块标识符: module_111988
 * 原始模块 ID: 111988
 * 
 * React图标组件模块
 * 该模块导出一个使用forwardRef包装的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 扩展标准的SVG元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的自定义类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的尺寸(宽度和高度)
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的标题,用于无障碍访问
   */
  title?: string;
}

/**
 * 图标数据接口
 * 定义图标的路径和属性
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * SVG视图框
   */
  viewBox?: string;
  
  /**
   * SVG路径数据
   */
  path: string | string[];
  
  /**
   * 图标主题
   */
  theme?: 'filled' | 'outlined' | 'twoTone';
}

/**
 * 使用forwardRef包装的图标组件类型
 * 支持ref转发到底层SVG元素
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @description
 * 这是一个React图标组件,使用forwardRef实现ref转发功能。
 * 组件接收IconComponentProps属性,并将ref转发到内部的SVG元素。
 * 
 * @example
 *