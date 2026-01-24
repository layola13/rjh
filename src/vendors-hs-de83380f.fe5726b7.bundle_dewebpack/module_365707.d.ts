import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准的 SVG 元素属性
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
   * 图标数据（SVG 路径或配置）
   */
  icon?: any;
}

/**
 * 支持 ref 转发的图标组件类型
 * 
 * @remarks
 * 这是一个使用 forwardRef 包装的 React 组件，
 * 允许父组件通过 ref 访问底层的 SVG 元素
 * 
 * @example
 *