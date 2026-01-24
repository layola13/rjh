/**
 * Shadow Only Material Module
 * 
 * This module provides a material that only renders shadows, making the geometry
 * itself invisible while preserving its shadow casting and receiving capabilities.
 * Useful for creating invisible shadow receivers in a scene.
 */

/**
 * A specialized material that renders only shadows while keeping the geometry invisible.
 * 
 * @remarks
 * This material is particularly useful for:
 * - Creating invisible ground planes that receive shadows
 * - Hiding geometry while preserving its shadow contribution
 * - Optimizing scenes where only shadow information is needed
 * 
 * @example
 *