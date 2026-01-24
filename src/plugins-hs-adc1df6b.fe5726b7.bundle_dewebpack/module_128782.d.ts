/**
 * Module: module_128782
 * Original ID: 128782
 */

import { ReactElement } from 'react';

/**
 * 面积单位类型枚举
 */
export enum LengthUnitTypeEnum {
  /** 英尺 */
  foot = 'foot',
  /** 英寸 */
  inch = 'inch',
  /** 米 */
  meter = 'meter'
}

/**
 * 下拉列表选项接口
 */
export interface DropdownAreaOption {
  /** 选项唯一标识 */
  id: string | number;
  /** 选项显示标签 */
  label: string;
  /** 提示文本内容 */
  tooltipText: string;
}

/**
 * 组件属性数据接口
 */
export interface DropdownAreaListData {
  /** 默认选中的键值 */
  defaultKey: string | number;
  /** 下拉选项列表 */
  options: DropdownAreaOption[];
  /** 选项变更回调函数 */
  onChange?: (value: string | number) => void;
  /** 计算面积的函数 */
  calcArea: (key: string | number) => string | number;
}

/**
 * 组件属性接口
 */
export interface DropdownAreaListProps {
  /** 组件数据 */
  data: DropdownAreaListData;
}

/**
 * Tooltip 配置接口
 */
export interface TooltipConfig {
  /** 提示文本 */
  text: string;
  /** 默认图标类名 */
  icon: string;
  /** 悬停时图标类名 */
  hoverIcon: string;
}

/**
 * Select 组件属性接口
 */
export interface SelectProps {
  /** 样式类名 */
  className?: string;
  /** 值变更回调 */
  onChange?: (value: string | number) => void;
  /** 下拉弹窗样式类名 */
  dropdownClassName?: string;
  /** 是否隐藏当前选中项 */
  hideCurrent?: boolean;
  /** 是否无边框 */
  noBorder?: boolean;
  /** 提示配置 */
  tooltip?: TooltipConfig;
  /** 当前选中值 */
  value?: string | number;
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * Option 组件属性接口
 */
export interface OptionProps {
  /** 选项键值 */
  key: string | number;
  /** 选项值 */
  value: string | number;
  /** 选项标题 */
  title: string;
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * SmartText 组件属性接口
 */
export interface SmartTextProps {
  /** 样式类名 */
  className?: string;
  /** 子元素 */
  children?: React.ReactNode;
}

/**
 * 下拉区域列表组件
 * 
 * @description 显示带面积计算的下拉选择列表，支持英制/公制单位切换
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *