/**
 * Module: module_82513
 * Original ID: 82513
 * 
 * React图标组件模块
 * 该模块导出一个使用forwardRef包装的React图标组件
 */

import type React from 'react';

/**
 * 图标组件的属性接口
 * 扩展自React的SVG元素属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸
   */
  size?: number | string;
  
  /**
   * 图标的颜色
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
  
  /**
   * 图标数据（SVG路径或配置）
   */
  icon?: IconData;
}

/**
 * 图标数据类型
 * 可以是字符串（SVG路径）或配置对象
 */
export type IconData = string | {
  /**
   * SVG视图框
   */
  viewBox?: string;
  
  /**
   * SVG路径数据
   */
  path?: string | string[];
  
  /**
   * 图标宽度
   */
  width?: number;
  
  /**
   * 图标高度
   */
  height?: number;
};

/**
 * 图标组件类型
 * 使用forwardRef包装以支持ref转发到底层SVG元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *