import { ContentTypeEnum } from 'HSCatalog';
import { Model, Material, App } from 'HSCore';
import { isFakeDoor } from './utils';

interface Entity {
  metadata?: {
    contentType?: {
      isTypeOf(types: ContentTypeEnum[]): boolean;
    };
    userFreeData?: {
      defaultValues?: unknown;
    };
  };
  contentType?: {
    isTypeOf(type: ContentTypeEnum): boolean;
  };
  parents: Record<string, unknown>;
  localId?: string;
  getMaterial(key: string): Material.Material | undefined;
  setMaterial(keyOrMaterial: string | Material.Material, material?: Material.Material): void;
  forEachChild(callback: (child: unknown) => void): void;
  getContent?(): Entity;
}

interface MaterialData {
  textureURI?: string;
  paint?: {
    pattern?: {
      children?: Record<string, { material: unknown }>;
    };
  };
  materialData?: unknown;
}

interface ApplyTarget {
  entity: Entity;
}

interface UndoRedoData {
  [CABINET_BODY_MATERIAL_KEY]: unknown;
}

const CABINET_BODY_MATERIAL_KEY = 'cbnt_body';

export default class PAssemblyStrategy {
  type: string;

  constructor() {
    this.type = 'PAssemblyStrategy';
  }

  private _getValueByPath = (path: string[], target: unknown): unknown => {
    return path.reduce((acc: any, key: string) => {
      return acc && acc[key] ? acc[key] : null;
    }, target);
  };

  /**
   * Check if entity is a valid cabinet component type
   */
  isVailableEnt(entity: Entity | null | undefined): boolean {
    if (!entity) return false;

    const isCabinetComponent =
      entity.metadata?.contentType?.isTypeOf([
        ContentTypeEnum.CabinetDrawer,
        ContentTypeEnum.CabinetFlipDoor,
        ContentTypeEnum.CabinetDoor,
        ContentTypeEnum.DrawerDoor,
        ContentTypeEnum.DoorCore,
        ContentTypeEnum.CabinetComponent,
      ]) ?? false;

    const isCabinetDecoPanel =
      entity instanceof Model.Content &&
      entity.contentType?.isTypeOf(ContentTypeEnum.CabinetDecoPanel);

    const isValidModelType =
      entity instanceof Model.PExtruding ||
      entity instanceof Model.PBox ||
      entity instanceof Model.PMolding;

    return isCabinetComponent || isCabinetDecoPanel || isValidModelType;
  }

  /**
   * Check if entity can have material sucked from it
   */
  isSuckable(target: ApplyTarget): boolean {
    const { entity } = target;
    if (!this.isVailableEnt(entity)) return false;

    const material = entity.getMaterial(CABINET_BODY_MATERIAL_KEY);
    return !!material;
  }

  /**
   * Extract material data from entity
   */
  suck(target: ApplyTarget): unknown {
    const material = target.entity.getMaterial(CABINET_BODY_MATERIAL_KEY);
    return material?.getMaterialData();
  }

  /**
   * Check if material data can be applied to entity
   */
  isAppliable(target: ApplyTarget, materialData: MaterialData | null): boolean {
    if (!materialData || HSApp.Util.Url.isDataUrl(materialData.textureURI)) {
      return false;
    }

    return this.isVailableEnt(target.entity);
  }

  /**
   * Apply material data to entity
   */
  apply(target: ApplyTarget, materialData: MaterialData): void {
    const { entity } = target;

    let material: unknown;
    if (materialData.paint?.pattern?.children) {
      const children = Object.values(materialData.paint.pattern.children);
      material = children[0]?.material;
    } else {
      material = materialData.materialData;
    }

    this._setComponentMaterial(entity, CABINET_BODY_MATERIAL_KEY, material);
  }

  /**
   * Get data needed for undo operation
   */
  getUndoData(target: ApplyTarget): UndoRedoData {
    return this._getUndoRedoData(target.entity);
  }

  /**
   * Get data needed for redo operation
   */
  getRedoData(target: ApplyTarget): UndoRedoData {
    return this._getUndoRedoData(target.entity);
  }

  private _getUndoRedoData(entity: Entity): UndoRedoData {
    const material = entity.getMaterial(CABINET_BODY_MATERIAL_KEY);
    const materialData = material?.getMaterialData();

    return {
      [CABINET_BODY_MATERIAL_KEY]: materialData,
    };
  }

  /**
   * Undo material application
   */
  undo(target: ApplyTarget, data: UndoRedoData): void {
    this._undoRedo(target.entity, data);
  }

  /**
   * Redo material application
   */
  redo(target: ApplyTarget, data: UndoRedoData): void {
    this._undoRedo(target.entity, data);
  }

  private _undoRedo(entity: Entity, data: UndoRedoData): void {
    const materialData = data[CABINET_BODY_MATERIAL_KEY];
    this._setComponentMaterial(entity, CABINET_BODY_MATERIAL_KEY, materialData);
  }

  /**
   * Find all fake door contents within entity hierarchy
   */
  private _findAllFakeDoorContents(entity: Entity): Entity[] {
    const fakeDoors: Entity[] = [];

    entity.forEachChild((child: any) => {
      if (child.localId === 'doorAssembly' && child instanceof Model.PContent) {
        const content = child.getContent();
        const defaultValues = this._getValueByPath(
          ['metadata', 'userFreeData', 'defaultValues'],
          content
        );

        content.forEachChild((doorChild: any) => {
          if (doorChild.localId && isFakeDoor(doorChild.localId, defaultValues)) {
            fakeDoors.push(doorChild.getContent());
          }
        });
      }
    });

    return fakeDoors;
  }

  /**
   * Check if current filter is CabinetComponentFilter
   */
  private _isComponentFilter(): boolean {
    const currentFilter = HSApp.App.getApp().selectionManager.getCurrentFilter();
    return currentFilter instanceof CabinetComponentFilter;
  }

  /**
   * Set material on component entity
   */
  private _setComponentMaterial(
    entity: Entity,
    materialKey: string,
    materialData: unknown
  ): void {
    if (materialData) {
      let material = entity.getMaterial(materialKey);
      material = material ? material.clone() : new Material.Material();
      material.set(materialData);

      const isAssemblyType =
        entity instanceof Model.PAssembly ||
        entity instanceof Model.PExtruding ||
        entity instanceof Model.PBox ||
        entity instanceof Model.PMolding;

      if (isAssemblyType) {
        entity.setMaterial(material);
      } else {
        entity.setMaterial(materialKey, material);
      }
    } else {
      entity.setMaterial(materialKey, undefined);
    }
  }
}