/**
 * React组件：图标包装器
 * 
 * 该模块导出一个使用forwardRef包装的图标组件，
 * 将传入的props与默认icon属性合并后传递给基础图标组件。
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的属性接口
 * 继承自基础图标组件的所有props
 */
export interface IconComponentProps extends ComponentPropsWithoutRef<'svg'> {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 图标样式 */
  style?: React.CSSProperties;
  /** 其他SVG属性 */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 使用ForwardRefExoticComponent包装，支持ref转发
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 该组件通过forwardRef创建，允许父组件访问内部的SVG元素引用。
 * 组件会自动将传入的props与预设的icon配置合并。
 * 
 * @example
 *