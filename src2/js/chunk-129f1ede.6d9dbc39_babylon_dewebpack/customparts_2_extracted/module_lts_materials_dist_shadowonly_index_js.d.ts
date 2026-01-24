/**
 * Shadow-only material module for Babylon.js
 * Provides materials that only render shadows, making the geometry itself invisible
 * while preserving shadow casting and receiving capabilities.
 * 
 * @module shadowOnly
 * @packageDocumentation
 */

/**
 * A material that renders only shadows, making the mesh invisible except for shadow effects.
 * 
 * This material is useful for creating invisible shadow-receiving planes or objects
 * that need to cast/receive shadows without being visible themselves.
 * 
 * @remarks
 * Common use cases:
 * - Ground planes that only show shadows
 * - Invisible shadow catchers in AR/VR scenarios
 * - Composite scenes where shadows need to be rendered separately
 * 
 * @example
 *