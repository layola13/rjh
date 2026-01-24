/**
 * SelectingTimes enum representing the current selection state in the time picker
 */
export enum SelectingTimes {
  Hour = 1,
  Minute = 2,
  Second = 3
}

/**
 * Function type for validating allowed time values
 */
export type AllowedTimesValidator = (value: number) => boolean;

/**
 * Array or function defining allowed time values
 */
export type AllowedTimes = number[] | AllowedTimesValidator;

/**
 * Time format type: 12-hour (ampm) or 24-hour
 */
export type TimeFormat = 'ampm' | '24hr';

/**
 * Period type for 12-hour format
 */
export type TimePeriod = 'am' | 'pm';

/**
 * Valid value types for the time picker
 */
export type TimePickerValue = string | Date | null;

/**
 * Props interface for VTimePicker component
 */
export interface VTimePickerProps {
  /** Function or array defining allowed hour values */
  allowedHours?: AllowedTimes;
  
  /** Function or array defining allowed minute values */
  allowedMinutes?: AllowedTimes;
  
  /** Function or array defining allowed second values */
  allowedSeconds?: AllowedTimes;
  
  /** Disables the time picker */
  disabled?: boolean;
  
  /** Time format: 'ampm' (12-hour) or '24hr' (24-hour) */
  format?: TimeFormat;
  
  /** Minimum allowed time in HH:MM or HH:MM:SS format */
  min?: string;
  
  /** Maximum allowed time in HH:MM or HH:MM:SS format */
  max?: string;
  
  /** Makes the time picker read-only */
  readonly?: boolean;
  
  /** Enables scrollable clock interface */
  scrollable?: boolean;
  
  /** Includes seconds selection */
  useSeconds?: boolean;
  
  /** Current time value */
  value?: TimePickerValue;
  
  /** Displays AM/PM selector in title area */
  ampmInTitle?: boolean;
  
  /** Primary color for the picker */
  color?: string;
  
  /** Applies dark theme */
  dark?: boolean;
  
  /** Applies light theme */
  light?: boolean;
  
  /** Width of the picker */
  width?: number | string;
  
  /** Makes the picker full width */
  fullWidth?: boolean;
  
  /** Uses landscape orientation */
  landscape?: boolean;
}

/**
 * Data interface for VTimePicker component state
 */
export interface VTimePickerData {
  /** Current input hour (0-23) */
  inputHour: number | null;
  
  /** Current input minute (0-59) */
  inputMinute: number | null;
  
  /** Current input second (0-59) */
  inputSecond: number | null;
  
  /** Previous hour value for change detection */
  lazyInputHour: number | null;
  
  /** Previous minute value for change detection */
  lazyInputMinute: number | null;
  
  /** Previous second value for change detection */
  lazyInputSecond: number | null;
  
  /** Current period (AM/PM) in 12-hour format */
  period: TimePeriod;
  
  /** Currently selected time component (hour, minute, or second) */
  selecting: SelectingTimes;
}

/**
 * Computed properties interface for VTimePicker
 */
export interface VTimePickerComputed {
  /** Whether hour selection is active */
  selectingHour: boolean;
  
  /** Whether minute selection is active */
  selectingMinute: boolean;
  
  /** Whether second selection is active */
  selectingSecond: boolean;
  
  /** Callback function to validate allowed hours */
  isAllowedHourCb: AllowedTimesValidator | undefined;
  
  /** Callback function to validate allowed minutes */
  isAllowedMinuteCb: AllowedTimesValidator | undefined;
  
  /** Callback function to validate allowed seconds */
  isAllowedSecondCb: AllowedTimesValidator | undefined;
  
  /** Whether the picker uses 12-hour (AM/PM) format */
  isAmPm: boolean;
}

/**
 * Methods interface for VTimePicker component
 */
export interface VTimePickerMethods {
  /**
   * Generates formatted time string from current input values
   * @returns Time string in HH:MM or HH:MM:SS format, or null if incomplete
   */
  genValue(): string | null;
  
  /**
   * Emits the current time value if valid
   */
  emitValue(): void;
  
  /**
   * Sets the AM/PM period and adjusts hour accordingly
   * @param period - The period to set ('am' or 'pm')
   */
  setPeriod(period: TimePeriod): void;
  
  /**
   * Parses and sets input data from various value formats
   * @param value - Time value as string, Date, or null
   */
  setInputData(value: TimePickerValue): void;
  
  /**
   * Converts 24-hour format to 12-hour format
   * @param hour - Hour in 24-hour format (0-23)
   * @returns Hour in 12-hour format (1-12)
   */
  convert24to12(hour: number): number;
  
  /**
   * Converts 12-hour format to 24-hour format
   * @param hour - Hour in 12-hour format (1-12)
   * @param period - AM or PM period
   * @returns Hour in 24-hour format (0-23)
   */
  convert12to24(hour: number, period: TimePeriod): number;
  
  /**
   * Handles input changes from clock interaction
   * @param value - New time component value
   */
  onInput(value: number): void;
  
  /**
   * Handles confirmed changes from clock interaction
   * @param value - Confirmed time component value
   */
  onChange(value: number): void;
  
  /**
   * Finds the first allowed value for a given time component
   * @param type - Type of time component ('hour', 'minute', or 'second')
   * @param start - Starting value to search from
   * @returns First allowed value
   */
  firstAllowed(type: 'hour' | 'minute' | 'second', start: number): number;
  
  /**
   * Generates the clock component VNode
   * @returns VNode for the clock component
   */
  genClock(): any;
  
  /**
   * Generates the AM/PM selector VNode
   * @returns VNode for AM/PM selector
   */
  genClockAmPm(): any;
  
  /**
   * Generates the picker body VNode containing the clock
   * @returns VNode for picker body
   */
  genPickerBody(): any;
  
  /**
   * Generates the picker title VNode
   * @returns VNode for picker title
   */
  genPickerTitle(): any;
  
  /**
   * Generates a picker button VNode
   * @param scope - Button scope identifier
   * @param value - Button value
   * @param content - Button content text
   * @param disabled - Whether button is disabled
   * @returns VNode for picker button
   */
  genPickerButton(scope: string, value: string, content: string, disabled: boolean): any;
}

/**
 * Events emitted by VTimePicker component
 */
export interface VTimePickerEvents {
  /**
   * Emitted when the time value changes
   * @param value - New time value in HH:MM or HH:MM:SS format
   */
  input: (value: string) => void;
  
  /**
   * Emitted when a time selection is confirmed
   * @param value - Confirmed time value
   */
  change: (value: string) => void;
  
  /**
   * Emitted when hour is clicked
   * @param value - Hour value
   */
  'click:hour': (value: number) => void;
  
  /**
   * Emitted when minute is clicked
   * @param value - Minute value
   */
  'click:minute': (value: number) => void;
  
  /**
   * Emitted when second is clicked
   * @param value - Second value
   */
  'click:second': (value: number) => void;
  
  /**
   * Emitted when AM/PM period changes
   * @param period - New period value
   */
  'update:period': (period: TimePeriod) => void;
}

/**
 * VTimePicker component class
 * A time picker component with hour, minute, and optional second selection
 */
export default class VTimePicker {
  /** Component props */
  readonly $props: VTimePickerProps;
  
  /** Component data */
  readonly $data: VTimePickerData;
  
  /** Component computed properties */
  readonly $computed: VTimePickerComputed;
  
  /** Component methods */
  readonly $methods: VTimePickerMethods;
  
  /** Component name */
  static readonly name: 'v-time-picker';
}