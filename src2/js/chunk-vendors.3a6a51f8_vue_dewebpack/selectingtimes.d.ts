/**
 * Enum representing the different time units that can be selected in the time picker.
 * Each value corresponds to a specific time component selection mode.
 */
export enum SelectingTimes {
  /** Selecting hours (value: 1) */
  Hour = 1,
  
  /** Selecting minutes (value: 2) */
  Minute = 2,
  
  /** Selecting seconds (value: 3) */
  Second = 3
}

/**
 * Type alias for Hour selection mode
 */
export type Hour = SelectingTimes.Hour;

/**
 * Type alias for Minute selection mode
 */
export type Minute = SelectingTimes.Minute;

/**
 * Type alias for Second selection mode
 */
export type Second = SelectingTimes.Second;