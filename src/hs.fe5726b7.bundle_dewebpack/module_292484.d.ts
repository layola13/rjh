/**
 * 双滑块输入组件类型定义
 * 结合滑块和数字输入框的复合组件
 */

import React from 'react';

/**
 * 范围规则配置
 */
interface RangeRules {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
}

/**
 * 验证规则配置
 */
interface ValidationRules {
  /** 范围限制 */
  range?: RangeRules;
  /** 是否仅允许正数 */
  positiveOnly?: boolean;
}

/**
 * 组件选项配置
 */
interface ComponentOptions {
  /** 单位类型 */
  unitType?: string;
  /** 显示小数位数 */
  displayDigits?: number;
  /** 是否包含单位 */
  includeUnit?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 验证规则 */
  rules?: ValidationRules;
}

/**
 * 组件数据属性
 */
interface DoubleSliderInputData {
  /** CSS类名 */
  className?: string;
  /** 标签文本 */
  label?: string;
  /** 当前值 */
  value?: number | string;
  /** 是否延迟更新 */
  delay?: boolean;
  /** 配置选项 */
  options?: ComponentOptions;
  /** 值变化开始回调 */
  onValueChangeStart?: (value: number) => void;
  /** 值变化回调 */
  onValueChange?: (value: number) => void;
  /** 值变化结束回调 */
  onValueChangeEnd?: (value: number) => void;
}

/**
 * 组件Props
 */
interface DoubleSliderInputProps {
  /** 组件数据配置 */
  data?: DoubleSliderInputData;
}

/**
 * 组件State
 */
interface DoubleSliderInputState {
  /** 当前值 */
  value: number;
  /** 是否只读 */
  readOnly: boolean;
}

/**
 * 滑块配置属性
 */
interface SliderConfig {
  /** CSS类名 */
  className: string;
  /** 标签文本 */
  label?: string;
  /** 当前值 */
  value: number;
  /** 是否延迟更新 */
  delay?: boolean;
  /** 值变化开始回调 */
  onValueChangeStart: (value: number) => void;
  /** 值变化回调 */
  onValueChange: (value: number) => void;
  /** 值变化结束回调 */
  onValueChangeEnd: (value: number) => void;
  /** 配置选项 */
  options: {
    readOnly: boolean;
    rules: {
      range: {
        min: number;
        max: number;
      };
    };
  };
}

/**
 * 数字输入框配置属性
 */
interface NumberInputConfig {
  /** CSS类名 */
  className: string;
  /** 标签文本 */
  label: string;
  /** 当前值 */
  value: number;
  /** 列表值 */
  listValues: undefined;
  /** 标签位置 */
  labelPosition: string;
  /** 值变化开始回调 */
  onValueChangeStart: (value: number) => void;
  /** 值变化回调 */
  onValueChange: (value: number) => void;
  /** 值变化结束回调 */
  onValueChangeEnd: (value: number) => void;
  /** 配置选项 */
  options: {
    unitType?: string;
    displayDigits?: number;
    includeUnit?: boolean;
    readOnly: boolean;
    rules: {
      range: {
        min: number;
        max: number;
      };
      positiveOnly: boolean;
    };
  };
}

/**
 * 值变化事件详情
 */
interface ValueChangeEventDetail {
  /** 变化后的值 */
  value: number;
}

/**
 * 值变化事件
 */
interface ValueChangeEvent {
  /** 事件详情 */
  detail?: ValueChangeEventDetail;
}

/**
 * 双滑块输入组件
 * 
 * 提供滑块和数字输入框的组合控件，支持：
 * - 实时值变化监听
 * - 范围限制
 * - 只读模式
 * - 自定义单位显示
 * 
 * @example
 *