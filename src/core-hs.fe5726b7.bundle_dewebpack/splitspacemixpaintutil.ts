import { Vector2 } from './Vector2';
import { Path } from './Path';
import { PaintsUtil } from './PaintsUtil';

interface Curve2D {
  // Define curve interface based on your implementation
}

interface BBox {
  min: Vector2;
  max: Vector2;
}

interface RawPath {
  outer: Curve2D[];
}

interface FaceData {
  rawPath: RawPath;
}

interface SurfaceObject {
  getCurve2ds(curves: Curve2D[]): Curve2D[];
}

interface SplitSpaceData {
  outerPath: Curve2D[];
  surfaceObj: SurfaceObject;
}

interface MixpaintUpdateOptions {
  basePoint?: Vector2;
}

export class SplitSpaceMixpaintUtil {
  /**
   * Calculate base point from two bounding boxes
   * @param innerPath - Path of the inner boundary
   * @param outerPath - Path of the outer boundary
   * @returns Base point vector for mixpaint calculation
   */
  static getBasePoint(innerPath: Path, outerPath: Path): Vector2 {
    const origin = innerPath.BBox.min;
    const targetPoint = new Vector2(outerPath.BBox.min.x, outerPath.BBox.max.y);
    return targetPoint.subtract(origin);
  }

  /**
   * Update face mixpaint properties based on split space data
   * @param faceData - Face data containing raw path information
   * @param splitSpaceData - Optional split space configuration
   */
  static updateFaceMixpaint(
    faceData: FaceData,
    splitSpaceData?: SplitSpaceData
  ): void {
    let updateOptions: MixpaintUpdateOptions | undefined;

    if (splitSpaceData) {
      const { outerPath, surfaceObj } = splitSpaceData;
      
      const innerPath = new Path(
        surfaceObj.getCurve2ds(faceData.rawPath.outer),
        []
      );
      
      const outerPathInstance = new Path(
        surfaceObj.getCurve2ds(outerPath),
        []
      );

      updateOptions = {
        basePoint: this.getBasePoint(innerPath, outerPathInstance)
      };
    }

    PaintsUtil.updateFaceMixpaint(faceData, updateOptions);
  }
}