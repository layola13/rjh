/**
 * 图标组件模块
 * 
 * 该模块导出一个基于 forwardRef 的 React 图标组件，
 * 通过组合基础图标组件和特定图标数据创建可复用的图标元素。
 * 
 * @module IconComponent
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement, Ref } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /**
   * 图标尺寸
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
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他 SVG 元素属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据结构接口
 * 定义图标的 SVG 路径和元数据
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标主题
   */
  theme?: 'filled' | 'outlined' | 'twoTone';
  
  /**
   * SVG 图标数据
   */
  icon: {
    /**
     * 图标标签（通常为 'svg'）
     */
    tag: string;
    
    /**
     * SVG 属性
     */
    attrs: Record<string, string | number>;
    
    /**
     * SVG 子元素
     */
    children: Array<{
      tag: string;
      attrs: Record<string, string | number>;
    }>;
  };
}

/**
 * 图标组件的 Props 类型
 * 继承基础属性和 ref 属性
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * 图标组件类型定义
 * 使用 ForwardRefExoticComponent 包装以支持 ref 转发
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * 默认导出的图标组件
 * 
 * 这是一个支持 ref 转发的 React 组件，用于渲染特定的图标。
 * 组件内部将传入的 props 与预定义的图标数据合并，
 * 并通过基础图标组件进行渲染。
 * 
 * @example
 *