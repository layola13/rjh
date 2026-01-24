/**
 * React 图标组件模块
 * 
 * 这是一个使用 forwardRef 包装的 React 图标组件，
 * 支持 ref 转发和自定义属性扩展。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自标准 SVG 元素属性
 */
interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /** 图标尺寸 */
  size?: string | number;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 图标标题，用于无障碍访问 */
  title?: string;
}

/**
 * 图标组件属性接口
 * 扩展了基础图标属性和 ref 引用
 */
interface IconProps extends IconBaseProps {
  /** 图标数据，通常是 SVG 路径数据 */
  icon?: unknown;
}

/**
 * 图标组件类型
 * 使用 ForwardRefExoticComponent 支持 ref 转发
 */
type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *