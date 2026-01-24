/**
 * English (US) locale configuration for date/time picker components
 * Provides translations and format strings for calendar navigation and display
 */
interface DatePickerLocale {
  /** Locale identifier */
  locale: string;
  
  /** Label for "Today" button */
  today: string;
  
  /** Label for "Now" button (current time) */
  now: string;
  
  /** Label for button to return to today's date */
  backToToday: string;
  
  /** Label for "Ok" confirmation button */
  ok: string;
  
  /** Label for "Clear" button to reset selection */
  clear: string;
  
  /** Label for "Month" view/selector */
  month: string;
  
  /** Label for "Year" view/selector */
  year: string;
  
  /** Instruction text for time selection */
  timeSelect: string;
  
  /** Instruction text for date selection */
  dateSelect: string;
  
  /** Instruction text for week selection */
  weekSelect: string;
  
  /** Instruction text for month selection */
  monthSelect: string;
  
  /** Instruction text for year selection */
  yearSelect: string;
  
  /** Instruction text for decade selection */
  decadeSelect: string;
  
  /** Format string for displaying years (e.g., "YYYY" -> "2024") */
  yearFormat: string;
  
  /** Format string for displaying dates (e.g., "M/D/YYYY" -> "1/15/2024") */
  dateFormat: string;
  
  /** Format string for displaying day of month (e.g., "D" -> "15") */
  dayFormat: string;
  
  /** Format string for displaying date and time together */
  dateTimeFormat: string;
  
  /** Whether to display month before year in headers (true for English) */
  monthBeforeYear: boolean;
  
  /** Label for previous month navigation (with keyboard shortcut hint) */
  previousMonth: string;
  
  /** Label for next month navigation (with keyboard shortcut hint) */
  nextMonth: string;
  
  /** Label for previous year navigation (with keyboard shortcut hint) */
  previousYear: string;
  
  /** Label for next year navigation (with keyboard shortcut hint) */
  nextYear: string;
  
  /** Label for previous decade navigation */
  previousDecade: string;
  
  /** Label for next decade navigation */
  nextDecade: string;
  
  /** Label for previous century navigation */
  previousCentury: string;
  
  /** Label for next century navigation */
  nextCentury: string;
}

/**
 * Default English (US) locale configuration
 * Used as the default locale for date/time picker components
 */
declare const enUSLocale: DatePickerLocale;

export default enUSLocale;