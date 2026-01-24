import React from 'react';
import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/**
 * SVG 图标组件的属性接口
 * 扩展标准 SVG 元素属性
 */
interface IconProps extends SVGProps<SVGSVGElement> {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
}

/**
 * 图标数据接口
 * 包含 SVG 路径和视图框配置
 */
interface IconData {
  /** SVG 路径数据 */
  path: string | string[];
  /** 视图框配置 */
  viewBox?: string;
  /** 默认尺寸 */
  defaultSize?: number;
}

/**
 * 基础图标组件属性
 */
interface BaseIconComponentProps extends IconProps {
  /** 图标数据对象 */
  icon: IconData;
  /** DOM ref 引用 */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * 图标组件类型定义
 */
type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

/**
 * 从外部模块导入的图标数据
 * 该数据定义了图标的 SVG 路径和配置
 */
declare const iconData: IconData;

/**
 * 基础图标容器组件
 * 用于渲染 SVG 图标
 */
declare const BaseIconComponent: React.FC<BaseIconComponentProps>;

/**
 * 图标渲染函数
 * 
 * @param props - 图标组件属性
 * @param ref - SVG 元素的 ref 引用
 * @returns 渲染的图标元素
 */
const renderIcon = (
  props: IconProps,
  ref: React.Ref<SVGSVGElement>
): React.ReactElement => {
  return React.createElement(BaseIconComponent, {
    ...props,
    ref,
    icon: iconData,
  });
};

/**
 * 图标组件
 * 
 * 这是一个 forwardRef 包装的 SVG 图标组件，支持：
 * - ref 转发到底层 SVG 元素
 * - 完整的 SVG 属性支持
 * - 自定义尺寸和颜色
 * 
 * @example
 *