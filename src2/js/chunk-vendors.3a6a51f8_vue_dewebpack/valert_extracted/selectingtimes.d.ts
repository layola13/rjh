/**
 * 时间选择器的选择状态枚举
 * 用于标识当前正在选择的时间单位（小时、分钟或秒）
 */
export enum SelectingTimes {
  /** 选择小时 */
  Hour = 1,
  
  /** 选择分钟 */
  Minute = 2,
  
  /** 选择秒 */
  Second = 3
}

/**
 * 小时类型别名
 * @deprecated 请直接使用 SelectingTimes.Hour
 */
export type Hour = SelectingTimes.Hour;

/**
 * 分钟类型别名
 * @deprecated 请直接使用 SelectingTimes.Minute
 */
export type Minute = SelectingTimes.Minute;

/**
 * 秒类型别名
 * @deprecated 请直接使用 SelectingTimes.Second
 */
export type Second = SelectingTimes.Second;