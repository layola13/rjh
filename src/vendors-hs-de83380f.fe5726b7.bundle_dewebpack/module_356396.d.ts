/**
 * Icon Component Module
 * 
 * 这是一个 React 图标组件,使用 forwardRef 来支持 ref 转发。
 * 该组件包装了一个基础图标组件,并合并了传入的属性。
 * 
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef, ElementType } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconProps extends ComponentPropsWithoutRef<ElementType> {
  /**
   * 图标数据/配置对象
   * 通常包含 SVG 路径、尺寸等图标相关信息
   */
  icon?: unknown;
  
  /**
   * 其他自定义属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 * 通常指向底层的 DOM 元素或组件实例
 */
export type IconRef = HTMLElement | null;

/**
 * 图标组件类型定义
 * 
 * 这是一个使用 forwardRef 创建的 React 组件,支持以下特性:
 * - 接收所有标准 HTML 元素属性
 * - 支持 ref 转发到底层元素
 * - 自动注入默认图标配置
 * 
 * @example
 *