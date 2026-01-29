import { HSApp } from './path/to/HSApp';
import { HSCore } from './path/to/HSCore';

interface CurveEntityInfo {
  // Define the structure based on actual curve entity properties
  [key: string]: unknown;
}

interface DistanceResult {
  distance: number;
  [key: string]: unknown;
}

interface Guidelines {
  [key: string]: unknown;
}

interface SceneContext {
  guidelines: Guidelines;
}

export class ReshapeFace2d extends HSApp.ExtraordinarySketch2d.Gizmo.ReshapeFace2d {
  /**
   * Get the nearest result from a curve entity to a collection of other curves
   * @param curveEntity - The source curve entity to measure from
   * @param otherCurves - Set of other curve entities to check against
   * @param sceneContext - Scene context containing guidelines
   * @param additionalParam - Additional parameter for distance calculation
   * @returns The nearest distance result or undefined if no valid curve info
   */
  protected _getNearResult(
    curveEntity: unknown,
    otherCurves: Set<unknown>,
    sceneContext: SceneContext,
    additionalParam: unknown
  ): DistanceResult | undefined {
    const util = HSApp.ExtraordinarySketch2d.Util;
    const sourceCurveInfo = util.getCurveEntityInfo(curveEntity);

    if (!sourceCurveInfo) {
      return undefined;
    }

    let nearestResult: DistanceResult | undefined;

    const otherCurveInfos = Array.from(otherCurves).map((curve) =>
      util.getCurveEntityInfo(curve)
    );

    const allCurveInfos = [
      ...otherCurveInfos,
      ...this.getStructureCurveInfos(),
      ...util.getGuideLineCurveInfos(sceneContext.guidelines)
    ];

    for (const curveInfo of allCurveInfos) {
      const distanceResult = util.getDistanceToCurve(
        sourceCurveInfo,
        curveInfo,
        additionalParam
      );

      if (
        distanceResult &&
        (!nearestResult || distanceResult.distance < nearestResult.distance)
      ) {
        nearestResult = distanceResult;
      }
    }

    return nearestResult;
  }

  /**
   * Get structure curve information from the active document's slab builder
   * @returns Array of curve information objects
   */
  protected getStructureCurveInfos(): CurveEntityInfo[] {
    const curveInfos: CurveEntityInfo[] = [];
    const util = HSApp.ExtraordinarySketch2d.Util;

    const activeDocument = HSCore.Doc.getDocManager().activeDocument;
    const globalPaths = activeDocument.scene.rootLayer.slabBuilder.getGlobalPaths();

    for (const path of globalPaths) {
      for (const outerCurve of path.outer) {
        const curveInfo = util.getCurveInfo(outerCurve);
        if (curveInfo) {
          curveInfos.push(curveInfo);
        }
      }
    }

    return curveInfos;
  }
}