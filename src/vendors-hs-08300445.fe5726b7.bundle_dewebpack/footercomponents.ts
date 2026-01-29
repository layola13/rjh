/**
 * Footer components for table structure
 * Provides components for rendering table footer sections
 */

import type { ReactNode, FC } from 'react';

/**
 * Props for the Footer component
 */
interface FooterProps {
  /**
   * Child elements to be rendered within the footer
   */
  children: ReactNode;
}

/**
 * Props for the FooterCell component
 */
interface FooterCellProps {
  /**
   * Cell content
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
 * Props for the FooterRow component
 */
interface FooterRowProps {
  /**
   * Row content (typically FooterCell components)
   */
  children: ReactNode;
  
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
 * Table footer cell component
 * Renders a single cell within the footer row
 */
export declare const Cell: FC<FooterCellProps>;

/**
 * Table footer row component
 * Renders a row within the table footer
 */
export declare const Row: FC<FooterRowProps>;

/**
 * Collection of footer-related components
 */
export interface FooterComponents {
  /**
   * Footer cell component for individual cells
   */
  Cell: typeof Cell;
  
  /**
   * Footer row component for table rows
   */
  Row: typeof Row;
}

/**
 * Main footer component
 * Wraps footer content in a <tfoot> element with appropriate styling
 * 
 * @param props - Component properties
 * @returns A tfoot element containing the provided children
 */
declare const Footer: FC<FooterProps>;

export default Footer;

export { FooterComponents };