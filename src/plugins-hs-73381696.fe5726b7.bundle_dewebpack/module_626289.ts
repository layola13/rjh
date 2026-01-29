import { CurtainComponentEnum, Curtain } from 'HSCore/Model';
import { Material } from 'HSCore/Material';
import { App } from 'HSApp/App';
import { Url } from 'HSApp/Util';
import { getMeshId } from 'HSApp/View/T3d/Util';

interface SuckTarget {
  entity: unknown;
  meshId: string;
}

interface SuckInfo {
  materialData?: MaterialData;
}

interface MaterialData {
  textureURI?: string;
  [key: string]: unknown;
}

interface ApplyTarget {
  entity: Curtain;
  meshId: string;
}

interface UndoRedoData {
  [componentName: string]: MaterialData | undefined;
}

interface WebglEntity {
  getCompomentMeshes(componentName: string): unknown[];
}

interface MaterialInstance {
  getMaterialData(): MaterialData;
  clone(): MaterialInstance;
  set(data: MaterialData): void;
}

abstract class BaseStrategy {
  abstract type: string;
}

export default class CurtainStrategy extends BaseStrategy {
  type = "CurtainStrategy";

  constructor() {
    super();
  }

  /**
   * Check if the target entity and mesh can be sucked (material copied from)
   */
  isSuckable(target: SuckTarget): boolean {
    if (target.entity instanceof Curtain) {
      const curtain = target.entity;
      const meshId = target.meshId;
      const webglEntity = this._getWebglEntity(curtain);
      const componentName = this._getComponentNameByMeshId(webglEntity, meshId);
      
      return !!componentName && !!curtain.getMaterial(componentName);
    }
    return false;
  }

  /**
   * Extract material data from the target
   */
  suck(target: SuckTarget): SuckInfo | undefined {
    const curtain = target.entity as Curtain;
    const meshId = target.meshId;
    const webglEntity = this._getWebglEntity(curtain);
    const componentName = this._getComponentNameByMeshId(webglEntity, meshId);
    
    if (componentName) {
      const material = curtain.getMaterial(componentName);
      return material ? { materialData: material.getMaterialData() } : undefined;
    }
    return undefined;
  }

  /**
   * Check if the sucked material can be applied to the target
   */
  isAppliable(target: ApplyTarget, suckInfo: SuckInfo | undefined): boolean {
    if (!suckInfo?.materialData?.textureURI) {
      return false;
    }
    
    if (Url.isDataUrl(suckInfo.materialData.textureURI)) {
      return false;
    }
    
    return target.entity instanceof Curtain;
  }

  /**
   * Apply the sucked material to the target
   */
  apply(target: ApplyTarget, suckInfo: SuckInfo): boolean {
    const curtain = target.entity;
    const meshId = target.meshId;
    const webglEntity = this._getWebglEntity(curtain);
    const componentName = this._getComponentNameByMeshId(webglEntity, meshId);
    
    if (!componentName) {
      return false;
    }
    
    const materialData = this._getMaterialDataFromSuckInfo(suckInfo);
    this._setComponentMaterial(curtain, componentName, materialData);
    return true;
  }

  /**
   * Get data needed for undo operation
   */
  getUndoData(target: ApplyTarget): UndoRedoData {
    const curtain = target.entity;
    return this._getUndoRedoData(curtain);
  }

  /**
   * Get data needed for redo operation
   */
  getRedoData(target: ApplyTarget): UndoRedoData {
    const curtain = target.entity;
    return this._getUndoRedoData(curtain);
  }

  /**
   * Undo the material application
   */
  undo(target: ApplyTarget, data: UndoRedoData): void {
    const curtain = target.entity;
    this._undoRedo(curtain, data);
  }

  /**
   * Redo the material application
   */
  redo(target: ApplyTarget, data: UndoRedoData): void {
    const curtain = target.entity;
    this._undoRedo(curtain, data);
  }

  private _undoRedo(curtain: Curtain, data: UndoRedoData): void {
    for (const key in CurtainComponentEnum) {
      const componentName = CurtainComponentEnum[key];
      const materialData = data[componentName];
      this._setComponentMaterial(curtain, componentName, materialData);
    }
  }

  private _getUndoRedoData(curtain: Curtain): UndoRedoData {
    const result: UndoRedoData = {};
    
    for (const key in CurtainComponentEnum) {
      const componentName = CurtainComponentEnum[key];
      let materialData: MaterialData | undefined = undefined;
      const material = curtain.getMaterial(componentName);
      
      if (material) {
        materialData = material.getMaterialData();
      }
      
      result[componentName] = materialData;
    }
    
    return result;
  }

  private _getWebglEntity(curtain: Curtain): WebglEntity {
    return App.getApp().getActive3DView().displayList[curtain.ID];
  }

  private _getComponentNameByMeshId(webglEntity: WebglEntity, meshId: string): string | undefined {
    let foundComponentName: string | undefined = undefined;
    
    for (const key in CurtainComponentEnum) {
      const componentName = CurtainComponentEnum[key];
      const meshes = webglEntity.getCompomentMeshes(componentName);
      
      if (meshes && meshes.length > 0) {
        if (meshes.find((mesh) => getMeshId(mesh) === meshId)) {
          foundComponentName = componentName;
          break;
        }
      }
    }
    
    return foundComponentName;
  }

  private _setComponentMaterial(curtain: Curtain, componentName: string, materialData: MaterialData | undefined): void {
    if (materialData) {
      let material = curtain.getMaterial(componentName);
      material = material ? material.clone() : new Material();
      material.set(materialData);
      curtain.setMaterial(componentName, material);
    } else {
      curtain.setMaterial(componentName, undefined);
    }
  }

  private _getMaterialDataFromSuckInfo(suckInfo: SuckInfo): MaterialData | undefined {
    return suckInfo.materialData;
  }
}