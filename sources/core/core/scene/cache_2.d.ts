/**
 * Graphics data caching system for 3D mesh and object management
 * Handles unit conversion, high-resolution data, and entity-based cache invalidation
 */

/**
 * Properties that contain vertex position data requiring unit conversion
 */
type VertexPositionProperty = 'vertexPositions';

/**
 * Properties that contain spatial coordinate data requiring unit conversion
 */
type SpatialProperty = 'bounding' | 'position' | 'localPosition';

/**
 * Mesh definition containing geometry data
 */
interface MeshDef {
  /** Unique identifier for this mesh */
  meshKey: string;
  /** Vertex position data in 3D space */
  vertexPositions?: number[][];
  /** Additional mesh properties */
  [key: string]: unknown;
}

/**
 * Graphics object representing a renderable entity
 */
interface GraphicsObject {
  /** Unique path identifier for this object */
  graphicsPath: string;
  /** Reference to the primary mesh definition key */
  mesh?: string;
  /** References to clipping mesh definition keys */
  clipMeshes?: string[];
  /** Entity ID this object belongs to */
  entityId?: string;
  /** Bounding box coordinates */
  bounding?: number[][];
  /** World position coordinates */
  position?: number[][];
  /** Local position coordinates */
  localPosition?: number[][];
  /** Additional object properties */
  [key: string]: unknown;
}

/**
 * Cache options configuration
 */
interface CacheOptions {
  /** Unit system for spatial measurements */
  unit: HSCore.Util.Unit.LengthUnitTypeEnum;
}

/**
 * Options for setting graphics objects with clipping
 */
interface SetObjectOptions {
  /** Key for the clipping mesh */
  clipKey?: string;
}

/**
 * Result structure for bulk graphics data retrieval
 */
interface GraphicsDataResult {
  /** Array of mesh definitions */
  meshDefs: MeshDef[];
  /** Array of graphics objects */
  objects: GraphicsObject[];
}

/**
 * Unified cache for managing 3D graphics data with support for:
 * - Standard and high-resolution mesh definitions
 * - Entity-based cache organization and invalidation
 * - Automatic unit conversion
 * - Clipping mesh support
 */
export class Cache {
  /** Standard resolution mesh definition cache (meshKey -> MeshDef) */
  private readonly _meshDefCache: Map<string, MeshDef>;
  
  /** Standard resolution graphics object cache (objectKey -> GraphicsObject) */
  private readonly _objectCache: Map<string, GraphicsObject>;
  
  /** Mapping from entity ID to associated object keys */
  private readonly _entityId2ObjectKeys: Map<string, Set<string>>;
  
  /** Mapping from entity ID to associated mesh keys */
  private readonly _entityId2MeshKeys: Map<string, Set<string>>;
  
  /** High-resolution mesh definition cache (meshKey -> MeshDef) */
  private readonly _highResolutionMeshDefCache: Map<string, MeshDef>;
  
  /** High-resolution graphics object cache (objectKey -> GraphicsObject) */
  private readonly _highResolutionObjectCache: Map<string, GraphicsObject>;
  
  /** Mapping from entity ID to associated high-res object keys */
  private readonly _highResolutionEntityId2ObjectKeys: Map<string, Set<string>>;
  
  /** Mapping from entity ID to associated high-res mesh keys */
  private readonly _highResolutionEntityId2MeshKeys: Map<string, Set<string>>;
  
  /** Cache configuration options */
  private readonly _option: CacheOptions;

  constructor() {
    this._meshDefCache = new Map();
    this._objectCache = new Map();
    this._entityId2ObjectKeys = new Map();
    this._entityId2MeshKeys = new Map();
    this._highResolutionMeshDefCache = new Map();
    this._highResolutionObjectCache = new Map();
    this._highResolutionEntityId2ObjectKeys = new Map();
    this._highResolutionEntityId2MeshKeys = new Map();
    this._option = {
      unit: HSCore.Util.Unit.LengthUnitTypeEnum.centimeter
    };
  }

