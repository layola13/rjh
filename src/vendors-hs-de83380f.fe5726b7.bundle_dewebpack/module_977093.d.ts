/**
 * 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的 React 图标组件
 * 可以接收 ref 并转发到底层的图标实现
 */

import { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承自底层图标组件的所有可用属性
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
  /** 鼠标移入事件处理器 */
  onMouseEnter?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 鼠标移出事件处理器 */
  onMouseLeave?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 图标旋转角度 */
  rotate?: number;
  /** 是否启用旋转动画 */
  spin?: boolean;
  /** ARIA 标签 */
  'aria-label'?: string;
  /** 图标的可访问性标题 */
  title?: string;
  [key: string]: any;
}

/**
 * 可转发 ref 的图标组件类型
 * 
 * @example
 *