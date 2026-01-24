/**
 * 时间选择面板类型定义
 * Module: module_861963
 * Original ID: 861963
 */

import type { Locale } from './locale';
import type { GenerateConfig } from './generate';

/**
 * 时间单元项
 */
export interface TimeUnit {
  /** 显示标签 */
  label: string;
  /** 实际值 */
  value: number;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 时间面板操作引用
 */
export interface TimeOperationRef {
  /**
   * 上下键操作处理
   * @param direction - 方向，1为向下，-1为向上
   */
  onUpDown: (direction: number) => void;
}

/**
 * 时间选择类型
 */
export type TimeSelectType = 'mouse' | 'keyboard';

/**
 * 时间面板属性
 */
export interface TimePanelProps<DateType = any> {
  /** 日期生成器配置 */
  generateConfig: GenerateConfig<DateType>;
  /** 样式前缀 */
  prefixCls: string;
  /** 操作引用 */
  operationRef: React.MutableRefObject<TimeOperationRef | undefined>;
  /** 当前激活的列索引 */
  activeColumnIndex: number;
  /** 当前值 */
  value?: DateType | null;
  /** 是否显示小时 */
  showHour?: boolean;
  /** 是否显示分钟 */
  showMinute?: boolean;
  /** 是否显示秒 */
  showSecond?: boolean;
  /** 是否使用12小时制 */
  use12Hours?: boolean;
  /** 小时步长，默认1 */
  hourStep?: number;
  /** 分钟步长，默认1 */
  minuteStep?: number;
  /** 秒步长，默认1 */
  secondStep?: number;
  /** 禁用的小时 */
  disabledHours?: () => number[];
  /** 禁用的分钟 */
  disabledMinutes?: (hour: number) => number[];
  /** 禁用的秒 */
  disabledSeconds?: (hour: number, minute: number) => number[];
  /** 是否隐藏禁用选项 */
  hideDisabledOptions?: boolean;
  /**
   * 选择回调
   * @param date - 选中的日期
   * @param type - 选择类型
   */
  onSelect: (date: DateType, type: TimeSelectType) => void;
}

/**
 * 列配置项
 */
export interface ColumnConfig {
  /** 列节点 */
  node: React.ReactElement;
  /** 选择回调 */
  onSelect: (value: number) => void;
  /** 当前值 */
  value: number;
  /** 时间单元数组 */
  units: TimeUnit[];
}

/**
 * 时间面板默认导出组件
 */
declare const TimePanel: <DateType = any>(
  props: TimePanelProps<DateType>
) => React.ReactElement;

export default TimePanel;