/**
 * VDatePicker 标题组件类型定义
 * 用于日期选择器顶部显示选中的年份和日期
 */

import Vue, { VNode, CreateElement } from 'vue';

/**
 * VDatePickerTitle 组件的属性接口
 */
export interface VDatePickerTitleProps {
  /**
   * 格式化后的日期字符串，显示在标题区域
   * @default ""
   */
  date?: string;

  /**
   * 是否禁用组件
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否只读模式
   * @default false
   */
  readonly?: boolean;

  /**
   * 当前是否处于选择年份模式
   * @default false
   */
  selectingYear?: boolean;

  /**
   * 当前选中的日期值（用于过渡动画判断）
   */
  value?: string;

  /**
   * 年份值
   * @default ""
   */
  year?: number | string;

  /**
   * 年份旁边显示的图标名称
   */
  yearIcon?: string;
}

/**
 * VDatePickerTitle 组件的数据接口
 */
export interface VDatePickerTitleData {
  /**
   * 是否反向过渡动画（日期减小时为 true）
   * @default false
   */
  isReversing: boolean;
}

/**
 * VDatePickerTitle 组件的计算属性接口
 */
export interface VDatePickerTitleComputed {
  /**
   * 根据日期变化方向计算过渡动画名称
   * @returns 过渡动画类名
   */
  computedTransition: string;
}

/**
 * VDatePickerTitle 组件的方法接口
 */
export interface VDatePickerTitleMethods {
  /**
   * 生成年份图标的虚拟节点
   * @returns 图标的 VNode
   */
  genYearIcon(): VNode;

  /**
   * 生成年份按钮
   * @returns 年份按钮的 VNode
   */
  getYearBtn(): VNode;

  /**
   * 生成标题文本（带过渡动画）
   * @returns 标题文本的 VNode
   */
  genTitleText(): VNode;

  /**
   * 生成日期按钮
   * @returns 日期按钮的 VNode
   */
  genTitleDate(): VNode;

  /**
   * 渲染函数
   * @param createElement - Vue 的创建元素函数
   * @returns 组件的根 VNode
   */
  render(createElement: CreateElement): VNode;
}

/**
 * VDatePickerTitle 组件实例类型
 * 继承自 PickerButton mixin，提供日期选择器标题栏功能
 */
export type VDatePickerTitle = Vue & 
  VDatePickerTitleProps & 
  VDatePickerTitleData & 
  VDatePickerTitleComputed & 
  VDatePickerTitleMethods;

/**
 * VDatePickerTitle 组件定义
 * 默认导出的 Vue 组件构造函数
 */
declare const VDatePickerTitleComponent: {
  new (): VDatePickerTitle;
};

export default VDatePickerTitleComponent;