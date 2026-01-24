/**
 * 图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自标准SVG元素属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标大小
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * 图标颜色
   * @default 'currentColor'
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
   * 图标旋转角度
   */
  rotate?: number;
  
  /**
   * 是否旋转动画
   */
  spin?: boolean;
}

/**
 * 图标数据接口
 * 定义图标的SVG路径和属性
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标主题类型
   */
  theme?: 'filled' | 'outlined' | 'twotone';
  
  /**
   * SVG图标数据
   */
  icon: {
    /**
     * 图标标签名称
     */
    tag: string;
    
    /**
     * 图标属性
     */
    attrs: Record<string, string | number>;
    
    /**
     * 子元素
     */
    children?: Array<{
      tag: string;
      attrs: Record<string, string | number>;
    }>;
  };
}

/**
 * 图标引用类型
 */
export type IconRef = SVGSVGElement;

/**
 * 图标组件类型
 * 支持ref转发的React组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<IconRef>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *