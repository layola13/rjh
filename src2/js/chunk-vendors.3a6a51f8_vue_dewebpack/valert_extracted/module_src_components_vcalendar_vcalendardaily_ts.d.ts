import Vue, { VNode, VNodeData, CreateElement, PropType } from 'vue';
import { VueConstructor } from 'vue/types/vue';

/**
 * 时间戳对象接口
 * 表示日历中的一个时间点
 */
export interface CalendarTimestamp {
  /** 日期字符串，格式：YYYY-MM-DD */
  date: string;
  /** 时间字符串，格式：HH:mm */
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
  /** 星期几 (0-6，0为周日) */
  weekday: number;
  /** 是否为今天 */
  present?: boolean;
  /** 是否为过去 */
  past?: boolean;
  /** 是否为未来 */
  future?: boolean;
}

/**
 * 日历事件范围接口
 */
export interface CalendarEventScope extends CalendarTimestamp {
  /** 周数据数组 */
  week?: CalendarTimestamp[];
  /** 索引位置 */
  index?: number;
}

/**
 * 鼠标事件处理器配置
 */
export interface MouseEventHandlerConfig {
  /** 事件名称 */
  event: string;
  /** 是否停止传播 */
  stop?: boolean;
  /** 是否阻止默认行为 */
  prevent?: boolean;
  /** 返回值 */
  result?: boolean;
}

/**
 * 区间样式函数类型
 */
export type IntervalStyleFunction = (timestamp: CalendarTimestamp) => Partial<CSSStyleDeclaration> | Record<string, string | number>;

/**
 * 区间标签显示判断函数类型
 */
export type ShowIntervalLabelFunction = (timestamp: CalendarTimestamp) => boolean;

/**
 * 日期格式化函数类型
 */
export type DateFormatterFunction = (timestamp: CalendarTimestamp, short?: boolean) => string;

/**
 * 星期格式化函数类型
 */
export type WeekdayFormatterFunction = (timestamp: CalendarTimestamp, short?: boolean) => string;

/**
 * 区间格式化函数类型
 */
export type IntervalFormatterFunction = (timestamp: CalendarTimestamp, short?: boolean) => string;

/**
 * VCalendarDaily 组件接口
 * 日历日视图组件，支持按时间间隔显示事件
 */
export interface VCalendarDaily extends Vue {
  // Data
  /** 滚动条推送宽度（用于对齐头部） */
  scrollPush: number;

  // Computed
  /** 组件样式类对象 */
  readonly classes: Record<string, boolean>;
  /** 主题样式类对象 */
  readonly themeClasses: Record<string, boolean>;
  /** 显示的日期数组 */
  readonly days: CalendarTimestamp[];
  /** 区间时间戳二维数组 [day][interval] */
  readonly intervals: CalendarTimestamp[][];
  /** 解析后的开始日期 */
  readonly parsedStart: CalendarTimestamp;

  // Props
  /** 是否隐藏头部 */
  hideHeader?: boolean;
  /** 主题颜色 */
  color?: string;
  /** 是否使用短星期格式 */
  shortWeekdays?: boolean;
  /** 是否使用短区间格式 */
  shortIntervals?: boolean;
  /** 区间宽度（像素） */
  intervalWidth?: number | string;
  /** 区间高度（像素） */
  intervalHeight?: number | string;
  /** 主体高度（像素） */
  bodyHeight?: number | string;
  /** 区间样式函数 */
  intervalStyle?: IntervalStyleFunction;
  /** 区间标签显示判断函数 */
  showIntervalLabel?: ShowIntervalLabelFunction;
  /** 日期格式化函数 */
  dayFormatter?: DateFormatterFunction;
  /** 星期格式化函数 */
  weekdayFormatter?: WeekdayFormatterFunction;
  /** 区间格式化函数 */
  intervalFormatter?: IntervalFormatterFunction;

  // Methods
  /**
   * 初始化组件
   */
  init(): void;

  /**
   * 响应尺寸变化
   */
  onResize(): void;

  /**
   * 获取滚动条宽度补偿值
   * @returns 滚动条宽度（像素）
   */
  getScrollPush(): number;

  /**
   * 生成头部区域
   * @returns VNode
   */
  genHead(): VNode;

  /**
   * 生成头部时间区间列
   * @returns VNode
   */
  genHeadIntervals(): VNode;

  /**
   * 生成所有头部日期列
   * @returns VNode 数组
   */
  genHeadDays(): VNode[];

  /**
   * 生成单个头部日期列
   * @param day - 日期时间戳
   * @param index - 索引位置
   * @returns VNode
   */
  genHeadDay(day: CalendarTimestamp, index: number): VNode;

