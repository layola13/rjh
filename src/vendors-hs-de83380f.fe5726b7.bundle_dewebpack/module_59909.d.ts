import React from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准的 SVG 元素属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /** 图标的类名 */
  className?: string;
  /** 图标的样式对象 */
  style?: React.CSSProperties;
  /** 图标的尺寸（宽度和高度） */
  size?: number | string;
  /** 图标的颜色 */
  color?: string;
  /** 点击事件处理函数 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * 图标组件类型定义
 * 支持 forwardRef 的图标组件
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @description
 * 这是一个基于 React forwardRef 的图标组件，
 * 接收标准的 SVG 属性并支持 ref 转发。
 * 
 * @example
 *