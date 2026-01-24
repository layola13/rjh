/**
 * Math Vector Module
 * 
 * Core mathematics module providing vector operations and utilities.
 * This module exports vector-related functionality for mathematical computations.
 * 
 * @module core/Maths/math.vector
 * @packageDocumentation
 */

/**
 * Represents a 2D vector with x and y components
 */
export interface Vector2D {
  /** X-axis component */
  x: number;
  /** Y-axis component */
  y: number;
}

/**
 * Represents a 3D vector with x, y, and z components
 */
export interface Vector3D {
  /** X-axis component */
  x: number;
  /** Y-axis component */
  y: number;
  /** Z-axis component */
  z: number;
}

/**
 * Vector operations and utilities
 * 
 * This is a placeholder type definition based on the module path.
 * Replace with actual implementation types when the source code is available.
 */
export type MathVector = unknown;

/**
 * Default export for the math vector module
 * 
 * Note: The actual type cannot be determined from the provided webpack bundle.
 * Please provide the unminified source code for accurate type definitions.
 */
declare const mathVector: MathVector;

export default mathVector;