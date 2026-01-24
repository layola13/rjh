/**
 * Color conversion utilities for TinyColor
 * Provides factory functions for creating TinyColor instances from ratio-based RGB values
 */

import { TinyColor } from './TinyColor';
import { convertToPercentage } from './conversion-utils';

/**
 * RGB color components as ratio values (0-1)
 */
export interface RGBRatio {
  /** Red component (0-1) */
  r: number;
  /** Green component (0-1) */
  g: number;
  /** Blue component (0-1) */
  b: number;
  /** Optional alpha/opacity (0-1) */
  a?: number;
}

/**
 * RGB color components as percentage strings
 */
export interface RGBPercentage {
  /** Red component as percentage */
  r: string;
  /** Green component as percentage */
  g: string;
  /** Blue component as percentage */
  b: string;
  /** Optional alpha value */
  a?: number;
}

/**
 * Creates a TinyColor instance from ratio-based RGB values (0-1 range)
 * Converts ratio values to percentages internally
 * 
 * @param color - RGB color object with ratio values (0-1)
 * @param options - Optional configuration for TinyColor instance
 * @returns A new TinyColor instance
 * 
 * @example
 *