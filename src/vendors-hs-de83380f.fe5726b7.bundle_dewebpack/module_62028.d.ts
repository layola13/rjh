import * as React from 'react';

/**
 * 图标组件的上下文配置
 */
export interface IconContextValue {
  /** 图标类名前缀，默认为 'anticon' */
  prefixCls?: string;
  /** 根节点自定义类名 */
  rootClassName?: string;
}

/**
 * SVG 图标的基础属性
 */
export interface SVGBaseProps extends React.SVGAttributes<SVGElement> {
  /** SVG 类名 */
  className?: string;
  /** SVG 样式 */
  style?: React.CSSProperties;
  /** SVG 视图框，定义图标的坐标系统和宽高比 */
  viewBox?: string;
}

/**
 * 图标组件的属性接口
 */
export interface AntdIconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  /** 自定义图标的类名 */
  className?: string;
  /** 
   * 自定义 SVG 组件
   * 可以传入一个 React 组件来渲染自定义图标
   */
  component?: React.ComponentType<SVGBaseProps>;
  /** 
   * SVG 的 viewBox 属性
   * 定义 SVG 的坐标系统和宽高比，默认为 '0 0 1024 1024'
   */
  viewBox?: string;
  /** 
   * 是否启用旋转动画
   * 设置为 true 时图标将持续旋转
   */
  spin?: boolean;
  /** 
   * 图标旋转角度
   * 以度为单位，例如 90、180、270
   */
  rotate?: number;
  /** 
   * Tab 键导航顺序
   * 用于键盘导航的 tabindex 属性
   */
  tabIndex?: number;
  /** 
   * 点击事件处理器
   * @param event - 鼠标点击事件对象
   */
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  /** 
   * 子元素
   * 可以传入 SVG 元素或其他 React 节点
   */
  children?: React.ReactNode;
}

/**
 * Ant Design 图标组件
 * 
 * @description
 * 用于渲染矢量图标的基础组件，支持自定义 SVG、旋转动画、点击事件等功能。
 * 
 * @example
 *