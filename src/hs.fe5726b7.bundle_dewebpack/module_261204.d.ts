import React from 'react';
import { IValueChange } from './IValueChange';

/**
 * 滑块组件的数据配置接口
 */
export interface SliderData {
  /** 自定义 CSS 类名 */
  className?: string;
  /** 滑块标签文本 */
  label?: string;
  /** 图标源地址 */
  iconSrc?: string;
  /** 当前滑块值 */
  value?: number;
  /** 是否启用延迟模式（用于性能优化） */
  delay?: boolean;
  /** 滑块配置选项 */
  options?: {
    /** 是否从最小值开始计算百分比 */
    startFromMin?: boolean;
    /** 是否只读 */
    readOnly?: boolean;
    /** 验证规则 */
    rules?: {
      /** 范围配置 */
      range?: {
        /** 最小值 */
        min?: number;
        /** 最大值 */
        max?: number;
      };
    };
  };
}

/**
 * 滑块组件的 Props 接口
 */
export interface SliderProps {
  /** 滑块数据配置 */
  data?: SliderData;
}

/**
 * 滑块组件的 State 接口
 */
export interface SliderState {
  /** 当前滑块值 */
  value: number;
  /** 是否只读状态 */
  readOnly: boolean;
}

/**
 * 滑块组件类
 * 提供拖拽式数值选择功能，支持范围限制、只读模式等特性
 * 
 * @example
 *