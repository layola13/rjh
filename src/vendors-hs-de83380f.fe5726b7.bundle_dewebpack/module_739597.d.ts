/**
 * 图标组件模块
 * 
 * 该模块导出一个React forwardRef组件,用于渲染SVG图标。
 * 组件接受标准的React props并支持ref转发。
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 * 
 * @interface IconComponentProps
 * @extends {React.SVGProps<SVGSVGElement>} 继承所有标准SVG元素属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的颜色
   * @optional
   */
  color?: string;
  
  /**
   * 图标的尺寸
   * @optional
   */
  size?: string | number;
  
  /**
   * 自定义类名
   * @optional
   */
  className?: string;
  
  /**
   * 自定义样式对象
   * @optional
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据对象(从模块342442导入)
   * @internal
   */
  icon?: IconData;
}

/**
 * 图标数据结构接口
 * 
 * @interface IconData
 * @internal
 */
interface IconData {
  /**
   * SVG路径数据
   */
  path?: string | string[];
  
  /**
   * 视图框属性
   */
  viewBox?: string;
  
  /**
   * 图标宽度
   */
  width?: number;
  
  /**
   * 图标高度
   */
  height?: number;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个使用forwardRef创建的React组件,支持ref转发到内部的SVG元素。
 * 
 * @type {ForwardRefExoticComponent}
 * @template SVGSVGElement - ref指向的DOM元素类型
 * 
 * @example
 *