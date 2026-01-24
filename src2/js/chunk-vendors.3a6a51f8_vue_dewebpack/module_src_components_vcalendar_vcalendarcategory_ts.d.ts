import VCalendarDaily from './VCalendarDaily';
import { VNode } from 'vue';
import { PropType } from 'vue';

/**
 * 日期范围接口
 */
interface DateRange {
  /** 开始日期时间戳 */
  start: number;
  /** 结束日期时间戳 */
  end: number;
}

/**
 * 日期时间戳对象
 */
interface Timestamp {
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
  /** 小时 (0-23) */
  hour: number;
  /** 分钟 (0-59) */
  minute: number;
  /** 星期几 (0-6, 0为周日) */
  weekday: number;
}

/**
 * 日历范围作用域
 */
interface CalendarScope {
  /** 当前时间戳 */
  timestamp: Timestamp;
  /** 本周所有日期 */
  week: Timestamp[];
  /** 当前索引 */
  index?: number;
}

/**
 * 分类作用域，扩展日历作用域
 */
interface CategoryScope extends CalendarScope {
  /** 分类名称，null表示无效分类 */
  category: string | null;
}

/**
 * 鼠标事件处理器映射
 */
interface MouseEventHandlers {
  click?: (event: MouseEvent) => void;
  contextmenu?: (event: MouseEvent) => void;
  mousedown?: (event: MouseEvent) => void;
  mousemove?: (event: MouseEvent) => void;
  mouseup?: (event: MouseEvent) => void;
  mouseenter?: (event: MouseEvent) => void;
  mouseleave?: (event: MouseEvent) => void;
}

/**
 * VCalendarCategory 组件属性
 */
interface VCalendarCategoryProps {
  /**
   * 分类列表
   * 可以是逗号分隔的字符串或字符串数组
   * @example "工作, 个人, 其他"
   * @example ["工作", "个人", "其他"]
   */
  categories?: string | string[];

  /**
   * 无效分类的占位符名称
   * @default "未分类"
   */
  categoryForInvalid?: string;

  /**
   * 显示的日期列表
   */
  days?: Timestamp[];

  /**
   * 主题相关的CSS类名
   */
  themeClasses?: Record<string, boolean>;
}

/**
 * VCalendarCategory 组件
 * 
 * 扩展自 VCalendarDaily，提供分类视图功能的日历组件
 * 可以将日历按照不同分类进行列展示
 * 
 * @example
 *