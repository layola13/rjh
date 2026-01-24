/**
 * Application configuration module
 * Defines core business and environment settings
 */

/**
 * Application configuration interface
 */
export interface Config {
  /**
   * Business code identifier for the application
   * Used to distinguish between different business units or products
   */
  bizCode: string;

  /**
   * Deployment environment
   * Typical values: 'dev' | 'test' | 'staging' | 'prod'
   */
  env: string;
}

/**
 * Global application configuration
 * 
 * @remarks
 * This configuration is set for the Homestyler business in production environment
 */
export const config: Config = {
  bizCode: "homestyler",
  env: "prod"
};