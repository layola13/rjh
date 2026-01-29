import Strategy from './Strategy';

interface Entity {
  entity?: any;
}

interface SuckInfo {
  materialData?: any;
}

interface UndoRedoData {
  entity: any;
  materialData: any;
}

export default class OpeningStrategy extends Strategy {
  private _dependencies: any;
  public type: string;

  constructor(dependencies: any) {
    super();
    this._dependencies = dependencies;
    this.type = "OpeningStrategy";
  }

  /**
   * Determines if an entity can be "sucked" (material data extracted)
   */
  isSuckable(context: Entity): boolean {
    const entity = context.entity;
    if (!entity) return false;

    if (entity instanceof HSCore.Model.Pocket) return true;

    const parent = entity.getFirstParent && entity.getFirstParent();
    if (!parent) return false;

    if (parent instanceof HSCore.Model.Window && entity instanceof HSCore.Model.Parametrization.WindowSill) {
      return true;
    }

    if ((parent instanceof HSCore.Model.Window || parent instanceof HSCore.Model.Door) && HSCore.Util.Content.isWallOpening(parent)) {
      return false;
    }

    return false;
  }

  /**
   * Extracts material data from an entity
   */
  suck(context: Entity): SuckInfo | undefined {
    const entity = context.entity;
    let materialData: any;

    if (entity instanceof HSCore.Model.Pocket) {
      const material = entity.getMaterial();
      if (material) {
        materialData = material.getMaterialData();
      }
    } else if (entity instanceof HSCore.Model.Parametrization.WindowSill) {
      const paramMaterialData = entity.parameters?.materialData;
      if (paramMaterialData) {
        materialData = paramMaterialData;
      }
    } else {
      materialData = entity.material.getMaterialData();
    }

    return materialData ? { materialData } : undefined;
  }

  /**
   * Checks if material data can be applied to an entity
   */
  isAppliable(context: Entity, suckInfo: SuckInfo | undefined): boolean {
    if (!suckInfo) return false;

    const entity = context.entity;
    if (!entity) return false;

    if (entity instanceof HSCore.Model.Pocket) return true;

    const parent = entity.getFirstParent && entity.getFirstParent();
    if (!parent) return false;

    if (parent instanceof HSCore.Model.Window && entity instanceof HSCore.Model.Parametrization.WindowSill) {
      return true;
    }

    if ((parent instanceof HSCore.Model.Window || parent instanceof HSCore.Model.Door) && HSCore.Util.Content.isWallOpening(parent)) {
      return false;
    }

    return false;
  }

  /**
   * Applies material data to an entity
   */
  apply(context: Entity, suckInfo: SuckInfo): void {
    const entity = context.entity;
    const materialData = this._getMaterialDataFromSuckInfo(suckInfo);

    if (entity instanceof HSCore.Model.Pocket) {
      this._setEntityMaterial(entity, materialData);
    } else if (entity instanceof HSCore.Model.Parametrization.WindowSill) {
      if (entity.parameters?.materialData) {
        entity.parameters.materialData.setMaterialData(materialData);
        entity.dirtyMaterial();
      }
    } else if (entity?.parents) {
      const parent = Object.values(entity.parents)[0];

      if (parent instanceof HSCore.Model.Door) {
        const sideFaces = Object.values(parent.faces.side);
        const bottomFaceFromFaces = Object.values(parent.faces.bottom)[0];
        const bottomFace = parent.getBottomFace();

        if (entity === bottomFace) {
          parent.setDoorStoneMaterialStatus(true);
          const material = HSCore.Material.Material.create(materialData);
          parent.setBottomFaceMaterial(material);
        } else if (entity === bottomFaceFromFaces) {
          entity.material.set(materialData);
          entity.dirtyMaterial();
        } else {
          sideFaces
            .filter((face: any) => face !== bottomFace)
            .forEach((face: any) => {
              face.material.set(materialData);
              face.dirtyMaterial();
            });
        }
      }
    }
  }

