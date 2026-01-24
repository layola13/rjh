/**
 * 图标组件模块
 * @module IconComponent
 * @description 基于React的图标组件，通过forwardRef支持ref转发
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * @interface IconComponentProps
 * @description 定义图标组件接收的所有属性
 */
export interface IconComponentProps {
  /**
   * 图标名称或标识符
   * @type {string}
   */
  icon?: unknown;
  
  /**
   * 自定义类名
   * @type {string}
   */
  className?: string;
  
  /**
   * 图标尺寸
   * @type {number | string}
   */
  size?: number | string;
  
  /**
   * 图标颜色
   * @type {string}
   */
  color?: string;
  
  /**
   * 其他HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标内部渲染函数
 * @param {IconComponentProps} props - 组件属性
 * @param {React.Ref<unknown>} ref - React ref引用
 * @returns {React.ReactElement} 渲染的React元素
 */
declare function IconComponent(
  props: IconComponentProps,
  ref: React.Ref<unknown>
): React.ReactElement;

/**
 * 导出的图标组件类型
 * @description 使用forwardRef包裹的图标组件，支持ref转发
 */
export type IconForwardRefComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<unknown>
>;

/**
 * 默认导出的图标组件
 * @default
 * @type {IconForwardRefComponent}
 * @example
 *