  /**
   * Converts spatial data units from meters to the configured unit system
   * @param objects - Graphics objects to convert
   * @param meshDefs - Mesh definitions to convert
   */
  convertUnit(objects: GraphicsObject[], meshDefs: MeshDef[]): void {
    const converter = HSCore.Util.Unit.ConvertMeterToCustom.bind(null, this._option.unit);
    
    const VERTEX_PROPERTIES: VertexPositionProperty[] = ['vertexPositions'];
    const SPATIAL_PROPERTIES: SpatialProperty[] = ['bounding', 'position', 'localPosition'];
    
    // Convert mesh vertex data
    meshDefs.forEach((meshDef) => {
      this._convertProperties(meshDef, VERTEX_PROPERTIES, converter);
    });
    
    // Convert object spatial data
    objects.forEach((object) => {
      this._convertProperties(object, SPATIAL_PROPERTIES, converter);
    });
  }

  /**
   * Applies a conversion function to specified properties containing coordinate arrays
   * @param target - Object containing properties to convert
   * @param properties - Property names to process
   * @param converter - Conversion function to apply to each coordinate array
   */
  private _convertProperties(
    target: Record<string, unknown>,
    properties: string[],
    converter: (value: number[]) => number[]
  ): void {
    properties.forEach((property) => {
      const value = target[property];
      if (value && Array.isArray(value)) {
        target[property] = value.map(converter);
      }
    });
  }

  /**
   * Removes all standard resolution graphics data for an entity (internal)
   * @param entityId - Entity identifier
   */
  private _removeGraphicsData(entityId: string): void {
    const objectKeys = this._entityId2ObjectKeys.get(entityId);
    objectKeys?.forEach((key) => {
      this._objectCache.delete(key);
    });

    const meshKeys = this._entityId2MeshKeys.get(entityId);
    meshKeys?.forEach((key) => {
      this._meshDefCache.delete(key);
    });
  }

  /**
   * Removes all standard resolution graphics data for an entity
   * @param entityId - Entity identifier to clear
   */
  removeGraphicsData(entityId: string): void {
    this._removeGraphicsData(entityId);
    this._entityId2ObjectKeys.delete(entityId);
    this._entityId2MeshKeys.delete(entityId);
  }

  /**
   * Removes all high-resolution graphics data for an entity
   * @param entityId - Entity identifier to clear
   */
  removeHighResolutionGraphicsData(entityId: string): void {
    const objectKeys = this._highResolutionEntityId2ObjectKeys.get(entityId);
    objectKeys?.forEach((key) => {
      this._highResolutionObjectCache.delete(key);
    });

    const meshKeys = this._highResolutionEntityId2MeshKeys.get(entityId);
    meshKeys?.forEach((key) => {
      this._highResolutionMeshDefCache.delete(key);
    });

    this._highResolutionEntityId2ObjectKeys.delete(entityId);
    this._highResolutionEntityId2MeshKeys.delete(entityId);
  }

  /**
   * Checks if high-resolution graphics data exists for an entity
   * @param entityId - Entity identifier to check
   * @returns True if high-resolution data exists
   */
  hasHighResolutionGraphicsData(entityId: string): boolean {
    const objectKeys = this._highResolutionEntityId2ObjectKeys.get(entityId);
    return objectKeys !== undefined && objectKeys.size > 0;
  }

  /**
   * Stores standard resolution graphics data for an entity
   * @param entityId - Entity identifier
   * @param objects - Graphics objects to cache
   * @param meshDefs - Mesh definitions to cache
   */
  setGraphicsData(entityId: string, objects: GraphicsObject[], meshDefs: MeshDef[]): void {
    this.removeGraphicsData(entityId);

    if (!this._entityId2ObjectKeys.has(entityId)) {
      this._entityId2ObjectKeys.set(entityId, new Set());
    }
    if (!this._entityId2MeshKeys.has(entityId)) {
      this._entityId2MeshKeys.set(entityId, new Set());
    }

    this.convertUnit(objects, meshDefs);

    const meshDefMap = new Map<string, MeshDef>();
    meshDefs.forEach((meshDef) => {
      meshDefMap.set(meshDef.meshKey, meshDef);
    });

    objects.forEach((object) => {
      let meshDef = meshDefMap.get(this._getMeshKey(object));
      
      if (!meshDef && object.clipMeshes && object.clipMeshes.length > 0) {
        object.clipMeshes.forEach((clipKey) => {
          meshDef = meshDefMap.get(clipKey);
          this._setGraphicsObject(entityId, object, meshDef, { clipKey });
        });
      } else {
        this._setGraphicsObject(entityId, object, meshDef);
      }
    });
  }

