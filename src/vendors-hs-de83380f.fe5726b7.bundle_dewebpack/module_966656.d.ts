/**
 * React图标组件模块
 * 
 * 该模块导出一个React forwardRef组件,用于渲染图标
 * 基于React.createElement和自定义图标数据创建可复用的图标组件
 */

import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承自基础HTML SVG元素属性,同时支持自定义扩展
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸(宽度和高度)
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的标题,用于可访问性
   */
  title?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;
}

/**
 * 图标数据接口
 * 定义图标的SVG路径和元数据
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * SVG视图框属性
   */
  viewBox?: string;
  
  /**
   * SVG路径数据或子元素
   */
  path: string | React.ReactNode;
  
  /**
   * 图标的默认宽度
   */
  width?: number;
  
  /**
   * 图标的默认高度
   */
  height?: number;
}

/**
 * 图标组件类型
 * 
 * 这是一个支持ref转发的React组件
 * 可以接收SVGSVGElement的引用
 * 
 * @example
 *