/**
 * React图标组件模块
 * 使用forwardRef封装的可转发引用的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的基础属性
 * 继承自标准HTML元素属性，具体取决于底层实现
 */
interface IconBaseProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * 图标尺寸
   */
  size?: string | number;
  
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
  
  /**
   * 图标数据（SVG路径或配置）
   */
  icon?: IconDefinition;
}

/**
 * 图标定义接口
 * 描述图标的SVG路径和元数据
 */
interface IconDefinition {
  /**
   * 图标名称
   */
  name?: string;
  
  /**
   * SVG路径数据
   */
  path?: string | string[];
  
  /**
   * 视图框尺寸
   */
  viewBox?: string;
  
  /**
   * 其他SVG属性
   */
  [key: string]: unknown;
}

/**
 * 组件属性类型
 * 排除icon属性，因为它会被内部注入
 */
type ComponentProps = Omit<IconBaseProps, 'icon'>;

/**
 * 带引用转发的图标组件类型
 * 支持通过ref访问底层SVG元素
 */
type IconComponent = ForwardRefExoticComponent<
  ComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 该组件使用React.forwardRef实现引用转发，
 * 允许父组件直接访问内部的SVG元素。
 * 图标数据通过内部导入自动注入，无需手动传递。
 * 
 * @example
 *