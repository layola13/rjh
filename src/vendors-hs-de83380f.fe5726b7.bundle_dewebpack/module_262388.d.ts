/**
 * 图标组件模块
 * 基于 React.forwardRef 实现的可转发引用的图标组件
 * @module IconComponent
 */

import React from 'react';

/**
 * 图标的基础属性接口
 */
interface IconBaseProps {
  /** 图标大小 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 鼠标悬停事件处理器 */
  onMouseEnter?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 鼠标离开事件处理器 */
  onMouseLeave?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * 图标组件的属性接口
 * 扩展了基础图标属性和所有SVG元素的标准属性
 */
export interface IconComponentProps extends IconBaseProps, Omit<React.SVGProps<SVGSVGElement>, keyof IconBaseProps> {
  /** 图标数据对象 */
  icon?: IconData;
}

/**
 * 图标数据结构接口
 */
interface IconData {
  /** SVG路径数据 */
  path?: string | string[];
  /** 视图盒子 */
  viewBox?: string;
  /** 图标宽度 */
  width?: number;
  /** 图标高度 */
  height?: number;
}

/**
 * 图标包装组件的属性接口
 */
interface IconWrapperProps extends IconComponentProps {
  /** 转发的引用对象 */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * 图标组件类型定义
 * 支持引用转发的React组件
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 创建图标组件的渲染函数
 * @param props - 图标组件属性
 * @param ref - 转发的引用对象
 * @returns 渲染后的图标元素
 */
declare function renderIconComponent(
  props: IconComponentProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement;

/**
 * 默认导出的图标组件
 * 使用 forwardRef 包装以支持引用转发
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;