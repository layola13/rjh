/**
 * React hook that measures DOM element dimensions and returns responsive size styles.
 * 
 * @module useMeasure
 * @description Provides a hook to track element width/height and generate corresponding CSS size properties
 */

import { useState, useMemo, RefCallback } from 'react';

/**
 * Represents the measured dimensions of a DOM element
 */
interface ElementSize {
  /** Width of the element in pixels */
  width: number;
  /** Height of the element in pixels */
  height: number;
}

/**
 * CSS size properties that can be applied to an element
 */
interface SizeStyles {
  /** Fixed width in pixels */
  width?: number;
  /** Minimum width in pixels */
  minWidth?: number;
  /** Fixed height in pixels */
  height?: number;
  /** Minimum height in pixels */
  minHeight?: number;
}

/**
 * Type definition for size property names that can be measured
 */
type SizeProperty = 'width' | 'minWidth' | 'height' | 'minHeight';

/**
 * Custom React hook that measures element dimensions and returns appropriate CSS styles.
 * 
 * @param sizeProperty - Space-separated string specifying which CSS properties to generate
 *                       (e.g., "width height", "minWidth minHeight")
 * @returns A tuple containing:
 *          - [0] SizeStyles object with requested CSS properties
 *          - [1] Ref callback to attach to the element being measured
 * 
 * @example
 *