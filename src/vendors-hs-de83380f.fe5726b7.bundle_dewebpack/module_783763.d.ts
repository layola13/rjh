/**
 * React组件模块 - 图标组件封装
 * 
 * 该模块导出一个使用forwardRef包装的React图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自标准的React组件属性，去除ref相关属性
 */
export interface IconComponentBaseProps extends Omit<ComponentPropsWithoutRef<'svg'>, 'ref'> {
  /**
   * 图标尺寸
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

/**
 * 图标组件属性类型
 * 包含ref转发支持
 */
export type IconComponentProps = IconComponentBaseProps & RefAttributes<SVGSVGElement>;

/**
 * 图标组件类型定义
 * 使用forwardRef包装，支持ref转发到底层SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 该组件通过forwardRef创建，允许父组件访问底层的SVG DOM元素
 * 组件内部将传入的props与默认图标数据合并后渲染
 * 
 * @example
 *