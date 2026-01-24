/**
 * React组件模块 - 图标组件包装器
 * 
 * 该模块导出一个使用forwardRef包装的React图标组件。
 * 组件接受标准的图标属性并转发ref引用。
 */

import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /** 图标的CSS类名 */
  className?: string;
  /** 图标的内联样式 */
  style?: React.CSSProperties;
  /** 图标的尺寸（宽度和高度） */
  size?: number | string;
  /** 图标的颜色 */
  color?: string;
  /** 图标的旋转角度 */
  rotate?: number;
  /** 图标的spin动画 */
  spin?: boolean;
  /** 自定义属性 */
  [key: string]: unknown;
}

/**
 * 图标组件的完整属性类型
 * 包含基础属性和ref属性
 */
export type IconComponentProps = PropsWithoutRef<IconBaseProps> & RefAttributes<HTMLElement>;

/**
 * 导出的图标组件类型
 * 使用forwardRef包装，支持ref转发
 */
export type IconComponent = ForwardRefExoticComponent<IconComponentProps>;

/**
 * 默认导出：一个React图标组件
 * 
 * @remarks
 * 该组件通过forwardRef创建，可以接收ref引用并转发到底层DOM元素。
 * 组件内部使用特定的图标数据渲染图标内容。
 * 
 * @example
 *