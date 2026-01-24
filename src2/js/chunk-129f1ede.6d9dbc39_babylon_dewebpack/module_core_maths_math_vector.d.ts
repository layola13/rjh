/**
 * Core mathematics vector module
 * Provides vector operations and utilities for 2D/3D mathematical computations
 */

/**
 * Represents a 2D vector with x and y components
 */
export interface Vector2 {
  x: number;
  y: number;
}

/**
 * Represents a 3D vector with x, y, and z components
 */
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * Represents a 4D vector with x, y, z, and w components
 */
export interface Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;
}

/**
 * Generic vector operations interface
 */
export interface VectorOperations<T> {
  /**
   * Adds two vectors
   */
  add(a: T, b: T): T;
  
  /**
   * Subtracts vector b from vector a
   */
  subtract(a: T, b: T): T;
  
  /**
   * Multiplies a vector by a scalar
   */
  scale(vector: T, scalar: number): T;
  
  /**
   * Calculates the dot product of two vectors
   */
  dot(a: T, b: T): number;
  
  /**
   * Calculates the magnitude (length) of a vector
   */
  magnitude(vector: T): number;
  
  /**
   * Normalizes a vector to unit length
   */
  normalize(vector: T): T;
}

export {};