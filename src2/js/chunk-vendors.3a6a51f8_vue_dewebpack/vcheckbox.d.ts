/**
 * VCheckbox组件模块
 * 提供复选框和简单复选框组件
 */

import type { Component, DefineComponent } from 'vue';

/**
 * 复选框组件的属性接口
 */
export interface VCheckboxProps {
  /** 复选框的值 */
  modelValue?: boolean;
  /** 复选框的标签文本 */
  label?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 复选框颜色 */
  color?: string;
  /** 是否显示为不确定状态 */
  indeterminate?: boolean;
  /** 错误信息 */
  error?: boolean;
  /** 错误提示文本 */
  errorMessages?: string | string[];
  /** 提示信息 */
  hint?: string;
  /** 是否隐藏详情 */
  hideDetails?: boolean | 'auto';
  /** 验证规则 */
  rules?: Array<(value: boolean) => boolean | string>;
}

/**
 * 简单复选框组件的属性接口
 */
export interface VSimpleCheckboxProps {
  /** 复选框的值 */
  modelValue?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 复选框颜色 */
  color?: string;
  /** 是否显示为不确定状态 */
  indeterminate?: boolean;
  /** 波纹效果 */
  ripple?: boolean;
}

/**
 * 标准复选框组件
 * 提供完整的表单验证、错误提示等功能
 */
export declare const VCheckbox: DefineComponent<VCheckboxProps>;

/**
 * 简化版复选框组件
 * 适用于简单场景，无表单验证功能
 */
export declare const VSimpleCheckbox: DefineComponent<VSimpleCheckboxProps>;

/**
 * Vuetify子组件集合
 */
export interface VCheckboxModule {
  /** Vuetify内部子组件注册 */
  $_vuetify_subcomponents: {
    /** 标准复选框组件 */
    VCheckbox: Component;
    /** 简单复选框组件 */
    VSimpleCheckbox: Component;
  };
}

/**
 * 默认导出：包含所有复选框相关组件的模块
 */
declare const _default: VCheckboxModule;
export default _default;