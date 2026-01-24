/**
 * Date Picker Header Component
 * Displays formatted date value in the picker header
 */

import type { GenerateConfig } from './generate';
import type { Locale } from './locale';

/**
 * Props for the PickerHeader component
 * @template DateType - The date type used by the date picker
 */
export interface PickerHeaderProps<DateType = any> {
  /**
   * CSS class prefix for styling
   */
  prefixCls: string;

  /**
   * Configuration object for generating and manipulating dates
   */
  generateConfig: GenerateConfig<DateType>;

  /**
   * Locale configuration for formatting
   */
  locale: Locale;

  /**
   * The current date value to display
   */
  value?: DateType | null;

  /**
   * Format string for displaying the date
   */
  format: string;
}

/**
 * Picker Header Component
 * Renders the header section of a date picker with formatted date value.
 * Returns null if hideHeader context is true.
 * 
 * @template DateType - The date type used by the date picker
 * @param props - Component properties
 * @returns React element or null if header should be hidden
 */
declare function PickerHeader<DateType = any>(
  props: PickerHeaderProps<DateType>
): React.ReactElement | null;

export default PickerHeader;