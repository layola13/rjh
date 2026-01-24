/**
 * React组件模块：图标包装器组件
 * 
 * 该模块导出一个使用forwardRef包装的React组件，
 * 用于渲染带有特定图标的组件实例。
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自图标容器组件的所有props
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /**
   * 图标的尺寸
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的旋转角度
   */
  rotate?: number;
  
  /**
   * 是否启用旋转动画
   * @default false
   */
  spin?: boolean;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据对象（内部使用）
   * @internal
   */
  icon?: unknown;
}

/**
 * 图标组件引用类型
 * 通常指向SVG元素
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 完整的图标组件类型定义
 * 使用ForwardRefExoticComponent包装，支持ref转发
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *