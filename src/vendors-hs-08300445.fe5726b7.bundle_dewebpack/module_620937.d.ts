/**
 * Drop indicator component for tree drag-and-drop operations.
 * Renders a visual line indicator showing where an item will be dropped.
 * @module DropIndicator
 */

import type * as React from 'react';

/**
 * Props for the drop indicator component.
 */
export interface DropIndicatorProps {
  /**
   * The drop position relative to the target node.
   * - `-1`: Drop above the target
   * - `0`: Drop as a child of the target
   * - `1`: Drop below the target
   */
  dropPosition: -1 | 0 | 1;

  /**
   * The level offset for the drop position, used to calculate horizontal indentation.
   * Represents how many levels deep the drop will occur.
   */
  dropLevelOffset: number;

  /**
   * The indentation width per level in pixels.
   * Used to calculate the horizontal position of the drop indicator.
   */
  indent: number;
}

/**
 * Renders a drop indicator line for tree drag-and-drop operations.
 * 
 * The indicator appears as a horizontal red line positioned based on:
 * - Drop position (above, below, or as child)
 * - Nesting level offset
 * - Indentation size
 * 
 * @param props - Component props
 * @returns A React element representing the drop indicator
 * 
 * @example
 *