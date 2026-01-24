/**
 * Legacy OBJ Serializer Module
 * 
 * This module provides backward compatibility for the legacy OBJ serializer.
 * It re-exports the OBJExport functionality from the main OBJ serializer module
 * and registers it globally on the BABYLON namespace for legacy browser usage.
 * 
 * @module LegacyOBJSerializer
 * @deprecated Use ES module imports from '@babylonjs/serializers/OBJ' instead
 */

/**
 * OBJ file exporter for Babylon.js meshes.
 * Exports scene geometry to Wavefront OBJ format.
 * 
 * @public
 */
export { OBJExport } from '../OBJ/index.js';

/**
 * Global object reference (window in browsers, global in Node.js)
 * Used for backward compatibility to attach exports to BABYLON namespace
 * 
 * @internal
 */
declare const globalObject: (Window & typeof globalThis & { BABYLON?: Record<string, unknown> }) | undefined;

/**
 * Type definition for the OBJ module exports
 * 
 * @internal
 */
interface OBJModuleExports {
  readonly OBJExport: unknown;
  readonly [key: string]: unknown;
}