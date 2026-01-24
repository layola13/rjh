/**
 * 图标组件模块
 * @module IconComponent
 */

import React from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /** 图标的大小 */
  size?: number | string;
  /** 图标的颜色 */
  color?: string;
  /** 图标的类名 */
  className?: string;
  /** 图标的样式 */
  style?: React.CSSProperties;
  /** 点击事件处理函数 */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** 其他HTML属性 */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 */
export interface IconData {
  /** 图标的SVG路径数据 */
  path?: string;
  /** 图标的视图框尺寸 */
  viewBox?: string;
  /** 图标的宽度 */
  width?: number;
  /** 图标的高度 */
  height?: number;
  /** 其他图标属性 */
  [key: string]: unknown;
}

/**
 * 图标容器组件的属性接口
 */
export interface IconContainerProps extends IconComponentProps {
  /** 图标数据 */
  icon: IconData;
  /** React ref引用 */
  ref?: React.Ref<HTMLElement>;
}

/**
 * 创建图标组件的渲染函数
 * @param props - 图标组件的属性
 * @param ref - React forwarded ref
 * @returns 渲染的图标元素
 */
declare function renderIconComponent(
  props: IconComponentProps,
  ref: React.Ref<HTMLElement>
): React.ReactElement;

/**
 * 图标组件
 * 支持通过ref转发访问底层DOM元素
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<HTMLElement>
>;

export default IconComponent;