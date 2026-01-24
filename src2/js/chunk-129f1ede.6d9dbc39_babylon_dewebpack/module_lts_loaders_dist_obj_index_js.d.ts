/**
 * OBJ file format loaders and parsers for Babylon.js
 * 
 * This module provides utilities for loading and parsing OBJ and MTL files,
 * which are common 3D model formats.
 * 
 * @module @babylonjs/loaders/OBJ
 */

/**
 * Loader for MTL (Material Template Library) files.
 * MTL files define materials that are referenced by OBJ files.
 * 
 * @see {@link https://en.wikipedia.org/wiki/Wavefront_.obj_file#Material_template_library}
 */
export { MTLFileLoader } from './mtlFileLoader';

/**
 * Loader for OBJ (Wavefront Object) files.
 * OBJ is a geometry definition file format representing 3D geometry.
 * 
 * @see {@link https://en.wikipedia.org/wiki/Wavefront_.obj_file}
 */
export { OBJFileLoader } from './objFileLoader';

/**
 * Parser for solid geometry data within OBJ files.
 * Handles the parsing of vertex data, faces, and mesh structures.
 */
export { SolidParser } from './solidParser';

/**
 * Re-export loading options for OBJ files.
 * These options control how OBJ files are parsed and imported.
 */
export * from './objLoadingOptions';