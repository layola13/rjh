/**
 * Time picker selecting modes enumeration
 */
export enum SelectingTimes {
  Hour = 1,
  Minute = 2,
  Second = 3
}

/**
 * Allowed value validator function type
 */
type AllowedValueFunction = (value: number) => boolean;

/**
 * Allowed values configuration - can be a function or array of allowed numbers
 */
type AllowedValues = AllowedValueFunction | number[];

/**
 * Time format types
 */
type TimeFormat = 'ampm' | '24hr';

/**
 * Period type for AM/PM
 */
type Period = 'am' | 'pm';

/**
 * Time value - can be a time string, Date object, or null
 */
type TimeValue = string | Date | null;

/**
 * Component props interface
 */
interface VTimePickerProps {
  /** Function or array to validate allowed hour values */
  allowedHours?: AllowedValues;
  
  /** Function or array to validate allowed minute values */
  allowedMinutes?: AllowedValues;
  
  /** Function or array to validate allowed second values */
  allowedSeconds?: AllowedValues;
  
  /** Whether the picker is disabled */
  disabled?: boolean;
  
  /** Time format - '24hr' or 'ampm' */
  format?: TimeFormat;
  
  /** Minimum allowed time (HH:mm or HH:mm:ss format) */
  min?: string;
  
  /** Maximum allowed time (HH:mm or HH:mm:ss format) */
  max?: string;
  
  /** Whether the picker is readonly */
  readonly?: boolean;
  
  /** Enable scrollable clock */
  scrollable?: boolean;
  
  /** Include seconds in the picker */
  useSeconds?: boolean;
  
  /** Current time value */
  value?: TimeValue;
  
  /** Show AM/PM selector in title instead of clock */
  ampmInTitle?: boolean;
}

/**
 * Component data interface
 */
interface VTimePickerData {
  /** Current hour input (0-23) */
  inputHour: number | null;
  
  /** Current minute input (0-59) */
  inputMinute: number | null;
  
  /** Current second input (0-59) */
  inputSecond: number | null;
  
  /** Lazy-loaded hour value for change detection */
  lazyInputHour: number | null;
  
  /** Lazy-loaded minute value for change detection */
  lazyInputMinute: number | null;
  
  /** Lazy-loaded second value for change detection */
  lazyInputSecond: number | null;
  
  /** Current period (AM/PM) */
  period: Period;
  
  /** Currently selecting component (hour/minute/second) */
  selecting: SelectingTimes;
}

/**
 * Component computed properties interface
 */
interface VTimePickerComputed {
  /** Whether currently selecting hour */
  selectingHour: boolean;
  
  /** Whether currently selecting minute */
  selectingMinute: boolean;
  
  /** Whether currently selecting second */
  selectingSecond: boolean;
  
  /** Computed callback for validating allowed hours with min/max constraints */
  isAllowedHourCb: AllowedValueFunction | null;
  
  /** Computed callback for validating allowed minutes with min/max constraints */
  isAllowedMinuteCb: AllowedValueFunction;
  
  /** Computed callback for validating allowed seconds with min/max constraints */
  isAllowedSecondCb: AllowedValueFunction;
  
  /** Whether using AM/PM format */
  isAmPm: boolean;
}

/**
 * Component methods interface
 */
interface VTimePickerMethods {
  /**
   * Generate formatted time string value (HH:mm or HH:mm:ss)
   * @returns Formatted time string or null if incomplete
   */
  genValue(): string | null;
  
  /**
   * Emit input event with current time value
   */
  emitValue(): void;
  
  /**
   * Set AM/PM period and adjust hour accordingly
   * @param period - 'am' or 'pm'
   */
  setPeriod(period: Period): void;
  
  /**
   * Parse and set input data from value prop
   * @param value - Time value to parse
   */
  setInputData(value: TimeValue): void;
  
  /**
   * Convert 24-hour format to 12-hour format
   * @param hour - Hour in 24-hour format (0-23)
   * @returns Hour in 12-hour format (1-12)
   */
  convert24to12(hour: number): number;
  
  /**
   * Convert 12-hour format to 24-hour format
   * @param hour - Hour in 12-hour format (1-12)
   * @param period - 'am' or 'pm'
   * @returns Hour in 24-hour format (0-23)
   */
  convert12to24(hour: number, period: Period): number;
  
  /**
   * Handle input change from clock component
   * @param value - New time value
   */
  onInput(value: number): void;
  
  /**
   * Handle clock selection change/confirmation
   * @param value - Selected time value
   */
  onChange(value: number): void;
  
  /**
   * Find first allowed value starting from given value
   * @param unit - Time unit ('hour', 'minute', or 'second')
   * @param value - Starting value
   * @returns First allowed value
   */
  firstAllowed(unit: 'hour' | 'minute' | 'second', value: number): number;
  
  /**
   * Generate clock component VNode
   * @returns Clock component VNode
   */
  genClock(): import('vue').VNode;
  
  /**
   * Generate AM/PM selector VNode
   * @returns AM/PM selector VNode
   */
  genClockAmPm(): import('vue').VNode;
  
  /**
   * Generate picker body VNode
   * @returns Picker body VNode
   */
  genPickerBody(): import('vue').VNode;
  
  /**
   * Generate picker title VNode
   * @returns Picker title VNode
   */
  genPickerTitle(): import('vue').VNode;
  
  /**
   * Generate picker button VNode
   * @param type - Button type
   * @param value - Button value
   * @param label - Button label text
   * @param disabled - Whether button is disabled
   * @returns Picker button VNode
   */
  genPickerButton(type: string, value: string, label: string, disabled: boolean): import('vue').VNode;
}

/**
 * VTimePicker component type declaration
 * A time picker component with support for hours, minutes, seconds, and AM/PM format
 */
declare const VTimePicker: import('vue').VueConstructor<
  import('vue').Vue & 
  VTimePickerProps & 
  VTimePickerData & 
  VTimePickerComputed & 
  VTimePickerMethods
>;

export default VTimePicker;

/**
 * Event emissions
 * @fires input - Emitted when time value changes (payload: string | null)
 * @fires change - Emitted when time selection is confirmed (payload: string)
 * @fires click:hour - Emitted when hour is clicked (payload: number)
 * @fires click:minute - Emitted when minute is clicked (payload: number)
 * @fires click:second - Emitted when second is clicked (payload: number)
 * @fires update:period - Emitted when AM/PM period changes (payload: Period)
 */