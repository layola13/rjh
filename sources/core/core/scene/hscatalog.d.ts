/**
 * HSCatalog Module
 * 
 * Core module providing access to the HS (likely "HouseSpecial" or similar) SDK components.
 * This module re-exports global HS namespace objects for modular consumption.
 */

/**
 * HSCatalog - Main catalog/registry system
 * Likely manages component registration, lookup, and lifecycle
 */
export const HSCatalog: typeof globalThis.HSCatalog;

/**
 * HSConstants - Application-wide constants
 * Contains configuration values, enums, and static references
 */
export const HSConstants: typeof globalThis.HSConstants;

/**
 * HSRender - Rendering engine
 * Handles UI rendering, templating, and view updates
 */
export const HSRender: typeof globalThis.HSRender;

/**
 * HSCore - Core framework utilities
 * Provides foundational services, helpers, and base classes
 */
export const HSCore: typeof globalThis.HSCore;

/**
 * HSPaveSDK - Pave SDK integration
 * SDK interface for Pave-related functionality (likely a specific feature set)
 */
export const HSPaveSDK: typeof globalThis.HSPaveSDK;

/**
 * Global namespace augmentation
 * Declares the shape of HS objects on the global scope
 */
declare global {
  interface Window {
    HSCatalog: unknown;
    HSConstants: unknown;
    HSRender: unknown;
    HSCore: unknown;
    HSPaveSDK: unknown;
  }

  const HSCatalog: unknown;
  const HSConstants: unknown;
  const HSRender: unknown;
  const HSCore: unknown;
  const HSPaveSDK: unknown;
}