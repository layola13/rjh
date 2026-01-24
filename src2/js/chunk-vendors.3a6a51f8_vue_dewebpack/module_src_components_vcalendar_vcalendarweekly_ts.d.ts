import Vue, { VNode, VueConstructor, CreateElement } from 'vue';
import { VBtn } from '../VBtn';
import CalendarBase from './mixins/calendar-base';

/**
 * 时间戳对象，表示日历中的一个日期点
 */
export interface CalendarTimestamp {
  /** 日期字符串，格式：YYYY-MM-DD */
  date: string;
  /** 年份 */
  year: number;
  /** 月份 (1-12) */
  month: number;
  /** 日期 (1-31) */
  day: number;
  /** 一周中的第几天 (0-6) */
  weekday: number;
  /** 小时 (0-23) */
  hour?: number;
  /** 分钟 (0-59) */
  minute?: number;
  /** 是否为当天 */
  present?: boolean;
  /** 是否为过去的日期 */
  past?: boolean;
  /** 是否为未来的日期 */
  future?: boolean;
}

/**
 * 鼠标事件处理器配置
 */
export interface MouseEventHandlerConfig {
  /** 事件名称 */
  event: string;
  /** 是否停止事件传播 */
  stop?: boolean;
  /** 是否阻止默认行为 */
  prevent?: boolean;
  /** 返回结果 */
  result?: boolean;
}

/**
 * 周数据结构
 */
export interface WeekData extends CalendarTimestamp {
  /** 一周中的天数据列表 */
  days: CalendarTimestamp[];
}

/**
 * 相对类对象，用于标记日期的状态类
 */
export interface RelativeClasses {
  /** 是否为当天 */
  'v-present'?: boolean;
  /** 是否为过去 */
  'v-past'?: boolean;
  /** 是否为未来 */
  'v-future'?: boolean;
  /** 是否在范围外 */
  'v-outside'?: boolean;
}

/**
 * 日期格式化函数类型
 */
export type DateFormatter = (
  timestamp: CalendarTimestamp,
  short: boolean
) => string;

/**
 * 本地化格式化器配置
 */
export interface LocaleFormatterOptions {
  /** 时区 */
  timeZone?: string;
  /** 月份格式：'numeric' | '2-digit' | 'long' | 'short' | 'narrow' */
  month?: string;
  /** 日期格式 */
  day?: string;
  /** 年份格式 */
  year?: string;
}

/**
 * VCalendarWeekly 组件的 props 接口
 */
export interface VCalendarWeeklyProps {
  /** 最小周数 */
  minWeeks?: number | string;
  /** 是否显示周数列 */
  showWeek?: boolean;
  /** 月份格式化函数 */
  monthFormat?: DateFormatter;
  /** 是否在每月第一天显示月份 */
  showMonthOnFirst?: boolean;
  /** 是否使用短月份名称 */
  shortMonths?: boolean;
  /** 是否使用短星期名称 */
  shortWeekdays?: boolean;
  /** 是否隐藏表头 */
  hideHeader?: boolean;
  /** 主题颜色 */
  color?: string;
  /** 当前语言环境 */
  currentLocale?: string;
  /** 工作日配置数组 (0-6, 0=周日) */
  parsedWeekdays?: number[];
  /** 周数跳过配置 */
  weekdaySkips?: number[];
  /** 日期格式化函数 */
  dayFormatter?: DateFormatter;
  /** 星期格式化函数 */
  weekdayFormatter?: DateFormatter;
  /** 一年中第一天的语言环境设置 */
  localeFirstDayOfYear?: number | string;
  /** 日历开始日期 */
  parsedStart?: CalendarTimestamp;
  /** 日历结束日期 */
  parsedEnd?: CalendarTimestamp;
  /** 今天的时间戳信息 */
  times?: {
    today: CalendarTimestamp;
  };
}

/**
 * Slot 作用域数据 - day slot
 */
export interface DaySlotScope extends CalendarTimestamp {
  /** 是否在日历范围外 */
  outside: boolean;
  /** 在一周中的索引 */
  index: number;
  /** 所属周的完整数据 */
  week: CalendarTimestamp[];
}

/**
 * VCalendarWeekly 周视图日历组件
 * 
 * 提供按周显示日历的视图，支持自定义周数、显示周数列、
 * 自定义日期格式化等功能。
 * 
 * @example
 *