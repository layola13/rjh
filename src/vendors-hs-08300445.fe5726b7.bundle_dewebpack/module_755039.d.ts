/**
 * Date panel component type definitions
 * Provides date selection functionality with keyboard navigation support
 */

/**
 * Week day count constant
 */
export const WEEK_DAY_COUNT = 7;

/**
 * Panel name type - indicates which panel view is active
 */
export type PanelName = 'date' | 'month' | 'year';

/**
 * Selection mode - how the date was selected
 */
export type SelectionMode = 'key' | 'mouse';

/**
 * Generic date generation and manipulation configuration
 * @template DateType - The date type used by the implementation
 */
export interface GenerateConfig<DateType> {
  /**
   * Add specified number of years to a date
   */
  addYear(date: DateType, amount: number): DateType;
  
  /**
   * Add specified number of months to a date
   */
  addMonth(date: DateType, amount: number): DateType;
  
  /**
   * Add specified number of days to a date
   */
  addDate(date: DateType, amount: number): DateType;
}

/**
 * Keyboard navigation configuration for date panel
 */
export interface KeyboardConfig {
  /**
   * Handler for left/right arrow keys
   */
  onLeftRight?: (offset: number) => void;
  
  /**
   * Handler for Ctrl + left/right arrow keys
   */
  onCtrlLeftRight?: (offset: number) => void;
  
  /**
   * Handler for up/down arrow keys
   */
  onUpDown?: (offset: number) => void;
  
  /**
   * Handler for Page Up/Down keys
   */
  onPageUpDown?: (offset: number) => void;
}

/**
 * Operation reference for external control
 */
export interface OperationRef {
  /**
   * Keyboard event handler
   */
  onKeyDown: (event: KeyboardEvent) => void;
}

/**
 * Date panel component props
 * @template DateType - The date type used by the implementation
 */
export interface DatePanelProps<DateType = any> {
  /**
   * CSS class prefix for styling
   */
  prefixCls: string;
  
  /**
   * Panel name/type - defaults to 'date'
   * @default 'date'
   */
  panelName?: PanelName;
  
  /**
   * Keyboard navigation configuration
   */
  keyboardConfig?: KeyboardConfig;
  
  /**
   * Whether the panel is currently active
   */
  active?: boolean;
  
  /**
   * Reference object for panel operations
   */
  operationRef: React.MutableRefObject<OperationRef>;
  
  /**
   * Date generation and manipulation utilities
   */
  generateConfig: GenerateConfig<DateType>;
  
  /**
   * Currently selected date value
   */
  value?: DateType | null;
  
  /**
   * Currently displayed date in the view
   */
  viewDate: DateType;
  
  /**
   * Callback when view date changes
   */
  onViewDateChange: (date: DateType) => void;
  
  /**
   * Callback when panel view changes (date/month/year)
   */
  onPanelChange: (mode: PanelName | null, viewDate: DateType) => void;
  
  /**
   * Callback when a date is selected
   * @param date - The selected date
   * @param mode - How the date was selected (keyboard or mouse)
   */
  onSelect: (date: DateType, mode: SelectionMode) => void;
  
  /**
   * Number of weeks to display in the calendar
   */
  rowCount?: number;
}

/**
 * Date panel component for date selection
 * Renders a calendar view with navigation controls and keyboard support
 * 
 * @template DateType - The date type used by the implementation
 * @param props - Component props
 * @returns React element representing the date panel
 * 
 * @example
 *