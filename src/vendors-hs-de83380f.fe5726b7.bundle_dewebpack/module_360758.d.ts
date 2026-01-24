/**
 * React组件模块 - 图标组件封装
 * 
 * 该模块导出一个转发引用的图标React组件，
 * 使用指定的图标数据并支持自定义属性扩展。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 扩展自标准SVG元素属性
 */
interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸
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
   * 是否启用旋转动画
   */
  spin?: boolean;
}

/**
 * 图标数据结构接口
 * 定义SVG图标的路径和属性
 */
interface IconDefinition {
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
     * SVG标签名
     */
    tag: string;
    
    /**
     * SVG属性
     */
    attrs: Record<string, string | number>;
    
    /**
     * 子元素
     */
    children?: unknown[];
  };
}

/**
 * 图标组件的引用类型
 * 指向底层SVG元素
 */
type IconRef = SVGSVGElement;

/**
 * 图标组件类型定义
 * 
 * 这是一个使用forwardRef包装的React组件，
 * 允许父组件访问内部SVG元素的引用。
 * 
 * @example
 *