/**
 * 图标组件模块
 * 该模块导出一个使用 forwardRef 包装的 React 图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他 SVG 属性 */
  [key: string]: any;
}

/**
 * 图标组件的属性类型
 * 继承基础图标属性并添加 ref 支持
 */
export interface IconComponentProps extends IconBaseProps {
  /** 图标数据对象 */
  icon?: IconDefinition;
}

/**
 * 图标定义接口
 * 描述图标的 SVG 路径和元数据
 */
export interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** 图标主题类型 */
  theme?: 'filled' | 'outlined' | 'twotone';
  /** SVG 路径数据或子元素 */
  icon: string | Array<string | [string, Record<string, any>]>;
}

/**
 * 图标组件类型
 * 使用 ForwardRefExoticComponent 包装，支持 ref 转发
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *