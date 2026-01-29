import { ServiceManager, MathService } from './ServiceManager';
import { math } from './math';
import { PaintsUtil } from './PaintsUtil';

interface CurvePath {
  outer: any[];
  holes?: any[][];
}

interface DiscretePath {
  outer: any[];
  holes: any[][];
}

interface FacePaintInfo {
  facePaths2d: any[][];
}

interface RawPath2D {
  outer: any[];
  holes: any[][];
}

export class BackgroundPathUtil {
  static getCurvePath(
    model: HSCore.Model.Face | HSCore.Model.CustomizedPMModel | HSCore.Model.CustomizedModel | HSCore.Model.NCustomizedFeatureModel | HSCore.Model.NCustomizedModelLightSlot,
    param?: any
  ): CurvePath {
    if (model instanceof HSCore.Model.Face) {
      const rawPath: RawPath2D = model.rawPath2d;
      const outerVectors = ServiceManager.getMathService().getVectorsFromCurves(
        rawPath.outer,
        math.DiscreteParameter.HIGH
      );
      const holeVectors = rawPath.holes.map((hole) =>
        ServiceManager.getMathService().getVectorsFromCurves(
          hole,
          math.DiscreteParameter.HIGH
        )
      );
      return this.toCurvePath({
        outer: outerVectors,
        holes: holeVectors
      });
    }

    const convertPathsToCurve = (paths: any[][]): CurvePath => {
      return {
        outer: MathService.ins.getLinesFromVectors(paths[0]),
        holes: paths.slice(1).map((path) => MathService.ins.getLinesFromVectors(path))
      };
    };

    if (model instanceof HSCore.Model.CustomizedPMModel) {
      if (model.curMixPaintFaceInfo?.facePaths2d?.length) {
        return convertPathsToCurve(model.curMixPaintFaceInfo.facePaths2d);
      }
    } else if (
      model instanceof HSCore.Model.CustomizedModel ||
      model instanceof HSCore.Model.NCustomizedFeatureModel ||
      model instanceof HSCore.Model.NCustomizedModelLightSlot
    ) {
      const paintInfo = PaintsUtil.getCustomizedModelFacePaintInfo(model, param, undefined);
      if (paintInfo?.facePaths2d?.length > 0) {
        return convertPathsToCurve(paintInfo.facePaths2d);
      }
    }

    return {
      outer: []
    };
  }

  static getDiscretePath(
    model: HSCore.Model.Face | HSCore.Model.CustomizedModel | HSCore.Model.CustomizedPMModel | HSCore.Model.NCustomizedFeatureModel | HSCore.Model.NCustomizedModelLightSlot,
    param?: any
  ): DiscretePath {
    let primaryPath: any[] = [];
    const result: DiscretePath = {
      outer: [],
      holes: []
    };

    if (model instanceof HSCore.Model.Face) {
      const rawPath: RawPath2D = model.rawPath2d;
      result.outer = ServiceManager.getMathService().getVectorsFromCurves(
        rawPath.outer,
        math.DiscreteParameter.HIGH
      );
      result.holes = rawPath.holes.map((hole) =>
        ServiceManager.getMathService().getVectorsFromCurves(
          hole,
          math.DiscreteParameter.HIGH
        )
      );
    } else if (model instanceof HSCore.Model.CustomizedModel) {
      const paintInfo = PaintsUtil.getCustomizedModelFacePaintInfo(model, param, undefined);
      if (paintInfo?.facePaths2d?.length > 0) {
        primaryPath = paintInfo.facePaths2d[0];
        result.outer = primaryPath;
        result.holes = paintInfo.facePaths2d.slice(1);
      }
    } else if (model instanceof HSCore.Model.CustomizedPMModel) {
      if (model.curMixPaintFaceInfo?.facePaths2d?.length) {
        primaryPath = model.curMixPaintFaceInfo.facePaths2d[0];
        result.outer = primaryPath;
        result.holes = model.curMixPaintFaceInfo.facePaths2d.slice(1);
      }
    } else if (
      model instanceof HSCore.Model.NCustomizedFeatureModel ||
      model instanceof HSCore.Model.NCustomizedModelLightSlot
    ) {
      const paintInfo = PaintsUtil.getCustomizedModelFacePaintInfo(model, param, undefined);
      if (paintInfo?.facePaths2d?.length > 0) {
        primaryPath = paintInfo.facePaths2d[0];
        result.outer = primaryPath;
        result.holes = paintInfo.facePaths2d.slice(1);
      }
    }

    return result;
  }

  static toCurvePath(path: { outer: any[]; holes?: any[][] }): CurvePath {
    return {
      outer: MathService.ins.getLinesFromVectors(path.outer),
      holes: path.holes?.map((hole) => MathService.ins.getLinesFromVectors(hole))
    };
  }
}