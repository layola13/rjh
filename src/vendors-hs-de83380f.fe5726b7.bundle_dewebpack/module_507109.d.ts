/**
 * 图标组件模块
 * 
 * 这是一个通过 forwardRef 包装的 React 图标组件,
 * 支持 ref 转发并结合了默认图标配置。
 */

import type { Ref, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的基础属性接口
 * 扩展自通用的 SVG 元素属性
 */
export interface IconBaseProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 图标尺寸
   */
  size?: string | number;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据配置
   */
  icon?: IconDefinition;
  
  /**
   * 其他扩展属性
   */
  [key: string]: unknown;
}

/**
 * 图标定义结构
 * 描述图标的元数据和路径信息
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标主题或风格
   */
  theme?: string;
  
  /**
   * SVG 路径数据
   */
  icon: [number, number, string[], string, string | string[]];
  
  /**
   * 其他图标属性
   */
  [key: string]: unknown;
}

/**
 * 图标组件类型
 * 支持 ref 转发的 React 函数组件
 */
export type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *