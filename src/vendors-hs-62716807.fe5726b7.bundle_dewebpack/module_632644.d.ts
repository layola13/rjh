import * as React from 'react';

/**
 * 预设的颜色类型
 * 包括: success, processing, error, default, warning, pink, red, yellow, orange, 
 * cyan, green, blue, purple, geekblue, magenta, volcano, gold, lime
 */
export type PresetColorType = 
  | 'success'
  | 'processing' 
  | 'error'
  | 'default'
  | 'warning'
  | 'pink'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'cyan'
  | 'green'
  | 'blue'
  | 'purple'
  | 'geekblue'
  | 'magenta'
  | 'volcano'
  | 'gold'
  | 'lime';

/**
 * 预设的状态颜色类型
 */
export type PresetStatusColorType = 'success' | 'processing' | 'error' | 'default' | 'warning';

/**
 * Tag 组件的属性接口
 */
export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  /**
   * 自定义类名前缀
   */
  prefixCls?: string;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式
   */
  style?: React.CSSProperties;

  /**
   * 标签内容
   */
  children?: React.ReactNode;

  /**
   * 设置图标
   */
  icon?: React.ReactNode;

  /**
   * 标签颜色，可以是预设颜色或自定义十六进制颜色值
   * 预设颜色支持: success, processing, error, default, warning 等
   * 也可以使用自定义颜色值，如: '#f50', '#2db7f5'
   */
  color?: PresetColorType | PresetStatusColorType | string;

  /**
   * 关闭时的回调函数
   * @param e - 鼠标事件对象
   */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;

  /**
   * 自定义关闭按钮
   */
  closeIcon?: React.ReactNode;

  /**
   * 标签是否可以关闭
   * @default false
   */
  closable?: boolean;

  /**
   * 是否显示标签
   * 用于控制标签的显示/隐藏状态
   */
  visible?: boolean;

  /**
   * 点击事件回调
   */
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

/**
 * CheckableTag 组件的属性接口
 * 用于实现可选中的标签
 */
export interface CheckableTagProps {
  /**
   * 自定义类名前缀
   */
  prefixCls?: string;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 自定义样式
   */
  style?: React.CSSProperties;

  /**
   * 标签内容
   */
  children?: React.ReactNode;

  /**
   * 设置标签的选中状态
   * @default false
   */
  checked?: boolean;

  /**
   * 选中状态变化时的回调函数
   * @param checked - 当前选中状态
   */
  onChange?: (checked: boolean) => void;

  /**
   * 点击事件回调
   */
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

/**
 * CheckableTag 组件
 * 可选中的标签，用于实现标签选择功能
 */
export declare const CheckableTag: React.FC<CheckableTagProps>;

/**
 * Tag 组件接口
 * 基础标签组件，用于进行标记和分类
 */
export interface TagComponent extends React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLSpanElement>> {
  /**
   * CheckableTag 子组件
   * 用于实现可选中的标签功能
   */
  CheckableTag: typeof CheckableTag;
}

/**
 * Tag 组件
 * 进行标记和分类的小标签
 * 
 * @example
 *