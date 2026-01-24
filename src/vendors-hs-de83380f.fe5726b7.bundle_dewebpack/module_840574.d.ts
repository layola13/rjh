/**
 * Module: module_840574
 * Original ID: 840574
 * 
 * React图标组件模块
 * 导出一个使用forwardRef包装的图标组件
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准的SVG元素属性
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /** 图标的大小，可以是数字（像素）或字符串 */
  size?: number | string;
  /** 图标的颜色 */
  color?: string;
  /** 图标的类名 */
  className?: string;
  /** 图标的样式对象 */
  style?: React.CSSProperties;
  /** 图标的标题，用于无障碍访问 */
  title?: string;
  /** 是否为装饰性图标（影响无障碍属性） */
  decorative?: boolean;
}

/**
 * 图标组件类型
 * 使用forwardRef支持ref转发到底层SVG元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *