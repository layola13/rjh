/**
 * 图标组件模块
 * 该模块导出一个使用 forwardRef 包装的图标组件
 */

import React from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准的图标属性
 */
interface IconComponentProps {
  /** 图标的类名 */
  className?: string;
  /** 图标的样式 */
  style?: React.CSSProperties;
  /** 图标的尺寸 */
  size?: number | string;
  /** 图标的颜色 */
  color?: string;
  /** 图标的旋转角度 */
  rotate?: number;
  /** 是否启用旋转动画 */
  spin?: boolean;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他任意属性 */
  [key: string]: any;
}

/**
 * 图标定义接口
 * 描述图标的基本结构
 */
interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** 图标主题 */
  theme?: 'filled' | 'outlined' | 'twoTone';
  /** SVG 路径数据 */
  icon: {
    tag: string;
    attrs: Record<string, any>;
    children?: any[];
  };
}

/**
 * 图标组件的 Ref 类型
 */
type IconComponentRef = SVGSVGElement;

/**
 * 图标组件渲染函数
 * @param props - 组件属性
 * @param ref - 转发的 ref 引用
 * @returns React 元素
 */
declare function IconComponent(
  props: IconComponentProps,
  ref: React.Ref<IconComponentRef>
): React.ReactElement;

/**
 * 使用 forwardRef 包装的图标组件
 * 支持 ref 转发到底层 SVG 元素
 */
declare const ForwardedIconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<IconComponentRef>
>;

export default ForwardedIconComponent;

/**
 * 命名导出的图标组件（可选）
 */
export { ForwardedIconComponent as IconComponent };

/**
 * 导出类型定义
 */
export type { IconComponentProps, IconDefinition, IconComponentRef };