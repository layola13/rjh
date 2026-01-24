/**
 * 图标组件类型定义
 * Module: module_955490
 * Original ID: 955490
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * 图标组件的基础属性
 * 继承自 SVG 元素的所有标准属性
 */
export interface IconBaseProps extends SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标的标题，用于无障碍访问
   */
  title?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据对象
   */
  icon?: IconDefinition;
}

/**
 * 图标定义接口
 * 描述图标的 SVG 路径和配置
 */
export interface IconDefinition {
  /**
   * 图标的唯一标识符
   */
  name: string;
  
  /**
   * 图标的 SVG 视图框配置
   */
  viewBox?: string;
  
  /**
   * 图标的 SVG 路径数据
   */
  path: string | string[];
  
  /**
   * 图标的宽度
   */
  width?: number;
  
  /**
   * 图标的高度
   */
  height?: number;
}

/**
 * 图标组件类型
 * 使用 forwardRef 包装的函数组件，支持 ref 转发
 */
type IconComponent = ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *