/**
 * Module: INTERNAL_COL_DEFINE
 * Internal column definition identifier for RC Table component
 */

/**
 * Internal column definition constant used to identify special columns in RC Table
 * @constant
 */
export const INTERNAL_COL_DEFINE = "RC_TABLE_INTERNAL_COL_DEFINE";

/**
 * Props object that may contain data-* and aria-* attributes
 */
export interface PropsWithAttributes {
  [key: string]: unknown;
}

/**
 * Extracts data-* and aria-* attributes from a props object
 * 
 * @param props - The props object to filter
 * @returns A new object containing only data-* and aria-* attributes
 * 
 * @example
 *