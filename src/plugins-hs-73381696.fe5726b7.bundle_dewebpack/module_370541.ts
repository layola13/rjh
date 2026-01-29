import { HSCore } from './HSCore';
import { Matrix4, Vector3 } from './math';
import * as THREE from 'three';

interface MaterialData {
  metadata?: any;
  meta?: any;
  blendColor?: any;
  colorMode?: any;
}

interface SuckResult {
  materialData: MaterialData;
  paint?: any;
  isParamPaint?: boolean;
}

interface PickInfo {
  entity: any;
  position?: number[];
}

interface UndoRedoData {
  faceTag: string;
  material?: HSCore.Material.Material;
}

export default class NCustomizedFace2dStrategy {
  public readonly type = "NCustomizedFace2dStrategy";

  constructor() {}

  /**
   * Check if the entity can be sucked (picked for material extraction)
   */
  isSuckable(pickInfo: PickInfo): boolean {
    return pickInfo.entity instanceof HSCore.Model.Face2d;
  }

  /**
   * Extract material data from a face
   */
  suck(pickInfo: PickInfo): SuckResult | undefined {
    const face = pickInfo.entity;
    
    if (!face || !(face instanceof HSCore.Model.Face2d)) {
      return undefined;
    }

    const parentEntity = face.parent?.parent;
    const faceMaterial = parentEntity.getFaceMaterialByFaceTag(face.id);
    const meshKey = parentEntity.getMeshKeyByFaceTag(face.id);

    if (faceMaterial) {
      return this.getPatternOrMaterial(pickInfo, faceMaterial, meshKey);
    }

    return {
      materialData: _.cloneDeep(parentEntity.getFaceMaterialData(meshKey))
    };
  }

  /**
   * Check if material can be applied to the entity
   */
  isAppliable(pickInfo: PickInfo, materialData: any): boolean {
    return !!materialData && pickInfo.entity instanceof HSCore.Model.Face2d;
  }

  /**
   * Apply material to a face
   */
  async apply(pickInfo: PickInfo, suckResult: SuckResult): Promise<void> {
    const face = pickInfo.entity;
    
    if (!face || !(face instanceof HSCore.Model.Face2d)) {
      return;
    }

    const parentEntity = face.parent?.parent;
    const faceTag = face.id;
    const meshKey = parentEntity.getMeshKeyByFaceTag(faceTag);

    await this.setMaterialByFaceIds(parentEntity, [meshKey], suckResult);
  }

  /**
   * Set material for multiple face IDs
   */
  async setMaterialByFaceIds(
    model: any,
    meshKeys: string[],
    suckResult: SuckResult
  ): Promise<void> {
    if (!Array.isArray(meshKeys) || meshKeys.length === 0) {
      return;
    }

    const metadata = suckResult.materialData.metadata 
      ? suckResult.materialData.metadata 
      : suckResult.materialData.meta;

    const defaultMaterialMap = new Map<string, any>();
    const faceGroupIds = HSApp.PaintPluginHelper.Util.MixPaintUtil.extractCustomizedModelFaceGroupIds(model, meshKeys) || [];
    const faceMaterialMap = new Map<string, HSCore.Material.Material>();

    for (const meshKey of meshKeys) {
      if (model.isFaceSupportPaintMaterialByMeshKey(meshKey)) {
        const patternDataMap = await HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper.getPatternDataAsync(
          model,
          [meshKey],
          metadata
        );

        patternDataMap.forEach((material: any, key: string) => {
          if (material instanceof HSCore.Material.Material) {
            material.mixpaint?.mixPave.regions.forEach((region: any) => {
              if (suckResult.paint) {
                region.pattern = suckResult.paint.pattern;
              }
            });

            model.setFaceMaterial(key, material);
            faceMaterialMap.set(key, material);
          }
        });
      } else {
        const materialDataObject = HSCore.Material.Util.getMaterialDataObjectFromCatalogMeta(metadata);
        const clonedMaterial = materialDataObject.clone();
        clonedMaterial.blendColor = suckResult.materialData.blendColor;
        clonedMaterial.colorMode = suckResult.materialData.colorMode;
        defaultMaterialMap.set(meshKey, clonedMaterial);
      }
    }

    if (faceMaterialMap.size > 0) {
      faceGroupIds.forEach((groupId: string) => {
        const faceMeshKeys = groupId.split(";") || [];
        const autoGroupData = HSCore.Util.CustomizedFeatureModel.getNCustomizedModelAutoGroupData(model, faceMeshKeys);
        const entities: any[] = [];

        const targetMeshKey = meshKeys.find((key) => faceMeshKeys.includes(key));
        if (!targetMeshKey) {
          return;
        }

        const targetMaterial = faceMaterialMap.get(targetMeshKey);
        if (!targetMaterial) {
          return;
        }

        autoGroupData[1].forEach((item: any) => {
          if (!meshKeys.includes(item.faceMeshKey)) {
            const mixpaint = targetMaterial.mixpaint;
            const clonedMaterial = targetMaterial.clone();
            clonedMaterial.mixpaint = mixpaint;
            item.entity.setFaceMaterial(item.faceMeshKey, clonedMaterial);
          }
          entities.push(item.entity);
        });

        HSCore.Util.Paints.updateNCusomizedModelMixPaintWithGroupBackground(
          entities,
          autoGroupData[0],
          targetMaterial
        );
      });
    }

    if (defaultMaterialMap.size > 0) {
      defaultMaterialMap.forEach((materialData, meshKey) => {
        const faceTag = model.getFaceTagByMeshKey(meshKey);
        model.setMaterialData(faceTag, materialData);
      });
    }

    model.dirtyGeometry();
  }

