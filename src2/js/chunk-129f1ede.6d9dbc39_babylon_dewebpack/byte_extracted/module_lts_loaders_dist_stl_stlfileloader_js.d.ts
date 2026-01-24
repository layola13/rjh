/**
 * STL File Loader for Babylon.js
 * Supports both ASCII and binary STL file formats
 */

import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Scene } from '@babylonjs/core/scene';
import { AssetContainer } from '@babylonjs/core/assetContainer';
import { VertexBuffer } from '@babylonjs/core/Buffers/buffer';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';
import { ISceneLoaderPluginAsync, ISceneLoaderPluginExtensions } from '@babylonjs/core/Loading/sceneLoader';

/**
 * Configuration for STL file coordinate system
 * When true, preserves the original file coordinates without axis conversion
 */
export declare const DO_NOT_ALTER_FILE_COORDINATES: boolean;

/**
 * STL File Loader Plugin
 * Imports STL files (Stereolithography) in both ASCII and binary formats
 */
export declare class STLFileLoader implements ISceneLoaderPluginAsync {
  /**
   * Plugin name identifier
   */
  readonly name: string;

  /**
   * Supported file extensions and their default parsing modes
   */
  readonly extensions: ISceneLoaderPluginExtensions;

  /**
   * Regular expression pattern to match solid blocks in ASCII STL files
   * Captures: solid name, content, endsolid name
   */
  readonly solidPattern: RegExp;

  /**
   * Regular expression pattern to match facet blocks in ASCII STL files
   * Captures: facet content including normal and vertices
   */
  readonly facetsPattern: RegExp;

  /**
   * Regular expression pattern to match normal vectors in ASCII STL files
   * Format: normal x y z (with optional scientific notation)
   */
  readonly normalPattern: RegExp;

  /**
   * Regular expression pattern to match vertex coordinates in ASCII STL files
   * Format: vertex x y z (with optional scientific notation)
   */
  readonly vertexPattern: RegExp;

  /**
   * Controls whether to preserve original file coordinate system
   * When false (default), converts coordinates to Babylon.js convention (Y-up)
   */
  static DO_NOT_ALTER_FILE_COORDINATES: boolean;

  /**
   * Import meshes from STL file data
   * 
   * @param meshesNames - Names of meshes to import (string, array, or null for all)
   * @param scene - Target scene for imported meshes
   * @param data - STL file content (string for ASCII or ArrayBuffer for binary)
   * @param rootUrl - Root URL for loading (unused for STL)
   * @param meshes - Optional array to populate with imported meshes
   * @returns True if import was successful, false otherwise
   */
  importMesh(
    meshesNames: string | string[] | null,
    scene: Scene,
    data: string | ArrayBuffer,
    rootUrl?: string,
    meshes?: Mesh[]
  ): boolean;

  /**
   * Load STL file data
   * 
   * @param scene - Target scene
   * @param data - STL file content
   * @param rootUrl - Root URL for loading
   * @returns True if load was successful
   */
  load(
    scene: Scene,
    data: string | ArrayBuffer,
    rootUrl?: string
  ): boolean;

  /**
   * Load STL file into an asset container
   * 
   * @param scene - Target scene
   * @param data - STL file content
   * @param rootUrl - Root URL for loading
   * @returns Asset container with imported meshes
   */
  loadAssetContainer(
    scene: Scene,
    data: string | ArrayBuffer,
    rootUrl?: string
  ): AssetContainer;

  /**
   * Determine if STL data is in binary format
   * 
   * @param data - ArrayBuffer containing potential STL data
   * @returns True if data appears to be binary STL format
   */
  private _isBinary(data: ArrayBuffer): boolean;

  /**
   * Parse binary STL data and populate mesh
   * 
   * Binary STL format:
   * - 80 byte header
   * - 4 byte unsigned int: triangle count
   * - For each triangle (50 bytes):
   *   - 12 bytes: normal vector (3 floats)
   *   - 36 bytes: 3 vertices (3x3 floats)
   *   - 2 bytes: attribute byte count (unused)
   * 
   * @param mesh - Target mesh to populate
   * @param data - Binary STL data
   */
  private _parseBinary(mesh: Mesh, data: ArrayBuffer): void;

  /**
   * Parse ASCII STL data and populate mesh
   * 
   * ASCII STL format:
   * solid [name]
   *   facet normal nx ny nz
   *     outer loop
   *       vertex x y z
   *       vertex x y z
   *       vertex x y z
   *     endloop
   *   endfacet
   *   ...
   * endsolid [name]
   * 
   * @param mesh - Target mesh to populate
   * @param solidData - ASCII STL solid block content
   */
  private _parseASCII(mesh: Mesh, solidData: string): void;
}

/**
 * Automatically register STL loader plugin with SceneLoader if available
 */
declare const _default: void;
export default _default;