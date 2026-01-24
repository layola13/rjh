import React from 'react';
import { SelectProps } from 'antd/lib/select';

/**
 * 圆角选择器组件的属性接口
 */
export interface RoundSelectProps extends Omit<SelectProps, 'suffixIcon' | 'open' | 'onDropdownVisibleChange' | 'width' | 'className' | 'dropdownClassName'> {
  /**
   * 自定义图标元素，显示在选择器左侧
   */
  icon?: React.ReactNode;

  /**
   * 组件容器的自定义样式
   */
  style?: React.CSSProperties;

  /**
   * Select组件的自定义样式（通过selectStyle属性传递）
   */
  selectStyle?: React.CSSProperties;

  /**
   * 其他传递给Select组件的属性
   */
  [key: string]: any;
}

/**
 * 圆角选择器组件
 * 
 * 一个带有主题支持、动态下拉箭头和挂载动画效果的自定义选择器组件。
 * 
 * @remarks
 * - 支持ThemeContext主题切换
 * - 集成自定义下拉箭头图标（上/下切换）
 * - 带有挂载/卸载动画效果
 * - 固定宽度154px
 * 
 * @param props - RoundSelectProps属性对象
 * @returns React函数组件
 * 
 * @example
 *