/**
 * Week panel component for date picker
 * Displays a calendar view with week numbers and allows week selection
 */

import type { GenerateConfig } from './generate';
import type { Locale } from './interface';

/**
 * Props for the Week Panel component
 * @template DateType - The date type used by the date picker (e.g., Date, Dayjs, Moment)
 */
export interface WeekPanelProps<DateType = any> {
  /**
   * CSS class prefix for styling
   */
  prefixCls: string;

  /**
   * Date generation and manipulation utility
   */
  generateConfig: GenerateConfig<DateType>;

  /**
   * Locale configuration for internationalization
   */
  locale: Locale;

  /**
   * Currently selected date value
   */
  value?: DateType | null;

  /**
   * Panel name identifier
   */
  panelName?: string;

  /**
   * Custom function to render prefix column (week number column)
   */
  prefixColumn?: (date: DateType) => React.ReactNode;

  /**
   * Custom function to generate row className based on date
   */
  rowClassName?: (date: DateType) => string;

  /**
   * Keyboard navigation configuration
   */
  keyboardConfig?: {
    /**
     * Handler for left/right arrow key navigation
     * Set to null to disable horizontal navigation in week mode
     */
    onLeftRight?: ((date: DateType) => DateType) | null;
  };
}

/**
 * Week Panel Component
 * 
 * Renders a date picker panel in week selection mode, displaying:
 * - Week numbers in the prefix column
 * - Highlighting for the currently selected week
 * - Disabled horizontal keyboard navigation (week selection is vertical)
 * 
 * @template DateType - The date type used throughout the component
 * @param props - Component props
 * @returns React element representing the week panel
 */
declare function WeekPanel<DateType = any>(
  props: WeekPanelProps<DateType>
): React.ReactElement;

export default WeekPanel;