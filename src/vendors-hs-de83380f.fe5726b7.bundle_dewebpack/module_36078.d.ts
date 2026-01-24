import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承标准 SVG 元素的所有属性
 */
interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标大小
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
}

/**
 * 图标组件类型
 * 使用 forwardRef 包装，支持 ref 转发
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 这是一个经过 forwardRef 包装的 SVG 图标组件，
 * 支持所有标准 SVG 属性和 ref 转发功能
 * 
 * @example
 *