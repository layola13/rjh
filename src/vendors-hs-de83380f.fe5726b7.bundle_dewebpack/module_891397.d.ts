/**
 * 图标组件类型定义
 * Module: module_891397
 * Original ID: 891397
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /**
   * 图标尺寸
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * CSS 类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他 SVG 属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 使用 forwardRef 创建的可转发 ref 的 React 组件
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 该组件封装了特定的图标数据，并支持 ref 转发
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;