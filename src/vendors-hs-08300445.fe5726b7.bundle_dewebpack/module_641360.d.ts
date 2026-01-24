/**
 * DateTime 面板组件类型定义
 * 结合日期选择器和时间选择器的复合组件
 */

import type { GenerateConfig } from './generate';
import type { Locale } from './interface';
import type { DisabledTime, EventValue, PanelMode } from './interface';

/**
 * 操作引用接口
 * 用于暴露面板的键盘和焦点控制方法
 */
export interface OperationRef {
  /**
   * 键盘按键事件处理
   * @param event - 键盘事件对象
   * @returns 是否阻止默认行为
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => boolean;

  /**
   * 失焦事件处理
   * @param event - 焦点事件对象
   */
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;

  /**
   * 面板关闭事件处理
   * @param event - 焦点事件对象
   */
  onClose?: (event: React.FocusEvent<HTMLElement>) => void;
}

/**
 * 时间配置接口
 * 定义时间选择器的显示和默认值配置
 */
export interface ShowTimeConfig<DateType = any> {
  /**
   * 时间选择器的默认值
   */
  defaultValue?: DateType;

  /**
   * 时间格式化字符串
   */
  format?: string;

  /**
   * 是否显示"此刻"按钮
   */
  showNow?: boolean;

  /**
   * 是否显示小时列
   */
  showHour?: boolean;

  /**
   * 是否显示分钟列
   */
  showMinute?: boolean;

  /**
   * 是否显示秒钟列
   */
  showSecond?: boolean;

  /**
   * 小时选项间隔
   */
  hourStep?: number;

  /**
   * 分钟选项间隔
   */
  minuteStep?: number;

  /**
   * 秒钟选项间隔
   */
  secondStep?: number;
}

/**
 * DateTime 面板组件属性
 */
export interface DateTimePanelProps<DateType = any> {
  /**
   * 样式类名前缀
   */
  prefixCls: string;

  /**
   * 操作方法引用对象
   */
  operationRef: React.MutableRefObject<OperationRef | undefined>;

  /**
   * 日期生成配置对象
   * 提供日期的创建、格式化、比较等工具方法
   */
  generateConfig: GenerateConfig<DateType>;

  /**
   * 当前选中的日期时间值
   */
  value?: DateType | null;

  /**
   * 默认日期时间值
   */
  defaultValue?: DateType;

  /**
   * 国际化配置
   */
  locale?: Locale;

  /**
   * 禁用时间配置函数
   * @param date - 当前日期
   * @returns 禁用的小时、分钟、秒钟配置
   */
  disabledTime?: (date: DateType | null) => DisabledTime;

  /**
   * 是否显示时间选择器
   * - true: 显示默认时间选择器
   * - false: 不显示时间选择器
   * - object: 自定义时间选择器配置
   */
  showTime?: boolean | ShowTimeConfig<DateType>;

  /**
   * 日期时间选择回调
   * @param value - 选中的日期时间值
   * @param type - 触发来源类型 ('mouse' | 'keyboard')
   */
  onSelect?: (value: DateType, type: 'mouse' | 'keyboard') => void;

  /**
   * 面板模式变化回调
   * @param mode - 新的面板模式
   */
  onPanelChange?: (mode: PanelMode) => void;
}

/**
 * 焦点面板类型
 * 用于标识当前激活的是日期面板还是时间面板
 */
export type FocusPanel = 'date' | 'time' | null;

/**
 * DateTime 面板组件
 * 
 * @description
 * 组合日期选择器和时间选择器的复合组件，支持：
 * - Tab 键在日期和时间面板间切换
 * - 方向键导航和选择
 * - 独立的日期和时间禁用配置
 * - 自动填充默认时间值
 * 
 * @template DateType - 日期类型，由 generateConfig 决定
 * 
 * @example
 *