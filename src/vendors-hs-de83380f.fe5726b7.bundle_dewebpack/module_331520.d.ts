/**
 * 图标组件模块
 * @module IconComponent
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标属性接口
 * 扩展自标准的SVG元素属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | number;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 图标旋转角度
   */
  rotate?: number;
  
  /**
   * 是否为旋转动画
   * @default false
   */
  spin?: boolean;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

/**
 * 图标定义接口
 * 描述图标的SVG路径和视图框配置
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标主题类型
   */
  theme?: 'filled' | 'outlined' | 'twoTone';
  
  /**
   * SVG图标数据
   */
  icon: {
    /**
     * 图标标签
     */
    tag: string;
    
    /**
     * 图标属性
     */
    attrs: {
      viewBox: string;
      [key: string]: unknown;
    };
    
    /**
     * 图标子元素
     */
    children: Array<{
      tag: string;
      attrs: Record<string, unknown>;
    }>;
  };
}

/**
 * 图标组件引用类型
 */
export type IconComponentRef = SVGSVGElement;

/**
 * 图标组件类型
 * 
 * @description
 * 通过forwardRef包装的图标组件，支持ref转发到底层SVG元素
 * 
 * @example
 *