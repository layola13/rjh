/**
 * 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的 React 图标组件，
 * 支持传递 ref 到底层图标实现。
 */

import type { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** CSS 类名 */
  className?: string;
  /** 内联样式 */
  style?: React.CSSProperties;
  /** 旋转角度 */
  rotate?: number;
  /** 是否启用旋转动画 */
  spin?: boolean;
  /** 其他 HTML 属性 */
  [key: string]: unknown;
}

/**
 * 图标组件的 Props 类型
 */
export interface IconComponentProps extends IconBaseProps {
  /** 图标数据配置 */
  icon?: unknown;
  /** 图标引用 */
  ref?: React.Ref<unknown>;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个转发 ref 的函数组件，允许父组件访问底层 DOM 元素或组件实例
 */
export type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<unknown>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *