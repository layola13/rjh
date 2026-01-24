/**
 * 图标组件模块
 * 
 * 该模块导出一个React前向引用（forwardRef）包装的图标组件。
 * 组件基于标准图标组件，通过传递默认图标数据和用户提供的props来渲染。
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /**
   * 图标的尺寸（像素）
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 图标标题，用于可访问性
   */
  title?: string;
  
  /**
   * CSS类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据（SVG路径或配置）
   */
  icon?: unknown;
  
  /**
   * 其他HTML属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件引用类型
 * 通常指向底层的SVG元素
 */
export type IconRef = SVGSVGElement;

/**
 * 完整的图标组件属性类型
 * 包含基础属性和引用属性
 */
export type IconComponentProps = IconBaseProps & RefAttributes<IconRef>;

/**
 * 图标组件类型定义
 * 
 * 这是一个使用React.forwardRef创建的组件，支持：
 * - 转发ref到底层SVG元素
 * - 接收自定义props（通过IconBaseProps扩展）
 * - 自动合并默认图标数据
 * 
 * @example
 *