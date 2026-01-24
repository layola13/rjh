/**
 * 图标组件模块
 * 
 * 这是一个React图标组件的声明文件，基于React.forwardRef实现。
 * 该组件通过包装一个基础图标组件来创建特定的图标实例。
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的基础属性接口
 * 
 * 定义图标组件可接受的所有props，通常包括：
 * - className: 自定义CSS类名
 * - style: 内联样式对象
 * - size: 图标尺寸（number或string）
 * - color: 图标颜色
 * - onClick: 点击事件处理器
 * 等其他SVG元素支持的属性
 */
export interface IconProps extends React.SVGAttributes<SVGElement> {
  /**
   * 图标尺寸
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标颜色
   * @default "currentColor"
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
}

/**
 * 图标组件Ref类型
 * 
 * 指向实际的SVG元素引用
 */
export type IconRef = SVGSVGElement;

/**
 * 完整的图标组件类型
 * 
 * 一个使用forwardRef包装的React组件，支持ref转发到内部SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<IconRef>>;

/**
 * 默认导出的图标组件
 * 
 * 这是一个经过forwardRef包装的函数组件，允许父组件通过ref访问底层SVG元素。
 * 组件内部将传入的props与预定义的icon数据合并后渲染。
 * 
 * @example
 *