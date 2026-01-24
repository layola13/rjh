/**
 * RangePicker Component Type Definitions
 * A date/time range picker component with dual input fields for start and end dates
 */

import type { GenerateConfig } from 'rc-picker/lib/generate';
import type { Locale } from 'rc-picker/lib/interface';
import type { Component, CSSProperties, FocusEvent, KeyboardEvent, MouseEvent, ReactNode, Ref } from 'react';

/**
 * Picker type options
 */
export type PickerMode = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year';

/**
 * Panel render context
 */
export interface PanelRenderContext {
  /** Current panel position in range picker */
  panelPosition?: 'left' | 'right';
  /** Whether the date is in selected range */
  inRange?: boolean;
  /** Current ranged value */
  rangedValue?: RangeValue<any>;
  /** Hovered range value */
  hoverRangedValue?: RangeValue<any>;
}

/**
 * Range value tuple: [startDate, endDate]
 */
export type RangeValue<DateType> = [DateType | null, DateType | null] | null;

/**
 * Event info for range change
 */
export interface RangeInfo {
  /** Which end of the range: 'start' or 'end' */
  range: 'start' | 'end';
}

/**
 * Range preset configuration
 */
export interface RangePreset<DateType> {
  /** Display label for the preset */
  label: ReactNode;
  /** Preset date range value or function returning range */
  value: RangeValue<DateType> | (() => RangeValue<DateType>);
}

/**
 * Disabled time configuration for range picker
 */
export interface DisabledTime {
  disabledHours?: () => number[];
  disabledMinutes?: (hour: number) => number[];
  disabledSeconds?: (hour: number, minute: number) => number[];
}

/**
 * ShowTime configuration object
 */
export interface ShowTimeConfig<DateType> {
  /** Whether to show "Now" button */
  showNow?: boolean;
  /** Whether to show "OK" button */
  showOk?: boolean;
  /** Default time value when date is selected */
  defaultValue?: DateType;
  /** Format for time display */
  format?: string;
  /** Whether to use 12-hour format */
  use12Hours?: boolean;
}

/**
 * Custom components override
 */
export interface Components {
  button?: any;
  rangeItem?: any;
}

/**
 * RangePicker component props
 */
export interface RangePickerProps<DateType> {
  /** CSS class prefix for styling */
  prefixCls?: string;
  
  /** Component ID attribute */
  id?: string;
  
  /** Inline style */
  style?: CSSProperties;
  
  /** Additional CSS class names */
  className?: string;
  
  /** Popup panel style */
  popupStyle?: CSSProperties;
  
  /** Dropdown panel CSS class */
  dropdownClassName?: string;
  
  /** CSS transition name for popup animation */
  transitionName?: string;
  
  /** Popup alignment configuration */
  dropdownAlign?: any;
  
  /** Custom popup container mount point */
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  
  /** Date generation and manipulation utilities */
  generateConfig: GenerateConfig<DateType>;
  
  /** Locale configuration for internationalization */
  locale: Locale;
  
  /** Placeholder text for inputs [startPlaceholder, endPlaceholder] */
  placeholder?: [string, string] | string;
  
  /** Auto focus on first input when mounted */
  autoFocus?: boolean;
  
  /** Disabled state for both or individual inputs */
  disabled?: boolean | [boolean, boolean];
  
  /** Date format string or array of format strings */
  format?: string | string[];
  
  /** Picker type: date, week, month, quarter, year, time */
  picker?: PickerMode;
  
  /** Whether to show time selection panel */
  showTime?: boolean | ShowTimeConfig<DateType>;
  
  /** Whether to use 12-hour time format */
  use12Hours?: boolean;
  
  /** Separator text between start and end inputs */
  separator?: ReactNode;
  
  /** Controlled value */
  value?: RangeValue<DateType>;
  
  /** Default uncontrolled value */
  defaultValue?: RangeValue<DateType>;
  
  /** Default visible date in panel when no value selected */
  defaultPickerValue?: RangeValue<DateType>;
  
  /** Controlled open state of popup */
  open?: boolean;
  
  /** Default open state */
  defaultOpen?: boolean;
  
  /** Function to determine if a date should be disabled */
  disabledDate?: (date: DateType) => boolean;
  
  /** Function to determine disabled time ranges */
  disabledTime?: (date: DateType, type: 'start' | 'end') => DisabledTime;
  
  /** Custom date cell render function */
  dateRender?: (currentDate: DateType, today: DateType, info: any) => ReactNode;
  
  /** Custom panel render function for complete control */
  panelRender?: (panelNode: ReactNode) => ReactNode;
  
  /** Preset range shortcuts configuration */
  ranges?: Record<string, RangeValue<DateType> | (() => RangeValue<DateType>)>;
  
  /** Allow empty value for start/end [allowEmptyStart, allowEmptyEnd] */
  allowEmpty?: [boolean, boolean];
  
  /** Show clear button when has value */
  allowClear?: boolean;
  
  /** Custom suffix icon */
  suffixIcon?: ReactNode;
  
  /** Custom clear icon */
  clearIcon?: ReactNode;
  
  /** Ref to imperative picker methods */
  pickerRef?: Ref<RangePickerRef>;
  
  /** Make input readonly (only allow selection via panel) */
  inputReadOnly?: boolean;
  
  /** Controlled panel mode [startMode, endMode] */
  mode?: [PickerMode, PickerMode];
  
  /** Render extra footer content */
  renderExtraFooter?: (mode: PickerMode) => ReactNode;
  
  /** Callback when selected value changes */
  onChange?: (dates: RangeValue<DateType>, dateStrings: [string, string]) => void;
  
  /** Callback when popup open state changes */
  onOpenChange?: (open: boolean) => void;
  
  /** Callback when panel mode changes */
  onPanelChange?: (values: RangeValue<DateType>, modes: [PickerMode, PickerMode]) => void;
  
  /** Callback when user selects date (before confirmation) */
  onCalendarChange?: (
    dates: RangeValue<DateType>,
    dateStrings: [string, string],
    info: RangeInfo
  ) => void;
  
  /** Callback when input receives focus */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  
  /** Callback when input loses focus */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  
  /** Callback when mouse enters the component */
  onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
  
  /** Callback when mouse leaves the component */
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
  
  /** Callback when OK button is clicked */
  onOk?: (dates: RangeValue<DateType>) => void;
  
  /** Callback when key is pressed in input */
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>, preventDefault: () => void) => void;
  
  /** Custom component overrides */
  components?: Components;
  
  /** Whether to sort date range automatically */
  order?: boolean;
  
  /** Layout direction for RTL support */
  direction?: 'ltr' | 'rtl';
  
  /** Active input index (0: start, 1: end) */
  activePickerIndex?: 0 | 1;
  
  /** HTML autocomplete attribute value */
  autoComplete?: string;
}

/**
 * Imperative methods exposed via ref
 */
export interface RangePickerRef {
  /** Programmatically focus the picker */
  focus: () => void;
  
  /** Programmatically blur the picker */
  blur: () => void;
}

/**
 * RangePicker component class
 * A comprehensive date/time range picker with dual inputs, panel selection, and preset ranges
 */
export default class RangePicker<DateType = any> extends Component<RangePickerProps<DateType>> {
  /** Internal ref to picker implementation */
  private pickerRef: Ref<RangePickerRef>;
  
  /** Focus the start input */
  focus(): void;
  
  /** Blur both inputs */
  blur(): void;
}