/**
 * OBJ file format loaders module
 * 
 * Provides loaders and parsers for working with OBJ and MTL 3D model files.
 * 
 * @module OBJLoaders
 */

/**
 * Loader for MTL (Material Template Library) files
 * 
 * Parses material definitions commonly used with OBJ files.
 */
export { MTLFileLoader } from './OBJ/mtlFileLoader';

/**
 * Loader for OBJ (Wavefront Object) 3D model files
 * 
 * Handles parsing and loading of OBJ format geometry data.
 */
export { OBJFileLoader } from './OBJ/objFileLoader';

/**
 * Parser for solid geometry data within OBJ files
 * 
 * Processes solid object definitions and converts them into usable mesh data.
 */
export { SolidParser } from './OBJ/solidParser';

/**
 * Re-export loading options types for OBJ file parsing
 */
export type { OBJLoadingOptions } from './OBJ/objLoadingOptions';