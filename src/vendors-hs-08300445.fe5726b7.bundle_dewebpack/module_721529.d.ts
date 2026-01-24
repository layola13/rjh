/**
 * Column width measurement component for dynamic table layouts.
 * Monitors and reports column width changes through resize events.
 * 
 * @module ColumnWidthDetector
 */

import type { ReactElement, RefObject } from 'react';

/**
 * Props for the ColumnWidthDetector component.
 */
export interface ColumnWidthDetectorProps {
  /**
   * Unique identifier for the column being measured.
   */
  columnKey: string;

  /**
   * Callback invoked when the column width changes.
   * @param columnKey - The key identifying which column was resized
   * @param width - The new width in pixels
   */
  onColumnResize: (columnKey: string, width: number) => void;
}

/**
 * Props for the ResizeObserver wrapper component.
 */
interface ResizeObserverProps {
  /**
   * Callback triggered when the observed element resizes.
   * @param dimensions - Object containing the new dimensions
   */
  onResize: (dimensions: { offsetWidth: number; offsetHeight?: number }) => void;

  /**
   * Child elements to be observed for resize events.
   */
  children: ReactElement;
}

/**
 * Component that measures and tracks column width in a table.
 * Uses ResizeObserver to detect width changes and reports them via callback.
 * 
 * Renders an invisible measurement cell (<td>) that:
 * - Takes up no visual space (0 padding, 0 border, 0 height)
 * - Reports its width on mount and whenever it changes
 * - Allows the parent table to calculate optimal column widths
 * 
 * @example
 *