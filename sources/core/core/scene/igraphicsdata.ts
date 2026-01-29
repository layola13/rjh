import { EntityEventType } from './EntityEventType';
import { IGraphicsData } from './IGraphicsData';

export { IGraphicsData };

interface CachedGraphicsData {
  objects: unknown[];
  meshDefs: unknown[];
}

interface EntityEvent<T = unknown> {
  data: T;
}

interface DirtyEventData {
  type: EntityEventType;
}

interface FlagChangedEventData {
  flag: number;
}

interface ChildEventData {
  entity: HSCore.Model.Entity;
}

interface ParentReplacedEventData {
  // Define based on actual usage
}

interface BaseObjectContext {
  objectMap?: Map<number, BaseObject>;
  dirtyObjectMap: Map<number, BaseObject>;
  createViewModel?: (entity: HSCore.Model.Entity, parent: BaseObject) => BaseObject | undefined;
  removeGraphicsData: (entityId: number) => void;
  setGraphicsData: (entityId: number, objects: unknown[], meshDefs: unknown[]) => void;
  removeHighResolutionGraphicsData: (entityId: number) => void;
  setHighResolutionGraphicsData: (entityId: number, objects: unknown[], meshDefs: unknown[]) => void;
}

/**
 * Base class for all graphics objects in the scene hierarchy.
 * Manages geometry caching, matrix transformations, and entity lifecycle.
 */
export class BaseObject {
  public entity?: HSCore.Model.Entity;
  public context: BaseObjectContext;
  public parent?: BaseObject;
  public childNodes?: Map<number, BaseObject>;
  public positionDirty: boolean;
  public needUpdateMatrix: boolean;
  public signalHook?: HSCore.Util.SignalHook;

  private _previewData: IGraphicsData | null;
  private _cachedData: CachedGraphicsData | null;
  private _updateCacheDataPromise: Promise<void> | null;
  private _matrixLocal: THREE.Matrix4;
  private _matrixWorld: THREE.Matrix4;
  private _geometryDirty: boolean;

  constructor(
    entity: HSCore.Model.Entity,
    context: BaseObjectContext,
    parent?: BaseObject
  ) {
    this.childNodes = new Map<number, BaseObject>();
    this.positionDirty = true;
    this.needUpdateMatrix = true;
    this._previewData = null;
    this._cachedData = {
      objects: [],
      meshDefs: []
    };
    this._updateCacheDataPromise = null;
    this._matrixLocal = new THREE.Matrix4();
    this._matrixWorld = new THREE.Matrix4();
    this._geometryDirty = true;
    this.signalHook = new HSCore.Util.SignalHook(this);
    this.entity = entity;
    this.context = context;
    this.parent = parent;

    if (this.context.objectMap) {
      this.context.objectMap.set(this.getEntityID(), this);
    }

    this.init();

    if (this.entity && this.signalHook) {
      this.signalHook
        .listen(entity.signalChildAdded, this.onChildAdded)
        .listen(entity.signalChildRemoved, this.onChildRemoved)
        .listen(entity.signalDirty, this._entityDirtied)
        .listen(entity.signalFlagChanged, this._entityFlagChanged)
        .listen(entity.signalParentReplaced, this.onParentReplaced);
    }
  }

  set geometryDirty(value: boolean) {
    this._geometryDirty = value;
  }

  get geometryDirty(): boolean {
    return this._geometryDirty;
  }

  get matrix(): THREE.Matrix4 {
    return this._matrixLocal;
  }

  get matrixWorld(): THREE.Matrix4 {
    return this._matrixWorld;
  }

  get geometry(): CachedGraphicsData | null {
    return this._cachedData;
  }

  public getEntityID(): number {
    return this.entity ? this.entity.id : -1;
  }

  public init(): void {
    this.onInit();
  }

  private _entityDirtied = (event: EntityEvent<DirtyEventData>): void => {
    const entityId = this.getEntityID();

    if (
      event.data.type === EntityEventType.Geometry ||
      event.data.type === EntityEventType.Material
    ) {
      this.geometryDirty = true;
      this.positionDirty = true;
      this._previewData = null;
      this._updateCacheDataPromise = null;
      this.needUpdateMatrix = true;

      if (this.entity instanceof HSCore.Model.ParametricModel) {
        const uniqueParent = this.entity.getUniqueParent();
        if (uniqueParent) {
          const parentObject = this.context.objectMap?.get(uniqueParent.id);
          if (parentObject) {
            this.context.dirtyObjectMap.set(uniqueParent.id, parentObject);
          }
          this.context.removeHighResolutionGraphicsData(uniqueParent.id);
        }
      } else {
        this.context.dirtyObjectMap.set(entityId, this);
        this.context.removeHighResolutionGraphicsData(entityId);
      }

      this.onEntityDirty(event);
    } else if (event.data.type === EntityEventType.Position) {
      this.needUpdateMatrix = true;
      this.positionDirty = true;

      if (this.entity instanceof HSCore.Model.ParametricModel) {
        const uniqueParent = this.entity.getUniqueParent();
        if (uniqueParent) {
          const parentObject = this.context.objectMap?.get(uniqueParent.id);
          if (parentObject) {
            this.context.dirtyObjectMap.set(uniqueParent.id, parentObject);
          }
          this.context.removeHighResolutionGraphicsData(uniqueParent.id);
        }
      } else {
        this.context.dirtyObjectMap.set(entityId, this);
        this.context.removeHighResolutionGraphicsData(entityId);
      }

      this.onEntityDirty(event);
    }
  };

