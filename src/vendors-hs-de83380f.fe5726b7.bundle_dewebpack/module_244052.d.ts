/**
 * 图标组件模块
 * 基于React.forwardRef实现的可转发引用的图标组件
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /** 图标的尺寸 */
  size?: number | string;
  /** 图标的颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他SVG元素属性 */
  [key: string]: any;
}

/**
 * 图标数据接口
 * 包含图标的SVG路径和其他元数据
 */
export interface IconDefinition {
  /** 图标名称 */
  name?: string;
  /** 图标主题 */
  theme?: 'filled' | 'outlined' | 'two-tone';
  /** SVG图标数据 */
  icon: React.ReactNode | string;
  /** 图标的viewBox属性 */
  viewBox?: string;
}

/**
 * 图标基础组件的属性接口
 * 扩展了IconComponentProps并添加了图标定义
 */
export interface IconBaseProps extends IconComponentProps {
  /** 图标定义对象 */
  icon: IconDefinition;
  /** DOM引用 */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * 默认导出的图标组件
 * 使用React.forwardRef创建，支持引用转发
 * 
 * @param props - 图标组件属性
 * @param ref - 转发的引用对象
 * @returns React元素
 * 
 * @example
 *