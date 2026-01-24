/**
 * 滑块输入组组件类型定义
 * 支持比例锁定功能的多输入滑块组
 */

import React from 'react';

/**
 * 滑块输入单项配置
 */
export interface SliderInputOption {
  /** 输入项的唯一标识 */
  key?: string;
  /** 当前值 */
  value?: number;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步进值 */
  step?: number;
  /** 标签文本 */
  label?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 值变化回调 */
  onChange?: (value: number) => void;
  /** 提示信息 */
  tooltip?: string;
}

/**
 * 比例锁定选项配置
 */
export interface ProportionalOption {
  /** 是否选中（锁定比例） */
  checked: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示提示文本 */
  showTooltip?: boolean;
  /** 锁定状态变化回调 */
  onChange?: (checked: boolean) => void;
}

/**
 * 滑块输入组数据配置
 */
export interface SliderInputGroupData {
  /** 滑块输入项配置数组 */
  sliderInputOptions: SliderInputOption[];
  /** 比例锁定选项配置 */
  proportionalOption?: ProportionalOption;
  /** 父级提示信息（用于显示额外说明） */
  parentTips?: string;
}

/**
 * 滑块输入组组件属性
 */
export interface SliderInputGroupProps {
  /** 组件数据配置 */
  data: SliderInputGroupData;
}

/**
 * 滑块输入组组件状态
 */
export interface SliderInputGroupState {
  /** 是否显示比例锁定提示 */
  showTooltip: boolean;
  /** 是否处于悬停交互状态 */
  isHoverAction: boolean;
  /** 比例锁定图标的垂直偏移量（用于居中显示） */
  proportionalIconOffset: number | undefined;
}

/**
 * 滑块输入组组件
 * 
 * 功能特性：
 * - 支持多个滑块输入项的组合显示
 * - 支持比例锁定功能（用于宽高等比缩放场景）
 * - 支持悬停提示和交互反馈
 * - 自动计算比例锁定图标的居中位置
 * 
 * @example
 *