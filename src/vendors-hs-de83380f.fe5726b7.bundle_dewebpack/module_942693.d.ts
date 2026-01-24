import React, { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
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
  /** 其他HTML属性 */
  [key: string]: unknown;
}

/**
 * 基础图标组件的属性接口
 */
interface BaseIconProps extends IconComponentProps {
  /** 图标的SVG路径或配置 */
  icon: IconDefinition;
  /** DOM引用 */
  ref?: React.Ref<HTMLElement>;
}

/**
 * 图标定义接口
 */
interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** 图标主题 */
  theme?: string;
  /** SVG图标内容 */
  icon: {
    tag: string;
    attrs: Record<string, string | number>;
    children?: unknown[];
  };
}

/**
 * 基础图标组件
 * 用于渲染SVG图标
 */
declare const BaseIconComponent: React.ComponentType<BaseIconProps>;

/**
 * 默认图标定义
 * 包含图标的SVG路径和属性配置
 */
declare const defaultIconDefinition: IconDefinition;

/**
 * 图标组件的渲染函数
 * @param props - 组件属性
 * @param ref - DOM引用
 * @returns React元素
 */
const renderIconComponent = (
  props: IconComponentProps,
  ref: React.Ref<HTMLElement>
): React.ReactElement => {
  return React.createElement(BaseIconComponent, {
    ...props,
    ref,
    icon: defaultIconDefinition,
  });
};

/**
 * 前向引用的图标组件
 * 支持传递ref到底层DOM元素
 */
const ForwardedIconComponent: ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<HTMLElement>
> = forwardRef(renderIconComponent);

export default ForwardedIconComponent;