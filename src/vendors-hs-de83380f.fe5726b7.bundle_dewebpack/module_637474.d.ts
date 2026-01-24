/**
 * React组件：图标包装器组件
 * 
 * 这是一个使用forwardRef的React函数组件，用于渲染图标。
 * 它将接收的props与默认icon属性合并后传递给IconBase组件。
 */

import React from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /**
   * 图标尺寸
   */
  size?: string | number;
  
  /**
   * 图标颜色
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
   * 点击事件处理器
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  
  /**
   * 其他SVG元素属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 */
export interface IconData {
  /**
   * 图标标签名
   */
  tag: string;
  
  /**
   * 图标属性
   */
  attr: Record<string, unknown>;
  
  /**
   * 子元素
   */
  child?: IconData[];
}

/**
 * IconBase组件的属性接口
 */
export interface IconBaseProps extends IconComponentProps {
  /**
   * 图标数据
   */
  icon: IconData;
  
  /**
   * Ref引用
   */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * 图标组件
 * 
 * @param props - 组件属性
 * @param ref - SVG元素的引用
 * @returns React元素
 */
declare const IconComponent: React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

export default IconComponent;