import React from 'react';
import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * SVG 图标组件的属性接口
 * 继承所有标准 SVG 元素属性
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /** 图标的尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
}

/**
 * 图标包装器组件的属性接口
 */
export interface IconWrapperProps extends IconProps {
  /** 实际的图标 SVG 数据 */
  icon: React.ComponentType<IconProps>;
}

/**
 * 默认图标组件
 * 从外部模块导入的 SVG 图标定义
 */
const defaultIcon: React.ComponentType<IconProps>;

/**
 * 图标包装器组件
 * 用于包装和渲染 SVG 图标，支持 ref 转发
 */
const IconWrapper: React.ComponentType<IconWrapperProps>;

/**
 * 图标组件渲染函数
 * @param props - 图标属性
 * @param ref - React ref 对象
 * @returns 渲染的图标元素
 */
const renderIcon = (
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(IconWrapper, {
    ...props,
    ref,
    icon: defaultIcon
  });
};

/**
 * 导出的图标组件
 * 使用 forwardRef 包装以支持 ref 传递
 */
const IconComponent: ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
> = React.forwardRef(renderIcon);

export default IconComponent;