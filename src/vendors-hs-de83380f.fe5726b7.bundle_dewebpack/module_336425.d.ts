/**
 * React组件模块 - 图标组件封装
 * 
 * 该模块提供了一个基于forwardRef的React图标组件，
 * 支持ref转发和属性合并功能。
 */

import type React from 'react';

/**
 * 图标组件的属性接口
 * 
 * @template T - 组件的props类型
 */
export interface IconComponentProps<T = Record<string, unknown>> extends T {
  /**
   * 图标数据或配置对象
   */
  icon?: unknown;
  
  /**
   * 其他自定义属性
   */
  [key: string]: unknown;
}

/**
 * 转发ref的图标组件类型
 * 
 * @template P - 组件props类型
 * @template T - ref元素类型
 */
export type ForwardRefIconComponent<P = IconComponentProps, T = unknown> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

/**
 * 默认导出的图标组件
 * 
 * 这是一个使用React.forwardRef创建的组件，用于渲染图标。
 * 它会将所有传入的props与内部的icon配置合并，并支持ref转发。
 * 
 * @example
 *