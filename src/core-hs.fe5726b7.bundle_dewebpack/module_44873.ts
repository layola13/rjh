interface MeshData {
  [key: string]: unknown;
}

interface MetaData {
  [key: string]: unknown;
}

interface MaterialInfo {
  [key: string]: unknown;
}

type CacheKey = string | number | object;

class CacheManager {
  private readonly _meshMap: Map<string, MeshData>;
  private readonly _metaMap: Map<string, MetaData>;
  private readonly _materialInfoMap: Map<string, MaterialInfo>;

  constructor() {
    this._meshMap = new Map<string, MeshData>();
    this._metaMap = new Map<string, MetaData>();
    this._materialInfoMap = new Map<string, MaterialInfo>();
  }

  /**
   * Retrieves mesh data from cache by key
   */
  getMesh(key: CacheKey): MeshData | undefined {
    return this._meshMap.get(key.toString());
  }

  /**
   * Stores mesh data in cache if not already present
   */
  setMesh(key: CacheKey, mesh: MeshData): void {
    const keyString = key.toString();
    if (!this._meshMap.has(keyString)) {
      this._meshMap.set(keyString, mesh);
    }
  }

  /**
   * Stores metadata in cache
   */
  setMeta(key: CacheKey, meta: MetaData): void {
    const keyString = key.toString();
    this._metaMap.set(keyString, meta);
  }

  /**
   * Retrieves metadata from cache by key
   */
  getMeta(key: CacheKey): MetaData | undefined {
    return this._metaMap.get(key.toString());
  }

  /**
   * Stores material info for a mesh
   */
  setMeshMaterial(key: CacheKey, material: MaterialInfo): void {
    this._materialInfoMap.set(key.toString(), material);
  }

  /**
   * Retrieves material info for a mesh
   */
  getMeshMaterial(key: CacheKey): MaterialInfo | undefined {
    return this._materialInfoMap.get(key.toString());
  }
}

export const cacheManager = new CacheManager();