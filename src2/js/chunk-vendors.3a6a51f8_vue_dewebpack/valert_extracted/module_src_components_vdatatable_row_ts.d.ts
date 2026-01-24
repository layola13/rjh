/**
 * VDataTable Row Component Type Definitions
 * A functional component for rendering table rows with dynamic cell content
 */

import { VNode, CreateElement, RenderContext } from 'vue';

/**
 * Alignment options for table header cells
 */
export type TableHeaderAlign = 'start' | 'center' | 'end';

/**
 * Configuration for a single table header/column
 */
export interface TableHeader {
  /**
   * The property path to access the value from the data item
   */
  value: string;
  
  /**
   * Horizontal alignment of the column content
   * @default 'start'
   */
  align?: TableHeaderAlign;
  
  /**
   * Whether to show a divider after this column
   * @default false
   */
  divider?: boolean;
  
  /**
   * Additional header properties (text, sortable, width, etc.)
   */
  [key: string]: unknown;
}

/**
 * Props for the VDataTable Row component
 */
export interface RowProps {
  /**
   * Array of header configurations defining the table columns
   */
  headers: TableHeader[];
  
  /**
   * The data object for this row
   */
  item: Record<string, unknown>;
  
  /**
   * Whether to render in right-to-left mode
   * @default false
   */
  rtl: boolean;
}

/**
 * Scoped slot parameters passed to custom cell renderers
 */
export interface CellSlotScope {
  /**
   * The complete row data item
   */
  item: Record<string, unknown>;
  
  /**
   * The header configuration for this cell
   */
  header: TableHeader;
  
  /**
   * The extracted value for this cell from the item
   */
  value: unknown;
}

/**
 * Scoped slots available for customizing cell rendering
 * Keys correspond to header.value properties
 */
export type RowScopedSlots = {
  [columnKey: string]: (scope: CellSlotScope) => VNode | VNode[];
};

/**
 * Render function context for the Row functional component
 */
export interface RowRenderContext extends RenderContext<RowProps> {
  /**
   * Component props
   */
  props: RowProps;
  
  /**
   * Named slots (non-scoped)
   */
  slots: () => Record<string, VNode[]>;
  
  /**
   * Component data including scoped slots, class, style, etc.
   */
  data: {
    scopedSlots?: RowScopedSlots;
    [key: string]: unknown;
  };
}

/**
 * VDataTable Row functional component
 * Renders a table row (<tr>) with cells (<td>) based on headers configuration
 * Supports custom cell rendering via scoped slots
 */
declare const Row: {
  /**
   * Component name for registration
   */
  name: 'row';
  
  /**
   * Marks this as a functional component (stateless)
   */
  functional: true;
  
  /**
   * Component props definition
   */
  props: {
    headers: typeof Array;
    item: typeof Object;
    rtl: typeof Boolean;
  };
  
  /**
   * Render function for the functional component
   * 
   * @param createElement - Vue's createElement function for generating VNodes
   * @param context - Render context containing props, slots, and data
   * @returns A VNode representing the table row element
   */
  render(
    createElement: CreateElement,
    context: RowRenderContext
  ): VNode;
};

export default Row;