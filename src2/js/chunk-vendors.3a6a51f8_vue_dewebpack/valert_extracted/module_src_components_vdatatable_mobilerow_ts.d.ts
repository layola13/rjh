import { VNode, CreateElement, RenderContext } from 'vue';

/**
 * Props for the mobile row component
 */
export interface MobileRowProps {
  /**
   * Array of header configurations for the data table
   */
  headers: Array<DataTableHeader>;
  
  /**
   * Whether to hide the default header in mobile view
   * @default false
   */
  hideDefaultHeader: boolean;
  
  /**
   * The data item to be rendered in this row
   */
  item: Record<string, any>;
  
  /**
   * Whether to render in right-to-left mode
   * @default false
   */
  rtl: boolean;
}

/**
 * Header configuration for data table columns
 */
export interface DataTableHeader {
  /**
   * Display text for the header
   */
  text: string;
  
  /**
   * Property path to extract value from item object
   */
  value: string;
  
  /**
   * Additional header properties
   */
  [key: string]: any;
}

/**
 * Scoped slot parameters for custom cell rendering
 */
export interface MobileRowSlotProps {
  /**
   * The current row item
   */
  item: Record<string, any>;
  
  /**
   * The header configuration for this cell
   */
  header: DataTableHeader;
  
  /**
   * The extracted value for this cell
   */
  value: any;
}

/**
 * Functional component for rendering mobile table rows in VDataTable
 * 
 * This component renders a table row optimized for mobile displays,
 * showing headers inline with their corresponding values.
 * 
 * @example
 *