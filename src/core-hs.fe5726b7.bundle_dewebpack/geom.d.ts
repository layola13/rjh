/**
 * Geom module - Geometry utilities and types
 * 
 * This module re-exports all geometry-related functionality from the core implementation.
 * Provides geometric primitives, calculations, and transformations.
 * 
 * @module Geom
 */

export { Geom } from './core-geometry-implementation';

// Alternative if Geom is a namespace/object:
// import * as GeomImpl from './core-geometry-implementation';
// export const Geom = GeomImpl;

/**
 * Geom namespace containing geometry utilities
 * 
 * Note: The actual type definition depends on module 99876's exports.
 * Common Geom module typically includes:
 * - Point, Vector, Rectangle, Circle, Polygon classes
 * - Intersection, distance, angle calculations
 * - Coordinate transformations
 */
export type Geom = typeof import('./core-geometry-implementation');