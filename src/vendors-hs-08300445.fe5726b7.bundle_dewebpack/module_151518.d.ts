import type { ReactNode, ComponentType, Context } from 'react';

/**
 * Context interface for table scroll configuration
 */
interface TableScrollContext {
  /** Size of the scrollbar in pixels */
  scrollbarSize: number;
}

/**
 * Props for the ExpandedRow component
 */
interface ExpandedRowProps {
  /** CSS class prefix for styling (e.g., 'rc-table') */
  prefixCls: string;
  
  /** Child content to render inside the expanded row */
  children: ReactNode;
  
  /** HTML component type for the row wrapper (e.g., 'tr') */
  component: keyof JSX.IntrinsicElements | ComponentType<any>;
  
  /** HTML component type for the cell wrapper (e.g., 'td') */
  cellComponent: keyof JSX.IntrinsicElements | ComponentType<any>;
  
  /** Whether the table header is fixed */
  fixHeader: boolean;
  
  /** Whether table columns are fixed */
  fixColumn: boolean;
  
  /** Whether horizontal scrolling is enabled */
  horizonScroll: boolean;
  
  /** Additional CSS class name for custom styling */
  className?: string;
  
  /** Whether the row is currently expanded */
  expanded: boolean;
  
  /** Total width of the component in pixels */
  componentWidth: number;
  
  /** Number of columns the cell should span */
  colSpan: number;
}

/**
 * Component for rendering expanded table rows with fixed column support
 * 
 * @param props - Configuration for the expanded row
 * @returns A memoized React element representing the expanded row
 * 
 * @remarks
 * This component handles rendering of expanded row content with support for:
 * - Fixed columns with sticky positioning
 * - Adjusting width based on scrollbar size
 * - Conditional visibility based on expansion state
 * - Memoization for performance optimization
 */
declare function ExpandedRow(props: ExpandedRowProps): JSX.Element;

export default ExpandedRow;

/**
 * Context providing scrollbar configuration for table components
 */
export declare const TableScrollContext: Context<TableScrollContext>;