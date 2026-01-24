/**
 * 属性栏长度输入组件类型定义
 * @module PropertyBarLengthInput
 */

import type { ReactNode, CSSProperties } from 'react';
import type { TooltipProps } from 'antd';

/**
 * 单位类型枚举
 */
declare enum LengthUnitType {
  /** 英尺 */
  foot = 'foot',
  /** 英寸 */
  inch = 'inch',
  /** 米 */
  meter = 'meter',
  /** 厘米 */
  centimeter = 'centimeter',
  /** 毫米 */
  millimeter = 'millimeter',
  /** 千米 */
  kilometer = 'kilometer',
}

/**
 * 数值调整类型枚举（内部使用）
 */
declare enum ValueAdjustType {
  /** 默认值调整步长 */
  VALUE_Default = 10,
  /** 英尺/英寸调整步长 */
  VALUE_FootInch = 2,
  /** 长度单位调整步长 */
  VALUE_LengthUnit = 1,
}

/**
 * 图标配置接口
 */
export interface IconConfig {
  /** 图标颜色，默认为 #F00 */
  iconColor?: string;
  /** 鼠标悬停提示文本 */
  tooltip?: string;
  /** 图标类型，默认为 'hs_shuxingmianban_xiangqing' */
  type?: string;
  /** 图标位置，默认为 'right' */
  iconPosition?: 'left' | 'right';
}

/**
 * 数值范围配置接口
 */
export interface RangeConfig {
  /** 最小值（米为单位） */
  min?: number;
  /** 最大值（米为单位） */
  max?: number;
}

/**
 * 输入规则配置接口
 */
export interface InputRules {
  /** 数值范围限制 */
  range?: RangeConfig;
  /** 是否仅允许正数 */
  positiveOnly?: boolean;
}

/**
 * 复选框选项配置接口
 */
export interface CheckboxOptions {
  /** 复选框标签文本 */
  label?: string;
  /** 复选框选中状态 */
  checked?: boolean;
  /** 复选框禁用状态 */
  disabled?: boolean;
  /** 复选框状态变化回调 */
  onChange?: (checked: boolean) => void;
}

/**
 * 卡片配置接口（用于悬停显示）
 */
export interface CardConfig {
  /** 卡片内容 */
  content?: ReactNode;
  /** 卡片样式 */
  style?: CSSProperties;
  [key: string]: unknown;
}

/**
 * 数字输入框配置选项接口
 */
export interface NumberInputOptions {
  /** 单位类型 */
  unitType?: LengthUnitType;
  /** 显示精度（小数位数） */
  displayDigits?: number;
  /** 是否包含单位显示 */
  includeUnit?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 输入规则 */
  rules?: InputRules;
  /** 禁用状态提示文本 */
  disabledTooltip?: string;
  /** 步长 */
  step?: number;
}

/**
 * 组件属性接口
 */
export interface PropertyBarLengthInputProps {
  /** 标签文本 */
  label?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 是否禁用变更 */
  disableChange?: boolean;
  /** 数字输入框配置选项 */
  options?: NumberInputOptions;
  /** 复选框选项配置 */
  checkboxOptions?: CheckboxOptions;
  /** 缩放步长 */
  scaleStep?: number;
  /** 长度步长，默认为 1 */
  lengthStep?: number;
  /** 输入框值 */
  value?: number;
  /** 图标配置 */
  icon?: IconConfig;
  /** 提示信息配置 */
  tooltip?: string | TooltipProps;
  /** 卡片配置 */
  card?: CardConfig;
  /** 获得焦点回调 */
  onFocus?: () => void;
  /** 失去焦点回调 */
  onBlur?: () => void;
  /** 值变化开始回调 */
  onChangeStart?: (value: number) => void;
  /** 值变化中回调 */
  onChange?: (value: number) => void;
  /** 值变化结束回调 */
  onChangeEnd?: (value: number) => void;
}

/**
 * 组件内部状态接口
 */
interface PropertyBarLengthInputState {
  /** 复选框选中状态 */
  checked: boolean;
  /** 当前输入值 */
  value: number;
  /** 是否鼠标悬停在输入框上 */
  hoverInput: boolean;
  /** 当前悬停的元素 */
  hoverEle: HTMLElement | null;
}

/**
 * 组装数字输入框属性
 * @param props - 组件属性
 * @returns 处理后的数字输入框属性
 */
export declare function assembleProps(props: PropertyBarLengthInputProps): Record<string, unknown>;

/**
 * 小数精度调整函数
 * @param type - 调整类型 ('round' | 'floor' | 'ceil')
 * @param value - 待调整的数值
 * @param precision - 精度（小数位数）
 * @returns 调整后的数值
 * @example
 * decimalAdjust('round', 1.005, 2) // 返回 1.01
 * decimalAdjust('floor', 1.005, 2) // 返回 1.00
 * decimalAdjust('ceil', 1.004, 2)  // 返回 1.01
 */
export declare function decimalAdjust(
  type: 'round' | 'floor' | 'ceil',
  value: number | undefined,
  precision: number | undefined
): number | undefined;

/**
 * 属性栏长度输入组件类
 * 支持多种长度单位、精度控制、范围限制等功能
 */
export default class PropertyBarLengthInput extends React.Component<
  { data: PropertyBarLengthInputProps },
  PropertyBarLengthInputState
> {
  /** 数字输入框属性配置 */
  numberInputProps: Record<string, unknown>;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: { data: PropertyBarLengthInputProps });

  /**
   * 输入框获得焦点事件处理
   */
  onFocus: () => void;

  /**
   * 输入框失去焦点事件处理
   */
  onBlur: () => void;

  /**
   * 鼠标移入输入框事件处理
   * @param event - 鼠标事件
   */
  onMouseOverInput: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * 鼠标移出输入框事件处理
   */
  onMouseLeaveInput: () => void;

  /**
   * 复选框状态变化处理
   * @param checked - 新的选中状态
   */
  handleCheckboxChange(checked: boolean): void;

  /**
   * 输入值变化处理
   * @param value - 新的输入值
   */
  handleValueChange(value: number): void;

  /**
   * 渲染图标
   * @param config - 图标配置
   * @returns 图标元素
   */
  renderIcon(config: IconConfig): ReactNode;

  /**
   * 渲染标签
   * @returns 标签元素
   */
  renderLabel(): ReactNode;

  /**
   * 组件属性更新生命周期（已废弃，使用 UNSAFE_ 前缀）
   * @param nextProps - 新的属性
   */
  UNSAFE_componentWillReceiveProps(nextProps: { data: PropertyBarLengthInputProps }): void;

  /**
   * 渲染组件
   * @returns 组件元素
   */
  render(): ReactNode;
}