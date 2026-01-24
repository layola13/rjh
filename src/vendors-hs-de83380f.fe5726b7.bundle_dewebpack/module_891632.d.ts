/**
 * 图标组件模块
 * 该模块导出一个React forwardRef包装的图标组件
 */

import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承自标准SVG元素属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标的类名
   */
  className?: string;
  
  /**
   * 图标的样式对象
   */
  style?: React.CSSProperties;
  
  /**
   * 图标的尺寸（宽度和高度）
   */
  size?: string | number;
  
  /**
   * 图标的颜色
   */
  color?: string;
  
  /**
   * 图标的旋转角度
   */
  rotate?: number;
  
  /**
   * 是否启用旋转动画
   */
  spin?: boolean;
  
  /**
   * 图标数据配置
   */
  icon?: IconDefinition;
}

/**
 * 图标定义接口
 * 描述图标的SVG路径和属性
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标主题类型
   */
  theme?: 'filled' | 'outlined' | 'twoTone';
  
  /**
   * SVG图标数据
   */
  icon: {
    /**
     * 标签名称（通常为'svg'）
     */
    tag: string;
    
    /**
     * SVG属性
     */
    attrs: Record<string, string | number>;
    
    /**
     * SVG子元素
     */
    children: Array<{
      tag: string;
      attrs: Record<string, string | number>;
    }>;
  };
}

/**
 * 图标组件类型
 * 使用forwardRef包装的React组件，支持ref转发到SVG元素
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 这是一个通过forwardRef创建的React组件，允许父组件访问底层SVG元素的ref
 */
declare const IconComponentWithRef: IconComponent;

export default IconComponentWithRef;