/**
 * Service module
 * Provides core service functionality with framework integration
 */

/**
 * Configuration options for service initialization
 */
export interface ServiceInitConfig {
  [key: string]: unknown;
}

/**
 * Framework integration object
 */
export interface ServiceFramework {
  [key: string]: unknown;
}

/**
 * Core Service class
 * Manages service lifecycle and framework integration
 */
export declare class Service {
  /**
   * Framework integration instance
   */
  framework: ServiceFramework;

  /**
   * Creates a new Service instance
   */
  constructor();

  /**
   * Initialize the service with configuration
   * @param config - First configuration parameter
   * @param options - Second configuration parameter
   */
  init(config: ServiceInitConfig, options: ServiceInitConfig): void;
}