/**
 * 模块：module_190157
 * 原始 ID: 190157
 * 
 * 这是一个React图标组件的类型定义文件
 * 导出一个使用forwardRef包装的图标组件，支持ref转发
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准SVG元素属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸
   * @default 默认尺寸由主题或样式定义
   */
  size?: string | number;
  
  /**
   * 图标颜色
   * @default 继承当前文本颜色
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

/**
 * 带ref转发的图标组件类型
 * 允许父组件通过ref访问底层的SVG元素
 */
type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *