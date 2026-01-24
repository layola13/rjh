/**
 * 图标组件模块
 * 
 * 该模块导出一个通过 forwardRef 包装的图标组件，
 * 用于渲染特定的图标，支持 ref 转发和属性合并。
 * 
 * @module IconComponent
 */

import React, { ForwardedRef, ReactElement } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /**
   * 图标大小
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 点击事件处理函数
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /**
   * 其他 HTML 属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 * 描述图标的元数据和渲染信息
 */
export interface IconData {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标的 SVG 路径或其他渲染数据
   */
  data: string | object;
  
  /**
   * 图标视图框配置
   */
  viewBox?: string;
}

/**
 * 基础图标组件的属性接口
 */
export interface BaseIconProps extends IconComponentProps {
  /**
   * 图标数据
   */
  icon: IconData;
  
  /**
   * Ref 引用
   */
  ref?: ForwardedRef<HTMLElement>;
}

/**
 * 渲染图标组件
 * 
 * 该函数接收图标属性并返回一个包含图标数据的基础图标组件。
 * 它将传入的属性与图标数据合并，并支持 ref 转发。
 * 
 * @param props - 图标组件属性
 * @param ref - 转发的 ref 引用
 * @returns 渲染后的图标元素
 */
declare function renderIconComponent(
  props: IconComponentProps,
  ref: ForwardedRef<HTMLElement>
): ReactElement;

/**
 * 导出的图标组件
 * 
 * 使用 React.forwardRef 包装的图标组件，支持：
 * - Ref 转发到底层 DOM 元素
 * - 属性合并和传递
 * - 类型安全的属性接口
 * 
 * @example
 *