/**
 * FeedbackCheckboxBlock 组件
 * 用于反馈表单中的多选框块组件
 */

import { FeedbackBlock } from './FeedbackBlock';

/**
 * 多选框选项数据接口
 */
export interface CheckboxOption {
  /** 选项值 */
  value: string | number;
  /** 选项显示标签 */
  label: string;
}

/**
 * FeedbackCheckboxBlock 组件属性接口
 */
export interface FeedbackCheckboxBlockProps {
  /** 块标签文本 */
  label: string;
  /** 是否必填 */
  required?: boolean;
  /** 多选框选项数据数组 */
  data: CheckboxOption[];
  /** 最大可选数量限制 */
  maxLen?: number;
}

/**
 * FeedbackCheckboxBlock 组件状态接口
 */
export interface FeedbackCheckboxBlockState {
  /** 当前选中的值数组 */
  checkedValues: Array<string | number>;
}

/**
 * 反馈表单多选框块组件
 * 支持多选、必填验证和最大选择数量限制
 */
export declare class FeedbackCheckboxBlock extends FeedbackBlock<
  FeedbackCheckboxBlockProps,
  FeedbackCheckboxBlockState
> {
  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: FeedbackCheckboxBlockProps);

  /**
   * 组件状态
   */
  state: FeedbackCheckboxBlockState;

  /**
   * 获取当前选中的值
   * @returns 选中值的数组
   */
  getValue(): Array<string | number>;

  /**
   * 检查是否为空（未选择任何选项）
   * 仅在必填时才验证
   * @returns 如果必填且未选择任何项则返回 true
   */
  isEmpty(): boolean;

  /**
   * 处理选中值变化的回调函数
   * 如果超过最大选择数量则不更新状态
   * @param newValues - 新的选中值数组
   */
  onValueChange(newValues: Array<string | number>): void;

  /**
   * 渲染组件
   * @returns React 元素
   */
  render(): JSX.Element;
}