/**
 * Quarter panel component for date picker
 * Displays quarters (Q1-Q4) in a single row
 */

import type { GenerateConfig } from './generateConfig';
import type { Locale } from './locale';
import type { RangeValue } from './interface';

/**
 * Number of columns in the quarter panel (4 quarters per year)
 */
export const QUARTER_COL_COUNT = 4;

/**
 * Props for the QuarterBody component
 */
export interface QuarterBodyProps<DateType = any> {
  /** CSS class prefix for styling */
  prefixCls: string;
  
  /** Locale configuration for internationalization */
  locale: Locale;
  
  /** Currently selected date value */
  value?: DateType | null;
  
  /** The date being viewed/displayed in the panel */
  viewDate: DateType;
  
  /** Configuration object for date generation and manipulation */
  generateConfig: GenerateConfig<DateType>;
  
  /** Callback fired when a quarter cell is selected */
  onSelect?: (value: DateType) => void;
  
  /** Function to disable specific dates */
  disabledDate?: (date: DateType) => boolean;
}

/**
 * Context value for range selection state
 */
export interface RangeContextValue<DateType = any> {
  /** The selected range value [start, end] */
  rangedValue?: RangeValue<DateType>;
  
  /** The range value being hovered [start, end] */
  hoverRangedValue?: RangeValue<DateType>;
}

/**
 * Props for cell range hook
 */
export interface UseCellRangeProps<DateType = any> {
  /** CSS class prefix for cell styling */
  cellPrefixCls: string;
  
  /** Currently selected date value */
  value?: DateType | null;
  
  /** Configuration object for date operations */
  generateConfig: GenerateConfig<DateType>;
  
  /** The selected range value */
  rangedValue?: RangeValue<DateType>;
  
  /** The range value being hovered */
  hoverRangedValue?: RangeValue<DateType>;
  
  /** Function to check if two cells represent the same period */
  isSameCell: (current: DateType, target: DateType) => boolean;
  
  /** Function to check if a date is in the current view */
  isInView: (date: DateType) => boolean;
  
  /** Function to offset a cell by a given amount */
  offsetCell: (date: DateType, offset: number) => DateType;
}

/**
 * Quarter panel body component
 * Renders a grid of quarters for selection in a date picker
 * 
 * @template DateType - The date type used by the date library
 * @param props - Component props
 * @returns React element rendering the quarter panel
 */
declare function QuarterBody<DateType = any>(
  props: QuarterBodyProps<DateType>
): React.ReactElement;

export default QuarterBody;