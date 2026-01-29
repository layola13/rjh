interface MeshDef {
  meshKey: string;
  vertexPositions?: number[];
  [key: string]: unknown;
}

interface GraphicsObject {
  entityId?: string;
  graphicsPath: string;
  mesh?: string;
  clipMeshes?: string[];
  bounding?: number[];
  position?: number[];
  localPosition?: number[];
  [key: string]: unknown;
}

interface CacheOption {
  unit: HSCore.Util.Unit.LengthUnitTypeEnum;
}

interface SetGraphicsObjectOptions {
  clipKey?: string;
}

interface GetAllGraphicsDataResult {
  meshDefs: MeshDef[];
  objects: GraphicsObject[];
}

declare namespace HSCore.Util.Unit {
  enum LengthUnitTypeEnum {
    centimeter = 'centimeter'
  }
  function ConvertMeterToCustom(unit: LengthUnitTypeEnum, value: number): number;
}

declare global {
  interface Array<T> {
    xPushCollection(items: T[]): void;
  }
}

const VERTEX_POSITION_KEYS = ['vertexPositions'];

const UNIT_CONVERTIBLE_KEYS = ['bounding', 'position', 'localPosition'];

const applyTransformToKeys = (
  target: Record<string, unknown>,
  keys: string[],
  transform: (value: number) => number
): void => {
  keys.forEach((key) => {
    const value = target[key];
    if (value && Array.isArray(value)) {
      target[key] = value.map(transform);
    }
  });
};

export class Cache {
  private _meshDefCache: Map<string, MeshDef>;
  private _objectCache: Map<string, GraphicsObject>;
  private _entityId2ObjectKeys: Map<string, Set<string>>;
  private _entityId2MeshKeys: Map<string, Set<string>>;
  private _highResolutionMeshDefCache: Map<string, MeshDef>;
  private _highResolutionObjectCache: Map<string, GraphicsObject>;
  private _highResolutionEntityId2ObjectKeys: Map<string, Set<string>>;
  private _highResolutionEntityId2MeshKeys: Map<string, Set<string>>;
  private _option: CacheOption;

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

  convertUnit(objects: GraphicsObject[], meshDefs: MeshDef[]): void {
    const converter = HSCore.Util.Unit.ConvertMeterToCustom.bind(null, this._option.unit);
    
    meshDefs.forEach((meshDef) => {
      applyTransformToKeys(meshDef, VERTEX_POSITION_KEYS, converter);
    });
    
    objects.forEach((obj) => {
      applyTransformToKeys(obj, UNIT_CONVERTIBLE_KEYS, converter);
    });
  }

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

  removeGraphicsData(entityId: string): void {
    this._removeGraphicsData(entityId);
    this._entityId2ObjectKeys.delete(entityId);
    this._entityId2MeshKeys.delete(entityId);
  }

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

  hasHighResolutionGraphicsData(entityId: string): boolean {
    const objectKeys = this._highResolutionEntityId2ObjectKeys.get(entityId);
    return objectKeys !== undefined && objectKeys.size > 0;
  }

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

