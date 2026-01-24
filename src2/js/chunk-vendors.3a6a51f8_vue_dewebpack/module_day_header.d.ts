/**
 * Module: module_day_header
 * Original ID: day-header
 * 
 * 处理日期头部模块，用于获取和处理特定日期的事件数据
 */

/**
 * 事件对象接口
 */
interface DayEvent {
  id: string;
  title: string;
  date: Date;
  [key: string]: unknown;
}

/**
 * 获取指定日期所有事件的函数类型
 */
type GetEventsForDayAll = (date: Date) => DayEvent[];

/**
 * 生成日期事件的函数类型
 */
type GenDayEvent = (date: Date) => DayEvent | null;

/**
 * 可选的事件处理函数类型
 */
type OptionalEventProcessor = ((date: Date) => DayEvent[] | null) | undefined;

/**
 * 获取并处理指定日期的事件
 * 
 * @param date - 目标日期
 * @param getEventsForDayAll - 获取日期所有事件的函数
 * @param genDayEvent - 生成日期事件的函数
 * @param shouldFilter - 是否过滤事件
 * @param optionalProcessor - 可选的额外事件处理器
 * @returns 处理后的事件数组，如果没有事件则返回 null
 */
declare function processDayHeader(
  date: Date,
  getEventsForDayAll: GetEventsForDayAll,
  genDayEvent: GenDayEvent,
  shouldFilter: boolean,
  optionalProcessor?: OptionalEventProcessor
): DayEvent[] | null;

export { processDayHeader, DayEvent, GetEventsForDayAll, GenDayEvent, OptionalEventProcessor };