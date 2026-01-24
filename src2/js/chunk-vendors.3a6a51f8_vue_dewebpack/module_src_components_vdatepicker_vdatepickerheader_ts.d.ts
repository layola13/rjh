import Vue, { VNode, VueConstructor } from 'vue';
import { PropValidator } from 'vue/types/options';

/**
 * Date picker header formatter function type
 * Formats the date value for display
 */
export type DatePickerHeaderFormatter = (value: string) => string;

/**
 * Component props interface for VDatePickerHeader
 */
export interface VDatePickerHeaderProps {
  /**
   * Disables interaction with the component
   * @default false
   */
  disabled?: boolean;

  /**
   * Custom formatter function for date display
   * If not provided, uses native locale formatter
   */
  format?: DatePickerHeaderFormatter;

  /**
   * Minimum allowed date in ISO 8601 format (YYYY-MM-DD)
   */
  min?: string;

  /**
   * Maximum allowed date in ISO 8601 format (YYYY-MM-DD)
   */
  max?: string;

  /**
   * Aria label for the next navigation button
   * Used for screen readers and accessibility
   */
  nextAriaLabel?: string;

  /**
   * Icon for the next navigation button
   * @default "$next"
   */
  nextIcon?: string;

  /**
   * Aria label for the previous navigation button
   * Used for screen readers and accessibility
   */
  prevAriaLabel?: string;

  /**
   * Icon for the previous navigation button
   * @default "$prev"
   */
  prevIcon?: string;

  /**
   * Makes the component read-only (non-interactive)
   * @default false
   */
  readonly?: boolean;

  /**
   * Current date value in format YYYY-MM or YYYY
   * Required prop
   */
  value: number | string;

  /**
   * Applies specified color to the control
   * Inherited from colorable mixin
   */
  color?: string;

  /**
   * Applies the dark theme variant
   * Inherited from themeable mixin
   * @default false
   */
  dark?: boolean;

  /**
   * Applies the light theme variant
   * Inherited from themeable mixin
   * @default false
   */
  light?: boolean;
}

/**
 * Component data interface for VDatePickerHeader
 */
export interface VDatePickerHeaderData {
  /**
   * Internal flag to track if date is moving backwards
   * Controls the animation direction for transitions
   */
  isReversing: boolean;
}

/**
 * Component computed properties interface for VDatePickerHeader
 */
export interface VDatePickerHeaderComputed {
  /**
   * Returns the formatter function to use for date display
   * Either custom format prop or native locale formatter
   */
  formatter: DatePickerHeaderFormatter;

  /**
   * Current locale string from Vuetify i18n
   * Inherited from localable mixin
   */
  currentLocale: string;

  /**
   * Theme classes based on dark/light mode
   * Inherited from themeable mixin
   */
  themeClasses: Record<string, boolean>;
}

/**
 * Component methods interface for VDatePickerHeader
 */
export interface VDatePickerHeaderMethods {
  /**
   * Generates a navigation button (previous or next)
   * @param direction - Positive for next, negative for previous
   * @returns VNode for the button
   */
  genBtn(direction: number): VNode;

  /**
   * Calculates the new date value based on navigation direction
   * @param direction - Number of months/years to add (positive) or subtract (negative)
   * @returns New date string in format YYYY-MM or YYYY
   */
  calculateChange(direction: number): string;

  /**
   * Generates the header content with date display and toggle button
   * @returns VNode for the header content
   */
  genHeader(): VNode;

  /**
   * Sets text color on an element
   * Inherited from colorable mixin
   * @param color - Color to apply
   * @param data - VNode data object to modify
   * @returns Modified VNode data with color classes
   */
  setTextColor(color: string | false, data?: Record<string, any>): Record<string, any>;
}

/**
 * VDatePickerHeader component
 * 
 * Date picker header component providing navigation controls and date display.
 * Supports month/year navigation with min/max constraints, custom formatting,
 * and accessibility features.
 * 
 * @example
 *