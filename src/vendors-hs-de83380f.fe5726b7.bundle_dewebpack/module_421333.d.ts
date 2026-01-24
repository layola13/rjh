/**
 * Module: module_421333
 * Original ID: 421333
 * 
 * 图标组件模块：导出一个基于forwardRef的React图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 其他HTML属性 */
  [key: string]: unknown;
}

/**
 * 图标数据类型
 * 通常包含SVG路径、viewBox等信息
 */
export interface IconData {
  /** SVG内容 */
  content: string;
  /** viewBox属性 */
  viewBox?: string;
  /** 图标名称 */
  name?: string;
}

/**
 * 图标容器组件的属性
 */
export interface IconContainerProps extends IconComponentProps {
  /** 图标数据 */
  icon: IconData;
  /** 转发的ref */
  ref?: React.Ref<HTMLElement>;
}

/**
 * 默认导出：带有ref转发的图标组件
 * 
 * @description
 * 该组件封装了图标的渲染逻辑，支持ref转发以便父组件访问DOM元素。
 * 内部使用IconContainer组件和特定的图标数据来渲染最终的图标。
 * 
 * @example
 *