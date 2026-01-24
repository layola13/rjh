/**
 * HSApp Module
 * 
 * Core module that exports essential Hopscotch SDK components from the global scope.
 * This module provides access to mathematical utilities, core functionality, constants,
 * and the Pave SDK integration.
 * 
 * @module HSApp
 * @packageDocumentation
 */

/**
 * Core functionality provider for the Hopscotch platform.
 * Handles fundamental operations and system-level interactions.
 */
export declare const HSCore: HSCoreInterface;

/**
 * Main application instance for Hopscotch.
 * Manages application lifecycle, state, and top-level operations.
 */
export declare const HSApp: HSAppInterface;

/**
 * Collection of constant values used throughout the Hopscotch platform.
 * Includes configuration values, enums, and immutable reference data.
 */
export declare const HSConstants: HSConstantsInterface;

/**
 * Pave SDK integration layer.
 * Provides access to Pave platform features and services.
 */
export declare const HSPaveSDK: HSPaveSDKInterface;

/**
 * Mathematical utility functions and operations.
 * Provides enhanced math capabilities specific to Hopscotch requirements.
 */
export declare const HSMath: HSMathInterface;

/**
 * Core functionality interface for the Hopscotch platform.
 */
export interface HSCoreInterface {
  // Core methods and properties would be defined based on implementation
  [key: string]: unknown;
}

/**
 * Main application interface for Hopscotch.
 */
export interface HSAppInterface {
  // App methods and properties would be defined based on implementation
  [key: string]: unknown;
}

/**
 * Constants collection interface.
 */
export interface HSConstantsInterface {
  // Constant definitions would be defined based on implementation
  [key: string]: unknown;
}

/**
 * Pave SDK interface for external service integration.
 */
export interface HSPaveSDKInterface {
  // SDK methods and properties would be defined based on implementation
  [key: string]: unknown;
}

/**
 * Mathematical utilities interface.
 */
export interface HSMathInterface {
  // Math utility methods would be defined based on implementation
  [key: string]: unknown;
}