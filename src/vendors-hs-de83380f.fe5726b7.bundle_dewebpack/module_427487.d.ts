/**
 * React组件模块 - 图标组件包装器
 * 
 * 该模块导出一个使用forwardRef包装的React组件，用于渲染图标。
 * 组件接收props并将其与默认图标合并后传递给基础图标组件。
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 扩展所有标准的HTML SVG元素属性
 */
export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * 图标的尺寸
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 其他自定义属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 
 * 这是一个通过forwardRef包装的React函数组件，支持ref转发到底层SVG元素
 * 
 * @param props - 组件属性
 * @param ref - 转发的ref引用，指向SVG元素
 * @returns React元素
 * 
 * @example
 *