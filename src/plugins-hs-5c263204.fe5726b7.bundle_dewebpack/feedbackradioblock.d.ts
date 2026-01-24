import { FeedbackBlock } from './FeedbackBlock';
import { FeedbackBlockWrapper } from './FeedbackBlockWrapper';
import { FeedbackBlockLabel } from './FeedbackBlockLabel';
import { RadioGroup, Radio, SmartText } from './RadioComponents';

/**
 * 反馈表单单选项数据结构
 */
export interface FeedbackRadioOption {
  /** 选项的唯一标识值 */
  value: string;
  /** 选项显示的文本标签 */
  label: string;
}

/**
 * FeedbackRadioBlock 组件的属性接口
 */
export interface FeedbackRadioBlockProps {
  /** 字段标签文本 */
  label: string;
  /** 是否为必填项，默认为 false */
  required?: boolean;
  /** 单选选项数据数组 */
  data: FeedbackRadioOption[];
  /** 默认选中的值 */
  defaultValue?: string;
}

/**
 * FeedbackRadioBlock 组件的状态接口
 */
export interface FeedbackRadioBlockState {
  /** 当前选中的值 */
  checkedValue: string;
}

/**
 * 反馈表单单选块组件
 * 
 * 用于在反馈表单中渲染单选按钮组，支持内联显示（选项数 <= 4）和垂直排列（选项数 > 4）。
 * 
 * @extends {FeedbackBlock<FeedbackRadioBlockProps, FeedbackRadioBlockState>}
 * 
 * @example
 *