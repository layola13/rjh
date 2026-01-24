import { VNode, VNodeData, CreateElement } from 'vue';
import Vue, { PropType } from 'vue';

/**
 * Header configuration for table columns
 */
export interface DataTableHeader {
  /** Display text for the header */
  text: string;
  /** Property path in the item object to access the value */
  value: string;
  /** Additional header properties */
  [key: string]: any;
}

/**
 * Props for the MobileRow functional component
 */
export interface MobileRowProps {
  /** Array of table header configurations */
  headers: DataTableHeader[];
  /** Whether to hide the default header in mobile view */
  hideDefaultHeader: boolean;
  /** Data item to be displayed in the row */
  item: Record<string, any>;
  /** Right-to-left text direction flag */
  rtl: boolean;
}

/**
 * Context object passed to functional component render function
 */
export interface MobileRowContext {
  /** Component props */
  props: MobileRowProps;
  /** Slot content */
  slots: () => Record<string, VNode[]>;
  /** Component data (classes, attributes, etc.) */
  data: VNodeData;
}

/**
 * Scoped slot parameters for custom cell rendering
 */
export interface CellSlotScope {
  /** The current data item */
  item: Record<string, any>;
  /** The header configuration for this cell */
  header: DataTableHeader;
  /** The resolved value for this cell */
  value: any;
}

/**
 * Functional component for rendering a mobile table row in VDataTable
 * 
 * @remarks
 * This component renders table data in a mobile-friendly format where each
 * cell is displayed as a stacked row with optional header labels.
 */
declare const MobileRow: Vue & {
  /** Component name */
  name: 'row';
  /** Mark as functional component for better performance */
  functional: true;
  /** Component props definition */
  props: {
    headers: PropType<DataTableHeader[]>;
    hideDefaultHeader: PropType<boolean>;
    item: PropType<Record<string, any>>;
    rtl: PropType<boolean>;
  };
  /**
   * Render function for the functional component
   * 
   * @param createElement - Vue's createElement function for generating VNodes
   * @param context - Component context containing props, slots, and data
   * @returns VNode representing the mobile table row
   */
  render: (createElement: CreateElement, context: MobileRowContext) => VNode;
};

export default MobileRow;