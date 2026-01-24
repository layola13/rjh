import * as React from 'react';
import * as PropTypes from 'prop-types';

/**
 * 值范围配置接口
 * 定义数值的最小值、最大值及边界检查规则
 */
interface RangeRules {
  /** 滑块的最大值 */
  max?: number | string;
  /** 滑块的最小值 */
  min?: number | string;
  /** 输入框允许的最大值（可能与滑块最大值不同） */
  maxInput?: number | string;
  /** 输入框允许的最小值（可能与滑块最小值不同） */
  minInput?: number | string;
  /** 是否检查最小值边界，默认为true */
  checkMin?: boolean;
  /** 是否检查最大值边界，默认为true */
  checkMax?: boolean;
}

/**
 * 组件选项配置接口
 */
interface SliderInputOptions {
  /** 单位类型（如 px、em、% 等） */
  unitType?: string;
  /** 显示的小数位数 */
  displayDigits?: number;
  /** 是否在显示值中包含单位 */
  includeUnit?: boolean;
  /** 是否为只读模式 */
  readOnly?: boolean;
  /** 鼠标悬停时的提示文本 */
  tips?: string;
  /** 滑块是否从最小值开始，默认为false */
  startFromMin?: boolean;
  /** 值的范围和验证规则 */
  rules?: {
    range?: RangeRules;
    /** 是否只允许正数，默认为true */
    positiveOnly?: boolean;
  };
}

/**
 * 值变更事件的详细信息
 */
interface ValueChangeDetail {
  /** 变更后的新值 */
  value: number;
}

/**
 * 自定义值变更事件
 */
interface ValueChangeEvent {
  detail: ValueChangeDetail;
}

/**
 * 滑块输入组件的属性接口
 */
interface SliderInputData {
  /** 组件的CSS类名 */
  className?: string;
  /** 组件标签文本 */
  label?: string;
  /** 图标源路径 */
  iconSrc?: string;
  /** 当前数值 */
  value?: number | string;
  /** 是否延迟触发变更事件 */
  delay?: boolean;
  /** 配置选项 */
  options?: SliderInputOptions;
  /** 值开始变更时的回调（拖动开始） */
  onValueChangeStart?: (event: ValueChangeEvent) => void;
  /** 值变更中的回调（拖动过程中） */
  onValueChange?: (event: ValueChangeEvent) => void;
  /** 值变更结束时的回调（拖动结束） */
  onValueChangeEnd?: (event: ValueChangeEvent) => void;
}

/**
 * SliderInput组件的Props接口
 */
interface SliderInputProps {
  /** 组件数据配置 */
  data?: SliderInputData;
}

/**
 * 组件内部状态接口
 */
interface SliderInputState {
  /** 当前值 */
  value: number;
  /** 是否为只读状态 */
  readOnly: boolean;
}

/**
 * 值变更行为混入接口
 * 提供标准的值变更生命周期方法
 */
interface IValueChange {
  /**
   * 值变更开始时调用
   * @param event - 值变更事件
   */
  changeStart(event: ValueChangeEvent): void;

  /**
   * 值变更过程中调用
   * @param event - 值变更事件
   */
  changed(event: ValueChangeEvent): void;

  /**
   * 值变更结束时调用
   * @param event - 值变更事件
   */
  changeEnd(event: ValueChangeEvent): void;
}

/**
 * SliderInput - 滑块与数字输入组合组件
 * 
 * 将滑块控件和数字输入框结合在一起的复合组件，支持：
 * - 拖动滑块或输入数字来改变值
 * - 独立的滑块和输入框的范围配置
 * - 只读模式
 * - 鼠标悬停提示
 * - 值变更事件的完整生命周期（开始、变更中、结束）
 * 
 * @example
 *