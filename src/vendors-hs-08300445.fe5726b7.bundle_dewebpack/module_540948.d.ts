/**
 * 日期选择器面板组件类型定义
 * @module PickerPanel
 */

import type { Locale } from './locale';
import type { GenerateConfig } from './generate';
import type { Components } from './interface';

/**
 * 选择器类型
 */
export type PickerMode = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | 'decade';

/**
 * 面板位置（用于范围选择）
 */
export type PanelPosition = 'left' | 'right';

/**
 * 选择触发类型
 */
export type SelectType = 'submit' | 'mouse' | 'key';

/**
 * ShowTime 配置对象
 */
export interface ShowTimeConfig<DateType = any> {
  /** 默认时间值 */
  defaultValue?: DateType;
  /** 其他时间选择器配置 */
  [key: string]: any;
}

/**
 * 操作引用接口
 */
export interface OperationRef {
  /** 键盘事件处理 */
  onKeyDown: (event: React.KeyboardEvent) => boolean;
  /** 关闭面板回调 */
  onClose: () => void;
  /** 失焦事件处理 */
  onBlur?: (event: React.FocusEvent) => void;
}

/**
 * 日期选择器面板属性
 */
export interface PickerPanelProps<DateType = any> {
  /** 组件样式前缀 */
  prefixCls?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 国际化配置 */
  locale: Locale;
  /** 日期生成工具配置 */
  generateConfig: GenerateConfig<DateType>;
  
  /** 当前选中值 */
  value?: DateType | null;
  /** 默认选中值 */
  defaultValue?: DateType | null;
  /** 面板显示的日期值 */
  pickerValue?: DateType;
  /** 默认面板显示的日期值 */
  defaultPickerValue?: DateType;
  
  /** 禁用日期判断函数 */
  disabledDate?: (date: DateType) => boolean;
  /** 面板模式（日期/月份/年份等） */
  mode?: PickerMode;
  /** 选择器类型 */
  picker?: PickerMode;
  /** Tab 键索引 */
  tabIndex?: number;
  
  /** 是否显示"此刻"按钮 */
  showNow?: boolean;
  /** 时间选择配置（boolean 或配置对象） */
  showTime?: boolean | ShowTimeConfig<DateType>;
  /** 是否显示"今天"按钮 */
  showToday?: boolean;
  /** 渲染额外的页脚内容 */
  renderExtraFooter?: (mode: PickerMode) => React.ReactNode;
  /** 是否隐藏头部 */
  hideHeader?: boolean;
  
  /** 选择日期时的回调 */
  onSelect?: (value: DateType, type: SelectType) => void;
  /** 值变化时的回调 */
  onChange?: (value: DateType) => void;
  /** 面板变化时的回调 */
  onPanelChange?: (value: DateType, mode: PickerMode) => void;
  /** 鼠标按下事件 */
  onMouseDown?: (event: React.MouseEvent) => void;
  /** 面板显示日期变化时的回调 */
  onPickerValueChange?: (value: DateType) => void;
  /** 确认按钮点击回调 */
  onOk?: (value: DateType) => void;
  
  /** 自定义组件 */
  components?: Components;
  /** 文字方向 */
  direction?: 'ltr' | 'rtl';
  
  /** 小时步长 */
  hourStep?: number;
  /** 分钟步长 */
  minuteStep?: number;
  /** 秒步长 */
  secondStep?: number;
}

/**
 * 内部上下文 - 操作引用上下文
 */
export interface PickerContextProps {
  /** 操作引用（用于键盘导航等） */
  operationRef?: React.MutableRefObject<OperationRef | undefined>;
  /** 面板 DOM 引用 */
  panelRef?: React.RefObject<HTMLDivElement>;
  /** 选择回调 */
  onSelect?: (value: any, type: SelectType) => void;
  /** 是否隐藏范围快捷选择 */
  hideRanges?: boolean;
  /** 默认打开时的时间值 */
  defaultOpenValue?: any;
  /** 当前面板模式 */
  mode?: PickerMode;
  /** 是否隐藏头部 */
  hideHeader?: boolean;
  /** 是否隐藏上一个按钮 */
  hidePrevBtn?: boolean;
  /** 是否隐藏下一个按钮 */
  hideNextBtn?: boolean;
}

/**
 * 范围选择器上下文
 */
export interface RangeContextProps<DateType = any> {
  /** 是否在范围选择模式 */
  inRange?: boolean;
  /** 面板位置（左侧/右侧） */
  panelPosition?: PanelPosition;
  /** 已选择的范围值 */
  rangedValue?: [DateType | null, DateType | null] | null;
  /** 悬停时的范围值 */
  hoverRangedValue?: [DateType | null, DateType | null] | null;
}

/**
 * 日期选择器面板组件
 * 
 * @remarks
 * 这是一个功能完整的日期选择面板组件，支持：
 * - 多种选择模式：日期、周、月、季度、年、十年、时间
 * - 时间选择（可选）
 * - 范围选择支持
 * - 键盘导航
 * - 国际化
 * - 自定义渲染
 * 
 * @example
 *