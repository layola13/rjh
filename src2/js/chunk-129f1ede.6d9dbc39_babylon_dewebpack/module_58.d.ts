/**
 * Mesh merging utility module
 * Provides static methods for combining and optimizing 3D meshes in Babylon.js scenes
 */

import { Mesh, TransformNode } from '@babylonjs/core';

/**
 * Configuration for hardware component grouping
 */
interface HardwareGroup {
  /** Component type identifier (lowercase) */
  type: string;
  /** Array of mesh nodes belonging to this hardware type */
  array: TransformNode[];
}

/**
 * Mesh merging utility class
 * Provides methods to merge and optimize 3D meshes by component type
 */
export default class MeshMerger {
  /**
   * Merges an array of meshes into a single mesh
   * 
   * @param meshes - Array of meshes to merge
   * @param namePrefix - Prefix for the merged mesh name
   * @param parentNode - Parent transform node for the merged mesh
   * @param addToGlassCollection - If true, adds the merged mesh to the global glass collection
   */
  static MergeMesh(
    meshes: Mesh[],
    namePrefix: string,
    parentNode: TransformNode,
    addToGlassCollection?: boolean
  ): void;

  /**
   * Merges child meshes of provided nodes by component type and disposes original nodes
   * 
   * Groups meshes into categories based on naming conventions:
   * - jt: Joint components
   * - glassjt: Glass joint components
   * - lxcin: Inner aluminum components
   * - lxcout: Outer aluminum components
   * - glassitem/arcglass: Glass panels
   * - panelitem: Panel components
   * - flyscreen: Fly screen meshes
   * - gd: Guide components
   * - handle: Handle components (excluding KFC handles)
   * - lxca/lxc: Aluminum components
   * - kfchandle: KFC-style handle components
   * - endpointhinge: Hinge components at endpoints
   * - hard*: Hardware components (dynamically grouped)
   * - hollowlouveritem: Hollow louver items
   * - shutteritem: Shutter items
   * 
   * @param rootNodes - Array of root transform nodes containing child meshes to merge
   * @param parentNode - Parent node for all merged meshes
   * @param forceMerge - If true, bypasses the global mesh merge enable check
   */
  static MergeAndDestroyMesh(
    rootNodes: TransformNode[],
    parentNode: TransformNode,
    forceMerge?: boolean
  ): void;
}