/**
 * Moment.js 中文（简体）语言配置模块
 * @module moment-locale-zh-cn
 */

/**
 * Moment.js 核心实例接口
 */
interface MomentStatic {
  /**
   * 定义或切换语言环境
   * @param locale - 语言环境标识符
   * @param config - 语言环境配置对象
   * @returns 当前 Moment 实例
   */
  defineLocale(locale: string, config: LocaleConfiguration): MomentStatic;

  /**
   * 获取当前周数
   * @returns 当前日期所在的周数
   */
  week(): number;
}

/**
 * 长日期格式配置
 */
interface LongDateFormat {
  /** 时间格式（时:分） */
  LT: string;
  /** 时间格式（时:分:秒） */
  LTS: string;
  /** 日期格式（年/月/日） */
  L: string;
  /** 日期格式（年年年年年月日日日） */
  LL: string;
  /** 日期时间格式（年年年年年月日日日上午/下午时点分分分） */
  LLL: string;
  /** 日期时间格式（年年年年年月日日日星期上午/下午时点分分分） */
  LLLL: string;
  /** 简短日期格式（年/月/日） */
  l: string;
  /** 简短日期格式（年年年年年月日日日） */
  ll: string;
  /** 简短日期时间格式（年年年年年月日日日 时:分） */
  lll: string;
  /** 简短日期时间格式（年年年年年月日日日星期 时:分） */
  llll: string;
}

/**
 * 相对时间显示配置
 */
interface RelativeTime {
  /** 未来时间格式模板 */
  future: string;
  /** 过去时间格式模板 */
  past: string;
  /** 几秒钟 */
  s: string;
  /** N 秒 */
  ss: string;
  /** 1 分钟 */
  m: string;
  /** N 分钟 */
  mm: string;
  /** 1 小时 */
  h: string;
  /** N 小时 */
  hh: string;
  /** 1 天 */
  d: string;
  /** N 天 */
  dd: string;
  /** 1 周 */
  w: string;
  /** N 周 */
  ww: string;
  /** 1 个月 */
  M: string;
  /** N 个月 */
  MM: string;
  /** 1 年 */
  y: string;
  /** N 年 */
  yy: string;
}

/**
 * 日历显示配置
 */
interface CalendarConfiguration {
  /** 今天的格式 */
  sameDay: string;
  /** 明天的格式 */
  nextDay: string;
  /** 下周的格式（函数） */
  nextWeek: (now: MomentStatic) => string;
  /** 昨天的格式 */
  lastDay: string;
  /** 上周的格式（函数） */
  lastWeek: (now: MomentStatic) => string;
  /** 其他日期的格式 */
  sameElse: string;
}

/**
 * 周配置
 */
interface WeekConfiguration {
  /** 一周的第一天（0=星期日, 1=星期一） */
  dow: number;
  /** 一年的第一周（包含1月几号） */
  doy: number;
}

/**
 * 语言环境完整配置接口
 */
interface LocaleConfiguration {
  /** 月份名称数组（完整） */
  months: string[];
  /** 月份名称数组（简写） */
  monthsShort: string[];
  /** 星期名称数组（完整） */
  weekdays: string[];
  /** 星期名称数组（简写） */
  weekdaysShort: string[];
  /** 星期名称数组（最简） */
  weekdaysMin: string[];
  /** 长日期格式配置 */
  longDateFormat: LongDateFormat;
  /** 上午/下午解析正则表达式 */
  meridiemParse: RegExp;
  /**
   * 根据上午/下午标识转换小时
   * @param hour - 小时数（0-23）
   * @param meridiem - 上午/下午标识
   * @returns 转换后的24小时制小时数
   */
  meridiemHour: (hour: number, meridiem: string) => number;
  /**
   * 根据小时和分钟返回上午/下午标识
   * @param hour - 小时数
   * @param minute - 分钟数
   * @param isLowercase - 是否小写
   * @returns 上午/下午/凌晨/晚上等标识
   */
  meridiem: (hour: number, minute: number, isLowercase: boolean) => string;
  /** 日历显示配置 */
  calendar: CalendarConfiguration;
  /** 日期序数解析正则 */
  dayOfMonthOrdinalParse: RegExp;
  /**
   * 格式化序数
   * @param num - 数字
   * @param token - 格式化标记（d/D/DDD/M/w/W等）
   * @returns 带单位的序数字符串
   */
  ordinal: (num: number, token: string) => string;
  /** 相对时间配置 */
  relativeTime: RelativeTime;
  /** 周配置 */
  week: WeekConfiguration;
}

/**
 * 初始化中文（简体）语言环境配置
 * @param moment - Moment.js 核心实例
 */
declare function initializeZhCnLocale(moment: MomentStatic): void;

export { LocaleConfiguration, MomentStatic, initializeZhCnLocale };