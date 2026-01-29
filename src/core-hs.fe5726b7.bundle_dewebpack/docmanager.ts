import { AssociationManager } from './AssociationManager';

interface WallCachedData {
  // Define the structure of wall cached data based on your domain
  [key: string]: unknown;
}

interface Geometry {
  // Define the structure of geometry data based on your domain
  [key: string]: unknown;
}

interface WallProvider {
  // Define the structure of wall provider based on your domain
  [key: string]: unknown;
}

interface SlabProvider {
  // Define the structure of slab provider based on your domain
  [key: string]: unknown;
}

interface Scene {
  // Define the structure of scene based on your domain
  [key: string]: unknown;
}

let singletonInstance: DocManager | undefined;

/**
 * Document Manager class that handles wall caching, geometries, and provider mappings.
 * Implements singleton pattern.
 */
export class DocManager {
  private wallCachedData: Map<string, WallCachedData>;
  private geometries: Map<string, Geometry>;
  private wallProviderMap: Map<string, WallProvider>;
  private slabProviderMap: Map<string, SlabProvider>;
  private scene?: Scene;

  constructor() {
    this.wallCachedData = new Map();
    this.geometries = new Map();
    this.wallProviderMap = new Map();
    this.slabProviderMap = new Map();
  }

  /**
   * Gets the singleton instance of DocManager.
   * @returns The singleton DocManager instance
   */
  static instance(): DocManager {
    if (!singletonInstance) {
      singletonInstance = new DocManager();
    }
    return singletonInstance;
  }

  /**
   * Clears all cached data, geometries, provider maps, and resets the scene.
   */
  clear(): void {
    this.scene = undefined;
    this.wallCachedData.clear();
    this.geometries.clear();
    this.wallProviderMap.clear();
    this.slabProviderMap.clear();
    AssociationManager.instance().clear();
  }
}