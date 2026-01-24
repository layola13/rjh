/**
 * 季度选择面板组件类型定义
 * @module QuarterPanel
 */

import type { GenerateConfig } from './GenerateConfig';
import type { Dayjs } from 'dayjs';

/**
 * 键盘事件处理器的操作回调集合
 */
interface KeyDownHandlerCallbacks<DateType> {
  /** 左右箭头键处理 - 参数为方向（-1左，1右） */
  onLeftRight?: (direction: number) => void;
  /** Ctrl+左右箭头键处理 - 参数为方向（-1左，1右） */
  onCtrlLeftRight?: (direction: number) => void;
  /** 上下箭头键处理 - 参数为方向（-1上，1下） */
  onUpDown?: (direction: number) => void;
}

/**
 * 面板操作引用接口
 * 用于暴露面板的键盘交互方法
 */
interface PanelOperationRef {
  /** 键盘按下事件处理器 */
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => boolean;
}

/**
 * 选择触发来源类型
 * - "key": 键盘操作触发
 * - "mouse": 鼠标点击触发
 */
type SelectSource = 'key' | 'mouse';

/**
 * 面板类型
 * - "year": 年份选择面板
 * - "quarter": 季度选择面板
 * - null: 无面板切换
 */
type PanelMode = 'year' | 'quarter' | null;

/**
 * 季度面板组件属性接口
 * @template DateType 日期类型（如 Dayjs、Date、Moment 等）
 */
interface QuarterPanelProps<DateType = Dayjs> {
  /** 组件样式类名前缀，用于生成完整的CSS类名 */
  prefixCls: string;
  
  /** 面板操作方法的引用对象，用于父组件调用面板内部方法 */
  operationRef: React.MutableRefObject<PanelOperationRef | null>;
  
  /** 当前选中的日期值，可为空 */
  value?: DateType | null;
  
  /** 当前视图显示的日期（用于确定显示哪一年的季度） */
  viewDate: DateType;
  
  /** 日期工具配置对象，提供日期计算方法（加减月份/年份等） */
  generateConfig: GenerateConfig<DateType>;
  
  /**
   * 视图日期变化回调
   * @param newViewDate 新的视图日期
   */
  onViewDateChange: (newViewDate: DateType) => void;
  
  /**
   * 面板模式切换回调
   * @param mode 新的面板模式
   * @param viewDate 当前视图日期
   */
  onPanelChange: (mode: PanelMode, viewDate: DateType) => void;
  
  /**
   * 日期选择回调
   * @param date 选中的日期
   * @param source 触发来源（键盘或鼠标）
   */
  onSelect: (date: DateType, source: SelectSource) => void;
}

/**
 * 日期工具配置接口
 * @template DateType 日期类型
 */
interface GenerateConfig<DateType> {
  /** 
   * 增加指定月份数
   * @param date 基准日期
   * @param months 要增加的月份数（负数为减少）
   * @returns 计算后的新日期
   */
  addMonth: (date: DateType, months: number) => DateType;
  
  /** 
   * 增加指定年份数
   * @param date 基准日期
   * @param years 要增加的年份数（负数为减少）
   * @returns 计算后的新日期
   */
  addYear: (date: DateType, years: number) => DateType;
}

/**
 * 季度面板组件
 * 用于显示和选择一年中的四个季度
 * 
 * @example
 *