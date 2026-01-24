/**
 * 滑块组件高阶函数类型定义
 * 用于创建带有数值范围控制的滑块组件
 */

import React from 'react';

/**
 * 单位类型枚举
 */
export type UnitType = string;

/**
 * 数值转换函数类型
 * @param value - 输入的原始值
 * @returns 转换后的值
 */
export type DataTransformer = (value: number) => number;

/**
 * 滑块配置选项
 */
export interface SliderOptions {
  /** 单位类型（如：px, %, em等） */
  unitType: UnitType;
  /** 验证规则 */
  rules: {
    /** 是否只允许正数 */
    positiveOnly?: boolean;
    /** 范围限制 */
    range: {
      /** 是否检查最大值 */
      checkMax: boolean;
      /** 是否检查最小值 */
      checkMin: boolean;
      /** 最大值 */
      max: number;
      /** 最小值 */
      min: number;
    };
  };
}

/**
 * 滑块控制器接口
 */
export interface SliderController {
  /** 值开始变化时的回调 */
  onValueChangeStart: (value: number) => void;
  /** 值变化时的回调 */
  onValueChanged: (value: number) => void;
  /** 值变化结束时的回调 */
  onValueChangeEnd: () => void;
}

/**
 * 滑块数据配置
 */
export interface SliderData {
  /** 容器类名 */
  className: string;
  /** 控制器配置 */
  controller: SliderController;
  /** 当前值 */
  value: number;
  /** 标签文本 */
  label: string;
  /** 滑块选项 */
  options: SliderOptions;
}

/**
 * 滑块组件的Props
 */
export interface SliderComponentProps {
  /** 自定义类名 */
  className?: string;
  /** 描述文本 */
  destext: string;
  /** 最大值 */
  max: number;
  /** 最小值 */
  min: number;
  /** 当前值 */
  value: number;
  /** 元素ID */
  id: string;
  /** 验证函数 */
  validate: () => void;
  /** 开始改变时的回调 */
  onChangeStart: (value: number, propertyKey: string) => void;
  /** 值改变时的回调 */
  onChange: (value: number, propertyKey: string) => void;
  /** 改变结束时的回调 */
  onChangeEnd: () => void;
  /** 步长 */
  step: number;
  /** 单位类型 */
  unitType: UnitType;
  /** 属性键名 */
  propertyKey: string;
  /** 是否检查最大值 */
  checkMax?: boolean;
}

/**
 * 高阶函数配置参数
 */
export interface SliderHOCConfig {
  /** 是否只允许正数 */
  positiveOnly?: boolean;
  /** 数据接收转换函数 */
  reciveData?: DataTransformer;
}

/**
 * 基础滑块组件类型
 */
export type BaseSliderComponent = React.ComponentType<{ data: SliderData }>;

/**
 * 增强后的滑块组件类型
 */
export type EnhancedSliderComponent = React.ComponentClass<SliderComponentProps>;

/**
 * 滑块组件高阶函数
 * 用于包装基础滑块组件，添加额外的验证和转换逻辑
 * 
 * @param config - 配置参数
 * @param config.positiveOnly - 是否只允许正数
 * @param config.reciveData - 数据转换函数，默认为identity函数
 * @returns 返回一个高阶组件函数，接收基础组件并返回增强后的组件
 * 
 * @example
 *