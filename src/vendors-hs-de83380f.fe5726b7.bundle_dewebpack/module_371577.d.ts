/**
 * React图标组件模块
 * 
 * 该模块导出一个转发引用(forwardRef)的React组件，用于渲染特定图标。
 * 组件支持传递自定义属性并通过ref访问底层DOM元素。
 * 
 * @module IconComponent
 */

import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 
 * @interface IconComponentProps
 * @extends {React.SVGProps<SVGSVGElement>}
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的CSS类名
   */
  className?: string;

  /**
   * 图标的尺寸（宽度和高度）
   */
  size?: number | string;

  /**
   * 图标的颜色
   */
  color?: string;

  /**
   * 图标数据对象（从依赖模块注入）
   */
  icon?: IconData;

  /**
   * 其他任意SVG属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 * 定义图标的SVG路径和元数据
 * 
 * @interface IconData
 */
export interface IconData {
  /**
   * SVG路径数据
   */
  path: string | string[];

  /**
   * 视图盒子（viewBox）配置
   */
  viewBox?: string;

  /**
   * 图标宽度
   */
  width?: number;

  /**
   * 图标高度
   */
  height?: number;
}

/**
 * 图标包装组件的属性接口
 * 用于内部渲染逻辑
 * 
 * @interface IconWrapperProps
 */
interface IconWrapperProps extends IconComponentProps {
  /**
   * React引用对象，用于访问底层SVG元素
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * 图标组件类型
 * 
 * 使用React.forwardRef创建的组件，支持ref转发到底层SVG元素。
 * 该组件接受IconComponentProps作为属性，并返回一个渲染的图标元素。
 * 
 * @type {ForwardRefExoticComponent<IconComponentProps & RefAttributes<SVGSVGElement>>}
 * 
 * @example
 *