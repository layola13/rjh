/**
 * Table module type definitions
 * Provides column, column group, and summary components for table rendering
 */

import type { default as TableComponent } from './846656';
import type { FooterComponents } from './594738';
import type { default as Column } from './422351';
import type { default as ColumnGroup } from './38424';
import type { INTERNAL_COL_DEFINE } from './460635';

/**
 * Column component for defining table columns
 */
export { Column };

/**
 * ColumnGroup component for grouping multiple columns
 */
export { ColumnGroup };

/**
 * Internal column definition constant used for column configuration
 */
export { INTERNAL_COL_DEFINE };

/**
 * Summary components for rendering table footer summaries
 * Includes Summary.Row and Summary.Cell components
 */
export { FooterComponents as Summary };

/**
 * Default table component export
 */
export default TableComponent;