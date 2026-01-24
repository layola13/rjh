/**
 * 图标组件模块
 * Module ID: 411087
 * 
 * 这是一个基于 forwardRef 的 React 图标组件，
 * 支持转发 ref 到底层 SVG 元素
 */

import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准 SVG 属性
 */
export interface IconComponentProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /** 图标尺寸，默认为 '1em' */
  size?: string | number;
  
  /** 图标颜色，默认继承父元素颜色 */
  color?: string;
  
  /** 图标旋转角度（度数） */
  rotate?: number;
  
  /** 是否水平翻转 */
  flip?: 'horizontal' | 'vertical' | 'both';
  
  /** 额外的类名 */
  className?: string;
  
  /** 内联样式 */
  style?: React.CSSProperties;
}

/**
 * 图标组件类型定义
 * 使用 ForwardRefExoticComponent 支持 ref 转发
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *