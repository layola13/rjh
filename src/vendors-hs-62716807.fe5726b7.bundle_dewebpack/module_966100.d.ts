/**
 * Grid system module providing Row, Col components and breakpoint utilities.
 * 
 * This module exports a grid layout system commonly used in responsive design frameworks.
 * It provides Row and Col components for creating flexible grid layouts, along with
 * a useBreakpoint hook for responsive behavior.
 * 
 * @module GridSystem
 */

/**
 * Column component for grid layout system.
 * Used within Row components to create responsive column-based layouts.
 */
export { default as Col } from './Col';

/**
 * Row component for grid layout system.
 * Container component that holds Col components and manages grid spacing.
 */
export { default as Row } from './Row';

/**
 * Breakpoint utilities for responsive design.
 * 
 * @interface BreakpointUtils
 */
interface BreakpointUtils {
  /**
   * Hook that returns current active breakpoints based on viewport size.
   * Useful for implementing responsive behavior in components.
   * 
   * @returns {Record<string, boolean>} Object mapping breakpoint names to boolean values
   * indicating whether each breakpoint is currently active
   * 
   * @example
   *