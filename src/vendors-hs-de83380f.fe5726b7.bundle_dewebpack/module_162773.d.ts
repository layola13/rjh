/**
 * React组件：图标转发引用组件
 * 
 * 该模块导出一个使用forwardRef包装的React图标组件，
 * 允许父组件访问内部DOM节点的引用。
 */

import type React from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /** 图标的CSS类名 */
  className?: string;
  /** 图标的样式对象 */
  style?: React.CSSProperties;
  /** 图标的颜色 */
  color?: string;
  /** 图标的大小 */
  size?: string | number;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** 其他HTML属性 */
  [key: string]: unknown;
}

/**
 * 图标数据配置接口
 */
export interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** 图标主题 */
  theme?: string;
  /** SVG路径数据或图标内容 */
  icon: string | React.ReactNode;
  /** 其他配置项 */
  [key: string]: unknown;
}

/**
 * 带引用转发的图标组件类型
 * 
 * @template T - DOM元素类型，默认为HTMLSpanElement
 */
export type IconComponent<T = HTMLSpanElement> = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<T>
>;

/**
 * 默认导出的图标组件
 * 
 * 这是一个使用forwardRef创建的React组件，
 * 接收图标属性并转发ref到内部的图标渲染组件。
 * 
 * @example
 *