  /**
   * Stores high-resolution graphics data for an entity
   * @param entityId - Entity identifier
   * @param objects - High-resolution graphics objects to cache
   * @param meshDefs - High-resolution mesh definitions to cache
   */
  setHighResolutionGraphicsData(entityId: string, objects: GraphicsObject[], meshDefs: MeshDef[]): void {
    this.removeHighResolutionGraphicsData(entityId);

    if (!this._highResolutionEntityId2ObjectKeys.has(entityId)) {
      this._highResolutionEntityId2ObjectKeys.set(entityId, new Set());
    }
    if (!this._highResolutionEntityId2MeshKeys.has(entityId)) {
      this._highResolutionEntityId2MeshKeys.set(entityId, new Set());
    }

    this.convertUnit(objects, meshDefs);

    const meshDefMap = new Map<string, MeshDef>();
    meshDefs.forEach((meshDef) => {
      meshDefMap.set(meshDef.meshKey, meshDef);
    });

    objects.forEach((object) => {
      let meshDef = meshDefMap.get(this._getMeshKey(object));
      
      if (!meshDef && object.clipMeshes && object.clipMeshes.length > 0) {
        object.clipMeshes.forEach((clipKey) => {
          meshDef = meshDefMap.get(clipKey);
          this._setHighResolutionGraphicsObject(entityId, object, meshDef, { clipKey });
        });
      } else {
        this._setHighResolutionGraphicsObject(entityId, object, meshDef);
      }
    });
  }

  /**
   * Retrieves graphics data for multiple objects by their identifiers
   * @param objects - Array of graphics objects with mesh references
   * @returns Array of mesh definitions found in cache
   */
  getGraphicsData(objects: GraphicsObject[]): MeshDef[] {
    const results: MeshDef[] = [];
    
    objects.forEach((object) => {
      const meshDef = this._getGraphicsObject(object);
      if (meshDef) {
        results.push(meshDef);
      }
    });
    
    return results;
  }

  /**
   * Retrieves all standard resolution graphics data, optionally excluding specific entities
   * @param excludeEntityIds - Entity IDs to exclude from results (default: empty array)
   * @returns All mesh definitions and objects not belonging to excluded entities
   */
  getAllGraphicsData(excludeEntityIds: string[] = []): GraphicsDataResult {
    if (excludeEntityIds.length === 0) {
      return {
        meshDefs: Array.from(this._meshDefCache.values()),
        objects: Array.from(this._objectCache.values())
      };
    }

    const excludedObjectKeys: string[] = [];
    const excludedMeshKeys: string[] = [];

    excludeEntityIds.forEach((entityId) => {
      const objectKeys = this._entityId2ObjectKeys.get(entityId);
      if (objectKeys) {
        excludedObjectKeys.push(...Array.from(objectKeys));
      }
      
      const meshKeys = this._entityId2MeshKeys.get(entityId);
      if (meshKeys) {
        excludedMeshKeys.push(...Array.from(meshKeys));
      }
    });

    const meshDefs: MeshDef[] = [];
    const objects: GraphicsObject[] = [];

    for (const [key, object] of this._objectCache) {
      if (!excludedObjectKeys.includes(key)) {
        objects.push(object);
      }
    }

    for (const [key, meshDef] of this._meshDefCache) {
      if (!excludedMeshKeys.includes(key)) {
        meshDefs.push(meshDef);
      }
    }

    return { meshDefs, objects };
  }

  /**
   * Retrieves all graphics data combining high-resolution and standard resolution,
   * excluding specified entities
   * @param excludeEntityIds - Entity IDs to exclude (default: empty array)
   * @returns Combined high-res and standard-res data for non-excluded entities
   */
  getAllHighResolutionGraphicsData(excludeEntityIds: string[] = []): GraphicsDataResult {
    const meshDefs: MeshDef[] = [];
    const objects: GraphicsObject[] = [];

    // Collect entity IDs that have high-resolution data
    const highResEntityIds = new Set<string>();
    Array.from(this._highResolutionObjectCache.values()).forEach((object) => {
      if (object.entityId) {
        highResEntityIds.add(object.entityId);
      }
    });

    // Collect mesh keys referenced by standard-res objects that should be included
    const referencedMeshKeys = new Set<string>();
    Array.from(this._objectCache.keys()).forEach((key) => {
      const object = this._objectCache.get(key);
      if (!object) return;

      const shouldInclude = !highResEntityIds.has(object.entityId) && 
                           !excludeEntityIds.includes(object.entityId);
      
      if (shouldInclude) {
        objects.push(object);
        
        if (object.mesh) {
          referencedMeshKeys.add(object.mesh);
        }
        
        if (object.clipMeshes && object.clipMeshes.length > 0) {
          object.clipMeshes.forEach((clipMesh) => {
            referencedMeshKeys.add(clipMesh);
          });
        }
      }
    });

    // Add referenced standard-res mesh definitions
    Array.from(this._meshDefCache.keys()).forEach((key) => {
      if (referencedMeshKeys.has(key)) {
        const meshDef = this._meshDefCache.get(key);
        if (meshDef) {
          meshDefs.push(meshDef);
        }
      }
    });

    // Add all high-resolution mesh definitions
    Array.from(this._highResolutionMeshDefCache.keys()).forEach((key) => {
      const meshDef = this._highResolutionMeshDefCache.get(key);
      if (meshDef) {
        meshDefs.push(meshDef);
      }
    });

    // Add all high-resolution objects
    Array.from(this._highResolutionObjectCache.keys()).forEach((key) => {
      const object = this._highResolutionObjectCache.get(key);
      if (object) {
        objects.push(object);
      }
    });

    return { meshDefs, objects };
  }

