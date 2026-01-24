/**
 * React图标组件模块
 * 
 * 该模块导出一个使用forwardRef的React组件,用于渲染图标。
 * 组件接收props并将其与默认的图标属性合并后传递给基础图标组件。
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承自SVG元素的所有标准属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸(宽度和高度)
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的笔画宽度
   * @default 2
   */
  strokeWidth?: number | string;
  
  /**
   * 自定义CSS类名
   */
  className?: string;
  
  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;
}

/**
 * 前向引用的图标组件类型
 * 
 * 该组件是一个包装器,它接收IconProps并将其与内部图标数据合并,
 * 然后传递给基础图标渲染组件。支持通过ref访问底层SVG元素。
 * 
 * @example
 *