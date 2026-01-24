/**
 * VDataTable Row Component Type Definitions
 * A functional component for rendering table rows in VDataTable
 */

import { VNode, CreateElement, RenderContext } from 'vue';

/**
 * Alignment options for table cells
 */
export type CellAlignment = 'start' | 'center' | 'end';

/**
 * Header configuration for table columns
 */
export interface DataTableHeader {
  /**
   * The property path to extract value from item object
   */
  value: string;
  
  /**
   * Text alignment for the column
   * @default 'start'
   */
  align?: CellAlignment;
  
  /**
   * Whether to show a divider line after this column
   * @default false
   */
  divider?: boolean;
  
  /**
   * Display text for the header
   */
  text?: string;
  
  /**
   * Whether the column is sortable
   */
  sortable?: boolean;
  
  /**
   * Width of the column
   */
  width?: string | number;
  
  /**
   * Additional header properties
   */
  [key: string]: unknown;
}

/**
 * Props for the VDataTable Row component
 */
export interface RowProps {
  /**
   * Array of header configurations defining column structure
   */
  headers: DataTableHeader[];
  
  /**
   * The data item to render in this row
   */
  item: Record<string, unknown>;
  
  /**
   * Whether to use right-to-left text direction
   * @default false
   */
  rtl: boolean;
}

/**
 * Scoped slot properties for custom cell rendering
 */
export interface RowSlotProps {
  /**
   * The current row's data item
   */
  item: Record<string, unknown>;
  
  /**
   * The header configuration for this cell
   */
  header: DataTableHeader;
  
  /**
   * The extracted value for this cell
   */
  value: unknown;
}

/**
 * Scoped slots available for the Row component
 */
export interface RowScopedSlots {
  /**
   * Custom slot for rendering cell content
   * Key should match the header's value property
   */
  [key: string]: ((props: RowSlotProps) => VNode | VNode[]) | undefined;
}

/**
 * Render context for the functional Row component
 */
export interface RowRenderContext extends RenderContext<RowProps> {
  scopedSlots?: RowScopedSlots;
}

/**
 * VDataTable Row Functional Component
 * Renders a single table row with cells based on headers configuration
 */
declare const Row: {
  /**
   * Component name
   */
  name: 'row';
  
  /**
   * Indicates this is a functional component
   */
  functional: true;
  
  /**
   * Component props definition
   */
  props: {
    headers: { type: ArrayConstructor };
    item: { type: ObjectConstructor };
    rtl: { type: BooleanConstructor };
  };
  
  /**
   * Render function for the functional component
   * @param h - Vue's createElement function
   * @param context - Render context containing props, slots, and data
   * @returns Virtual DOM node representing the table row
   */
  render(h: CreateElement, context: RowRenderContext): VNode;
};

export default Row;