  /**
   * Clears all cached data (both standard and high-resolution)
   */
  clear(): void {
    this._meshDefCache.clear();
    this._objectCache.clear();
    this._entityId2ObjectKeys.clear();
    this._entityId2MeshKeys.clear();
    this.clearHighResolutionData();
  }

  /**
   * Clears only high-resolution cached data
   */
  clearHighResolutionData(): void {
    this._highResolutionObjectCache.clear();
    this._highResolutionMeshDefCache.clear();
    this._highResolutionEntityId2ObjectKeys.clear();
    this._highResolutionEntityId2MeshKeys.clear();
  }

  /**
   * Stores a standard resolution graphics object and its mesh definition
   * @param entityId - Entity identifier
   * @param object - Graphics object to store
   * @param meshDef - Associated mesh definition
   * @param options - Additional options (e.g., clip key)
   */
  private _setGraphicsObject(
    entityId: string,
    object: GraphicsObject,
    meshDef: MeshDef | undefined,
    options?: SetObjectOptions
  ): void {
    const objectKey = this._getObjectKey(object);
    this._objectCache.set(objectKey, object);
    this._entityId2ObjectKeys.get(entityId)?.add(objectKey);

    const meshKey = options?.clipKey ?? this._getMeshKey(object);
    if (meshKey && meshDef) {
      this._meshDefCache.set(meshKey, meshDef);
      this._entityId2MeshKeys.get(entityId)?.add(meshKey);
    }
  }

  /**
   * Stores a high-resolution graphics object and its mesh definition
   * @param entityId - Entity identifier
   * @param object - High-resolution graphics object to store
   * @param meshDef - Associated high-resolution mesh definition
   * @param options - Additional options (e.g., clip key)
   */
  private _setHighResolutionGraphicsObject(
    entityId: string,
    object: GraphicsObject,
    meshDef: MeshDef | undefined,
    options?: SetObjectOptions
  ): void {
    const objectKey = this._getObjectKey(object);
    this._highResolutionObjectCache.set(objectKey, object);
    this._highResolutionEntityId2ObjectKeys.get(entityId)?.add(objectKey);

    const meshKey = options?.clipKey ?? this._getMeshKey(object);
    if (meshKey && meshDef) {
      this._highResolutionMeshDefCache.set(meshKey, meshDef);
      this._highResolutionEntityId2MeshKeys.get(entityId)?.add(meshKey);
    }
  }

  /**
   * Retrieves a mesh definition by object reference
   * @param object - Graphics object containing mesh reference
   * @returns Cached mesh definition if found
   */
  private _getGraphicsObject(object: GraphicsObject): MeshDef | undefined {
    const meshKey = this._getMeshKey(object);
    if (meshKey) {
      return this._meshDefCache.get(meshKey);
    }
    return undefined;
  }

  /**
   * Extracts the unique cache key for a graphics object
   * @param object - Graphics object
   * @returns Unique identifier (graphics path)
   */
  private _getObjectKey(object: GraphicsObject): string {
    return object.graphicsPath;
  }

  /**
   * Extracts the mesh key from a graphics object
   * @param object - Graphics object
   * @returns Mesh key reference if present
   */
  private _getMeshKey(object: GraphicsObject): string | undefined {
    return object.mesh;
  }
}