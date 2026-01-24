/**
 * 滑块输入组件模块
 * 提供一个结合了数字输入框和滑块的复合UI控件
 * @module SliderInput
 */

import * as React from 'react';
import { NumberInput, Slider } from './widgets';
import { IValueChange } from './interfaces';

/**
 * 鼠标提示工具的位置配置
 */
interface TooltipPosition {
  /** X轴坐标 */
  x: number;
  /** Y轴坐标 */
  y: number;
}

/**
 * 鼠标提示工具的样式配置
 */
interface TooltipStyle {
  /** 背景颜色 (支持RGBA格式) */
  background: string;
  /** 文字颜色 (支持RGBA格式) */
  txtColor: string;
}

/**
 * 滑块标记点配置
 * 键为数值位置，值为显示标签
 */
interface SliderMarks {
  [position: number]: string | React.ReactNode;
}

/**
 * 组件选项配置
 */
interface SliderInputOptions {
  /** 悬浮提示文本 */
  tips?: string;
}

/**
 * 数字输入属性集合
 */
interface NumberInputProps {
  /** 最小值 */
  min: number;
  /** 最大值 */
  max?: number;
  /** 当前值 */
  value: number;
  /** 步长 */
  step: number;
  /** 单位 (如: 'm', 'cm', 'px') */
  unit: string;
  /** 小数精度 */
  precision: number;
  /** 是否为长度单位 */
  isLenghtUnit: boolean;
  /** 是否只读 */
  readOnly: boolean;
}

/**
 * 滑块输入组件的数据属性
 */
interface SliderInputData extends Partial<NumberInputProps> {
  /** 自定义CSS类名 */
  className?: string;
  /** 输入框标签文本 */
  label?: string;
  /** 是否启用双向滑块模式 */
  twoWays?: boolean;
  /** 双向滑块的起始值 */
  startValue?: number;
  /** 是否禁用控件 */
  disabled?: boolean;
  /** 是否显示悬浮提示 */
  tooltip?: boolean;
  /** 滑块标记点配置 */
  marks?: SliderMarks;
  /** 是否延迟触发值变化回调 */
  delay?: boolean;
  /** 额外选项配置 */
  options?: SliderInputOptions;
  
  /**
   * 值变化回调函数
   * @param event - 自定义事件，包含新值
   */
  onValueChange?: (event: { detail: { value: number } }) => void;
  
  /**
   * 输入框获得焦点回调
   */
  onFocus?: () => void;
  
  /**
   * 输入框失去焦点回调
   */
  onBlur?: () => void;
}

/**
 * 滑块输入组件的Props
 */
interface SliderInputProps {
  /** 组件数据配置 */
  data: SliderInputData;
}

/**
 * 滑块输入组件的State
 */
interface SliderInputState {
  /** 当前值 */
  value: number;
}

/**
 * 值变化事件详情
 */
interface ValueChangeDetail {
  detail: {
    /** 变化后的值 */
    value: number;
  };
}

/**
 * 滑块输入复合组件
 * 
 * 该组件结合了数字输入框和滑块控件，支持：
 * - 长度单位自动转换
 * - 双向滑块模式
 * - 标记点磁吸效果
 * - 延迟/即时值变化通知
 * - 悬浮提示
 * 
 * @example
 *