/**
 * Configuration module for multi-environment and multi-brand settings
 * Supports homestyler and shejijia brands across dev/pre/prod environments
 */

/** Brand identifier type */
export type BizCode = 'homestyler' | 'shejijia';

/** Environment identifier type */
export type Environment = 'dev' | 'pre' | 'prod';

/** Base configuration structure */
export interface Config {
  [key: string]: unknown;
}

/** Configuration by environment */
interface EnvironmentConfig {
  /** Base configuration shared across all environments */
  base: Config;
  /** Development environment configuration */
  dev: Config;
  /** Pre-production environment configuration */
  pre: Config;
  /** Production environment configuration */
  prod: Config;
}

/** Multi-brand configuration mapping */
interface MultiBrandConfig {
  homestyler: EnvironmentConfig;
  shejijia: EnvironmentConfig;
}

/**
 * Current business/brand code
 * Determined by hostname detection
 */
export const bizCode: BizCode;

/**
 * Current environment
 * Determined by hostname pattern matching
 */
export const env: Environment;

/**
 * Merged configuration object
 * Combines base config with environment-specific overrides
 */
declare const config: Config;

export default config;