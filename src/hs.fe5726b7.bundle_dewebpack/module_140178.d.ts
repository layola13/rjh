/**
 * Module: module_140178
 * Original ID: 140178
 * 
 * Main entry point module that exports core managers and utilities for data management,
 * event tracking, API handling, and product building functionality.
 */

/**
 * Base API manager for handling HTTP requests and API interactions
 */
export { default as BaseApiManager } from './BaseApiManager';

/**
 * Manager for handling catalog signal operations and events
 */
export { default as CatalogSignalManager } from './CatalogSignalManager';

/**
 * Configuration class for data-related settings and parameters
 */
export { default as DataConfig } from './DataConfig';

/**
 * Core data manager for handling data operations, storage, and retrieval
 */
export { default as DataManager } from './DataManager';

/**
 * Event manager for handling application-wide event subscriptions and dispatching
 */
export { default as EventManager } from './EventManager';

/**
 * Manager for tracking and recording user events and analytics
 */
export { default as EventTrackManager } from './EventTrackManager';

/**
 * Generic manager class providing base management functionality
 */
export { Manager } from './Manager';

/**
 * Builder class for constructing and validating product objects
 */
export { default as ProductBuilder } from './ProductBuilder';

/**
 * Utility functions and helpers for common operations
 */
export { default as Utils } from './Utils';