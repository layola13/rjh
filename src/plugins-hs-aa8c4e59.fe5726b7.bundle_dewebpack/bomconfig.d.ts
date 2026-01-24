/**
 * BomConfig module configuration
 * 
 * Provides global configuration settings for the BOM (Bill of Materials) system.
 * 
 * @module BomConfig
 */

/**
 * Configuration object for BOM module
 */
export interface BomConfig {
  /**
   * Enable or disable debug environment mode
   * 
   * When set to `true`, enables debug logging and additional development features.
   * Should be set to `false` in production environments.
   * 
   * @default false
   */
  debugEnv: boolean;
}

/**
 * Default BOM configuration instance
 */
export declare const BomConfig: BomConfig;