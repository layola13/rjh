/**
 * 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的 React 图标组件，
 * 支持 ref 转发和属性合并。
 */

import * as React from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  /** 图标大小 */
  size?: string | number;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 图标旋转角度 */
  rotate?: number;
  /** 是否启用旋转动画 */
  spin?: boolean;
}

/**
 * 图标数据接口
 */
export interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** 图标主题 */
  theme?: 'filled' | 'outlined' | 'twoTone';
  /** SVG 路径数据 */
  icon: {
    tag: string;
    attrs: Record<string, string>;
    children?: Array<{
      tag: string;
      attrs: Record<string, string>;
    }>;
  };
}

/**
 * 图标组件属性类型
 */
export type IconComponentProps = IconBaseProps;

/**
 * 图标组件类型定义
 * 
 * 这是一个使用 React.forwardRef 创建的组件，
 * 允许父组件访问底层的 SVG 元素引用。
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *