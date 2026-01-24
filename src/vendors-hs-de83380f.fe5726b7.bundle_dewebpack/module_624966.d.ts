/**
 * React图标组件模块
 * 
 * 该模块导出一个带有ref转发功能的React图标组件，
 * 用于渲染特定的图标元素。
 * 
 * @module IconComponent
 * @packageDocumentation
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * SVG路径数据接口
 * 定义SVG图标的路径描述符
 */
interface IconPathData {
  /**
   * SVG路径字符串（d属性）
   */
  path: string;
  /**
   * 可选的填充规则
   */
  fillRule?: 'nonzero' | 'evenodd';
  /**
   * 可选的描边宽度
   */
  strokeWidth?: number;
}

/**
 * 图标组件的基础属性
 */
interface IconComponentBaseProps {
  /**
   * 图标的尺寸（宽度和高度）
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标颜色
   * @default 'currentColor'
   */
  color?: string;
  
  /**
   * CSS类名
   */
  className?: string;
  
  /**
   * 内联样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * ARIA标签，用于无障碍访问
   */
  'aria-label'?: string;
  
  /**
   * 图标标题
   */
  title?: string;
  
  /**
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 鼠标移入事件处理器
   */
  onMouseEnter?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 鼠标移出事件处理器
   */
  onMouseLeave?: (event: React.MouseEvent<SVGSVGElement>) => void;
}

/**
 * 图标组件的所有属性（包括ref）
 */
interface IconComponentProps extends IconComponentBaseProps {
  /**
   * 图标的原始SVG数据
   * 从导入的图标模块中获取
   */
  icon?: IconPathData | IconPathData[];
}

/**
 * 图标组件的Ref类型
 * 引用底层的SVGSVGElement元素
 */
type IconComponentRef = SVGSVGElement;

/**
 * 带有ref转发的图标组件类型
 * 
 * 该组件用于渲染SVG图标，支持自定义尺寸、颜色和其他标准SVG属性。
 * 通过forwardRef实现，允许父组件直接访问底层的SVG元素。
 * 
 * @example
 *