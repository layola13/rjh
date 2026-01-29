import { Matrix3 } from '../types/Module55256';
import { MigrateFacegroup } from './migratefacegroup';

interface RawPath2D {
  outer: PathSegment[];
  holes?: PathSegment[][];
}

interface PathSegment {
  transform(matrix: Matrix3): void;
}

interface FaceEntity {
  material?: MaterialInfo;
  rawPath2d: RawPath2D;
  clone?(): FaceEntity;
}

interface MaterialInfo {
  mixpaint?: MixpaintInfo;
}

interface MixpaintInfo {
  faceGroup: FaceGroupInfo;
  faceEntity?: FaceEntity;
  transform(matrix: THREE.Matrix3): void;
  updateBackgroundPolygon(path: RawPath2D): void;
  clear?(): void;
}

interface FaceGroupInfo {
  getFaceIds(): number[];
  clear(): void;
}

declare namespace HSCore.Util.FaceGroup {
  function getFaceGroupTransformMixpaint(faceId: number, mixpaint: MixpaintInfo): Matrix3 | null;
  function isFaceGroupMixpaint(mixpaint: MixpaintInfo): boolean;
}

export class MigrateMixpaint {
  static doFaceGroup(faceEntities: FaceEntity[], mixpaint: MixpaintInfo): MixpaintInfo | false | undefined {
    if (faceEntities.length < 2) {
      return false;
    }

    const connectFacesInfo = MigrateFacegroup.getConnectFacesInfo(faceEntities);
    return connectFacesInfo 
      ? MigrateFacegroup.initMixPaintForFaceGroup(connectFacesInfo, mixpaint) 
      : undefined;
  }

  static transformPath(path: RawPath2D, matrix: Matrix3): RawPath2D {
    const applyTransform = (segments: PathSegment[]): void => {
      segments.forEach(segment => segment.transform(matrix));
    };

    applyTransform(path.outer);
    
    if (path.holes) {
      path.holes.forEach(hole => applyTransform(hole));
    }

    return path;
  }

  static _disconnectFromOldFaceGroup(faceId: number, mixpaint: MixpaintInfo, faceEntity: FaceEntity): void {
    const transformMatrix = HSCore.Util.FaceGroup.getFaceGroupTransformMixpaint(faceId, mixpaint);
    
    if (!transformMatrix) {
      return;
    }

    const inversedMatrix = transformMatrix.inversed() ?? new Matrix3();
    const threeMatrix = new THREE.Matrix3().fromArray(inversedMatrix.toArray());
    const transformedPath = transformMatrix.isIdentity() 
      ? faceEntity.rawPath2d 
      : this.transformPath(faceEntity.rawPath2d, transformMatrix);

    const clonedEntity = faceEntity.clone();

    if (clonedEntity && faceEntity.material) {
      clonedEntity.updateBackgroundPolygon(transformedPath);
      clonedEntity.transform(threeMatrix);
      clonedEntity.faceGroup.clear();
      faceEntity.material.mixpaint = clonedEntity;
    }
  }

  static updateMigrationFaceGroup(
    faceIds: number[], 
    mixpaint: MixpaintInfo, 
    faceEntityMap: Map<number, FaceEntity[]>
  ): void {
    if (HSCore.Util.FaceGroup.isFaceGroupMixpaint(mixpaint)) {
      let shouldDisconnect = false;
      const existingFaceIds = mixpaint.faceGroup.getFaceIds();
      const collectedEntities: FaceEntity[] = [];

      if (faceIds.every(id => existingFaceIds.includes(id))) {
        for (let i = 0; i < existingFaceIds.length; i++) {
          const existingFaceId = existingFaceIds[i];
          const entities = faceEntityMap.get(existingFaceId);

          if (entities?.length) {
            collectedEntities.push(...entities);
          }
        }

        const newMixpaint = this.doFaceGroup(collectedEntities, mixpaint);

        if (newMixpaint) {
          collectedEntities.forEach(entity => {
            entity.material!.mixpaint = newMixpaint;
          });
        } else {
          shouldDisconnect = true;
        }
      } else {
        shouldDisconnect = true;
      }

      if (shouldDisconnect) {
        for (let i = 0; i < faceIds.length; i++) {
          const faceId = faceIds[i];
          const entities = faceEntityMap.get(faceId);

          if (entities?.length) {
            entities.forEach(entity => {
              this._disconnectFromOldFaceGroup(faceId, mixpaint, entity);
            });
          }
        }
      }
    } else {
      faceIds.forEach(faceId => {
        const entities = faceEntityMap.get(faceId);

        if (entities?.length) {
          const newMixpaint = this.doFaceGroup(entities, mixpaint);

          if (newMixpaint) {
            entities.forEach(entity => {
              entity.material!.mixpaint = newMixpaint;
            });
          } else {
            entities.forEach(entity => {
              const existingMixpaint = entity.material?.mixpaint;

              if (existingMixpaint) {
                existingMixpaint.faceEntity = entity;
                existingMixpaint.updateBackgroundPolygon(entity.rawPath2d);
              }
            });
          }
        }
      });
    }
  }
}