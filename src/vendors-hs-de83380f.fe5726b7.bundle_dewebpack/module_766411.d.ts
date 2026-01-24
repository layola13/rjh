/**
 * React Icon Component Module
 * 
 * 该模块导出一个使用forwardRef包装的React图标组件,
 * 支持通过ref访问底层DOM元素,并集成了默认图标配置
 * 
 * @module IconComponent
 */

import type * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承标准的React SVG属性,并支持自定义ref转发
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /** 图标尺寸,支持数字(像素)或字符串(CSS单位) */
  size?: number | string;
  
  /** 图标颜色,支持任何有效的CSS颜色值 */
  color?: string;
  
  /** 图标填充色 */
  fill?: string;
  
  /** 图标描边色 */
  stroke?: string;
  
  /** 额外的CSS类名 */
  className?: string;
  
  /** 内联样式对象 */
  style?: React.CSSProperties;
  
  /** 自定义标题,用于可访问性 */
  title?: string;
  
  /** ARIA标签,用于屏幕阅读器 */
  'aria-label'?: string;
}

/**
 * 图标组件类型定义
 * 
 * 这是一个通过React.forwardRef创建的组件,支持ref转发到内部的SVG元素
 * 
 * @example
 *