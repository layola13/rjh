/**
 * 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的 React 图标组件，
 * 允许父组件通过 ref 访问底层 DOM 元素。
 */

import { ForwardRefExoticComponent, RefAttributes, ReactElement } from 'react';

/**
 * 图标组件的基础属性接口
 */
export interface IconBaseProps {
  /** 图标类名 */
  className?: string;
  /** 图标样式 */
  style?: React.CSSProperties;
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 旋转角度 */
  rotate?: number;
  /** 是否旋转动画 */
  spin?: boolean;
  /** 其他 HTML 属性 */
  [key: string]: unknown;
}

/**
 * 图标组件的属性类型
 * 继承自 IconBaseProps 并支持 ref 转发
 */
export interface IconComponentProps extends IconBaseProps {
  /** DOM 元素引用 */
  ref?: React.Ref<HTMLElement>;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个经过 forwardRef 包装的函数组件，支持：
 * - 接收所有标准图标属性
 * - 转发 ref 到底层 DOM 元素
 * - 渲染特定的图标图形
 */
declare const IconComponent: ForwardRefExoticComponent<
  IconBaseProps & RefAttributes<HTMLElement>
>;

export default IconComponent;