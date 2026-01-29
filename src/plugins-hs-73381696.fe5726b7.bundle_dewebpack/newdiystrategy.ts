import { MaterialData } from 'HSCore/Material';
import { CustomizedPMInstanceModel } from 'HSCore/Model';
import { addMaterialToNewDiy, updateCustomizedPMInstanceModel, getNewDiyPaveInfo } from './utils';

interface SuckTarget {
  entity: any;
  meshId: string;
  meshName?: string;
}

interface MaterialInfo {
  texture?: string;
  colorMode?: string;
  color?: string;
  seekId?: string;
  [key: string]: any;
}

interface PaveInfo {
  [key: string]: any;
}

interface SuckResult {
  materialData?: MaterialData;
  [key: string]: any;
}

interface UndoRedoData {
  oldValue: any;
  newValue: any;
}

const UNDO_REDO_DATA_SYMBOL = Symbol('undoredoDataSymbol');

export class NewDiyStrategy {
  public readonly type: string = 'NewDiyStrategy';

  /**
   * Check if the target entity can be sucked (material can be extracted)
   */
  public isSuckable(target: SuckTarget): boolean {
    if (!(target.entity instanceof CustomizedPMInstanceModel)) {
      return false;
    }

    const paveInfo = this._getPaveInfo(target);
    if (paveInfo !== false) {
      return paveInfo || this._getMaterialInfo(target.entity, target.meshId);
    }

    return false;
  }

  /**
   * Extract material information from the target
   */
  public suck(target: SuckTarget): SuckResult | PaveInfo | undefined {
    const { entity, meshId } = target;

    if (!(entity instanceof CustomizedPMInstanceModel)) {
      return undefined;
    }

    const paveInfo = this._getPaveInfo(target);
    if (paveInfo) {
      return paveInfo;
    }

    const materialInfo = this._getMaterialInfo(entity, meshId);
    if (materialInfo) {
      const result: MaterialInfo = {
        ...materialInfo,
        textureURI: materialInfo.texture
      };

      if (materialInfo.colorMode === 'blend') {
        result.blendColor = materialInfo.color;
        delete result.color;
      }

      if (!result.seekId) {
        result.seekId = 'local';
      }

      return {
        materialData: MaterialData.create(result)
      };
    }

    return undefined;
  }

  /**
   * Check if the material can be applied to the target
   */
  public isAppliable(target: SuckTarget, material: any): boolean {
    return target.entity instanceof CustomizedPMInstanceModel;
  }

  /**
   * Apply material to the target entity
   */
  public async apply(target: SuckTarget, material: any): Promise<void> {
    const undoRedoData = await addMaterialToNewDiy(material, target);
    
    if (undoRedoData) {
      (target as any)[UNDO_REDO_DATA_SYMBOL] = undoRedoData;
    }
  }

  /**
   * Get data for undo operation
   */
  public getUndoData(target: SuckTarget): any {
    return undefined;
  }

  /**
   * Get data for redo operation
   */
  public getRedoData(target: SuckTarget): any {
    return undefined;
  }

  /**
   * Undo the material application
   */
  public undo(target: SuckTarget, data: any): void {
    const undoRedoData = (target as any)[UNDO_REDO_DATA_SYMBOL] as UndoRedoData | undefined;
    updateCustomizedPMInstanceModel(target.entity, undoRedoData?.oldValue);
  }

  /**
   * Redo the material application
   */
  public redo(target: SuckTarget, data: any): void {
    const undoRedoData = (target as any)[UNDO_REDO_DATA_SYMBOL] as UndoRedoData | undefined;
    updateCustomizedPMInstanceModel(target.entity, undoRedoData?.newValue);
  }

  /**
   * Get material information from entity's material map
   */
  private _getMaterialInfo(entity: CustomizedPMInstanceModel, meshId: string): MaterialInfo | undefined {
    return entity.materialMap?.get(meshId);
  }

  /**
   * Get pave information from the target
   */
  private _getPaveInfo(target: SuckTarget): PaveInfo | false {
    return getNewDiyPaveInfo(target);
  }
}