  /**
   * 生成日期头部内容（插槽内容）
   * @param day - 日期时间戳
   * @param index - 索引位置
   * @returns VNode 数组
   */
  genDayHeader(day: CalendarTimestamp, index: number): VNode[];

  /**
   * 生成头部星期文本
   * @param day - 日期时间戳
   * @returns VNode
   */
  genHeadWeekday(day: CalendarTimestamp): VNode;

  /**
   * 生成头部日期标签容器
   * @param day - 日期时间戳
   * @returns VNode
   */
  genHeadDayLabel(day: CalendarTimestamp): VNode;

  /**
   * 生成头部日期按钮
   * @param day - 日期时间戳
   * @returns VNode
   */
  genHeadDayButton(day: CalendarTimestamp): VNode;

  /**
   * 生成主体区域
   * @returns VNode
   */
  genBody(): VNode;

  /**
   * 生成滚动区域
   * @returns VNode
   */
  genScrollArea(): VNode;

  /**
   * 生成面板容器
   * @returns VNode
   */
  genPane(): VNode;

  /**
   * 生成日期容器
   * @returns VNode
   */
  genDayContainer(): VNode;

  /**
   * 生成所有日期列
   * @returns VNode 数组
   */
  genDays(): VNode[];

  /**
   * 生成单个日期列
   * @param day - 日期时间戳
   * @param index - 索引位置
   * @returns VNode
   */
  genDay(day: CalendarTimestamp, index: number): VNode;

  /**
   * 生成日期主体内容（插槽内容）
   * @param day - 日期时间戳
   * @returns VNode 数组
   */
  genDayBody(day: CalendarTimestamp): VNode[];

  /**
   * 生成日期的所有时间区间
   * @param dayIndex - 日期索引
   * @returns VNode 数组
   */
  genDayIntervals(dayIndex: number): VNode[];

  /**
   * 生成单个时间区间
   * @param interval - 区间时间戳
   * @returns VNode
   */
  genDayInterval(interval: CalendarTimestamp): VNode;

  /**
   * 生成主体时间区间列
   * @returns VNode
   */
  genBodyIntervals(): VNode;

  /**
   * 生成所有区间标签
   * @returns VNode 数组或 null
   */
  genIntervalLabels(): VNode[] | null;

  /**
   * 生成单个区间标签
   * @param interval - 区间时间戳
   * @returns VNode
   */
  genIntervalLabel(interval: CalendarTimestamp): VNode;

  /**
   * 获取相对日期的样式类（今天、过去、未来）
   * @param day - 日期时间戳
   * @returns 样式类对象
   */
  getRelativeClasses(day: CalendarTimestamp): Record<string, boolean>;

  /**
   * 获取默认鼠标事件处理器
   * @param suffix - 事件名后缀
   * @param scopeGetter - 作用域获取函数
   * @returns 事件处理器对象
   */
  getDefaultMouseEventHandlers(
    suffix: string,
    scopeGetter: (event: MouseEvent) => CalendarEventScope
  ): Record<string, (event: MouseEvent) => void>;

  /**
   * 获取鼠标事件处理器
   * @param config - 事件配置对象
   * @param scopeGetter - 作用域获取函数
   * @returns 事件处理器对象
   */
  getMouseEventHandlers(
    config: Record<string, MouseEventHandlerConfig>,
    scopeGetter: (event: MouseEvent) => CalendarEventScope
  ): Record<string, (event: MouseEvent) => void>;

  /**
   * 获取事件位置对应的时间戳
   * @param event - 鼠标事件
   * @param day - 日期时间戳
   * @returns 时间戳对象
   */
  getTimestampAtEvent(event: MouseEvent, day: CalendarTimestamp): CalendarTimestamp;

  /**
   * 获取插槽作用域数据
   * @param timestamp - 时间戳对象
   * @returns 作用域数据
   */
  getSlotScope(timestamp: CalendarTimestamp): CalendarEventScope;

  /**
   * 设置文本颜色
   * @param color - 颜色值
   * @param data - VNode 数据对象
   * @returns VNode 数据对象
   */
  setTextColor(color: string | undefined, data: VNodeData): VNodeData;

  /**
   * 默认区间样式函数
   * @param interval - 区间时间戳
   * @returns 样式对象
   */
  intervalStyleDefault(interval: CalendarTimestamp): Record<string, string | number>;

  /**
   * 默认区间标签显示判断函数
   * @param interval - 区间时间戳
   * @returns 是否显示
   */
  showIntervalLabelDefault(interval: CalendarTimestamp): boolean;

  // Refs
  /** 滚动区域元素引用 */
  $refs: {
    scrollArea: HTMLDivElement;
    pane: HTMLDivElement;
  };
}

/**
 * VCalendarDaily 组件构造函数
 */
declare const VCalendarDaily: VueConstructor<VCalendarDaily>;

export default VCalendarDaily;