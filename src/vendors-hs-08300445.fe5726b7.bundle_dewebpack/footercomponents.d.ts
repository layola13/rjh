/**
 * Footer Components for Table
 * Provides components for rendering table footer sections
 * @module FooterComponents
 */

import { ReactNode, FC } from 'react';

/**
 * Props for the default footer component
 */
export interface FooterComponentProps {
  /**
   * Child elements to be rendered within the footer
   */
  children: ReactNode;
}

/**
 * Props for the Footer Cell component
 */
export interface FooterCellProps {
  /**
   * Content to be displayed in the cell
   */
  children?: ReactNode;
  /**
   * Number of columns the cell should span
   */
  colSpan?: number;
  /**
   * Number of rows the cell should span
   */
  rowSpan?: number;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Props for the Footer Row component
 */
export interface FooterRowProps {
  /**
   * Cell elements to be rendered within the row
   */
  children?: ReactNode;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Cell component for table footer
 */
export declare const Cell: FC<FooterCellProps>;

/**
 * Row component for table footer
 */
export declare const Row: FC<FooterRowProps>;

/**
 * Collection of footer-related components
 */
export interface FooterComponents {
  /**
   * Cell component for rendering individual footer cells
   */
  Cell: typeof Cell;
  /**
   * Row component for rendering footer rows
   */
  Row: typeof Row;
}

/**
 * Default footer component that wraps children in a tfoot element
 * Applies prefix class from context for styling
 * @param props - Component props
 * @returns Rendered tfoot element with children
 */
declare const FooterComponent: FC<FooterComponentProps>;

export default FooterComponent;

/**
 * Named export containing Cell and Row components
 */
export { FooterComponents };