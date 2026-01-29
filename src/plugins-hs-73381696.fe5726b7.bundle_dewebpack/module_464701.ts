interface Entity {
  instanceOf(modelClass: string): boolean;
  parameters: {
    frame?: { materialData: MaterialData };
    materialData?: MaterialData;
    innerMaterialData?: MaterialData;
    sideMaterialData?: MaterialData;
    topMaterialData?: MaterialData;
    bottomMaterialData?: MaterialData;
  };
  children?: Record<string, Entity>;
  onParametersChanged(): void;
  dirtyMaterial(): void;
  getUniqueParent(): Entity;
}

interface MaterialData {
  clone(): MaterialData;
  instanceOf(modelClass: string): boolean;
  getMaterialData(): MaterialData;
}

interface Mesh {
  entityId: string;
  node?: unknown;
}

interface ViewObject {
  node?: unknown;
}

interface PickResult {
  viewObject: ViewObject;
}

interface SuckEventData {
  entity: Entity;
  meshId: string;
  viewObject?: ViewObject;
  pickResults?: PickResult[];
}

interface SuckInfo {
  materialData?: MaterialData;
  paint?: {
    pattern?: unknown;
  };
}

interface UndoRedoData {
  target: Entity[];
  material: MaterialData[];
}

abstract class BaseStrategy {
  protected abstract _getMaterialDataFromSuckInfo(suckInfo: SuckInfo): MaterialData | null;
  protected abstract _prepareBrickPattern(pattern: unknown, materialData: MaterialData): Promise<void>;
}

export default class WindowStrategy extends BaseStrategy {
  public readonly type: string = "WindowStrategy";

  constructor() {
    super();
  }

  public isSuckable(eventData: SuckEventData): boolean {
    const entities = this._getCurrentEntity(eventData);
    return !!entities && !!this._getMaterialData(entities);
  }

  public suck(eventData: SuckEventData): SuckInfo | null {
    const entities = this._getCurrentEntity(eventData);
    if (entities) {
      const materialData = this._getMaterialData(entities);
      if (materialData) {
        return { materialData };
      }
    }
    return null;
  }

  public isAppliable(eventData: SuckEventData, suckInfo: SuckInfo | null): boolean {
    return !(!this._getCurrentEntity(eventData) || !suckInfo);
  }

  public apply(targets: Entity[] | null, suckInfo: SuckInfo): void {
    const materialData = this._getMaterialDataFromSuckInfo(suckInfo);
    if (materialData && targets) {
      const pattern = suckInfo.paint?.pattern;
      this._prepareBrickPattern(pattern, materialData).then(() => {
        const finalMaterialData =
          materialData.instanceOf(HSConstants.ModelClass.NgMaterial)
            ? materialData.getMaterialData()
            : materialData;
        const parent = targets[0].getUniqueParent();
        targets.forEach((entity) => {
          let clonedMaterial: MaterialData;
          if (entity.instanceOf(HSConstants.ModelClass.NgParametricWindow)) {
            clonedMaterial = entity.parameters.frame!.materialData.clone();
          } else {
            clonedMaterial = entity.parameters.materialData!.clone();
          }
          HSCore.Material.Util.setMaterialData(clonedMaterial, finalMaterialData);
          this._changeMaterial(entity, clonedMaterial, parent);
        });
      });
    }
  }

  public getUndoData(targets: Entity[] | null): UndoRedoData {
    let materials: MaterialData[] = [];
    if (targets) {
      materials = targets.map((entity) => {
        if (entity.instanceOf(HSConstants.ModelClass.NgParametricWindow)) {
          return entity.parameters.frame!.materialData.clone();
        } else if (
          entity.instanceOf(HSConstants.ModelClass.NgParametricWall) ||
          entity.instanceOf(HSConstants.ModelClass.NgParametricWindowCeiling)
        ) {
          return entity.parameters.innerMaterialData?.clone()!;
        } else if (entity.instanceOf(HSConstants.ModelClass.NgParametricWindowHole)) {
          return entity.parameters.sideMaterialData?.clone()!;
        } else {
          return entity.parameters.materialData!.clone();
        }
      });
    }
    return {
      target: targets ?? [],
      material: materials,
    };
  }

  public getRedoData(targets: Entity[] | null): UndoRedoData {
    let materials: MaterialData[] = [];
    if (targets) {
      materials = targets.map((entity) => {
        let materialData: MaterialData | undefined;
        if (entity.instanceOf(HSConstants.ModelClass.NgParametricWindow)) {
          materialData = entity.parameters.frame!.materialData.clone();
        }
        if (
          entity.instanceOf(HSConstants.ModelClass.NgParametricWall) ||
          entity.instanceOf(HSConstants.ModelClass.NgParametricWindowCeiling)
        ) {
          materialData = entity.parameters.innerMaterialData?.clone();
        }
        if (entity.instanceOf(HSConstants.ModelClass.NgParametricWindowHole)) {
          materialData = entity.parameters.sideMaterialData?.clone();
        }
        if (!materialData) {
          materialData = entity.parameters.materialData!.clone();
        }
        return materialData;
      });
    }
    return {
      target: targets ?? [],
      material: materials,
    };
  }

  public undo(eventData: SuckEventData, undoData: UndoRedoData): void {
    this._executeUndoRedo(undoData);
  }

  public redo(eventData: SuckEventData, redoData: UndoRedoData): void {
    this._executeUndoRedo(redoData);
  }

