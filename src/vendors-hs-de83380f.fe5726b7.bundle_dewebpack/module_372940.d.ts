/**
 * 图标组件模块
 * 基于 forwardRef 封装的可复用图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /**
   * 图标类名
   */
  className?: string;
  
  /**
   * 图标样式
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
   * 图标旋转角度
   */
  rotate?: number;
  
  /**
   * 是否启用旋转动画
   */
  spin?: boolean;
  
  /**
   * 其他HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件属性类型
 */
export type IconComponentProps = IconBaseProps & RefAttributes<IconRef>;

/**
 * 导出的图标组件类型
 * 使用 forwardRef 创建的可转发引用的图标组件
 */
declare const IconComponent: ForwardRefExoticComponent<IconComponentProps>;

export default IconComponent;