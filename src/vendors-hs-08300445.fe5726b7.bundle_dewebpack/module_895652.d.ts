import type { GenerateConfig } from './generateConfig';
import type { Locale } from './interface';
import type { PanelMode, PickerMode } from './PickerInput';

/**
 * Props for the PanelBody component
 * @template DateType - The date type used by the date picker
 */
export interface PanelBodyProps<DateType = any> {
  /** CSS class prefix for styling */
  prefixCls: string;
  
  /** Function to determine if a date should be disabled */
  disabledDate?: (date: DateType) => boolean;
  
  /** Callback fired when a date cell is selected */
  onSelect: (date: DateType) => void;
  
  /** The picker type (e.g., 'date', 'week', 'month', 'quarter', 'year') */
  picker: PickerMode;
  
  /** Number of rows in the calendar grid */
  rowNum: number;
  
  /** Number of columns in the calendar grid */
  colNum: number;
  
  /** Optional function to render a prefix column (e.g., week numbers) */
  prefixColumn?: (date: DateType) => React.ReactNode;
  
  /** Optional function to generate custom row class names */
  rowClassName?: (date: DateType) => string;
  
  /** The base date used to calculate the dates in the panel */
  baseDate: DateType;
  
  /** Function to generate custom cell class names based on the date */
  getCellClassName: (date: DateType) => Record<string, boolean> | string;
  
  /** Function to get the text content of a cell */
  getCellText: (date: DateType) => string | number;
  
  /** Optional function to render custom cell content */
  getCellNode?: (date: DateType) => React.ReactNode;
  
  /** Function to calculate the date for a specific cell */
  getCellDate: (baseDate: DateType, offset: number) => DateType;
  
  /** Configuration object for date operations */
  generateConfig: GenerateConfig<DateType>;
  
  /** Optional function to generate title attribute for cells */
  titleCell?: (date: DateType) => string;
  
  /** Optional header cells to render in thead */
  headerCells?: React.ReactNode;
}

/**
 * Context value provided by the PanelContext
 * @template DateType - The date type used by the date picker
 */
export interface PanelContextValue<DateType = any> {
  /** Callback fired when mouse enters a date cell */
  onDateMouseEnter?: (date: DateType) => void;
  
  /** Callback fired when mouse leaves a date cell */
  onDateMouseLeave?: (date: DateType) => void;
  
  /** Current panel mode */
  mode: PanelMode;
}

/**
 * Renders the body of a date picker panel with a grid of date cells
 * 
 * This component generates a table structure with rows and columns of date cells.
 * Each cell can be customized with class names, content, and behavior through props.
 * Supports features like disabled dates, hover states, and custom rendering.
 * 
 * @template DateType - The date type used by the date picker
 * @param props - The component props
 * @returns A React element containing the panel body table
 */
export default function PanelBody<DateType = any>(
  props: PanelBodyProps<DateType>
): React.ReactElement;