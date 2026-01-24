/**
 * Decade panel configuration constants and component
 * Renders a decade selection grid for date picker
 */

/**
 * Number of columns in the decade selection grid
 */
export const DECADE_COL_COUNT = 3;

/**
 * Configuration interface for date generation utilities
 * @template DateType - The date type used by the implementation
 */
export interface GenerateConfig<DateType = any> {
  /**
   * Get the year from a date
   */
  getYear(date: DateType): number;
  
  /**
   * Set the year of a date
   */
  setYear(date: DateType, year: number): DateType;
  
  /**
   * Add years to a date
   */
  addYear(date: DateType, years: number): DateType;
}

/**
 * Props for the decade panel component
 * @template DateType - The date type used by the implementation
 */
export interface DecadePanelProps<DateType = any> {
  /**
   * CSS class prefix for BEM-style naming
   */
  prefixCls: string;
  
  /**
   * The currently viewed date
   */
  viewDate: DateType;
  
  /**
   * Date generation and manipulation utilities
   */
  generateConfig: GenerateConfig<DateType>;
  
  /**
   * Number of rows in the grid
   */
  rowNum?: number;
  
  /**
   * Number of columns in the grid
   */
  colNum?: number;
  
  /**
   * Base date for grid calculation
   */
  baseDate?: DateType;
  
  /**
   * Function to generate cell text content
   */
  getCellText?: (date: DateType) => string;
  
  /**
   * Function to generate cell CSS classes
   */
  getCellClassName?: (date: DateType) => Record<string, boolean>;
  
  /**
   * Function to calculate cell date based on index
   */
  getCellDate?: (baseDate: DateType, offset: number) => DateType;
}

/**
 * Constants for decade calculations
 */
export interface DecadeConstants {
  /**
   * Years difference within a single decade unit
   */
  DECADE_UNIT_DIFF: number;
  
  /**
   * Total years covered in the decade view
   */
  DECADE_DISTANCE_COUNT: number;
}

/**
 * Decade panel component for date selection
 * Displays a grid of decade ranges for user selection
 * 
 * @template DateType - The date type used by the implementation
 * @param props - Component properties
 * @returns React element rendering the decade selection grid
 */
export default function DecadePanel<DateType = any>(
  props: DecadePanelProps<DateType>
): React.ReactElement;

/**
 * Cell class name result type
 */
export type CellClassNames = Record<string, boolean>;

/**
 * Decade range display format
 * Displays as "startYear-endYear" (e.g., "2020-2029")
 */
export type DecadeRangeText = string;