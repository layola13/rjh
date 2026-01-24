/**
 * Mtop configuration module
 * Exports the appropriate mtop configuration based on the business code
 */

import { config as homestylerConfig } from './homestyler-config';
import { config as defaultConfig } from './default-config';
import appConfig from './app-config';

/**
 * Mtop configuration interface
 * Defines the structure for mtop service configuration
 */
export interface MtopConfig {
  /** API endpoint URL */
  apiUrl?: string;
  /** Application key for authentication */
  appKey?: string;
  /** Timeout duration in milliseconds */
  timeout?: number;
  /** Additional configuration options */
  [key: string]: unknown;
}

/**
 * Exported mtop configuration
 * Selects homestyler-specific config if bizCode is 'homestyler', otherwise uses default config
 */
export const mtopConfig: MtopConfig = 
  appConfig.bizCode === 'homestyler' 
    ? homestylerConfig 
    : defaultConfig;