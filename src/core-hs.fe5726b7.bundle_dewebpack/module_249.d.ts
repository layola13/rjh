/**
 * Global type definitions for CAD/Graphics application modules
 * This module initializes various global namespaces and libraries
 */

/**
 * Debug flag for development mode
 */
declare global {
  /**
   * Global debug flag to control debug logging and features
   * @default false
   */
  var DEBUG: boolean;

  /**
   * NWTK library namespace
   * Purpose and functionality to be documented based on implementation
   */
  var NWTK: unknown | undefined;

  /**
   * ClipperLib WebAssembly module
   * Used for polygon clipping operations
   */
  var ClipperLibWasm: unknown | undefined;

  /**
   * ClipperLib instance for polygon manipulation
   * Provides clipping, offsetting, and boolean operations on polygons
   */
  var ClipperLibInstance: unknown | undefined;

  /**
   * PolygonTool WebAssembly module
   * Provides polygon processing capabilities via WebAssembly
   */
  var PolygonToolWasm: unknown | undefined;

  /**
   * PolygonTool library wrapper
   * JavaScript wrapper around the PolygonTool WebAssembly module
   */
  var PolygontoolLibWrapper: unknown | undefined;

  /**
   * PolygonTool instance
   * Active instance for polygon tool operations
   */
  var PolygonToolInstance: unknown | undefined;

  /**
   * DIY SDK namespace
   * Software Development Kit for DIY/customization features
   */
  var DiySdk: unknown | undefined;

  /**
   * Geometry Engine Library
   * Core library for geometric computations and operations
   */
  var GeLib: unknown | undefined;

  /**
   * WebCAD Model API
   * API for CAD model manipulation and rendering in web browsers
   */
  var WebCADModelAPI: unknown | undefined;
}

/**
 * Initialize global namespaces for CAD/Graphics libraries
 * Sets up the runtime environment with default values for all global modules
 */
export function initializeGlobalNamespaces(): void;

export {};