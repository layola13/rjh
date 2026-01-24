/**
 * 表示时间结构中的星期信息
 */
interface TimeInfo {
  /** 星期几 (0-6, 0 代表星期日) */
  tm_wday: number;
}

/**
 * 根据时间信息对象中的星期字段，从查找表中获取对应值
 * @param timeInfo - 包含星期信息的对象
 * @returns 查找表中对应星期的值
 */
export declare function getWeekdayValue<T>(timeInfo: TimeInfo): T;