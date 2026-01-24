/**
 * React 图标组件模块
 * 
 * 该模块导出一个 forwardRef 包装的图标组件，支持 ref 转发功能。
 * 组件内部使用图标配置数据渲染特定的图标。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 扩展自标准的 SVG 元素属性
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸
   * @default '1em'
   */
  size?: string | number;

  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string;

  /**
   * 图标标题，用于无障碍访问
   */
  title?: string;

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
 * 
 * 使用 forwardRef 包装的函数组件，支持将 ref 转发到内部的 SVG 元素。
 * 可以接收所有标准的 SVG 属性以及自定义的图标属性。
 * 
 * @example
 *