  private _executeUndoRedo(data: UndoRedoData): void {
    const { target, material } = data;
    const parent = target[0].getUniqueParent();
    target.forEach((entity, index) => {
      this._changeMaterial(entity, material[index].clone(), parent);
    });
  }

  private _entityIsAvailed(entity: Entity): boolean {
    return !!(
      entity.instanceOf(HSConstants.ModelClass.NgParametricWindowSill) ||
      entity.instanceOf(HSConstants.ModelClass.NgParametricWindowPocket) ||
      entity.instanceOf(HSConstants.ModelClass.NgParametricWindow)
    );
  }

  private _getCurrentMesh(meshId: string, viewObject: ViewObject): Mesh | null {
    const { getMeshId, getMeshChildren } = HSApp.View.T3d.Util;
    if (viewObject?.node) {
      const meshChildren = getMeshChildren(viewObject.node);
      if (meshChildren) {
        return meshChildren.find((mesh: Mesh) => getMeshId(mesh) === meshId) ?? null;
      }
    }
    return null;
  }

  private _getCurrentEntity(eventData: SuckEventData): Entity[] | false {
    const { entity, meshId, viewObject, pickResults } = eventData;
    if (entity instanceof HSCore.Model.CornerWindow) {
      let targetViewObject: ViewObject | undefined = viewObject;
      if (!targetViewObject && pickResults?.[0]) {
        targetViewObject = pickResults[0].viewObject;
      }
      if (!targetViewObject) return false;

      const mesh = this._getCurrentMesh(meshId, targetViewObject);
      if (mesh) {
        const entityId = mesh.entityId;
        const childEntity = entity.children?.[entityId];
        if (childEntity) {
          if (
            childEntity.instanceOf(HSConstants.ModelClass.NgParametricWindowSill) ||
            childEntity.instanceOf(HSConstants.ModelClass.NgParametricWindowPocket)
          ) {
            return [childEntity];
          }
          if (childEntity.instanceOf(HSConstants.ModelClass.NgParametricWindow)) {
            return Object.values(entity.children!).filter((child) =>
              child.instanceOf(HSConstants.ModelClass.NgParametricWindow)
            );
          }
          if (childEntity.instanceOf(HSConstants.ModelClass.NgParametricWall)) {
            return Object.values(entity.children!).filter((child) =>
              child.instanceOf(HSConstants.ModelClass.NgParametricWall)
            );
          }
          if (childEntity.instanceOf(HSConstants.ModelClass.NgParametricWindowHole)) {
            return Object.values(entity.children!).filter((child) =>
              child.instanceOf(HSConstants.ModelClass.NgParametricWindowHole)
            );
          }
          if (childEntity.instanceOf(HSConstants.ModelClass.NgParametricWindowCeiling)) {
            return Object.values(entity.children!).filter((child) =>
              child.instanceOf(HSConstants.ModelClass.NgParametricWindowCeiling)
            );
          }
        }
      }
    }
    return false;
  }

  private _getMaterialData(entities: Entity[]): MaterialData | null {
    const firstEntity = entities[0];
    if (!firstEntity) return null;

    if (firstEntity.instanceOf(HSConstants.ModelClass.NgParametricWindow)) {
      return firstEntity.parameters.frame!.materialData;
    } else if (
      firstEntity.instanceOf(HSConstants.ModelClass.NgParametricWall) ||
      firstEntity.instanceOf(HSConstants.ModelClass.NgParametricWindowCeiling)
    ) {
      return firstEntity.parameters.innerMaterialData ?? firstEntity.parameters.materialData ?? null;
    } else if (firstEntity.instanceOf(HSConstants.ModelClass.NgParametricWindowHole)) {
      return firstEntity.parameters.sideMaterialData ?? null;
    } else {
      return firstEntity.parameters.materialData ?? null;
    }
  }

  private _changeMaterial(entity: Entity, materialData: MaterialData, parent: Entity): void {
    if (entity.instanceOf(HSConstants.ModelClass.NgParametricWindow)) {
      entity.parameters.frame!.materialData = materialData.clone();
    } else if (
      entity.instanceOf(HSConstants.ModelClass.NgParametricWall) ||
      entity.instanceOf(HSConstants.ModelClass.NgParametricWindowCeiling)
    ) {
      entity.parameters.innerMaterialData = materialData.clone();
    } else if (entity.instanceOf(HSConstants.ModelClass.NgParametricWindowHole)) {
      entity.parameters.sideMaterialData = materialData.clone();
      entity.parameters.topMaterialData = materialData.clone();
      if (parent.instanceOf(HSConstants.ModelClass.NgPOrdinaryWindow)) {
        entity.parameters.bottomMaterialData = materialData.clone();
      }
    } else {
      entity.parameters.materialData = materialData.clone();
    }
    entity.onParametersChanged();
    entity.dirtyMaterial();
    entity.getUniqueParent().dirtyMaterial();
  }

  public commitRequest(eventData: SuckEventData, suckInfo: SuckInfo): void {
    const transactionManager = HSCore.Doc.getDocManager().transManager;
    const entities = this._getCurrentEntity(eventData);
    const request = transactionManager.createRequest(
      HSFPConstants.RequestType.MaterialBrush,
      [this.type, entities, suckInfo]
    );
    transactionManager.commitAsync(request);
  }
}