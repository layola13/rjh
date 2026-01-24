/**
 * Date panel body component for rendering calendar date cells
 * Handles date selection, range highlighting, and custom date rendering
 */

import type { GenerateConfig } from './GenerateConfig';
import type { Locale } from './Locale';
import type { ReactNode } from 'react';

/**
 * Props for the DateBody component
 */
export interface DateBodyProps<DateType> {
  /** CSS class prefix for styling */
  prefixCls: string;
  
  /** Date generation configuration utility */
  generateConfig: GenerateConfig<DateType>;
  
  /** Whether to show a prefix column (e.g., for week numbers) */
  prefixColumn?: boolean;
  
  /** Locale configuration for date formatting and weekday names */
  locale: Locale;
  
  /** Number of rows to render in the calendar grid */
  rowCount: number;
  
  /** The currently displayed date (determines which month/year is shown) */
  viewDate: DateType;
  
  /** Currently selected date value */
  value?: DateType | null;
  
  /** Custom render function for date cells */
  dateRender?: (date: DateType, today: DateType) => ReactNode;
}

/**
 * Context value for range selection state
 */
export interface RangeContextValue<DateType> {
  /** The selected date range [start, end] */
  rangedValue?: [DateType | null, DateType | null] | null;
  
  /** The hovered date range during selection */
  hoverRangedValue?: [DateType | null, DateType | null] | null;
}

/**
 * Cell metadata for styling and state
 */
export interface CellRenderInfo<DateType> {
  /** CSS class prefix for the cell */
  cellPrefixCls: string;
  
  /** Today's date for comparison */
  today: DateType;
  
  /** Currently selected value */
  value?: DateType | null;
  
  /** Date generation utilities */
  generateConfig: GenerateConfig<DateType>;
  
  /** Selected range (null if not in range mode) */
  rangedValue?: [DateType | null, DateType | null] | null;
  
  /** Hovered range during selection */
  hoverRangedValue?: [DateType | null, DateType | null] | null;
  
  /** Function to check if two dates represent the same cell */
  isSameCell: (date1: DateType, date2: DateType) => boolean;
  
  /** Function to check if a date is in the current view */
  isInView: (date: DateType) => boolean;
  
  /** Function to offset a date by a number of days */
  offsetCell: (date: DateType, offset: number) => DateType;
}

/**
 * Renders the date picker body with calendar grid
 * Displays days of the month with support for:
 * - Range selection highlighting
 * - Custom date cell rendering
 * - Hover states
 * - Localized weekday headers
 * 
 * @param props - Component configuration
 * @returns React element representing the calendar date grid
 */
declare function DateBody<DateType>(props: DateBodyProps<DateType>): ReactNode;

export default DateBody;