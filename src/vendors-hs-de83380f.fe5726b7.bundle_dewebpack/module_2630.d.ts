/**
 * 图标组件模块
 * 提供一个基于forwardRef的React图标组件
 */

import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
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
  /** 其他SVG属性 */
  [key: string]: unknown;
}

/**
 * 图标定义接口
 */
export interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** 图标主题 */
  theme?: 'filled' | 'outlined' | 'twoTone';
  /** SVG路径数据 */
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
 * 通用图标组件的属性类型
 */
export interface GenericIconComponentProps extends IconComponentProps {
  /** 图标定义对象 */
  icon: IconDefinition;
}

/**
 * 图标组件类型定义
 * 使用forwardRef包装的React组件，支持ref转发到底层SVG元素
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 该组件是一个包装了特定图标定义的React组件
 * 支持所有标准SVG属性和ref转发
 * 
 * @example
 *