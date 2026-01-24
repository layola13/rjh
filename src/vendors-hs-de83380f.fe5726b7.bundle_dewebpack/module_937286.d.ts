/**
 * 图标组件模块
 * Module ID: 937286
 * 
 * 该模块导出一个使用 forwardRef 封装的 React 图标组件。
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承标准的 SVG 元素属性
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
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 其他任意属性
   */
  [key: string]: any;
}

/**
 * 图标组件类型定义
 * 使用 forwardRef 包装的函数组件，支持 ref 转发到底层 SVG 元素
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;