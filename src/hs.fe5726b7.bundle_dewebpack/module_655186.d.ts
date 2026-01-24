/**
 * Module configuration factory that creates a structured configuration object
 * containing general settings, catalog data, design options, and search criteria enums.
 */

import type { GeneralConfig } from './general';
import type { CatalogConfig } from './catalog';
import type { DesignConfig } from './design';
import type { SearchCriteriaEnum } from './searchCriteriaEnum';

/**
 * Configuration context object passed to factory functions
 */
export interface ConfigContext {
  [key: string]: unknown;
}

/**
 * Complete module configuration object
 */
export interface ModuleConfig {
  /** General application settings and configuration */
  general: GeneralConfig;
  
  /** Catalog-related data and settings */
  catalog: CatalogConfig;
  
  /** Design system and UI configuration */
  design: DesignConfig;
  
  /** Enumeration of search criteria options */
  searchCriteriaEnum: typeof SearchCriteriaEnum;
}

/**
 * Factory function that creates a module configuration object
 * 
 * @param context - Configuration context containing environment and runtime settings
 * @returns A structured configuration object with general, catalog, design, and search criteria
 */
export default function createModuleConfig(context: ConfigContext): ModuleConfig;