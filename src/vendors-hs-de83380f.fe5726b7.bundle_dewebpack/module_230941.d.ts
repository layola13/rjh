import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * SVG图标组件的属性类型
 * 扩展标准SVG元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * 图标组件类型定义
 * 使用forwardRef支持ref转发到SVG元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 这是一个通过forwardRef包装的SVG图标组件，支持所有标准SVG属性
 * 
 * @example
 *