  private _entityFlagChanged = (event: EntityEvent<FlagChangedEventData>): void => {
    if (event.data.flag === HSCore.Model.EntityFlagEnum.hidden) {
      if (this.entity instanceof HSCore.Model.ParametricModel) {
        const uniqueParent = this.entity.getUniqueParent();
        if (uniqueParent) {
          const parentObject = this.context.objectMap?.get(uniqueParent.id);
          if (parentObject) {
            this.context.dirtyObjectMap.set(uniqueParent.id, parentObject);
          }
        }
      } else {
        this.context.dirtyObjectMap.set(this.getEntityID(), this);
      }
    }
  };

  public needGenerateHighResolutionData(): boolean {
    return false;
  }

  public getPreviewData(): IGraphicsData | null {
    if (!this._previewData) {
      this._previewData = this.toPreviewData();
    }
    return this._previewData;
  }

  public async getGeometryDataAsync(forceUpdate: boolean = false): Promise<CachedGraphicsData | null> {
    this.update(forceUpdate);
    return this._cachedData;
  }

  public getModelMatrix(): THREE.Matrix4 {
    return this._matrixLocal;
  }

  public updateWorldMatrix(force?: boolean): void {
    if (!force && !this.needUpdateMatrix) {
      return;
    }

    const worldMatrix = this.getModelMatrix().clone();
    let currentParent = this.parent;

    while (currentParent) {
      if (currentParent.matrix) {
        worldMatrix.premultiply(currentParent.matrix);
      }
      currentParent = currentParent.parent;
    }

    this._matrixWorld = worldMatrix;
    this.needUpdateMatrix = false;
  }

  private onChildAdded = (event: EntityEvent<ChildEventData>): void => {
    const childEntity = event.data.entity;
    if (childEntity) {
      this.createViewModel(childEntity);
    }
  };

  private onChildRemoved = (event: EntityEvent<ChildEventData>): void => {
    const childEntity = event.data.entity;
    if (!childEntity) {
      return;
    }

    const childObject = this.childNodes?.get(childEntity.id);
    if (childObject) {
      this.childNodes?.delete(childEntity.id);
      childObject.clear();
    }
  };

  protected onEntityDirty(event: EntityEvent<DirtyEventData>): void {
    // Override in subclasses
  }

  private createViewModel(entity: HSCore.Model.Entity): void {
    if (!this.context.createViewModel) {
      return;
    }

    const viewModel = this.context.createViewModel(entity, this);
    if (viewModel && this.childNodes) {
      this.childNodes.set(entity.id, viewModel);
    }
  }

  private async _updateCacheDataAsync(): Promise<void> {
    if (this._cachedData && this.entity) {
      this.context.removeGraphicsData(this.entity.id);
    }

    this.onUpdate();

    const isValid = this.isValid();
    this._cachedData = HSConstants.Config.FgiEnable
      ? isValid
        ? await this.toGraphicsDataAsync()
        : null
      : {
          objects: [],
          meshDefs: []
        };

    if (this._cachedData && this.entity) {
      this.context.setGraphicsData(
        this.entity.id,
        this._cachedData.objects,
        this._cachedData.meshDefs
      );
    }

    this.context.dirtyObjectMap.delete(this.getEntityID());
  }

  public async updateAsync(forceUpdate: boolean, highResolution: boolean = false): Promise<void> {
    if (this.geometryDirty || forceUpdate) {
      try {
        if (!this._updateCacheDataPromise) {
          this._updateCacheDataPromise = highResolution
            ? this._updateHighResolutionCacheDataAsync()
            : this._updateCacheDataAsync();
        }
        await this._updateCacheDataPromise;
      } catch (error) {
        throw error;
      } finally {
        this._updateCacheDataPromise = null;
      }

      this.geometryDirty = false;

      const childUpdatePromises: Promise<void>[] = [];
      this.childNodes?.forEach((childNode) => {
        childUpdatePromises.push(childNode.updateAsync(forceUpdate, highResolution));
      });

      await Promise.all(childUpdatePromises);
    }

    if (this.positionDirty) {
      this.onUpdatePosition();
      this.positionDirty = false;
    }
  }

