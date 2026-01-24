/**
 * 图标组件模块
 * 
 * 该模块导出一个基于React的图标组件，使用forwardRef支持ref转发。
 * 组件通过组合基础图标组件和特定图标数据来创建可复用的图标实例。
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /**
   * 图标的尺寸（像素或CSS单位）
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的旋转角度（度数）
   */
  rotate?: number;
  
  /**
   * CSS类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他SVG元素属性
   */
  [key: string]: unknown;
}

/**
 * 图标定义接口
 * 包含图标的SVG路径数据和视图框配置
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
     * 图标标签（通常为'svg'）
     */
    tag: string;
    
    /**
     * SVG属性（如viewBox）
     */
    attrs: Record<string, string | number>;
    
    /**
     * 子元素（路径等）
     */
    children: Array<{
      tag: string;
      attrs: Record<string, string | number>;
    }>;
  };
}

/**
 * 图标组件类型
 * 
 * 这是一个使用forwardRef创建的React组件，支持ref转发到底层SVG元素。
 * 组件接受IconBaseProps类型的属性，并返回一个ReactElement。
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * 导出的图标组件实例
 * 
 * 该组件通过以下方式创建：
 * 1. 使用forwardRef包装渲染函数以支持ref转发
 * 2. 渲染函数内部将props与预定义的图标数据合并
 * 3. 将合并后的props传递给基础图标组件
 * 4. 返回最终渲染的图标元素
 * 
 * @example
 *