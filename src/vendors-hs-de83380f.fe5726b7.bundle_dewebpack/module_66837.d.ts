import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准SVG元素的所有属性
 */
interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** 图标大小，可以是数字（像素）或字符串 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * 图标组件类型
 * 使用React.forwardRef包装，支持ref转发到SVG元素
 */
type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 这是一个使用forwardRef创建的React组件，允许父组件通过ref访问底层的SVG元素。
 * 组件接受所有标准SVG属性，并添加了额外的图标特定属性。
 * 
 * @example
 *