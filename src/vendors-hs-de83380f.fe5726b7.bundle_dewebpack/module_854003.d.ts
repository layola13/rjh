/**
 * Module: module_854003
 * Original ID: 854003
 * 
 * React图标组件模块
 * 导出一个使用forwardRef包装的图标组件，支持ref转发
 */

import React from 'react';

/**
 * 图标组件的属性接口
 * 继承自IconWrapper组件的所有props
 */
export interface IconComponentProps {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** CSS类名 */
  className?: string;
  /** 内联样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他HTML属性 */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 * 定义SVG图标的路径和视图框等信息
 */
export interface IconData {
  /** SVG路径数据 */
  path?: string | string[];
  /** 视图框尺寸 */
  viewBox?: string;
  /** 图标宽度 */
  width?: number;
  /** 图标高度 */
  height?: number;
}

/**
 * 图标包装器组件的属性接口
 */
export interface IconWrapperProps extends IconComponentProps {
  /** 图标数据对象 */
  icon: IconData;
  /** 转发的ref引用 */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * 创建图标组件的渲染函数
 * 
 * @param props - 组件属性
 * @param ref - 转发的ref引用
 * @returns 渲染的图标元素
 */
declare function renderIconComponent(
  props: IconComponentProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement;

/**
 * 使用forwardRef包装的图标组件
 * 支持ref转发到内部SVG元素
 * 
 * @example
 *