/**
 * Month panel component for date picker
 * Handles month selection and navigation within a year
 */

import type { GenerateConfig } from './GenerateConfig';
import type { PanelMode } from './interface';

/**
 * Reference object for panel operations
 */
export interface OperationRef {
  /**
   * Keyboard event handler for panel navigation
   * @param event - Keyboard event
   */
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
}

/**
 * Source of the selection action
 */
export type SelectSource = 'key' | 'mouse';

/**
 * Props for the MonthPanel component
 */
export interface MonthPanelProps<DateType = any> {
  /** CSS class prefix for styling */
  prefixCls: string;
  
  /** Reference to panel operation handlers */
  operationRef: React.MutableRefObject<OperationRef>;
  
  /** Callback fired when the view date changes */
  onViewDateChange: (date: DateType) => void;
  
  /** Date generation and manipulation utility */
  generateConfig: GenerateConfig<DateType>;
  
  /** Currently selected date value */
  value?: DateType | null;
  
  /** Currently displayed date in the panel */
  viewDate: DateType;
  
  /** Callback fired when the panel mode changes */
  onPanelChange: (mode: PanelMode | null, date: DateType) => void;
  
  /** Callback fired when a date is selected */
  onSelect: (date: DateType, source: SelectSource) => void;
}

/**
 * Month panel component for date picker
 * Displays a grid of months and handles month selection
 * 
 * @param props - Component properties
 * @returns React element representing the month panel
 */
declare function MonthPanel<DateType = any>(
  props: MonthPanelProps<DateType>
): React.ReactElement;

export default MonthPanel;

/**
 * Number of columns in the month grid
 * @internal
 */
export declare const MONTH_COL_COUNT: number;

/**
 * Panel mode type definition
 */
export type PanelMode = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | 'decade';