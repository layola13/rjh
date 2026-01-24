/**
 * Year panel header component for date picker
 * Displays the current year with navigation controls
 */

import type { GenerateConfig } from './generate';
import type { Locale } from './interface';

/**
 * Props for the YearHeader component
 */
export interface YearHeaderProps<DateType> {
  /** CSS class prefix for styling */
  prefixCls: string;
  
  /** Date generation utility configuration */
  generateConfig: GenerateConfig<DateType>;
  
  /** Locale configuration for date formatting */
  locale: Locale;
  
  /** Currently displayed date in the view */
  viewDate: DateType;
  
  /** Callback fired when navigating to next year */
  onNextYear?: () => void;
  
  /** Callback fired when navigating to previous year */
  onPrevYear?: () => void;
  
  /** Callback fired when year button is clicked */
  onYearClick?: () => void;
}

/**
 * Context interface for panel configuration
 */
export interface PanelContext {
  /** Whether to hide the header */
  hideHeader?: boolean;
}

/**
 * Renders the header for year selection panel
 * Contains navigation buttons and current year display
 * 
 * @param props - Component props
 * @returns Year header component or null if header is hidden
 */
declare function YearHeader<DateType>(
  props: YearHeaderProps<DateType>
): React.ReactElement | null;

export default YearHeader;