/**
 * 图标组件模块
 * 
 * 该模块导出一个基于forwardRef的React图标组件，
 * 使用指定的图标数据和基础图标组件进行渲染。
 */

import type { Ref, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的基础属性
 */
interface IconBaseProps {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** ARIA标签 */
  'aria-label'?: string;
  /** 其他SVG属性 */
  [key: string]: unknown;
}

/**
 * 图标数据定义
 */
interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** 图标主题 */
  theme?: 'filled' | 'outlined' | 'two-tone';
  /** SVG路径数据或其他图标配置 */
  icon: unknown;
}

/**
 * 图标组件属性类型
 */
type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * 图标组件类型定义
 * 
 * 这是一个支持ref转发的React组件，接收图标属性并渲染为SVG图标。
 */
type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *