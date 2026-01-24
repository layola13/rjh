/**
 * React图标组件模块
 * 
 * 该模块导出一个基于React forwardRef的图标组件，
 * 用于在React应用中渲染可自定义的SVG图标
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承React.SVGProps以支持所有标准SVG属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的标题，用于无障碍访问
   */
  title?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;
}

/**
 * 图标组件类型定义
 * 支持ref转发到底层的SVG元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *