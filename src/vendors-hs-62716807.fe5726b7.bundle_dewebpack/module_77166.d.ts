/**
 * CheckableTag 组件类型声明
 * 可选中的标签组件，用于提供可交互的标签选择功能
 */

import * as React from 'react';

/**
 * CheckableTag 组件的属性接口
 */
export interface CheckableTagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onChange' | 'onClick'> {
  /**
   * 自定义类名前缀
   * @default 'tag'
   */
  prefixCls?: string;

  /**
   * 自定义样式类名
   */
  className?: string;

  /**
   * 标签是否选中
   * @default false
   */
  checked?: boolean;

  /**
   * 选中状态变化时的回调函数
   * @param checked - 新的选中状态
   */
  onChange?: (checked: boolean) => void;

  /**
   * 点击事件处理函数
   * @param event - 鼠标点击事件对象
   */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;

  /**
   * 子元素内容
   */
  children?: React.ReactNode;
}

/**
 * CheckableTag 可选中标签组件
 * 
 * @description
 * 提供可交互的标签选择功能，点击后切换选中状态
 * 
 * @example
 *