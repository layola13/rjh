import { Matrix4 } from './Matrix4';
import { ClipperService, ClipMode, MixPaveDwgDecorator } from './ClipperService';
import { BaseDwgUtil } from './BaseDwgUtil';
import { FaceUtil } from './FaceUtil';
import { FaceGroupUtil } from './FaceGroupUtil';
import { NCustomizedStructure, StructureMode } from './CustomizedStructure';

/**
 * Path definition for 2D geometry
 */
interface Path2D {
  outer: unknown;
}

/**
 * Merge paths configuration
 */
interface MergePaths {
  mergePaths: Path2D[];
}

/**
 * Material data interface
 */
interface MaterialData {
  mixpaint?: {
    mixPave: unknown;
  };
  getMaterialData(): unknown;
}

/**
 * Surface object with transformation matrix
 */
interface SurfaceObject {
  localToWorld: Matrix4;
}

/**
 * Face entity containing geometry and material information
 */
interface FaceEntity {
  material?: MaterialData;
  surfaceObj: SurfaceObject;
  realPath2d: unknown[];
  softHolesPath2d: unknown[];
  getMaster(): unknown;
}

/**
 * Drawing data result
 */
interface PaveDwgData {
  paveDwgData: unknown;
  worldTransform: Matrix4;
}

/**
 * Utility class for handling face drawing data generation
 */
export class FaceDwgUtil {
  /**
   * Generate drawing data from face entity
   * 
   * @param faceEntity - The face entity to process
   * @param additionalParam - Additional parameter for drawing decoration
   * @returns Drawing data with world transformation, or undefined if invalid
   */
  static getDwgData(
    faceEntity: FaceEntity,
    additionalParam: unknown
  ): PaveDwgData | undefined {
    const { material } = faceEntity;
    
    if (!material) {
      return undefined;
    }

    // Get floor link paths and prepare merge configuration
    const floorLinkPaths = FaceUtil.getFloorLinkRawPath2d(faceEntity).map(
      (path): Path2D => ({ outer: path })
    );
    
    const mergeConfig: MergePaths | undefined = floorLinkPaths.length
      ? { mergePaths: floorLinkPaths }
      : undefined;

    const worldTransform = faceEntity.surfaceObj.localToWorld;
    const { realPath2d, softHolesPath2d } = faceEntity;

    let dwgData: unknown;
    let processedPath = realPath2d;

    // Apply soft holes clipping if present
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
      // Handle mixed paint materials
      const faceGroupTransform = FaceGroupUtil.getFaceGroupTransform(faceEntity);
      
      BaseDwgUtil.preFaceGroupTransform(processedPath, faceGroupTransform);
      
      if (mergeConfig?.mergePaths.length) {
        BaseDwgUtil.preFaceGroupTransform(
          mergeConfig.mergePaths,
          faceGroupTransform
        );
      }

      dwgData = new MixPaveDwgDecorator(mixpaint.mixPave, additionalParam)
        .getDwgData(processedPath, mergeConfig);

      const postTransform = BaseDwgUtil.postFaceGroupTransform(faceGroupTransform);
      
      if (postTransform) {
        worldTransform.multiply(Matrix4.makeByMatrix3(postTransform));
      }
    } else {
      // Handle standard materials
      dwgData = BaseDwgUtil.getDwgDataByMaterialData(
        material.getMaterialData(),
        processedPath
      );
    }

    if (!dwgData) {
      return undefined;
    }

    // Apply master transform for independent customized structures
    const master = faceEntity.getMaster();
    
    if (
      master instanceof NCustomizedStructure &&
      master.structureMode === StructureMode.independent
    ) {
      worldTransform.preMultiply(master.getLocalToWorldTransform());
    }

    return {
      paveDwgData: dwgData,
      worldTransform
    };
  }
}