/**
 * Column resize detector component for table columns.
 * Monitors column width changes and reports them via callback.
 * 
 * @module ColumnResizeDetector
 */

import type { FC, RefObject } from 'react';

/**
 * Resize observer component props
 */
interface ResizeObserverProps {
  /** Callback invoked when element is resized */
  onResize: (dimensions: { offsetWidth: number; offsetHeight?: number }) => void;
  /** Child elements to render */
  children?: React.ReactNode;
}

/**
 * Resize observer component (imported from external module)
 */
declare const ResizeObserver: FC<ResizeObserverProps>;

/**
 * Props for the ColumnResizeDetector component
 */
export interface ColumnResizeDetectorProps {
  /** Unique identifier for the column being monitored */
  columnKey: string;
  
  /**
   * Callback fired when column width changes
   * @param columnKey - The key identifying the resized column
   * @param width - The new width in pixels
   */
  onColumnResize: (columnKey: string, width: number) => void;
}

/**
 * A component that detects and reports column width changes.
 * 
 * Renders an invisible table cell that monitors its width using ResizeObserver.
 * Reports initial width on mount and subsequent changes during resize events.
 * 
 * @param props - Component properties
 * @returns A hidden table cell with resize detection
 * 
 * @example
 *