/**
 * Year decade count constant and YearDecadePanel component types
 * @module YEAR_DECADE_COUNT
 */

import type { GenerateConfig } from './generate';
import type { Locale } from './locale';
import type { PanelMode, PanelRefProps } from './interface';

/**
 * Number of years displayed in a decade view
 * @constant
 */
export const YEAR_DECADE_COUNT = 10;

/**
 * Props for the YearDecadePanel component
 * @template DateType - The date type handled by the date picker
 */
export interface YearDecadePanelProps<DateType> {
  /** CSS class prefix for styling */
  prefixCls: string;
  
  /** Reference object for panel operations (keyboard navigation, etc.) */
  operationRef: React.MutableRefObject<PanelRefProps | undefined>;
  
  /** Callback fired when the view date changes */
  onViewDateChange: (date: DateType) => void;
  
  /** Date generation and manipulation utilities */
  generateConfig: GenerateConfig<DateType>;
  
  /** Currently selected date value */
  value?: DateType | null;
  
  /** Date currently displayed in the view */
  viewDate: DateType;
  
  /** Source mode indicating the original panel mode */
  sourceMode: PanelMode;
  
  /** Callback fired when a date is selected */
  onSelect: (date: DateType, source: 'key' | 'mouse') => void;
  
  /** Callback fired when the panel mode changes */
  onPanelChange: (mode: PanelMode, date: DateType) => void;
  
  /** Locale configuration for internationalization */
  locale?: Locale;
  
  /** Function to determine if a date is disabled */
  disabledDate?: (date: DateType) => boolean;
}

/**
 * Year decade panel component for date picker
 * Displays a 10-year period with navigation and selection capabilities
 * 
 * @template DateType - The date type handled by the date picker
 * @param props - Component props
 * @returns React element representing the year decade panel
 */
declare function YearDecadePanel<DateType>(
  props: YearDecadePanelProps<DateType>
): React.ReactElement;

export default YearDecadePanel;