import { Matrix4 } from './Matrix4';
import { ClipperService, ClipMode, MixPaveDwgDecorator } from './ClipperService';
import { BaseDwgUtil } from './BaseDwgUtil';
import { FaceUtil } from './FaceUtil';
import { FaceGroupUtil } from './FaceGroupUtil';
import { NCustomizedStructure, StructureMode } from './CustomizedStructure';

interface PathData {
  outer: any;
}

interface MergePathsData {
  mergePaths: PathData[];
}

interface MaterialData {
  mixpaint?: {
    mixPave: any;
  };
  getMaterialData(): any;
}

interface SurfaceObj {
  localToWorld: Matrix4;
}

interface FaceData {
  material?: MaterialData;
  surfaceObj: SurfaceObj;
  realPath2d: any[];
  softHolesPath2d: any[];
  getMaster(): any;
}

interface DwgDataResult {
  paveDwgData: any;
  worldTransform: Matrix4;
}

export class FaceDwgUtil {
  static getDwgData(face: FaceData, param: any): DwgDataResult | undefined {
    const { material } = face;
    
    if (!material) {
      return undefined;
    }

    const floorLinkPaths = FaceUtil.getFloorLinkRawPath2d(face).map((path) => ({
      outer: path
    }));

    const mergePathsData: MergePathsData | undefined = floorLinkPaths.length
      ? { mergePaths: floorLinkPaths }
      : undefined;

    const worldTransform = face.surfaceObj.localToWorld;
    const { realPath2d, softHolesPath2d } = face;

    let paveDwgData: any;
    let processedPath = realPath2d;

    if (softHolesPath2d.length) {
      processedPath = ClipperService.ins.clip(
        realPath2d,
        softHolesPath2d,
        ClipMode.Diff
      );
    }

    if (!processedPath.length) {
      return undefined;
    }

    const { mixpaint } = material;

    if (mixpaint) {
      const faceGroupTransform = FaceGroupUtil.getFaceGroupTransform(face);
      
      BaseDwgUtil.preFaceGroupTransform(processedPath, faceGroupTransform);
      
      if (mergePathsData?.mergePaths.length) {
        BaseDwgUtil.preFaceGroupTransform(
          mergePathsData.mergePaths,
          faceGroupTransform
        );
      }

      paveDwgData = new MixPaveDwgDecorator(mixpaint.mixPave, param).getDwgData(
        processedPath,
        mergePathsData
      );

      const postTransform = BaseDwgUtil.postFaceGroupTransform(faceGroupTransform);
      
      if (postTransform) {
        worldTransform.multiply(Matrix4.makeByMatrix3(postTransform));
      }
    } else {
      paveDwgData = BaseDwgUtil.getDwgDataByMaterialData(
        material.getMaterialData(),
        processedPath
      );
    }

    if (!paveDwgData) {
      return undefined;
    }

    const master = face.getMaster();
    
    if (
      master instanceof NCustomizedStructure &&
      master.structureMode === StructureMode.independent
    ) {
      worldTransform.preMultiply(master.getLocalToWorldTransform());
    }

    return {
      paveDwgData,
      worldTransform
    };
  }
}