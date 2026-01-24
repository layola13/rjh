/**
 * Service configuration constants
 * Contains timeout settings for dump service operations
 */

/**
 * Configuration interface for dump service settings
 */
export interface DumpServiceConfig {
  /**
   * Timeout duration in milliseconds for dump service operations
   * @default 20000 (20 seconds)
   */
  dumpServiceTimeout: number;
}

/**
 * Default dump service configuration
 */
declare const config: DumpServiceConfig;

export default config;