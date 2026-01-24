/**
 * Domain and version utilities module
 * Provides functions to retrieve application domain, magic value, and version information
 */

import type { HSCore } from './types/hscore';

/**
 * Application parameters interface
 */
interface AppParams {
  /** Environment name (e.g., 'production', 'staging', 'development') */
  env?: string;
}

/**
 * Application instance interface
 */
interface App {
  /** Application configuration parameters */
  appParams?: AppParams;
}

/**
 * HSApp global namespace
 */
interface HSApp {
  App: {
    /**
     * Gets the current application instance
     * @returns The application instance
     */
    getApp(): App;
  };
}

/**
 * Window interface extensions
 */
declare global {
  interface Window {
    /** Application namespace */
    HSApp: HSApp;
    /** Published version string */
    publishVersion: string;
  }
}

/**
 * Gets the current application domain/environment
 * @returns The environment name from app parameters, or 'default' if not set
 */
export function getDomain(): string;

/**
 * Gets the magic identifier from floorplan metadata
 * @returns The magic value from HSCore document floorplan metadata
 */
export function getMagic(): string;

/**
 * Gets the published version of the application
 * @returns The published version string from window object
 */
export function getVersion(): string;