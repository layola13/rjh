/**
 * 图标组件模块
 * 
 * 该模块导出一个使用React.forwardRef包装的图标组件，
 * 该组件基于一个基础图标组件，并传递特定的图标数据。
 * 
 * @module IconComponent
 */

import React from 'react';

/**
 * 图标数据接口
 * 定义图标的基本属性和配置
 */
interface IconData {
  /** 图标的SVG路径数据或其他图标配置 */
  [key: string]: unknown;
}

/**
 * 图标组件的属性接口
 */
interface IconComponentProps {
  /** 图标大小 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** CSS类名 */
  className?: string;
  /** 内联样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** 其他HTML属性 */
  [key: string]: unknown;
}

/**
 * 基础图标组件的属性接口
 * 扩展了IconComponentProps并添加了icon属性
 */
interface BaseIconProps extends IconComponentProps {
  /** 图标数据对象 */
  icon: IconData;
  /** React ref引用 */
  ref?: React.Ref<HTMLElement>;
}

/**
 * 从外部模块导入的图标数据
 */
declare const iconData: IconData;

/**
 * 基础图标组件
 * 用于渲染实际的图标元素
 */
declare const BaseIcon: React.ComponentType<BaseIconProps>;

/**
 * 图标组件的渲染函数
 * 
 * @param props - 图标组件的属性
 * @param ref - 转发的React ref引用
 * @returns 渲染的图标元素
 */
declare function IconComponent(
  props: IconComponentProps,
  ref: React.Ref<HTMLElement>
): React.ReactElement;

/**
 * 使用forwardRef包装的图标组件
 * 
 * 该组件允许父组件通过ref访问底层DOM元素，
 * 同时将所有props和特定的图标数据传递给基础图标组件。
 * 
 * @example
 *