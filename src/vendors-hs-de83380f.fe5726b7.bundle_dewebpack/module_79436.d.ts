/**
 * 图标组件类型定义
 * 基于 React.forwardRef 封装的图标组件
 */

import type { ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * 图标组件的属性接口
 */
export interface IconComponentProps {
  /** 图标尺寸 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 点击事件处理器 */
  onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 其他 SVG 属性 */
  [key: string]: any;
}

/**
 * 图标数据定义接口
 * 描述图标的 SVG 路径和视图配置
 */
export interface IconDefinition {
  /** 图标名称 */
  name: string;
  /** 图标主题（outlined | filled | two-tone） */
  theme?: string;
  /** SVG 路径数据 */
  icon: {
    /** 标签名称（通常为 'svg'） */
    tag: string;
    /** SVG 属性 */
    attrs: {
      viewBox: string;
      [key: string]: any;
    };
    /** 子元素（路径定义） */
    children: Array<{
      tag: string;
      attrs: Record<string, any>;
    }>;
  };
}

/**
 * 图标容器组件属性接口
 */
export interface IconBaseProps extends IconComponentProps {
  /** 图标定义数据 */
  icon: IconDefinition;
  /** Ref 引用 */
  ref?: React.Ref<SVGSVGElement>;
}

/**
 * 导出的图标组件类型
 * 使用 forwardRef 包装的函数组件，支持 ref 转发
 */
type IconComponent = ForwardRefExoticComponent<
  IconComponentProps & RefAttributes<SVGSVGElement>
>;

/**
 * 默认导出的图标组件
 * 
 * @example
 *