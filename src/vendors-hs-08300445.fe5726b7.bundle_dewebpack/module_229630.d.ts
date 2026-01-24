/**
 * Locale configuration for date/time picker components (en_US)
 * Provides translated labels and format strings for calendar navigation and selection
 */

/**
 * Date picker locale interface
 * Defines all translatable strings and format patterns for date/time components
 */
export interface DatePickerLocale {
  /** Locale identifier (e.g., 'en_US', 'zh_CN') */
  locale: string;
  
  /** Label for "Today" button - navigates to current date */
  today: string;
  
  /** Label for "Now" button - sets current time */
  now: string;
  
  /** Label for button that returns calendar view to today's date */
  backToToday: string;
  
  /** Label for confirmation/submit button */
  ok: string;
  
  /** Label for clear/reset button */
  clear: string;
  
  /** Label for month view/selector */
  month: string;
  
  /** Label for year view/selector */
  year: string;
  
  /** Prompt text for time selection */
  timeSelect: string;
  
  /** Prompt text for date selection */
  dateSelect: string;
  
  /** Prompt text for week selection */
  weekSelect: string;
  
  /** Prompt text for month selection */
  monthSelect: string;
  
  /** Prompt text for year selection */
  yearSelect: string;
  
  /** Prompt text for decade selection */
  decadeSelect: string;
  
  /** Format string for displaying year (e.g., 'YYYY' → '2024') */
  yearFormat: string;
  
  /** Format string for displaying date (e.g., 'M/D/YYYY' → '1/15/2024') */
  dateFormat: string;
  
  /** Format string for displaying day of month (e.g., 'D' → '15') */
  dayFormat: string;
  
  /** Format string for displaying date and time (e.g., 'M/D/YYYY HH:mm:ss') */
  dateTimeFormat: string;
  
  /** Whether to display month before year in headers (true for English locales) */
  monthBeforeYear: boolean;
  
  /** Tooltip/label for previous month navigation (with keyboard shortcut hint) */
  previousMonth: string;
  
  /** Tooltip/label for next month navigation (with keyboard shortcut hint) */
  nextMonth: string;
  
  /** Tooltip/label for previous year navigation (with keyboard shortcut hint) */
  previousYear: string;
  
  /** Tooltip/label for next year navigation (with keyboard shortcut hint) */
  nextYear: string;
  
  /** Tooltip/label for previous decade navigation */
  previousDecade: string;
  
  /** Tooltip/label for next decade navigation */
  nextDecade: string;
  
  /** Tooltip/label for previous century navigation */
  previousCentury: string;
  
  /** Tooltip/label for next century navigation */
  nextCentury: string;
}

/**
 * Default English (US) locale configuration
 * Used as fallback when no specific locale is provided
 */
declare const locale: DatePickerLocale;

export default locale;