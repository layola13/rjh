/**
 * React组件模块：图标组件包装器
 * 
 * 该模块导出一个使用forwardRef包装的React图标组件，
 * 允许父组件通过ref访问底层DOM元素或组件实例。
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';

/**
 * 图标组件的基础属性接口
 * 
 * @remarks
 * 该接口继承自IconWrapper组件的所有属性，
 * 并自动注入icon属性，因此使用时无需手动传递icon
 */
export interface IconComponentProps extends Omit<IconWrapperProps, 'icon'> {
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标尺寸
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 其他传递给IconWrapper的属性
   */
  [key: string]: unknown;
}

/**
 * IconWrapper组件的完整属性接口
 */
interface IconWrapperProps {
  /**
   * 图标数据对象
   */
  icon: IconData;
  
  /**
   * 其他HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据结构接口
 */
interface IconData {
  /**
   * 图标名称
   */
  name?: string;
  
  /**
   * SVG路径数据
   */
  path?: string;
  
  /**
   * 视图框尺寸
   */
  viewBox?: string;
  
  [key: string]: unknown;
}

/**
 * 图标组件的引用类型
 */
export type IconComponentRef = HTMLElement | null;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 这是一个使用forwardRef包装的函数组件，支持ref转发。
 * 内部使用IconWrapper组件渲染，并自动注入预定义的icon数据。
 * 
 * @example
 *