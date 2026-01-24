/**
 * TimePicker Component Type Definitions
 * Provides time selection functionality with support for single time and time range picking
 */

import type { Ref, ReactElement } from 'react';
import type { PickerTimeProps, RangePickerTimeProps } from 'antd/es/date-picker/generatePicker';
import type { PickerRef } from 'rc-picker';

/**
 * Props for the TimePicker component
 * @template DateType - The type of date object (e.g., Dayjs, Moment, Date)
 */
export interface TimePickerProps<DateType = any> extends Omit<PickerTimeProps<DateType>, 'picker' | 'mode'> {
  /**
   * @deprecated Use `renderExtraFooter` instead
   * Additional content to render in the picker dropdown footer
   */
  addon?: () => ReactElement;
  
  /**
   * Render extra footer content in the picker dropdown
   */
  renderExtraFooter?: () => ReactElement;
  
  /**
   * @deprecated Use `dropdownClassName` instead
   * Custom class name for the picker popup
   */
  popupClassName?: string;
  
  /**
   * Custom class name for the picker dropdown
   */
  dropdownClassName?: string;
  
  /**
   * Ref object for accessing the picker instance
   */
  ref?: Ref<PickerRef>;
}

/**
 * Props for the RangePicker component (time range selection)
 * @template DateType - The type of date object (e.g., Dayjs, Moment, Date)
 */
export interface TimeRangePickerProps<DateType = any> extends Omit<RangePickerTimeProps<DateType>, 'picker' | 'mode'> {
  /**
   * Ref object for accessing the range picker instance
   */
  ref?: Ref<PickerRef>;
}

/**
 * TimePicker component for selecting time values
 * @template DateType - The type of date object used internally
 */
export interface TimePickerComponent<DateType = any> {
  (props: TimePickerProps<DateType>): ReactElement;
  
  /**
   * Display name for React DevTools
   */
  displayName?: string;
  
  /**
   * RangePicker sub-component for selecting time ranges
   */
  RangePicker: (props: TimeRangePickerProps<DateType>) => ReactElement;
}

/**
 * Default export: TimePicker component with RangePicker sub-component
 */
declare const TimePicker: TimePickerComponent;

export default TimePicker;