/**
 * Document manager for handling 3D scene data, geometries, and provider mappings.
 * Implements singleton pattern for global access.
 * 
 * @module DocManager
 * @remarks Original Module ID: 43874
 */

import { AssociationManager } from './AssociationManager';
import type * as THREE from 'three';

/**
 * Cached data structure for wall elements
 */
export interface WallCachedData {
  // Define specific wall data properties based on your application
  [key: string]: unknown;
}

/**
 * Generic geometry data structure
 */
export interface GeometryData {
  // Define specific geometry properties
  [key: string]: unknown;
}

/**
 * Provider interface for wall elements
 */
export interface WallProvider {
  // Define wall provider methods and properties
  [key: string]: unknown;
}

/**
 * Provider interface for slab elements
 */
export interface SlabProvider {
  // Define slab provider methods and properties
  [key: string]: unknown;
}

/**
 * Singleton document manager class that manages scene data, geometries, and various provider mappings.
 * Handles caching of wall data and provides centralized access to scene-related resources.
 */
export declare class DocManager {
  /**
   * Optional Three.js scene reference
   */
  scene?: THREE.Scene;

  /**
   * Cache storage for wall element data
   */
  wallCachedData: Map<string | number, WallCachedData>;

  /**
   * Storage for geometry definitions
   */
  geometries: Map<string | number, GeometryData>;

  /**
   * Mapping of wall providers by identifier
   */
  wallProviderMap: Map<string | number, WallProvider>;

  /**
   * Mapping of slab providers by identifier
   */
  slabProviderMap: Map<string | number, SlabProvider>;

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor();

  /**
   * Gets the singleton instance of DocManager
   * 
   * @returns The singleton DocManager instance
   */
  static instance(): DocManager;

  /**
   * Clears all cached data, geometries, provider maps, and resets the scene.
   * Also clears the associated AssociationManager instance.
   * 
   * @remarks This operation cannot be undone
   */
  clear(): void;
}