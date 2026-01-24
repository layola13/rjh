/**
 * React图标组件模块
 * 
 * 该模块导出一个使用forwardRef包装的图标组件，
 * 通过组合基础图标组件和图标数据来实现特定图标的渲染。
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /** 图标尺寸，支持数字或字符串（如 "16px"） */
  size?: number | string;
  
  /** 图标颜色 */
  color?: string;
  
  /** 自定义类名 */
  className?: string;
  
  /** 自定义样式对象 */
  style?: React.CSSProperties;
  
  /** 图标旋转角度 */
  rotate?: number;
  
  /** 是否水平翻转 */
  flip?: boolean;
  
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /** aria-label 用于可访问性 */
  'aria-label'?: string;
  
  /** 图标数据（SVG路径等） */
  icon?: IconDefinition;
  
  /** 其他HTML SVG元素属性 */
  [key: string]: any;
}

/**
 * 图标定义接口
 * 描述图标的SVG路径、viewBox等元数据
 */
export interface IconDefinition {
  /** 图标名称 */
  name: string;
  
  /** SVG viewBox */
  viewBox?: string;
  
  /** SVG路径数据 */
  path: string | string[];
  
  /** 默认宽度 */
  width?: number;
  
  /** 默认高度 */
  height?: number;
}

/**
 * 图标组件属性类型
 * 继承IconBaseProps并添加ref支持
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * 图标组件类型定义
 * 
 * 这是一个使用React.forwardRef包装的组件，
 * 接受IconBaseProps作为属性，并支持ref转发到SVG元素。
 * 
 * @example
 *