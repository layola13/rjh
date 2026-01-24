/**
 * VTimePickerTitle Component
 * 
 * A component that displays the title section of a time picker,
 * including hour, minute, second (optional), and AM/PM indicators (optional).
 */

import { VNode } from 'vue';
import { SelectingTimes } from './SelectingTimes';

/**
 * Period type for AM/PM indicator
 */
export type Period = 'am' | 'pm';

/**
 * Props for VTimePickerTitle component
 */
export interface VTimePickerTitleProps {
  /**
   * Enable 12-hour format with AM/PM indicator
   */
  ampm?: boolean;

  /**
   * Make AM/PM indicator readonly (only show current period)
   */
  ampmReadonly?: boolean;

  /**
   * Disable all interactive elements
   */
  disabled?: boolean;

  /**
   * Current hour value (0-23 for 24h format, 1-12 for 12h format)
   */
  hour?: number | null;

  /**
   * Current minute value (0-59)
   */
  minute?: number | null;

  /**
   * Current second value (0-59)
   */
  second?: number | null;

  /**
   * Current period (AM or PM) for 12-hour format
   */
  period?: Period;

  /**
   * Make time selection readonly
   */
  readonly?: boolean;

  /**
   * Show seconds in the time picker
   */
  useSeconds?: boolean;

  /**
   * Currently selected time unit (hour, minute, or second)
   */
  selecting?: SelectingTimes;
}

/**
 * Methods for VTimePickerTitle component
 */
export interface VTimePickerTitleMethods {
  /**
   * Generate the time display section with hour, minute, and optionally second
   * @returns VNode representing the time display
   */
  genTime(): VNode;

  /**
   * Generate the AM/PM toggle buttons
   * @returns VNode representing the AM/PM section
   */
  genAmPm(): VNode;

  /**
   * Generate a picker button for time unit selection
   * @param prop - Property name to emit on click
   * @param value - Value to emit
   * @param text - Display text
   * @param disabled - Whether the button is disabled
   * @returns VNode representing the picker button
   */
  genPickerButton(prop: string, value: SelectingTimes | Period, text: string, disabled?: boolean): VNode;
}

/**
 * VTimePickerTitle Component
 * 
 * Displays and allows selection of time units (hour, minute, second)
 * and AM/PM period in a time picker interface.
 */
declare const VTimePickerTitle: {
  name: 'v-time-picker-title';
  props: VTimePickerTitleProps;
  methods: VTimePickerTitleMethods;
  render(createElement: typeof Vue.prototype.$createElement): VNode;
};

export default VTimePickerTitle;