  /**
   * Get pattern or material from a face at a specific position
   */
  getPatternOrMaterial(
    pickInfo: PickInfo,
    material: HSCore.Material.Material,
    meshKey: string
  ): SuckResult | undefined {
    if (!material.mixpaint) {
      return {
        materialData: material.getMaterialData(),
        isParamPaint: false
      };
    }

    const face = pickInfo.entity;
    const parent = face?.parent;
    const model = parent?.parent;

    let paintInfo: any;
    if (model instanceof HSCore.Model.NCustomizedFeatureModel) {
      paintInfo = HSCore.Paint.PaintsUtil.getCustomizedModelFacePaintInfo(model, meshKey);
    }

    const position = pickInfo.position;
    if (!paintInfo || !parent || !position) {
      return undefined;
    }

    const transformMatrix = new Matrix4().fromArray(parent.convert3dMatrix.toArray());
    const extrusionValue = parent.getExtrusionValue(face.id);
    const localPoint = new Vector3(position[0], position[1], extrusionValue);
    localPoint.transform(transformMatrix);

    const worldPoint = new THREE.Vector3(localPoint.x, localPoint.y, localPoint.z)
      .applyMatrix4(paintInfo.worldProjectMatrix);

    const materialAtPoint = HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper.getMaterialByPoint(
      material.mixpaint,
      worldPoint
    );

    if (materialAtPoint?.materialData) {
      return {
        materialData: materialAtPoint.materialData,
        paint: materialAtPoint,
        isParamPaint: true
      };
    }

    return undefined;
  }

  /**
   * Get data for undo operation
   */
  getUndoData(pickInfo: PickInfo): UndoRedoData | undefined {
    return this._getUndoRedoData(pickInfo);
  }

  /**
   * Get data for redo operation
   */
  getRedoData(pickInfo: PickInfo): UndoRedoData | undefined {
    return this._getUndoRedoData(pickInfo);
  }

  /**
   * Undo material application
   */
  undo(pickInfo: PickInfo, undoData: UndoRedoData): void {
    const face = pickInfo.entity;
    this._undoRedoHandle(face, undoData);
  }

  /**
   * Redo material application
   */
  redo(pickInfo: PickInfo, redoData: UndoRedoData): void {
    const face = pickInfo.entity;
    this._undoRedoHandle(face, redoData);
  }

  /**
   * Handle undo/redo operations
   */
  private _undoRedoHandle(face: any, data: UndoRedoData): void {
    const model = face.parent?.parent;
    const defaultMaterialMap = new Map<string, any>();
    const material = data.material;
    const faceTag = data.faceTag;
    const meshKey = model.getMeshKeyByFaceTag(faceTag);
    const faceGroupIds = HSApp.PaintPluginHelper.Util.MixPaintUtil.extractCustomizedModelFaceGroupIds(model, [meshKey]) || [];
    const faceMaterialMap = new Map<string, HSCore.Material.Material>();

    if (model.isFaceSupportPaintMaterialByMeshKey(meshKey)) {
      if (material) {
        model.setFaceMaterial(meshKey, material);
        faceMaterialMap.set(meshKey, material);
      } else {
        model.facematerialmap.delete(faceTag);
      }
    } else {
      if (material) {
        defaultMaterialMap.set(faceTag, material);
      } else {
        model.defaultmaterialmap.delete(faceTag);
      }
    }

    if (faceMaterialMap.size > 0) {
      faceGroupIds.forEach((groupId: string) => {
        const faceMeshKeys = groupId.split(";") || [];
        const autoGroupData = HSCore.Util.CustomizedFeatureModel.getNCustomizedModelAutoGroupData(model, faceMeshKeys);
        const entities: any[] = [];

        autoGroupData[1].forEach((item: any) => {
          if (meshKey !== item.faceMeshKey && material) {
            const mixpaint = material.mixpaint;
            const clonedMaterial = material.clone();
            clonedMaterial.mixpaint = mixpaint;
            item.entity.setFaceMaterial(item.faceMeshKey, clonedMaterial);
          }
          entities.push(item.entity);
        });

        if (material) {
          HSCore.Util.Paints.updateNCusomizedModelMixPaintWithGroupBackground(
            entities,
            autoGroupData[0],
            material
          );
        }
      });
    }

    if (defaultMaterialMap.size > 0) {
      defaultMaterialMap.forEach((mat, tag) => {
        model.setMaterialData(tag, mat);
      });
    }

    model.dirtyGeometry();
  }

  /**
   * Get undo/redo data from a face
   */
  private _getUndoRedoData(pickInfo: PickInfo): UndoRedoData | undefined {
    const face = pickInfo.entity;
    
    if (!(face instanceof HSCore.Model.Face2d)) {
      return undefined;
    }

    const model = face.parent?.parent;
    const faceTag = face.id;

    let material: HSCore.Material.Material | undefined;

    if (model.facematerialmap.get(faceTag)?.material) {
      material = model.facematerialmap.get(faceTag)?.material;
    } else {
      material = model.defaultmaterialmap.get(faceTag)?.material;
    }

    return {
      faceTag,
      material: material?.clone()
    };
  }
}