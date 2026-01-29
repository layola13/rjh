/**
 * Picker panel component type definitions
 * Provides a comprehensive date/time picker panel with multiple modes and configurations
 */

import type { GenerateConfig } from './generate';
import type { Locale } from './interface';
import type { PanelMode, PickerMode } from './PickerPanel';
import type { ComponentType, CSSProperties, MouseEventHandler, KeyboardEventHandler, FocusEventHandler, ReactNode } from 'react';

/**
 * Picker components that can be customized
 */
export interface PickerPanelComponents {
  /** Custom button component */
  button?: ComponentType<any>;
  /** Custom input component */
  input?: ComponentType<any>;
}

/**
 * Time configuration for the picker
 */
export interface TimeConfig {
  /** Default time value when no value is selected */
  defaultValue?: any;
  /** Format string for time display */
  format?: string;
  /** Show hour selection */
  showHour?: boolean;
  /** Show minute selection */
  showMinute?: boolean;
  /** Show second selection */
  showSecond?: boolean;
  /** Use 12-hour format */
  use12Hours?: boolean;
  /** Hour step interval */
  hourStep?: number;
  /** Minute step interval */
  minuteStep?: number;
  /** Second step interval */
  secondStep?: number;
}

/**
 * Shared time-related props
 */
export interface SharedTimeProps {
  /** Hour selection step (default: 1) */
  hourStep?: number;
  /** Minute selection step (default: 1) */
  minuteStep?: number;
  /** Second selection step (default: 1) */
  secondStep?: number;
}

/**
 * Main props for the PickerPanel component
 */
export interface PickerPanelProps<DateType = any> extends SharedTimeProps {
  /** CSS class name prefix (default: 'rc-picker') */
  prefixCls?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Locale configuration for internationalization */
  locale: Locale;
  /** Date generation utilities */
  generateConfig: GenerateConfig<DateType>;
  /** Current selected value */
  value?: DateType | null;
  /** Default value for uncontrolled mode */
  defaultValue?: DateType;
  /** Current picker view date */
  pickerValue?: DateType;
  /** Default picker view date */
  defaultPickerValue?: DateType;
  /** Function to determine if a date should be disabled */
  disabledDate?: (date: DateType) => boolean;
  /** Current panel mode (date/time/month/year/decade) */
  mode?: PanelMode;
  /** Picker type: date, time, week, month, quarter, year, decade */
  picker?: PickerMode;
  /** Tab index for keyboard navigation (default: 0) */
  tabIndex?: number;
  /** Whether to show "Now" button */
  showNow?: boolean;
  /** Enable time selection (boolean or time config object) */
  showTime?: boolean | TimeConfig;
  /** Whether to show "Today" button */
  showToday?: boolean;
  /** Render function for extra footer content */
  renderExtraFooter?: (mode: PanelMode) => ReactNode;
  /** Whether to hide the panel header */
  hideHeader?: boolean;
  /** Callback when a date is selected */
  onSelect?: (value: DateType, type: 'key' | 'mouse' | 'submit') => void;
  /** Callback when the value changes */
  onChange?: (value: DateType) => void;
  /** Callback when panel mode or view date changes */
  onPanelChange?: (value: DateType, mode: PanelMode) => void;
  /** Mouse down event handler */
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  /** Callback when picker view date changes */
  onPickerValueChange?: (value: DateType) => void;
  /** Callback when OK button is clicked */
  onOk?: (value: DateType) => void;
  /** Custom components to override defaults */
  components?: PickerPanelComponents;
  /** Text direction: ltr or rtl */
  direction?: 'ltr' | 'rtl';
}

/**
 * PickerPanel functional component
 * Main panel component that renders different picker modes (date, time, month, year, etc.)
 * 
 * @template DateType - The date type used by the generate config
 * @param props - Component props
 * @returns React element representing the picker panel
 */
declare function PickerPanel<DateType = any>(
  props: PickerPanelProps<DateType>
): ReactNode;

export default PickerPanel;