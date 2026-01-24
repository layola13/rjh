import * as React from 'react';

/**
 * 图标组件的属性接口
 * 继承所有标准的SVG元素属性
 */
export interface IconComponentProps extends React.SVGProps<SVGSVGElement> {
  /**
   * 图标颜色
   */
  color?: string;
  
  /**
   * 图标尺寸
   */
  size?: number | string;
  
  /**
   * CSS类名
   */
  className?: string;
  
  /**
   * 内联样式
   */
  style?: React.CSSProperties;
  
  /**
   * 图标数据对象
   * @internal
   */
  icon?: IconDefinition;
}

/**
 * 图标定义接口
 * 描述图标的路径数据和元信息
 */
export interface IconDefinition {
  /**
   * 图标名称
   */
  name: string;
  
  /**
   * 图标主题（如 'outlined', 'filled', 'two-tone'）
   */
  theme?: string;
  
  /**
   * SVG图标数据
   */
  icon: {
    /**
     * 图标标签（用于识别）
     */
    tag: string;
    
    /**
     * SVG属性
     */
    attrs: Record<string, string | number>;
    
    /**
     * 子元素数组
     */
    children: Array<{
      tag: string;
      attrs: Record<string, string | number>;
    }>;
  };
}

/**
 * 图标组件类型
 * 使用 forwardRef 包装的 React 函数组件，支持 ref 转发
 */
export type IconComponent = React.ForwardRefExoticComponent<
  IconComponentProps & React.RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *