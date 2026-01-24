/**
 * SVG path conversion utilities for 2D curves and arcs.
 * 
 * This module provides functions to convert geometric curves (Line2d, Arc2d)
 * into SVG path commands and transform model coordinates to canvas coordinates.
 * 
 * @module SVGPathConverter
 */

import { Curve2d, Arc2d, Point2d } from './geometry-types'; // Assuming module 815362 exports these

/**
 * Converts a 2D curve or array of curves into an SVG path string.
 * 
 * Supports:
 * - Single Curve2d instance
 * - Array of Curve2d instances
 * - Nested arrays of Curve2d instances (multiple contours)
 * 
 * Handles special cases:
 * - Splits full-circle arcs (where start equals end) into two semicircular arcs
 * - Generates 'M' (move), 'L' (line), and 'A' (arc) SVG commands
 * - Determines large-arc-flag and sweep-flag for arc commands
 * 
 * @param curves - A single curve, array of curves, or nested array of curve contours
 * @returns SVG path data string (space-separated commands)
 * 
 * @example
 *