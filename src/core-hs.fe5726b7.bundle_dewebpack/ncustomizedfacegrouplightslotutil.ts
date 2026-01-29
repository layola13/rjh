import { Matrix3 } from './Matrix3';
import { BackgroundPathUtil } from './BackgroundPathUtil';
import { NCustomizedFaceGroupUtil } from './NCustomizedFaceGroupUtil';

interface FaceGroupItem {
  entity: CustomizedEntity;
  faceType: string;
}

interface CurvePath {
  outer: Array<{ transform: (matrix: Matrix3) => void }>;
  holes?: Array<Array<{ transform: (matrix: Matrix3) => void }>>;
}

interface MixPaint {
  faceGroup: {
    faceGroupId?: string;
    clear: () => void;
  };
  updateBackgroundPolygon: (path: CurvePath) => void;
  transform: (matrix: THREE.Matrix3) => void;
  faceEntity?: CustomizedEntity;
  faceId?: string;
}

interface FaceMaterial {
  mixpaint?: MixPaint;
  clone: () => FaceMaterial | null;
}

interface CustomizedEntity {
  faceMaterials: Map<string, FaceMaterial>;
  getMeshKeyByFaceTag: (faceTag: string) => string;
  getFaceMaterial: (faceType: string) => FaceMaterial | null;
  setFaceMaterial: (faceType: string, material: FaceMaterial) => void;
}

export class NCustomizedFaceGroupLightSlotUtil {
  static splitLightSlotFaceGroups(entities: CustomizedEntity[]): void {
    const faceGroupItems = this.getFaceGroupItems(entities);
    
    for (let i = 0; i < faceGroupItems.length; i++) {
      this._resetOrginBackgroundFromFaceGroup(faceGroupItems[i]);
    }
  }

  static getFaceGroupItems(entities: CustomizedEntity[]): FaceGroupItem[] {
    const items: FaceGroupItem[] = [];
    
    entities.forEach((entity) => {
      entity.faceMaterials.forEach((faceMaterial, faceTag) => {
        if (faceMaterial.mixpaint?.faceGroup.faceGroupId) {
          items.push({
            entity,
            faceType: entity.getMeshKeyByFaceTag(faceTag)
          });
        }
      });
    });

    const allFaceItems = items
      .map((item) => NCustomizedFaceGroupUtil.getFaceItems(item.entity, item.faceType))
      .flat();

    const uniqueFaceItems: FaceGroupItem[] = [];
    
    allFaceItems.forEach((faceItem) => {
      if (!uniqueFaceItems.find((item) => item.faceType === faceItem.faceType)) {
        uniqueFaceItems.push(faceItem);
      }
    });

    return uniqueFaceItems;
  }

  private static _resetOrginBackgroundFromFaceGroup(faceGroupItem: FaceGroupItem): void {
    const { entity, faceType } = faceGroupItem;
    const faceMaterial = entity.getFaceMaterial(faceType);

    if (!faceMaterial || !faceMaterial.mixpaint) {
      return;
    }

    const clonedMaterial = faceMaterial.clone();

    if (!clonedMaterial || !clonedMaterial.mixpaint) {
      return;
    }

    const faceGroupTransform = NCustomizedFaceGroupUtil.getFaceGroupTransform(entity, faceType);
    const backgroundCurvePath = BackgroundPathUtil.getCurvePath(entity, faceType);

    if (faceGroupTransform && !faceGroupTransform.isIdentity()) {
      backgroundCurvePath.outer.forEach((curve) => curve.transform(faceGroupTransform));
      backgroundCurvePath.holes?.forEach((hole) => 
        hole.forEach((curve) => curve.transform(faceGroupTransform))
      );

      clonedMaterial.mixpaint.updateBackgroundPolygon(backgroundCurvePath);

      const inversedTransform = faceGroupTransform.inversed() || new Matrix3();
      clonedMaterial.mixpaint.transform(
        new THREE.Matrix3().fromArray(inversedTransform.toArray())
      );
    } else {
      clonedMaterial.mixpaint.updateBackgroundPolygon(backgroundCurvePath);
    }

    clonedMaterial.mixpaint.faceGroup.clear();
    clonedMaterial.mixpaint.faceEntity = entity;
    clonedMaterial.mixpaint.faceId = faceType;
    entity.setFaceMaterial(faceType, clonedMaterial);
  }
}