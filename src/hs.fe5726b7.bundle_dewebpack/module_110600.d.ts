/**
 * Resource path module for Spanish (Spain) locale
 * 
 * This module exports the asset path for the Spanish (ES) localization resource file.
 * The resource file contains translated strings and locale-specific content.
 * 
 * @module ResourcePathES_ES
 */

/**
 * The public path to the Spanish (Spain) locale resource JSON file.
 * 
 * This path is typically used by the application to dynamically load
 * locale-specific resources at runtime.
 * 
 * @constant
 * @type {string}
 * @example
 * // Usage in a loader function
 * const translations = await fetch(RESOURCE_ES_ES_PATH).then(res => res.json());
 */
export declare const RESOURCE_ES_ES_PATH: string;

/**
 * Default export of the Spanish (Spain) resource file path.
 * Points to the compiled asset with content hash for cache busting.
 * 
 * @default "assets/resource_es_ES.96ea3edd.json"
 */
declare const resourcePath: string;
export default resourcePath;