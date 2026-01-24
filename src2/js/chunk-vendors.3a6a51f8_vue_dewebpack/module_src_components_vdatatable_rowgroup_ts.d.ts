/**
 * Row group component for VDataTable
 * Provides collapsible grouping functionality with header, content, and summary sections
 */

import { VNode, VNodeData, CreateElement } from 'vue';
import { FunctionalComponentOptions, RenderContext } from 'vue/types/options';

/**
 * Props for the RowGroup component
 */
export interface RowGroupProps {
  /**
   * Controls visibility of row group content
   * @default true
   */
  value: boolean;

  /**
   * CSS class for the header row
   * @default "v-row-group__header"
   */
  headerClass: string;

  /**
   * CSS class for the content rows
   */
  contentClass?: string;

  /**
   * CSS class for the summary row
   * @default "v-row-group__summary"
   */
  summaryClass: string;
}

/**
 * Available slot names for the RowGroup component
 */
export interface RowGroupSlots {
  /**
   * Slot for rendering a single header row (column-based layout)
   */
  'column.header'?: VNode[];

  /**
   * Slot for rendering multiple header rows (row-based layout)
   */
  'row.header'?: VNode[];

  /**
   * Slot for rendering content rows
   */
  'row.content'?: VNode[];

  /**
   * Slot for rendering a single summary row (column-based layout)
   */
  'column.summary'?: VNode[];

  /**
   * Slot for rendering multiple summary rows (row-based layout)
   */
  'row.summary'?: VNode[];
}

/**
 * Functional component for rendering grouped rows in VDataTable
 * Supports collapsible groups with customizable header, content, and summary sections
 */
declare const RowGroup: FunctionalComponentOptions<RowGroupProps, RowGroupSlots>;

export default RowGroup;