/**
 * Date/Time Picker Component Module
 * Provides various date and time picker components with customizable options
 */

/**
 * Configuration for time-related display options
 */
export interface TimeDisplayConfig {
  /** Format string or array of format strings for date/time display */
  format?: string | string[];
  /** Type of picker: 'date' | 'week' | 'month' | 'year' | 'time' | 'quarter' */
  picker?: 'date' | 'week' | 'month' | 'year' | 'time' | 'quarter';
  /** Whether to show hour selection */
  showHour?: boolean;
  /** Whether to show minute selection */
  showMinute?: boolean;
  /** Whether to show second selection */
  showSecond?: boolean;
  /** Whether to use 12-hour format with AM/PM */
  use12Hours?: boolean;
}

/**
 * Return type for time properties, either direct config or wrapped in showTime
 */
export type TimePropsResult = TimeDisplayConfig | { showTime: TimeDisplayConfig };

/**
 * Extracts and normalizes time-related properties from configuration
 * @param config - Time display configuration object
 * @returns Normalized time properties, either as direct config (for time picker) or wrapped in showTime property
 */
export function getTimeProps(config: TimeDisplayConfig): TimePropsResult;

/**
 * Base picker component props
 */
export interface BasePickerProps {
  /** Current value or selected date */
  value?: any;
  /** Default value */
  defaultValue?: any;
  /** Callback when value changes */
  onChange?: (value: any) => void;
  /** Date format string(s) */
  format?: string | string[];
  /** Disabled state */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  [key: string]: any;
}

/**
 * Date Picker component
 */
export interface DatePickerComponent {
  (props: BasePickerProps): JSX.Element;
  /** Week picker variant */
  WeekPicker: (props: BasePickerProps) => JSX.Element;
  /** Month picker variant */
  MonthPicker: (props: BasePickerProps) => JSX.Element;
  /** Year picker variant */
  YearPicker: (props: BasePickerProps) => JSX.Element;
  /** Range picker variant for selecting date ranges */
  RangePicker: (props: BasePickerProps) => JSX.Element;
  /** Time picker variant */
  TimePicker: (props: BasePickerProps) => JSX.Element;
  /** Quarter picker variant */
  QuarterPicker: (props: BasePickerProps) => JSX.Element;
}

/**
 * Button component for picker UI
 */
export interface ButtonComponent {
  (props: any): JSX.Element;
}

/**
 * Range item component for range picker
 */
export interface RangeItemComponent {
  (props: any): JSX.Element;
}

/**
 * Sub-components used in picker implementation
 */
export const Components: {
  /** Button component */
  button: ButtonComponent;
  /** Range item component */
  rangeItem: RangeItemComponent;
};

/**
 * Factory function that generates a complete DatePicker component with all variants
 * @param config - Configuration object for picker generation
 * @returns DatePicker component with all sub-pickers (Week, Month, Year, Range, Time, Quarter)
 */
export default function createDatePicker(config: any): DatePickerComponent;