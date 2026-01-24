import { VNode, CreateElement, VueConstructor } from 'vue';
import { PropValidator } from 'vue/types/options';

/**
 * 时间戳对象接口
 * 用于表示日历中的时间点
 */
export interface CalendarTimestamp {
  /** 日期字符串 (YYYY-MM-DD) */
  date: string;
  /** 时间字符串 (HH:mm) */
  time: string;
  /** 年份 */
  year: number;
  /** 月份 (1-12) */
  month: number;
  /** 日期 (1-31) */
  day: number;
  /** 星期几 (0-6, 0为周日) */
  weekday: number;
  /** 小时 (0-23) */
  hour: number;
  /** 分钟 (0-59) */
  minute: number;
  /** 是否为当前日期 */
  present: boolean;
  /** 是否为过去日期 */
  past: boolean;
  /** 是否为未来日期 */
  future: boolean;
}

/**
 * 日历时间间隔对象接口
 */
export interface CalendarInterval extends CalendarTimestamp {
  /** 间隔索引 */
  index: number;
}

/**
 * 鼠标事件处理器映射接口
 */
export interface MouseEventHandlers {
  [key: string]: {
    /** 事件类型 */
    event: string;
    /** 是否阻止事件冒泡 */
    stop?: boolean;
    /** 是否阻止默认行为 */
    prevent?: boolean;
    /** 返回结果 */
    result?: boolean;
  };
}

/**
 * 插槽作用域对象接口
 */
export interface SlotScope extends CalendarTimestamp {
  /** 周数据数组 */
  week?: CalendarTimestamp[];
  /** 索引 */
  index?: number;
}

/**
 * 样式对象接口
 */
export interface IntervalStyle {
  /** 高度 */
  height?: string | number;
  /** 其他CSS属性 */
  [key: string]: string | number | undefined;
}

/**
 * VCalendarDaily 组件类型声明
 * Vuetify 日历日视图组件
 * 
 * @description
 * 该组件提供日历的日视图展示，支持时间间隔显示、事件处理和自定义插槽
 * 
 * @example
 *