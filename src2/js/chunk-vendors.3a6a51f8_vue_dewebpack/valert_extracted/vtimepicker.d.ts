/**
 * VTimePicker 时间选择器组件模块
 * 
 * 提供完整的时间选择功能，包括主组件、时钟面板和标题栏
 * @module VTimePicker
 */

import { Component } from 'vue';

/**
 * 时间选择器主组件
 * 
 * 用于选择时间的交互式组件，支持小时和分钟选择
 */
export declare const VTimePicker: Component;

/**
 * 时间选择器时钟面板组件
 * 
 * 显示圆形时钟界面，允许用户通过点击或拖动选择时间
 */
export declare const VTimePickerClock: Component;

/**
 * 时间选择器标题栏组件
 * 
 * 显示当前选中的时间，通常位于时间选择器顶部
 */
export declare const VTimePickerTitle: Component;

/**
 * VTimePicker 子组件集合
 * 
 * 包含所有时间选择器相关的子组件
 */
export interface VTimePickerSubcomponents {
  /** 时间选择器主组件 */
  VTimePicker: Component;
  /** 时钟面板组件 */
  VTimePickerClock: Component;
  /** 标题栏组件 */
  VTimePickerTitle: Component;
}

/**
 * 默认导出对象
 * 
 * 包含所有子组件的集合，用于 Vuetify 内部注册
 */
declare const _default: {
  /** Vuetify 子组件集合标识 */
  $_vuetify_subcomponents: VTimePickerSubcomponents;
};

export default _default;