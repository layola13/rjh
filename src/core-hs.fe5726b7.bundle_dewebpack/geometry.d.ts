/**
 * Geometry Module
 * 
 * Core module providing geometry processing, modeling, and document management capabilities.
 * Includes utilities for mathematical operations, material handling, state management,
 * transactions, constraints, and logging.
 */

/**
 * Logger utility for application-wide logging
 */
export { Logger } from './logger';

/**
 * Enumeration of available log levels
 */
export { LogLevelEnum } from './logger';

/**
 * Base log object structure for structured logging
 */
export { LogObject } from './logger';

/**
 * Model namespace containing 3D model data structures and operations
 */
export * as Model from './model';

/**
 * Geometry namespace providing geometric primitives and algorithms
 */
export * as Geometry from './geometry';

/**
 * Util namespace containing general utility functions and helpers
 */
export * as Util from './util';

/**
 * Material namespace for material properties and rendering
 */
export * as Material from './material';

/**
 * Doc namespace for document management and serialization
 */
export * as Doc from './doc';

/**
 * State namespace for application state management
 */
export * as State from './state';

/**
 * Constraint namespace for geometric and parametric constraints
 */
export * as Constraint from './constraint';

/**
 * Transaction namespace for managing undoable operations
 */
export * as Transaction from './transaction';

/**
 * Paint namespace for rendering and visual styling
 */
export * as Paint from './paint';

/**
 * Math namespace providing mathematical functions and utilities
 */
export * as Math from './math';

/**
 * Stat namespace for statistics and performance metrics
 */
export * as Stat from './stat';

/**
 * Current version of the geometry module
 */
export { VERSION } from './version';

/**
 * Migration utilities for handling data format upgrades
 */
export { Migration } from './migration';