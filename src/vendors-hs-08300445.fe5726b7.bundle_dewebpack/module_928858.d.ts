/**
 * React table row (<tr>) component wrapper
 * @module TableRow
 */

import type { ComponentType, HTMLAttributes } from 'react';

/**
 * Props for the table row element
 * Extends standard HTML table row attributes
 */
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;

/**
 * Creates a React table row element
 * @param props - HTML attributes for the <tr> element
 * @returns A React <tr> element
 */
declare function TableRow(props: TableRowProps): JSX.Element;

export default TableRow;