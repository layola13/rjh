/**
 * React组件模块 - Icon组件包装器
 * 
 * 此模块导出一个使用forwardRef包装的React图标组件，
 * 支持ref转发和属性合并功能。
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * 图标组件的基础属性接口
 * 
 * @remarks
 * 这些属性会与默认图标配置合并
 */
export interface IconComponentProps {
  /**
   * 图标数据对象，包含SVG路径、尺寸等信息
   */
  icon?: IconData;
  
  /**
   * 自定义CSS类名
   */
  className?: string;
  
  /**
   * 内联样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标尺寸
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 其他HTML属性
   */
  [key: string]: any;
}

/**
 * 图标数据结构
 * 
 * @remarks
 * 定义了图标的基本元数据和渲染信息
 */
export interface IconData {
  /**
   * 图标名称或唯一标识符
   */
  name?: string;
  
  /**
   * SVG路径数据
   */
  path?: string | string[];
  
  /**
   * 视图盒子尺寸
   */
  viewBox?: string;
  
  /**
   * 默认宽度
   */
  width?: number;
  
  /**
   * 默认高度
   */
  height?: number;
}

/**
 * 包装后的图标组件类型
 * 
 * @remarks
 * 使用forwardRef包装，支持ref转发到底层DOM元素
 */
export type IconComponent = ForwardRefExoticComponent<
  PropsWithoutRef<IconComponentProps> & RefAttributes<HTMLElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *