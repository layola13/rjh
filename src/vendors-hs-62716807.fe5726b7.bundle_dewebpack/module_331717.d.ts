import { CSSProperties, ReactNode } from 'react';

/**
 * Empty 组件的属性接口
 */
export interface EmptyProps {
  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 类名前缀，用于自定义样式命名空间
   * @default 'empty'
   */
  prefixCls?: string;

  /**
   * 空状态图片内容
   * 可以是图片 URL 字符串或 React 元素
   * @default PRESENTED_IMAGE_DEFAULT
   */
  image?: ReactNode;

  /**
   * 空状态描述文字
   */
  description?: ReactNode;

  /**
   * 额外的子元素内容，通常用于底部操作区域
   */
  children?: ReactNode;

  /**
   * 图片容器的自定义样式
   */
  imageStyle?: CSSProperties;

  /**
   * 其他 HTML div 元素支持的属性
   */
  [key: string]: any;
}

/**
 * Empty 空状态组件
 * 
 * 用于在页面无数据时展示友好的空状态提示。
 * 支持自定义图片、描述文字和操作区域。
 * 
 * @example
 *