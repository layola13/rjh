/**
 * 长度单位下拉输入组件的类型定义
 * 用于处理带单位转换的长度输入，支持下拉列表选择预设值
 */

import * as React from 'react';

/**
 * 长度单位类型枚举
 */
export enum LengthUnitType {
  /** 毫米 */
  MM = 'mm',
  /** 厘米 */
  CM = 'cm',
  /** 米 */
  M = 'm',
  /** 英寸 */
  INCH = 'inch',
  /** 英尺 */
  FOOT = 'foot'
}

/**
 * 数值验证规则配置
 */
export interface ValidationRules {
  /** 是否仅允许正数 */
  positiveOnly?: boolean;
  /** 数值范围限制 */
  range?: {
    /** 最小值（数据库单位） */
    min?: number;
    /** 最大值（数据库单位） */
    max?: number;
  };
}

/**
 * 组件选项配置
 */
export interface DropdownInputOptions {
  /** 是否只读 */
  readOnly: boolean;
  /** 下拉列表的预设项 */
  items: string[];
  /** 验证规则 */
  rules?: ValidationRules;
}

/**
 * 值变化事件参数
 */
export interface ValueChangeEvent {
  /** 新的数值（数据库单位，通常为毫米） */
  value: number;
}

/**
 * 组件数据配置
 */
export interface DropdownInputData {
  /** 当前数值（数据库单位） */
  value: number;
  /** 字段标题/标签 */
  title: string;
  /** 字段名称 */
  name: string;
  /** 自定义样式类名 */
  className?: string;
  /** 配置选项 */
  options: DropdownInputOptions;
  /** 值变化回调函数 */
  onValueChange: (event: ValueChangeEvent) => void;
  /** 值验证回调函数（当输入无效时触发） */
  onValueValidation?: (event: ValueChangeEvent) => void;
}

/**
 * 组件属性接口
 */
export interface DropdownInputProps {
  /** 组件唯一标识符 */
  id: string;
  /** 组件数据配置 */
  data: DropdownInputData;
}

/**
 * 组件内部状态接口
 */
export interface DropdownInputState {
  /** 当前数据配置 */
  data: DropdownInputData;
  /** 显示的文本值（带单位格式化后） */
  value: string;
  /** 配置选项 */
  option: DropdownInputOptions;
  /** 当前使用的长度单位 */
  unitType: LengthUnitType;
  /** 显示精度（小数位数） */
  displayDigits: number;
  /** 上次有效的数值（数据库单位） */
  oldValue: number;
  /** 输入框是否聚焦 */
  focus: boolean;
  /** 下拉列表是否显示 */
  show: boolean;
  /** 是否高亮显示 */
  highlight: boolean;
}

/**
 * 格式化后的长度信息
 */
export interface FormattedLengthInfo {
  /** 长度单位类型 */
  unitType: LengthUnitType;
  /** 显示精度 */
  displayDigits: number;
  /** 格式化后的文本表达式 */
  textExpression: string;
  /** 原始数值（数据库单位） */
  oldValue: number;
}

/**
 * 带单位转换的下拉输入框组件
 * 
 * @description
 * 这是一个React组件，用于处理长度输入，具有以下功能：
 * - 自动单位转换（基于应用全局配置）
 * - 下拉列表快速选择预设值
 * - 实时输入验证（范围、正负数检查）
 * - 精度控制和格式化显示
 * - 只读模式支持
 * 
 * @example
 *