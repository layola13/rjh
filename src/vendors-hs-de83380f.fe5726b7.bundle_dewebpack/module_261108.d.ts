/**
 * React图标组件模块
 * 提供一个可转发ref的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承所有标准SVG元素属性
 */
interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /** 图标大小，可以是数字或字符串 */
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
 * 支持ref转发到底层SVG元素
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个使用forwardRef创建的React组件，可以接收ref并转发到内部SVG元素
 * 
 * @example
 *