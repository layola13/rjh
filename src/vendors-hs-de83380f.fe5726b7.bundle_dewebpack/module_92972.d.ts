/**
 * React组件类型定义
 * 一个使用forwardRef包装的图标组件
 */

import type { Ref, ReactElement, ForwardRefExoticComponent, RefAttributes } from 'react';

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
  /** 其他HTML SVG属性 */
  [key: string]: unknown;
}

/**
 * 图标定义数据接口
 */
export interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** 图标主题 */
  theme?: 'filled' | 'outlined' | 'two-tone';
  /** SVG路径数据 */
  icon: {
    tag: string;
    attrs: Record<string, string | number>;
    children?: unknown[];
  };
}

/**
 * 图标组件渲染函数
 * @param props - 组件属性
 * @param ref - React ref引用
 * @returns 渲染的图标元素
 */
declare function IconComponent(
  props: IconComponentProps,
  ref: Ref<SVGSVGElement>
): ReactElement;

/**
 * 导出的图标组件类型
 * 使用forwardRef包装以支持ref转发
 */
type IconComponentType = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 */
declare const IconForwardRefComponent: IconComponentType;

export default IconForwardRefComponent;