/**
 * React 图标组件模块
 * 
 * 该模块导出一个使用 forwardRef 包装的图标组件，
 * 支持 ref 转发和自定义属性扩展。
 */

import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准 SVG 元素属性
 */
interface IconComponentProps extends SVGAttributes<SVGSVGElement> {
  /**
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的尺寸（宽度和高度）
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的标题，用于可访问性
   */
  title?: string;
  
  /**
   * 是否旋转图标
   */
  spin?: boolean;
  
  /**
   * 自定义图标数据
   */
  icon?: any;
}

/**
 * 图标组件类型
 * 
 * 这是一个使用 React.forwardRef 创建的组件，
 * 允许父组件通过 ref 访问底层的 SVG 元素。
 * 
 * @example
 *