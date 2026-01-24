/**
 * AxialRotation Component Module
 * 
 * 提供轴向旋转控件的React组件，用于属性栏中的旋转值编辑
 */

/**
 * 轴向旋转值数据结构
 */
export interface AxialRotationValueData {
  /** 当前旋转角度值 */
  value?: number;
  /** 最小值限制 */
  min?: number;
  /** 最大值限制 */
  max?: number;
  /** 步进值 */
  step?: number;
  [key: string]: unknown;
}

/**
 * 轴向旋转标签数据结构
 */
export interface AxialRotationLabelData {
  /** 标签文本 */
  text?: string;
  /** 标签图标 */
  icon?: string;
  [key: string]: unknown;
}

/**
 * 值变化事件处理器
 */
export type ValueChangeHandler = (value: number) => void;

/**
 * AxialRotation组件的数据属性
 */
export interface AxialRotationData {
  /** 组件主标签文本 */
  label?: string;
  /** 旋转值数据配置 */
  valueData?: AxialRotationValueData;
  /** 轴向标签数据 */
  labelData?: AxialRotationLabelData;
  /** 自定义CSS类名 */
  className?: string;
  /** 是否禁用组件 */
  disabled?: boolean;
  /** 值开始变化时的回调 */
  onValueChangeStart?: ValueChangeHandler;
  /** 值变化中的回调 */
  onValueChanged?: ValueChangeHandler;
  /** 值变化结束时的回调 */
  onValueChangeEnd?: ValueChangeHandler;
  /** 其他扩展属性 */
  [key: string]: unknown;
}

/**
 * AxialRotation组件属性
 */
export interface AxialRotationProps {
  /** 组件唯一标识符 */
  id?: string;
  /** 组件配置数据 */
  data: AxialRotationData;
}

/**
 * 轴向旋转属性栏组件
 * 
 * 用于在属性栏中显示和编辑三维对象的轴向旋转值，
 * 提供可视化的旋转控制界面和数值输入功能
 * 
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *