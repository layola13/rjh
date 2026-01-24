/**
 * 图标组件类型定义
 * 
 * 该模块导出一个使用 forwardRef 包装的图标组件，
 * 支持传递 ref 引用和自定义属性。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自标准 SVG 元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   * @default 'default'
   */
  size?: 'small' | 'default' | 'large' | number;

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

  /**
   * 图标数据（SVG 路径或配置）
   */
  icon?: unknown;

  /**
   * 其他透传属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 
 * 一个使用 React.forwardRef 创建的图标组件，
 * 支持 ref 转发到内部 SVG 元素。
 * 
 * @example
 *