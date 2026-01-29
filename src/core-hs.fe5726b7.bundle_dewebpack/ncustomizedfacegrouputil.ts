import { MathAlg } from './MathAlg';
import { ServiceManager, ClipMode, MathService } from './ServiceManager';
import { NCustomizedFeatureModel, DataModelConvertor } from './DataModelConvertor';
import { MaterialUtil } from './MaterialUtil';
import { PaintsUtil } from './PaintsUtil';

interface FaceItem {
  entity: any;
  faceType: string;
}

interface PathData {
  outer: any[];
  holes?: any[][];
}

interface FaceMaterial {
  mixpaint?: {
    faceGroup: FaceGroup;
    getBackgroundPath(): PathData | undefined;
  };
}

interface FaceGroup {
  faceGroupId: string;
  getFaceIds(): string[];
  getTransformById(faceType: string): Transform | undefined;
}

interface Transform {
  isIdentity(): boolean;
}

interface PaintInfo {
  facePaths2d?: any[][];
}

interface Entity {
  getFaceMaterial(faceType: string): FaceMaterial | undefined;
  getUniqueParent(): NCustomizedFeatureModel;
  getEntityByMeshName(meshName: string): Entity | undefined;
  getFaceByTag(tag: string): Brep | undefined;
}

interface Brep {
  getWires(): Wire[];
}

interface Wire {
  toPath(): any[];
}

export class NCustomizedFaceGroupUtil {
  static isFaceGroup(entity: Entity, faceType: string): boolean {
    const faceMaterial = entity.getFaceMaterial(faceType);
    const faceGroup = faceMaterial?.mixpaint?.faceGroup;
    return !!(faceGroup && faceGroup.faceGroupId);
  }

  static isSameFaceGroup(items: FaceItem[]): boolean {
    if (!items.length) {
      return false;
    }

    const firstMixpaint = items[0].entity.getFaceMaterial(items[0].faceType)?.mixpaint;
    
    if (!this.isFaceGroup(items[0].entity, items[0].faceType)) {
      return false;
    }

    return items.every(item => {
      return item.entity.getFaceMaterial(item.faceType)?.mixpaint === firstMixpaint;
    });
  }

  static getFaceItems(entity: Entity, faceType: string): FaceItem[] {
    const faceGroup = entity.getFaceMaterial(faceType)?.mixpaint?.faceGroup;
    
    if (!faceGroup || !faceGroup.faceGroupId) {
      return [];
    }

    const parentModel = entity instanceof NCustomizedFeatureModel 
      ? entity 
      : entity.getUniqueParent();
    const faceIds = faceGroup.getFaceIds();
    const result: FaceItem[] = [];

    faceIds.forEach(meshName => {
      const faceEntity = parentModel.getEntityByMeshName(meshName);
      if (faceEntity) {
        result.push({
          entity: faceEntity,
          faceType: meshName
        });
      }
    });

    return result.length !== faceIds.length ? [] : result;
  }

  static faceGroupNeedClearRCP(entity: Entity, faceType: string): boolean {
    const isRCP = MaterialUtil.isRCP(entity, faceType);
    
    const hasConflict = this.getFaceItems(entity, faceType).some(item => {
      return MaterialUtil.isRCP(item.entity, item.faceType) !== isRCP;
    });

    return hasConflict;
  }

  static getFaceGroupTransform(entity: Entity, faceType: string): Transform | undefined {
    const faceMaterial = entity.getFaceMaterial(faceType);
    if (faceMaterial?.mixpaint) {
      return faceMaterial.mixpaint.faceGroup.getTransformById(faceType);
    }
    return undefined;
  }