  private async _updateHighResolutionCacheDataAsync(): Promise<void> {
    if (!this.entity) {
      return;
    }

    this.context.removeHighResolutionGraphicsData(this.entity.id);

    const graphicsData = this.isValid() ? await this.toGraphicsDataAsync(true) : undefined;

    if (graphicsData && this.isValid() && this.entity) {
      this.context.setHighResolutionGraphicsData(
        this.entity.id,
        graphicsData.objects,
        graphicsData.meshDefs
      );
    }
  }

  public isValid(): boolean {
    if (!this.entity) {
      return false;
    }

    const checkValidity = (entity: HSCore.Model.Entity | null): boolean => {
      if (!entity) {
        return false;
      }

      if (entity.isRoot()) {
        return true;
      }

      const hasValidFlags = !entity.isFlagOn(
        HSCore.Model.EntityFlagEnum.hidden | HSCore.Model.EntityFlagEnum.removed
      );

      if (!hasValidFlags) {
        return false;
      }

      return Object.values(entity.parents).some((parent) => checkValidity(parent));
    };

    return checkValidity(this.entity);
  }

  public update(forceUpdate: boolean = false): void {
    const isValid = this.isValid();

    if (this.geometryDirty || forceUpdate || !this._cachedData) {
      if (this._cachedData && this.entity) {
        this.context.removeGraphicsData(this.entity.id);
      }

      this.onUpdate();

      this._cachedData = HSConstants.Config.FgiEnable
        ? isValid
          ? this.toGraphicsData()
          : null
        : {
            objects: [],
            meshDefs: []
          };

      this.context.dirtyObjectMap.delete(this.getEntityID());

      if (this._cachedData && this.entity) {
        this.context.setGraphicsData(
          this.entity.id,
          this._cachedData.objects,
          this._cachedData.meshDefs
        );
      }

      this.geometryDirty = false;

      if (isValid && this.childNodes) {
        this.childNodes.forEach((childNode) => {
          childNode.update();
        });
      }
    }

    if (this.positionDirty && isValid) {
      this.onUpdatePosition();
      this.positionDirty = false;
    }
  }

  public updateRoomCustomAttrs(): Record<string, unknown> {
    return {};
  }

  protected onUpdate(highResolution?: boolean): void {
    // Override in subclasses
  }

  protected onUpdatePosition(highResolution?: boolean): void {
    // Override in subclasses
  }

  protected onInit(): void {
    // Override in subclasses
  }

  protected toGraphicsData(highResolution: boolean = false): IGraphicsData {
    return {
      objects: [],
      meshDefs: []
    };
  }

  protected async toGraphicsDataAsync(highResolution: boolean = false): Promise<IGraphicsData> {
    return this.toGraphicsData(highResolution);
  }

  protected toPreviewData(): IGraphicsData {
    return {
      objects: [],
      meshDefs: []
    };
  }

  public clear(): void {
    const mappedObject = this.context.objectMap?.get(this.getEntityID());
    if (mappedObject && this === mappedObject) {
      this.context.objectMap?.delete(this.getEntityID());
      this.context.dirtyObjectMap.delete(this.getEntityID());
    }

    this.childNodes?.forEach((childNode) => {
      childNode.clear();
    });

    this.onCleanup();
  }

  public clearCache(): void {
    this.childNodes?.forEach((childNode) => {
      childNode.clearCache();
    });

    if (this._cachedData && this.entity) {
      this.context.removeGraphicsData(this.entity.id);
      this._cachedData = null;
    }
  }

  protected onCleanup(): void {
    if (this._cachedData && this.entity) {
      this.context.removeGraphicsData(this.entity.id);
      this._cachedData = null;
    }

    if (this.childNodes) {
      this.childNodes.clear();
      this.childNodes = undefined;
    }

    this.entity = undefined;

    if (this.signalHook) {
      this.signalHook.dispose();
      this.signalHook = undefined;
    }
  }

  public traverse(
    callback: (object: BaseObject) => void,
    context?: unknown
  ): void {
    if (callback) {
      callback.call(context, this);

      this.childNodes?.forEach((childNode) => {
        childNode.traverse(callback, context);
      });
    }
  }

  protected onParentReplaced(event: EntityEvent<ParentReplacedEventData>): void {
    // Override in subclasses
  }

  public dirtyGraph(): void {
    this.geometryDirty = true;
    this._previewData = null;
    this._updateCacheDataPromise = null;

    if (this.parent?.dirtyGraph) {
      this.parent.dirtyGraph();
    }
  }
}