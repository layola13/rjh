/**
 * React图标组件模块
 * 
 * 该模块导出一个基于forwardRef包装的图标组件,
 * 支持ref转发以便父组件能够直接访问底层DOM元素。
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 
 * 继承所有标准React元素属性,并添加图标特定的配置
 */
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 图标的尺寸
   * @default 'default'
   */
  size?: 'small' | 'default' | 'large' | number;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 自定义类名
   */
  className?: string;
  
  /**
   * 自定义样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据对象(从i模块导入)
   */
  icon?: unknown;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个支持ref转发的React组件,允许父组件获取对底层元素的引用
 */
export type IconComponent = ForwardRefExoticComponent<
  IconProps & RefAttributes<HTMLElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *