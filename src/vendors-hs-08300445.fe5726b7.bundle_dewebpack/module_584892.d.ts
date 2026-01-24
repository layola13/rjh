/**
 * 时间选择面板组件的类型定义
 * 用于日期时间选择器中的时间部分
 */

import type { GenerateConfig } from './generateConfig';
import type { Dayjs } from 'dayjs';

/**
 * 键盘事件处理器配置
 */
interface KeyDownHandlerConfig {
  /** 左右箭头键处理 */
  onLeftRight?: (direction: number) => void;
  /** 上下箭头键处理 */
  onUpDown?: (direction: number) => void;
  /** 回车键处理 */
  onEnter?: () => void;
}

/**
 * 操作引用接口
 * 用于暴露给父组件的操作方法
 */
interface OperationRef {
  /** 键盘按下事件处理 */
  onKeyDown: (event: React.KeyboardEvent) => boolean;
  /** 失焦事件处理 */
  onBlur: () => void;
}

/**
 * 列操作引用接口
 * 用于时间列的内部操作
 */
interface ColumnOperationRef {
  /** 上下滚动处理 */
  onUpDown: (offset: number) => void;
}

/**
 * 时间面板组件属性
 * @template DateType - 日期类型泛型
 */
interface TimePanelProps<DateType = Dayjs> {
  /** 日期生成配置对象 */
  generateConfig: GenerateConfig<DateType>;
  
  /** 时间格式化字符串 @default "HH:mm:ss" */
  format?: string;
  
  /** 样式类名前缀 */
  prefixCls: string;
  
  /** 是否处于激活状态 */
  active?: boolean;
  
  /** 操作方法引用 */
  operationRef: React.MutableRefObject<OperationRef | undefined>;
  
  /** 是否显示小时 */
  showHour?: boolean;
  
  /** 是否显示分钟 */
  showMinute?: boolean;
  
  /** 是否显示秒 */
  showSecond?: boolean;
  
  /** 是否使用12小时制 @default false */
  use12Hours?: boolean;
  
  /** 选择时间的回调函数 */
  onSelect: (value: DateType, type: 'key' | 'mouse') => void;
  
  /** 当前选中的时间值 */
  value?: DateType | null;
}

/**
 * 创建键盘事件处理器
 * @param event - 键盘事件对象
 * @param config - 处理器配置
 * @returns 是否阻止默认行为
 */
export declare function createKeyDownHandler(
  event: React.KeyboardEvent,
  config: KeyDownHandlerConfig
): boolean;

/**
 * 时间面板组件
 * 提供小时、分钟、秒的选择功能，支持12/24小时制
 * @template DateType - 日期类型泛型，默认为 Dayjs
 */
declare const TimePanel: <DateType = Dayjs>(
  props: TimePanelProps<DateType>
) => React.ReactElement;

export default TimePanel;