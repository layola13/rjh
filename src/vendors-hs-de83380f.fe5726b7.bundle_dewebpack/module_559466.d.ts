/**
 * 图标组件模块
 * 
 * 该模块导出一个基于React的图标组件，使用forwardRef包装以支持ref转发。
 */

import React from 'react';

/**
 * 图标组件的属性接口
 * 
 * @remarks
 * 该接口继承所有标准的SVG元素属性，并可能包含额外的图标特定属性
 */
export interface IconComponentProps extends React.SVGAttributes<SVGElement> {
  /**
   * 图标的尺寸
   * @defaultValue '1em'
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   * @defaultValue 'currentColor'
   */
  color?: string;
  
  /**
   * 图标数据对象
   * @internal
   */
  icon?: IconDefinition;
  
  /**
   * 额外的CSS类名
   */
  className?: string;
  
  /**
   * 内联样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 其他任意HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标定义接口
 * 
 * @remarks
 * 描述图标的SVG路径和元数据
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标主题
   */
  theme?: string;
  
  /**
   * SVG图标内容
   */
  icon: {
    /**
     * 标签名（通常是'svg'）
     */
    tag: string;
    
    /**
     * SVG属性
     */
    attrs: Record<string, string | number>;
    
    /**
     * 子元素
     */
    children: unknown[];
  };
}

/**
 * 图标组件类型
 * 
 * @remarks
 * 使用React.forwardRef创建的组件，支持ref转发到底层SVG元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 这是一个使用forwardRef包装的React组件，可以接收ref并转发到内部的SVG元素。
 * 该组件将传入的props与预定义的图标数据合并后渲染。
 * 
 * @example
 *