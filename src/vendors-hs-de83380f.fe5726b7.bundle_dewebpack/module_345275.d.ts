import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * 图标组件的基础属性
 * 扩展标准SVG元素属性
 */
export interface IconBaseProps extends SVGAttributes<SVGSVGElement> {
  /**
   * 图标大小
   * @default '1em'
   */
  size?: string | number;
  
  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * 图标标题，用于无障碍访问
   */
  title?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标旋转角度
   */
  rotate?: number;
  
  /**
   * 图标翻转方向
   */
  spin?: boolean;
}

/**
 * 图标组件属性类型
 * 结合基础属性和ref引用
 */
export type IconComponentProps = IconBaseProps & RefAttributes<SVGSVGElement>;

/**
 * 图标组件类型定义
 * 使用forwardRef包装的SVG图标组件，支持ref转发
 * 
 * @example
 *