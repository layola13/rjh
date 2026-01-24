/**
 * Slider组件类型定义
 * 提供滑块拖动交互功能，支持范围限制、只读模式和延迟更新
 */

import { IValueChange } from './IValueChange';
import React from 'react';

/**
 * 滑块组件的范围配置
 */
export interface SliderRangeConfig {
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
}

/**
 * 滑块组件的规则配置
 */
export interface SliderRules {
  /** 取值范围 */
  range: SliderRangeConfig;
}

/**
 * 滑块组件的选项配置
 */
export interface SliderOptions {
  /** 规则配置 */
  rules: SliderRules;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否从最小值开始计算进度（true时进度条从min到value，false时从0到value） */
  startFromMin?: boolean;
}

/**
 * 滑块组件的数据属性
 */
export interface SliderData {
  /** 当前值 */
  value?: number;
  /** 配置选项 */
  options: SliderOptions;
  /** 是否启用延迟模式（延迟触发mousemove和mouseup事件） */
  delay?: boolean;
  /** 自定义CSS类名 */
  className?: string;
  /** 标签文本 */
  label?: string;
  /** 图标源（未使用） */
  iconSrc?: string;
}

/**
 * 滑块组件的Props
 */
export interface SliderProps {
  /** 滑块数据配置 */
  data: SliderData;
}

/**
 * 滑块组件的State
 */
export interface SliderState {
  /** 当前值 */
  value: number;
  /** 是否只读 */
  readOnly?: boolean;
}

/**
 * 滑块组件
 * 继承自IValueChange，提供拖拽式数值输入功能
 * 
 * @example
 *