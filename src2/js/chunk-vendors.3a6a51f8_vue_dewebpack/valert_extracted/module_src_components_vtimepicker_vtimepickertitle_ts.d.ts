/**
 * VTimePickerTitle Component Type Definitions
 * 
 * A component for displaying and interacting with time picker title,
 * supporting 12/24 hour formats and optional seconds display.
 */

import Vue from 'vue';
import { VNode } from 'vue/types/vnode';

/**
 * Time period enumeration for AM/PM format
 */
export type TimePeriod = 'am' | 'pm';

/**
 * Component props interface
 */
export interface VTimePickerTitleProps {
  /**
   * Enable 12-hour format with AM/PM display
   * @default false
   */
  ampm?: boolean;

  /**
   * Make AM/PM selector read-only (shows only current period)
   * @default false
   */
  ampmReadonly?: boolean;

  /**
   * Disable all interactions
   * @default false
   */
  disabled?: boolean;

  /**
   * Current hour value (0-23 for 24h, 1-12 for 12h format)
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
   * Current period for 12-hour format ('am' or 'pm')
   */
  period?: TimePeriod;

  /**
   * Make time values read-only (disables hour/minute/second selection)
   * @default false
   */
  readonly?: boolean;

  /**
   * Display seconds in the time picker
   * @default false
   */
  useSeconds?: boolean;

  /**
   * Currently selected time unit (from SelectingTimes enum)
   */
  selecting?: number;
}

/**
 * Component methods interface
 */
export interface VTimePickerTitleMethods {
  /**
   * Generate the time display section with hour, minute, and optional second buttons
   * @returns VNode containing time picker buttons
   */
  genTime(): VNode;

  /**
   * Generate the AM/PM selector section
   * @returns VNode containing AM/PM buttons
   */
  genAmPm(): VNode;

  /**
   * Inherited from picker-button mixin
   * Generate a clickable picker button for time unit selection
   * @param prop - Property name to emit on click
   * @param value - Value to emit
   * @param content - Button text content
   * @param disabled - Whether button is disabled
   * @returns VNode for the picker button
   */
  genPickerButton(
    prop: string,
    value: number | string,
    content: string,
    disabled?: boolean
  ): VNode;
}

/**
 * VTimePickerTitle Component
 * 
 * Displays the title bar of a time picker with interactive time units
 * and optional AM/PM period selector.
 */
declare const VTimePickerTitle: Vue & {
  name: 'v-time-picker-title';
  props: VTimePickerTitleProps;
  methods: VTimePickerTitleMethods;
  
  /**
   * Render function
   * @param createElement - Vue's h function
   * @returns Root VNode with time display and optional AM/PM selector
   */
  render(createElement: typeof Vue.prototype.$createElement): VNode;
};

export default VTimePickerTitle;