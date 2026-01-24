/**
 * VDatePicker 标题组件类型定义
 * 用于显示日期选择器的标题区域，包含年份和日期选择按钮
 */

import Vue, { VNode, CreateElement } from 'vue';
import { VIcon } from '../VIcon';
import PickerButton from '../../mixins/picker-button';

/**
 * 组件 Props 接口
 */
interface VDatePickerTitleProps {
  /**
   * 格式化后的日期字符串（显示在标题中）
   * @default ""
   */
  date: string;

  /**
   * 是否禁用组件
   * @default false
   */
  disabled: boolean;

  /**
   * 是否只读模式
   * @default false
   */
  readonly: boolean;

  /**
   * 是否处于选择年份状态
   * @default false
   */
  selectingYear: boolean;

  /**
   * 当前选中的日期值（用于过渡动画判断）
   */
  value: string;

  /**
   * 年份值
   * @default ""
   */
  year: number | string;

  /**
   * 年份旁边显示的图标名称
   */
  yearIcon?: string;
}

/**
 * 组件 Data 接口
 */
interface VDatePickerTitleData {
  /**
   * 是否为反向过渡动画（日期递减时为 true）
   */
  isReversing: boolean;
}

/**
 * 组件计算属性接口
 */
interface VDatePickerTitleComputed {
  /**
   * 根据日期变化方向计算过渡动画类名
   * @returns 过渡动画类名
   */
  computedTransition: string;
}

/**
 * 组件方法接口
 */
interface VDatePickerTitleMethods {
  /**
   * 生成年份图标 VNode
   * @returns VIcon 组件节点
   */
  genYearIcon(): VNode;

  /**
   * 生成年份选择按钮
   * @returns 年份按钮 VNode
   */
  getYearBtn(): VNode;

  /**
   * 生成标题文本（带过渡动画）
   * @returns 标题文本 VNode
   */
  genTitleText(): VNode;

  /**
   * 生成日期选择按钮
   * @returns 日期按钮 VNode
   */
  genTitleDate(): VNode;
}

/**
 * VDatePickerTitle 组件类型定义
 * 继承自 PickerButton mixin，提供日期选择器标题功能
 */
declare const VDatePickerTitle: Vue.extend<
  VDatePickerTitleData,
  VDatePickerTitleMethods,
  VDatePickerTitleComputed,
  VDatePickerTitleProps
> & {
  name: 'v-date-picker-title';
  mixins: [typeof PickerButton];
};

export default VDatePickerTitle;

/**
 * 组件实例类型（用于 $refs 等场景）
 */
export type VDatePickerTitleInstance = InstanceType<typeof VDatePickerTitle>;