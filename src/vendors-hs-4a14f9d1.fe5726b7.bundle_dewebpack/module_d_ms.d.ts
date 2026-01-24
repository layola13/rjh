/**
 * Custom error class for point-related validation errors.
 * Extends the native Error class to provide detailed information about invalid points.
 * 
 * @module PointError
 */

import type { Point } from './point-types';

/**
 * Converts a point to its string representation.
 * This function should be imported from the appropriate utility module.
 */
declare function toString(point: Point): string;

/**
 * Error class thrown when point validation fails.
 * Accumulates and formats error messages for multiple invalid points.
 * 
 * @example
 *