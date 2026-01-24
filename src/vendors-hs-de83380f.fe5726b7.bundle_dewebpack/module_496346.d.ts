/**
 * 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的 React 图标组件
 * 用于渲染特定的图标，支持 ref 转发
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承标准的 SVG 元素属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   */
  size?: number | string;
  
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据配置
   * @internal
   */
  icon?: IconDefinition;
}

/**
 * 图标定义接口
 * 描述图标的元数据和 SVG 路径信息
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
   * SVG 视图框配置
   */
  viewBox?: string;
  
  /**
   * SVG 路径数据
   */
  icon: ((primaryColor: string, secondaryColor?: string) => React.ReactNode) | React.ReactNode;
}

/**
 * 图标组件类型
 * 使用 forwardRef 包装，支持 ref 转发到底层 SVG 元素
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *