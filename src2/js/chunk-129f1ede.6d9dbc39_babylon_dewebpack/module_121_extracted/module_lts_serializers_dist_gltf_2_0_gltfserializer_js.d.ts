/**
 * glTF 2.0 Serializer Module
 * Provides functionality to export Babylon.js scenes to glTF 2.0 and GLB formats
 */

import type { Scene } from '@babylonjs/core';
import type { _Exporter } from './glTFExporter';

/**
 * Options for controlling the glTF export process
 */
export interface IExportOptions {
  /**
   * If true, exports immediately without waiting for the scene to be ready
   * @default false
   */
  exportWithoutWaitingForScene?: boolean;

  /**
   * Additional exporter-specific options
   */
  [key: string]: unknown;
}

/**
 * Result of a glTF export operation
 */
export interface IGLTFExportResult {
  /**
   * The exported glTF data as a JSON object
   */
  glTFFiles: {
    [fileName: string]: string | Blob;
  };

  /**
   * Additional metadata about the export
   */
  [key: string]: unknown;
}

/**
 * Result of a GLB export operation
 */
export interface IGLBExportResult {
  /**
   * The exported GLB binary data
   */
  glb: ArrayBuffer;

  /**
   * Additional metadata about the export
   */
  [key: string]: unknown;
}

/**
 * Main glTF 2.0 export class
 * Handles serialization of Babylon.js scenes to glTF 2.0 and GLB formats
 */
export declare class GLTF2Export {
  /**
   * Exports a Babylon.js scene to glTF 2.0 format
   * 
   * @param scene - The Babylon.js scene to export
   * @param fileNameOrPath - The target file name or path (extension will be removed)
   * @param options - Optional export configuration
   * @returns Promise resolving to the exported glTF data
   */
  static GLTFAsync(
    scene: Scene,
    fileNameOrPath: string,
    options?: IExportOptions
  ): Promise<IGLTFExportResult>;

  /**
   * Exports a Babylon.js scene to GLB (binary glTF) format
   * 
   * @param scene - The Babylon.js scene to export
   * @param fileNameOrPath - The target file name or path (extension will be removed)
   * @param options - Optional export configuration
   * @returns Promise resolving to the exported GLB binary data
   */
  static GLBAsync(
    scene: Scene,
    fileNameOrPath: string,
    options?: IExportOptions
  ): Promise<IGLBExportResult>;

  /**
   * Pre-export hook that prepares the scene for export
   * Waits for scene readiness unless configured otherwise
   * 
   * @param scene - The scene to prepare
   * @param options - Export options
   * @returns Promise that resolves when preparation is complete
   * @internal
   */
  static _PreExportAsync(
    scene: Scene,
    options?: IExportOptions
  ): Promise<void>;

  /**
   * Post-export hook for cleanup and final processing
   * 
   * @param scene - The exported scene
   * @param exportResult - The export result data
   * @param options - Export options
   * @returns Promise resolving to the final export result
   * @internal
   */
  static _PostExportAsync<T>(
    scene: Scene,
    exportResult: T,
    options?: IExportOptions
  ): Promise<T>;
}