  static hasFaceBackgroundChanged(
    entity: Entity, 
    faceType: string, 
    material?: FaceMaterial
  ): boolean {
    const needClearRCP = this.faceGroupNeedClearRCP(entity, faceType);
    const faceMaterial = material ?? entity.getFaceMaterial(faceType);
    const faceItems = this.getFaceItems(entity, faceType);
    const backgroundPath = faceMaterial?.mixpaint?.getBackgroundPath();

    if (!backgroundPath && faceItems.length > 0) {
      return true;
    }

    const paths: PathData[] = [];
    faceItems.forEach(item => {
      const { entity: itemEntity, faceType: itemFaceType } = item;
      const paintInfo = PaintsUtil.getCustomizedModelFacePaintInfo(
        itemEntity, 
        itemFaceType, 
        undefined, 
        needClearRCP
      );

      if (paintInfo?.facePaths2d && paintInfo.facePaths2d.length > 0) {
        const outerPath = paintInfo.facePaths2d[0];
        const holePaths = paintInfo.facePaths2d.slice(1);
        const transform = this.getFaceGroupTransform(itemEntity, itemFaceType);

        if (transform) {
          const convertedPath = DataModelConvertor.convertPathFromPoints(
            outerPath, 
            holePaths, 
            transform.isIdentity() ? undefined : transform
          );
          paths.push(convertedPath);
        }
      }
    });

    const unionResult = ServiceManager.getClipperService().clip(
      paths.slice(0, 1), 
      paths.slice(1), 
      ClipMode.Union
    );

    if (unionResult.length !== 1) {
      return true;
    }

    const xorResult = ServiceManager.getClipperService().clip(
      [backgroundPath], 
      unionResult, 
      ClipMode.Xor
    );

    const AREA_THRESHOLD = 0.001;
    return xorResult.length !== 0 && MathService.ins.getArea(xorResult[0].outer) > AREA_THRESHOLD;
  }

  static isTwoBrepsConnected(brep1: Brep | undefined, brep2: Brep | undefined): boolean {
    if (!brep1 || !brep2) {
      return false;
    }

    const paths1 = brep1.getWires().map(wire => wire.toPath()).flat();
    const paths2 = brep2.getWires().map(wire => wire.toPath()).flat();

    for (const path1 of paths1) {
      for (const path2 of paths2) {
        const positionType = MathAlg.PositionJudge.curveToCurve(path1, path2);
        
        if (
          positionType === MathAlg.CurveCuvePositonType.OVERLAP || 
          positionType === MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP
        ) {
          return true;
        }
      }
    }

    return false;
  }

  static getFaceTagByMeshKey(meshKey: string): string {
    return meshKey.slice(meshKey.lastIndexOf('/') + 1);
  }

  static isNCustomizedConnected(entity: Entity, faceType: string): boolean {
    const allFaceItems = this.getFaceItems(entity, faceType);
    
    if (allFaceItems.length === 0) {
      return true;
    }

    const connectedItems = allFaceItems.filter(item => item.faceType === faceType);

    for (let i = 0; i < connectedItems.length; i++) {
      const faceTag = this.getFaceTagByMeshKey(connectedItems[i].faceType);
      const brep = connectedItems[i].entity.getFaceByTag(faceTag);

      for (let j = 0; j < allFaceItems.length; j++) {
        if (!connectedItems.includes(allFaceItems[j])) {
          const otherFaceTag = this.getFaceTagByMeshKey(allFaceItems[j].faceType);
          const otherBrep = allFaceItems[j].entity.getFaceByTag(otherFaceTag);

          if (this.isTwoBrepsConnected(brep, otherBrep)) {
            connectedItems.push(allFaceItems[j]);
          }
        }
      }
    }

    return allFaceItems.length === connectedItems.length;
  }

  static getPaveOutline(entity: Entity, faceType: string, needClearRCP: boolean): PathData {
    let outline: PathData = { outer: [] };

    const paintInfo = PaintsUtil.getCustomizedModelFacePaintInfo(
      entity, 
      faceType, 
      undefined, 
      needClearRCP
    );

    if (paintInfo?.facePaths2d && paintInfo.facePaths2d.length > 0) {
      const lines = paintInfo.facePaths2d.map(path => 
        MathService.ins.getLinesFromVectors(path)
      );
      
      outline = {
        outer: lines[0],
        holes: lines.slice(1)
      };
    }

    const transform = this.getFaceGroupTransform(entity, faceType);
    
    if (transform && !transform.isIdentity()) {
      outline = MathService.ins.transformedPath(outline, transform);
    }

    return outline;
  }
}