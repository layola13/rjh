/**
 * HSPaveSDK Module
 * 
 * This module exports the HSPaveSDK, which is a global SDK instance
 * attached to the window/global object.
 * 
 * @module HSPaveSDK
 * @see Module ID: 220789, depends on module 237698
 */

/**
 * The main HSPaveSDK export.
 * 
 * Note: The actual type definition depends on the implementation
 * in module 237698. This is a placeholder interface that should be
 * expanded based on the SDK's actual API surface.
 */
export interface HSPaveSDK {
  /**
   * SDK version information
   */
  version?: string;

  /**
   * Initialize the SDK
   * @param config - Configuration options
   */
  init?(config?: unknown): void | Promise<void>;

  /**
   * Additional SDK methods and properties
   * (Expand this based on module 237698's actual implementation)
   */
  [key: string]: unknown;
}

/**
 * Global augmentation to add HSPaveSDK to the global object
 */
declare global {
  interface Window {
    HSPaveSDK: HSPaveSDK;
  }

  // For Node.js environments
  namespace NodeJS {
    interface Global {
      HSPaveSDK: HSPaveSDK;
    }
  }

  // For modern globalThis
  var HSPaveSDK: HSPaveSDK;
}

/**
 * Default export of the HSPaveSDK instance
 */
declare const HSPaveSDK: HSPaveSDK;

export default HSPaveSDK;