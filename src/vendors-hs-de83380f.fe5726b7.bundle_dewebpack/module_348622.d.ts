/**
 * 图标组件模块
 * 
 * 该模块导出一个React图标组件,使用forwardRef包装以支持ref转发。
 * 组件内部使用了一个基础图标包装器组件,并传入了图标数据。
 * 
 * @module IconComponent
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 
 * 扩展了所有标准的React组件属性,同时支持自定义图标相关的配置
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的尺寸大小
   */
  size?: string | number;
  
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
   * 其他自定义属性
   */
  [key: string]: unknown;
}

/**
 * 图标数据接口
 * 
 * 定义了图标的内部数据结构,包括SVG路径、视图框等信息
 */
export interface IconData {
  /**
   * SVG图标标签名
   */
  tag: string;
  
  /**
   * 图标属性对象
   */
  attr: {
    /**
     * SVG视图框
     */
    viewBox?: string;
    
    /**
     * 填充颜色
     */
    fill?: string;
    
    /**
     * 其他SVG属性
     */
    [key: string]: unknown;
  };
  
  /**
   * 子元素数组
   */
  child?: IconData[];
}

/**
 * 图标组件类型
 * 
 * 这是一个经过forwardRef包装的React组件,
 * 支持ref转发到内部的SVG元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * 使用方式:
 *