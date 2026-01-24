/**
 * 图标组件模块
 * 
 * 该模块导出一个经过forwardRef包装的React图标组件，
 * 允许父组件通过ref访问底层DOM元素。
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 
 * @template T - HTML元素类型
 */
export interface IconComponentProps<T = HTMLElement> extends React.HTMLAttributes<T> {
  /**
   * 图标名称或配置
   */
  icon?: unknown;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 其他任意HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个支持ref转发的React函数组件，可以接收所有标准HTML属性。
 * 
 * @example
 *