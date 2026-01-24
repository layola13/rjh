import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Icon组件的属性接口
 * 定义了传递给图标组件的所有可能属性
 */
export interface IconComponentProps {
  /** 图标的CSS类名 */
  className?: string;
  /** 图标的样式对象 */
  style?: React.CSSProperties;
  /** 图标的尺寸 */
  size?: number | string;
  /** 图标的颜色 */
  color?: string;
  /** 图标的旋转角度 */
  rotate?: number;
  /** 图标的自定义属性 */
  [key: string]: any;
}

/**
 * 图标组件的引用类型
 * 通常指向底层的SVG或DOM元素
 */
export type IconComponentRef = HTMLElement | SVGSVGElement;

/**
 * 图标组件类型定义
 * 这是一个使用forwardRef包装的React组件，支持ref转发
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconComponentRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 这是一个转发引用的图标组件，内部使用了：
 * - React.createElement 创建元素
 * - Object.assign/扩展运算符合并属性
 * - forwardRef 支持ref转发到底层DOM元素
 * 
 * @example
 *