  /**
   * Gets data needed for undo operation
   */
  getUndoData(context: Entity): UndoRedoData | null {
    const entity = context.entity;
    return this._getUndoRedoData(entity);
  }

  /**
   * Gets data needed for redo operation
   */
  getRedoData(context: Entity): UndoRedoData | null {
    const entity = context.entity;
    return this._getUndoRedoData(entity);
  }

  /**
   * Undoes a material application
   */
  undo(context: Entity, data: UndoRedoData): void {
    this._undoRedoImpl(data);
  }

  /**
   * Redoes a material application
   */
  redo(context: Entity, data: UndoRedoData): void {
    this._undoRedoImpl(data);
  }

  private _getUndoRedoData(entity: any): UndoRedoData | null {
    if (entity instanceof HSCore.Model.Pocket) {
      const material = entity.getMaterial();
      return material ? {
        entity,
        materialData: material.getMaterialData()
      } : null;
    }

    if (entity instanceof HSCore.Model.Parametrization.WindowSill) {
      if (entity.parameters?.materialData) {
        const clonedMaterialData = entity.parameters.materialData.clone();
        return {
          entity,
          materialData: clonedMaterialData
        };
      }
      return null;
    }

    if (entity?.parents) {
      const parent = Object.values(entity.parents)[0];

      if (parent instanceof HSCore.Model.Door) {
        const sideFaces = Object.values(parent.faces.side);
        const bottomFaceFromFaces = Object.values(parent.faces.bottom)[0];
        const bottomFace = parent.getBottomFace();

        if (entity === bottomFace || entity === bottomFaceFromFaces) {
          const clonedMaterialData = entity.material.getMaterialData().clone();
          return {
            entity: [entity],
            materialData: [clonedMaterialData]
          };
        }

        const filteredSideFaces = sideFaces.filter((face: any) => face !== bottomFace);
        const materialDataArray = filteredSideFaces.map((face: any) => 
          face.material.getMaterialData().clone()
        );

        return {
          entity: filteredSideFaces,
          materialData: materialDataArray
        };
      }
    }

    return null;
  }

  private _undoRedoImpl(data: UndoRedoData): void {
    const { entity, materialData } = data;

    if (entity instanceof HSCore.Model.Pocket) {
      this._setEntityMaterial(entity, materialData);
    } else if (entity instanceof HSCore.Model.Parametrization.WindowSill) {
      if (entity.parameters?.materialData) {
        entity.parameters.materialData.setMaterialData(materialData);
        entity.dirtyMaterial();
      }
    } else if (entity?.parents) {
      const parent = Object.values(entity.parents)[0];

      if (parent instanceof HSCore.Model.Door) {
        const sideFaces = Object.values(parent.faces.side);
        const bottomFaceFromFaces = Object.values(parent.faces.bottom)[0];
        const bottomFace = parent.getBottomFace();

        if (entity === bottomFace) {
          parent.setDoorStoneMaterialStatus(true);
          const material = HSCore.Material.Material.create(materialData);
          parent.setBottomFaceMaterial(material);
        } else if (entity === bottomFaceFromFaces) {
          entity.material.set(materialData);
          entity.dirtyMaterial();
        } else {
          sideFaces
            .filter((face: any) => face !== bottomFace)
            .forEach((face: any) => {
              face.material.set(materialData);
              face.dirtyMaterial();
            });
        }
      }
    } else {
      entity.forEach((currentEntity: any, index: number) => {
        currentEntity.material.set(materialData[index]);
        currentEntity.dirtyMaterial();
      });
    }
  }

  private _setEntityMaterial(entity: any, materialData: any): void {
    const clonedMaterial = entity.getMaterial().clone();
    clonedMaterial.set(materialData);
    entity.setMaterial(clonedMaterial);
  }

  private _getMaterialDataFromSuckInfo(suckInfo: SuckInfo): any {
    return suckInfo.materialData;
  }
}