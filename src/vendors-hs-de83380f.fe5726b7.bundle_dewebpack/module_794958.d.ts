/**
 * React 图标组件模块
 * 该模块导出一个带有 ref 转发功能的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自 SVG 元素的所有标准属性
 */
export interface IconComponentProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据（SVG 路径或配置）
   */
  icon?: IconDefinition;
}

/**
 * 图标定义接口
 * 描述图标的 SVG 路径和元数据
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标主题（outlined, filled, two-tone 等）
   */
  theme?: string;
  
  /**
   * SVG 路径数据
   */
  icon: {
    tag: string;
    attrs: Record<string, string | number>;
    children?: Array<{
      tag: string;
      attrs: Record<string, string | number>;
    }>;
  };
}

/**
 * 图标组件类型
 * 使用 forwardRef 包装的 React 组件，支持 ref 转发到 SVG 元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *