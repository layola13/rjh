/**
 * React组件：图标组件的转发引用封装
 * 
 * 该模块导出一个使用forwardRef包装的图标组件，
 * 允许父组件通过ref访问底层DOM元素。
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** aria-label用于无障碍访问 */
  'aria-label'?: string;
  /** 其他HTML SVG属性 */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 * 描述从icon模块导入的图标配置
 */
export interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** SVG路径数据 */
  path: string | string[];
  /** 视图盒子尺寸 */
  viewBox?: string;
  /** 图标属性 */
  attrs?: Record<string, unknown>;
}

/**
 * 组件容器的属性接口
 * 继承IconBaseProps并添加图标定义
 */
export interface IconComponentProps extends IconBaseProps {
  /** 图标定义对象 */
  icon: IconDefinition;
  /** DOM引用 */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * 转发引用的图标组件类型
 * 
 * 该组件接收IconBaseProps作为props，并转发ref到底层SVG元素
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

export default IconComponent;