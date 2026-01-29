/**
 * State module - Re-exports various state management classes
 * 
 * This module serves as a barrel export for different state types used in the application.
 * It aggregates state classes from multiple submodules for convenient importing.
 * 
 * @module State
 */

/**
 * Base state class providing core state management functionality
 * 
 * @remarks
 * Imported from module 18439
 */
export { State } from './State';

/**
 * State class for managing arrays with reactive updates
 * 
 * @remarks
 * Imported from module 38026
 */
export { ArrayState } from './ArrayState';

/**
 * State class for managing 3D point coordinates
 * 
 * @remarks
 * Imported from module 40579
 */
export { PointState } from './PointState';

/**
 * State class for managing 2D point coordinates
 * 
 * @remarks
 * Imported from module 98737
 */
export { Point2DState } from './Point2DState';

/**
 * State class for managing 2D arc geometry properties
 * 
 * @remarks
 * Imported from module 12399
 */
export { Arc2DState } from './Arc2DState';