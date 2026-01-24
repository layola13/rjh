/**
 * Module: module_892950
 * Original ID: 892950
 * 
 * React Select 组件工具模块
 * 提供将 React Children 转换为数据结构的功能
 */

import type { ReactNode, ReactElement } from 'react';

/**
 * Select 选项数据结构
 */
export interface SelectOptionData {
  /** 选项的唯一标识 */
  key: string | number;
  /** 选项的值，如果未提供则使用 key */
  value: string | number;
  /** 选项的子内容 */
  children?: ReactNode;
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * Select 选项组数据结构
 */
export interface SelectOptGroupData {
  /** 选项组的唯一标识，格式为 __RC_SELECT_GRP__${key}__ */
  key: string;
  /** 选项组的标签 */
  label: string | number;
  /** 选项组下的选项列表 */
  options: Array<SelectOptionData | SelectOptGroupData | null>;
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * 转换后的数据类型（选项或选项组）
 */
export type ConvertedChildData = SelectOptionData | SelectOptGroupData | null;

/**
 * 将 React Children 转换为结构化数据
 * 
 * @param children - React 子元素，通常是 Option 或 OptGroup 组件
 * @param skipGroup - 是否跳过选项组处理，默认为 false
 * @returns 转换后的数据数组，过滤掉 null 值
 * 
 * @example
 *