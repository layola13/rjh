import { Matrix4 } from './Matrix4';
import { MixPaveDwgDecorator, MathService } from './MathService';
import { Material } from './Material';
import { MaterialData } from '../rendering/MaterialData';
import { BaseDwgUtil } from './BaseDwgUtil';
import { NCustomizedFaceGroupUtil } from './NCustomizedFaceGroupUtil';
import { PaintsUtil } from './PaintsUtil';

interface Vector2 {
  x: number;
  y: number;
}

interface Line2D {
  start: Vector2;
  end: Vector2;
}

interface Curve2DPath {
  outer: Line2D[];
  holes?: Line2D[][];
}

interface FacePaintInfo {
  facePaths2d: Vector2[][];
  worldProjectMatrix: Matrix4;
}

interface PaveDwgResult {
  paveDwgData: unknown;
  worldTransform: Matrix4;
}

interface CustomizedModel {
  getFaceMaterial(faceId: number): Material | null;
  getFaceMaterialData(faceId: number): MaterialData | null;
}

export class NCustomizedDwgUtil {
  static getDwgData(
    model: CustomizedModel,
    faceId: number,
    options?: unknown
  ): PaveDwgResult | undefined {
    const materialOrData = model.getFaceMaterial(faceId) || model.getFaceMaterialData(faceId);
    if (!materialOrData) {
      return undefined;
    }

    let paveDwgData: unknown;
    let materialData: MaterialData | undefined;
    let paintInfo: FacePaintInfo | undefined;
    let worldTransform: Matrix4 | undefined;
    let result: PaveDwgResult | undefined;

    if (materialOrData instanceof Material) {
      const { mixpaint } = materialOrData;

      if (mixpaint) {
        const isFaceGroup = NCustomizedFaceGroupUtil.isFaceGroup(model, faceId);
        let faceGroupTransform: Matrix4 | undefined;
        let curve2dPaths: Curve2DPath[] | undefined;
        let needClearRCP = false;

        if (isFaceGroup) {
          needClearRCP = NCustomizedFaceGroupUtil.faceGroupNeedClearRCP(model, faceId);
        }

        paintInfo = PaintsUtil.getCustomizedModelFacePaintInfo(
          model,
          faceId,
          undefined,
          needClearRCP
        );

        if (!paintInfo) {
          return undefined;
        }

        worldTransform = this._getWorldTransform(paintInfo);

        if (isFaceGroup) {
          faceGroupTransform = NCustomizedFaceGroupUtil.getFaceGroupTransform(model, faceId);
          curve2dPaths = [this._getCurve2dPath(paintInfo)];
          BaseDwgUtil.preFaceGroupTransform(curve2dPaths, faceGroupTransform);
        }

        paveDwgData = new MixPaveDwgDecorator(mixpaint.mixPave, options).getDwgData(
          curve2dPaths
        );

        if (isFaceGroup) {
          const postTransform = BaseDwgUtil.postFaceGroupTransform(faceGroupTransform);
          if (postTransform) {
            worldTransform.multiply(Matrix4.makeByMatrix3(postTransform));
          }
        }
      } else {
        materialData = materialOrData.getMaterialData();
      }
    } else if (materialOrData instanceof MaterialData) {
      materialData = materialOrData;
    }

    if (materialData) {
      paintInfo = PaintsUtil.getCustomizedModelFacePaintInfo(model, faceId);

      if (!paintInfo) {
        return undefined;
      }

      worldTransform = this._getWorldTransform(paintInfo);
      const curve2dPaths = [this._getCurve2dPath(paintInfo)];
      paveDwgData = BaseDwgUtil.getDwgDataByMaterialData(materialData, curve2dPaths);
    }

    if (paveDwgData && worldTransform) {
      result = {
        paveDwgData,
        worldTransform
      };
    }

    return result;
  }

  private static _getCurve2dPath(paintInfo: FacePaintInfo): Curve2DPath {
    const pathData = {
      outer: paintInfo.facePaths2d[0],
      holes: paintInfo.facePaths2d.slice(1)
    };

    return {
      outer: MathService.ins.getLinesFromVectors(pathData.outer),
      holes: pathData.holes?.map(holePath => 
        MathService.ins.getLinesFromVectors(holePath)
      )
    };
  }

  private static _getWorldTransform(paintInfo: FacePaintInfo): Matrix4 {
    const transform = new Matrix4().fromArray(paintInfo.worldProjectMatrix.toArray());
    transform.inverse();
    return transform;
  }
}