/**
 * Module: module_538506
 * Original ID: 538506
 * 
 * T3D OBJ Loader Module
 * Provides OBJ file loading capabilities for T3D engine
 */

import type { 
  App, 
  Prefab, 
  Node, 
  Mesh, 
  MeshComponent, 
  DefaultMaterialType, 
  Pass, 
  ERenderPrimitiveGroup,
  RasterizerFillMode,
  RasterizerCullMode,
  MeshLambertMaterial,
  LineBasicMaterial
} from './367441';

/**
 * Render primitive groups used for rendering operations
 */
declare const RENDER_PRIMITIVE_GROUPS: readonly [
  ERenderPrimitiveGroup.RPG_OpaqueLit,
  ERenderPrimitiveGroup.RPG_OpaqueUnlit,
  ERenderPrimitiveGroup.RPG_TranslucentLit,
  ERenderPrimitiveGroup.RPG_TranslucentUnlit
];

/**
 * Configuration options for T3dOBJLoader2
 */
export interface T3dOBJLoader2Options {
  /**
   * Enable asynchronous downloading
   */
  isAsync?: boolean;
  
  /**
   * Cross-origin resource sharing configuration
   */
  crossOrigin?: string;
}

/**
 * T3D OBJ Loader Class
 * 
 * Handles loading and parsing of OBJ 3D model files for the T3D engine.
 * Supports both synchronous and asynchronous loading modes.
 */
export declare class T3dOBJLoader2 {
  /**
   * Global async mode flag
   * @default true
   */
  static async: boolean;

  /**
   * Instance async mode flag
   */
  isAsync: boolean;

  /**
   * Cross-origin configuration for resource loading
   */
  crossOrigin?: string;

  /**
   * Default material for face rendering (Lambert shading)
   * @internal
   */
  private _defaultFaceMaterial?: MeshLambertMaterial;

  /**
   * Default material for line rendering
   * @internal
   */
  private _defaultLineMaterial?: LineBasicMaterial;

  /**
   * Creates a new T3dOBJLoader2 instance
   * @param options - Configuration options
   */
  constructor(options?: T3dOBJLoader2Options);

  /**
   * Gets or creates the default face material
   * Uses Lambert shading with no culling
   * @returns The default face material instance
   * @internal
   */
  private _getDefaultFaceMaterial(): MeshLambertMaterial;

  /**
   * Gets or creates the default line material
   * @returns The default line material instance
   * @internal
   */
  private _getDefaultLineMaterial(): LineBasicMaterial;

  /**
   * Configures asynchronous download mode
   * @param enabled - True to enable async mode, false for sync mode
   */
  setAsyncDownload(enabled: boolean): void;

  /**
   * Sets the cross-origin attribute for resource loading
   * @param crossOrigin - CORS configuration ('anonymous', 'use-credentials', etc.)
   */
  setCrossOrigin(crossOrigin: string): void;
}

/**
 * Module exports
 */
export interface T3dOBJLoader2Module {
  /**
   * OBJ Loader class for T3D engine
   */
  T3dOBJLoader2: typeof T3dOBJLoader2;
}

declare const module: T3dOBJLoader2Module;
export default module;