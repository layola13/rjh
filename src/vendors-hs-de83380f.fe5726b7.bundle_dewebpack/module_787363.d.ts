/**
 * React图标组件模块
 * 
 * 该模块导出一个使用forwardRef包装的React图标组件,
 * 允许父组件通过ref访问底层DOM元素
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 扩展标准的SVG元素属性
 */
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标尺寸(宽度和高度)
   * @default 24
   */
  size?: number | string;
  
  /**
   * 图标颜色
   * @default 'currentColor'
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
   * 图标的可访问性标签
   */
  'aria-label'?: string;
  
  /**
   * 图标标题,用于提升可访问性
   */
  title?: string;
}

/**
 * 图标数据对象接口
 * 定义从外部导入的图标元数据结构
 */
export interface IconData {
  /**
   * 图标的SVG路径数据
   */
  path: string | string[];
  
  /**
   * 图标的视图盒子坐标
   * 格式: "minX minY width height"
   */
  viewBox?: string;
  
  /**
   * 图标名称
   */
  name?: string;
}

/**
 * 使用React.forwardRef创建的图标组件类型
 * 
 * 该组件接受IconProps属性并转发ref到SVG元素,
 * 允许父组件直接访问和操作底层的SVG DOM节点
 * 
 * @example
 *