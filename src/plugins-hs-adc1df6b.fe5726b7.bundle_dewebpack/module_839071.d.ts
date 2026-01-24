/**
 * 属性栏复选块组件类型定义
 * Module: module_839071
 * Original ID: 839071
 */

import { ReactElement } from 'react';

/**
 * 单个复选块的配置项
 */
export interface CheckBlock {
  /** 复选块的唯一标识 */
  label: string;
  /** 图标类型 */
  icon: string;
  /** 是否选中状态 */
  checked: boolean;
}

/**
 * 属性栏复选块组件的数据配置
 */
export interface PropertyBarCheckBlockData {
  /** 组件标签文本 */
  label: string;
  /** 自定义样式类名 */
  className?: string;
  /** 是否禁用组件 */
  disabled?: boolean;
  /** 复选块配置数组 */
  blocks: CheckBlock[];
  /**
   * 复选块状态变化的回调函数
   * @param index - 被点击的复选块索引
   * @param checked - 复选块的新选中状态
   */
  onChange?: (index: number, checked: boolean) => void;
}

/**
 * 属性栏复选块组件的Props
 */
export interface PropertyBarCheckBlockProps {
  /** 组件数据配置 */
  data: PropertyBarCheckBlockData;
}

/**
 * 属性栏复选块组件
 * 
 * 用于在属性面板中展示一组可切换选中状态的图标按钮块。
 * 支持多选、禁用状态以及自定义样式。
 * 
 * @param props - 组件属性
 * @returns 渲染的属性栏复选块组件
 * 
 * @example
 *