    objects.forEach((obj) => {
      let meshDef = meshDefMap.get(this._getMeshKey(obj));
      
      if (!meshDef && obj.clipMeshes && obj.clipMeshes.length > 0) {
        obj.clipMeshes.forEach((clipKey) => {
          meshDef = meshDefMap.get(clipKey);
          this._setGraphicsObject(entityId, obj, meshDef, { clipKey });
        });
      } else {
        this._setGraphicsObject(entityId, obj, meshDef);
      }
    });
  }

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

    objects.forEach((obj) => {
      let meshDef = meshDefMap.get(this._getMeshKey(obj));
      
      if (!meshDef && obj.clipMeshes && obj.clipMeshes.length > 0) {
        obj.clipMeshes.forEach((clipKey) => {
          meshDef = meshDefMap.get(clipKey);
          this._setHighResolutionGraphicsObject(entityId, obj, meshDef, { clipKey });
        });
      } else {
        this._setHighResolutionGraphicsObject(entityId, obj, meshDef);
      }
    });
  }

  getGraphicsData(objects: GraphicsObject[]): MeshDef[] {
    const result: MeshDef[] = [];
    
    objects.map((obj) => {
      const graphicsObject = this._getGraphicsObject(obj);
      if (graphicsObject) {
        result.push(graphicsObject);
      }
    });
    
    return result;
  }

  getAllGraphicsData(entityIds: string[] = []): GetAllGraphicsDataResult {
    if (entityIds.length === 0) {
      return {
        meshDefs: Array.from(this._meshDefCache.values()),
        objects: Array.from(this._objectCache.values())
      };
    }

    const objectKeys: string[] = [];
    const meshKeys: string[] = [];

    entityIds.forEach((entityId) => {
      let keys = this._entityId2ObjectKeys.get(entityId);
      objectKeys.xPushCollection(Array.from(keys ?? []));
      
      keys = this._entityId2MeshKeys.get(entityId);
      meshKeys.xPushCollection(Array.from(keys ?? []));
    });

    const filteredMeshDefs: MeshDef[] = [];
    const filteredObjects: GraphicsObject[] = [];

    for (const [key, obj] of this._objectCache) {
      if (!objectKeys.includes(key)) {
        filteredObjects.push(obj);
      }
    }

    for (const [key, meshDef] of this._meshDefCache) {
      if (!meshKeys.includes(key)) {
        filteredMeshDefs.push(meshDef);
      }
    }

    return {
      meshDefs: filteredMeshDefs,
      objects: filteredObjects
    };
  }

  getAllHighResolutionGraphicsData(excludeEntityIds: string[] = []): GetAllGraphicsDataResult {
    const meshDefs: MeshDef[] = [];
    const objects: GraphicsObject[] = [];
    const highResEntityIds = new Set<string>();

    Array.from(this._highResolutionObjectCache.values()).forEach((obj) => {
      if (obj.entityId) {
        highResEntityIds.add(obj.entityId);
      }
    });

    const requiredMeshKeys = new Set<string>();

    Array.from(this._objectCache.keys()).forEach((key) => {
      const obj = this._objectCache.get(key);
      if (!obj) return;

      if (!highResEntityIds.has(obj.entityId ?? '') && !excludeEntityIds.includes(obj.entityId ?? '')) {
        objects.push(obj);
        
        if (obj.mesh) {
          requiredMeshKeys.add(obj.mesh);
        }
        
        if (obj.clipMeshes && obj.clipMeshes.length > 0) {
          obj.clipMeshes.forEach((meshKey) => {
            requiredMeshKeys.add(meshKey);
          });
        }
      }
    });

    Array.from(this._meshDefCache.keys()).forEach((key) => {
      if (requiredMeshKeys.has(key)) {
        const meshDef = this._meshDefCache.get(key);
        if (meshDef) {
          meshDefs.push(meshDef);
        }
      }
    });

    Array.from(this._highResolutionMeshDefCache.keys()).forEach((key) => {
      const meshDef = this._highResolutionMeshDefCache.get(key);
      if (meshDef) {
        meshDefs.push(meshDef);
      }
    });

    Array.from(this._highResolutionObjectCache.keys()).forEach((key) => {
      const obj = this._highResolutionObjectCache.get(key);
      if (obj) {
        objects.push(obj);
      }
    });

    return {
      meshDefs,
      objects
    };
  }

  clear(): void {
    this._meshDefCache.clear();
    this._objectCache.clear();
    this._entityId2ObjectKeys.clear();
    this._entityId2MeshKeys.clear();
    this.clearHighResolutionData();
  }

  clearHighResolutionData(): void {
    this._highResolutionObjectCache.clear();
    this._highResolutionMeshDefCache.clear();
    this._highResolutionEntityId2ObjectKeys.clear();
    this._highResolutionEntityId2MeshKeys.clear();
  }

  private _setGraphicsObject(
    entityId: string,
    obj: GraphicsObject,
    meshDef: MeshDef | undefined,
    options?: SetGraphicsObjectOptions
  ): void {
    const objectKey = this._getObjectKey(obj);
    this._objectCache.set(objectKey, obj);
    this._entityId2ObjectKeys.get(entityId)?.add(objectKey);

    const meshKey = options?.clipKey ?? this._getMeshKey(obj);
    if (meshKey && meshDef) {
      this._meshDefCache.set(meshKey, meshDef);
      this._entityId2MeshKeys.get(entityId)?.add(meshKey);
    }
  }

  private _setHighResolutionGraphicsObject(
    entityId: string,
    obj: GraphicsObject,
    meshDef: MeshDef | undefined,
    options?: SetGraphicsObjectOptions
  ): void {
    const objectKey = this._getObjectKey(obj);
    this._highResolutionObjectCache.set(objectKey, obj);
    this._highResolutionEntityId2ObjectKeys.get(entityId)?.add(objectKey);

    const meshKey = options?.clipKey ?? this._getMeshKey(obj);
    if (meshKey && meshDef) {
      this._highResolutionMeshDefCache.set(meshKey, meshDef);
      this._highResolutionEntityId2MeshKeys.get(entityId)?.add(meshKey);
    }
  }

  private _getGraphicsObject(obj: GraphicsObject): MeshDef | undefined {
    const meshKey = this._getMeshKey(obj);
    if (meshKey) {
      return this._meshDefCache.get(meshKey);
    }
  }

  private _getObjectKey(obj: GraphicsObject): string {
    return obj.graphicsPath;
  }

  private _getMeshKey(obj: GraphicsObject): string {
    return obj.mesh ?? '';
  }
}