/**
 * Configuration module for merging user-provided settings into a global configuration object.
 * This module provides a function to extend the base configuration with custom options.
 */

import type { Configuration } from './types';

/**
 * Merges user-provided configuration with the existing global configuration.
 * 
 * @param config - Optional configuration object to merge with existing settings.
 *                 If provided, all properties will be assigned to the global configuration.
 * 
 * @remarks
 * This function mutates the global configuration object imported from module 138357.
 * It uses Object.assign to perform a shallow merge of properties.
 * 
 * @example
 *