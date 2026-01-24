/**
 * Module: module_615759
 * Original ID: 615759
 * 
 * 该模块导出一个使用 forwardRef 包装的 React 图标组件
 */

import type { Ref, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的基础属性接口
 * 继承自标准的 SVG 元素属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸（宽度和高度）
   */
  size?: number | string;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 自定义图标数据
   */
  icon?: unknown;
}

/**
 * 内部渲染函数的属性类型
 */
interface InternalIconComponentProps extends IconProps {
  /**
   * React ref 引用
   */
  ref?: Ref<SVGSVGElement>;
}

/**
 * 图标组件类型定义
 * 使用 forwardRef 创建的可转发 ref 的 React 组件
 */
type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

/**
 * 默认导出的图标组件
 * 
 * @remarks
 * 该组件通过 React.forwardRef 创建，允许父组件访问内部的 SVG 元素引用
 * 
 * @example
 *