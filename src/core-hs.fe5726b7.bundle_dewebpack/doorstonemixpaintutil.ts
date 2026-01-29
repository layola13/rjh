import { Matrix4, MathAlg } from './math-module';

/**
 * Utility class for handling door stone mixed paint operations
 */
export class DoorStoneMixpaintUtil {
  /**
   * Checks if two faces are connected based on their raw paths and altitudes
   */
  private static _isTwoFacesConnected(
    firstFace: HSCore.Model.Face,
    secondFace: HSCore.Model.Face
  ): boolean {
    const firstOuterPath = firstFace.rawPath.outer;
    const secondOuterPath = secondFace.rawPath.outer;
    const firstAltitude = HSCore.Util.Layer.getAltitude(firstFace.parent);
    const secondAltitude = HSCore.Util.Layer.getAltitude(secondFace.parent);

    for (const firstCurve of firstOuterPath) {
      const transformedFirstCurve = firstCurve.transformed(
        Matrix4.makeTranslate({
          x: 0,
          y: 0,
          z: firstAltitude
        })
      );

      for (const secondCurve of secondOuterPath) {
        const transformedSecondCurve = secondCurve.transformed(
          Matrix4.makeTranslate({
            x: 0,
            y: 0,
            z: secondAltitude
          })
        );

        const positionType = MathAlg.PositionJudge.curveCurveOverlap(
          transformedFirstCurve,
          transformedSecondCurve
        );

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

  /**
   * Gets the bottom path of an opening on the floor if the opening is at ground level
   */
  static getOpeningBottomPathOnFloor(
    opening: HSCore.Model.Opening
  ): HSCore.Geometry.Path2D | undefined {
    if (HSCore.Util.Math.isZero(opening.z)) {
      const bottomFaces = opening.getBottomFaces();
      if (bottomFaces.length > 0) {
        return bottomFaces[0].worldRawPath2d;
      }
    }
    return undefined;
  }

  /**
   * Checks if an opening is within a room given specific floor faces
   */
  static isOpeningInRoomGivenFloors(
    opening: HSCore.Model.Opening,
    floors: HSCore.Model.Face[]
  ): boolean {
    const hostFace = opening.hostFace;
    if (!hostFace) {
      return false;
    }

    return floors.some(floor => this._isTwoFacesConnected(hostFace, floor));
  }

  /**
   * Determines if an opening path can be merged with floor paths
   */
  static canOpeningPathMergedWithFloors(
    opening: HSCore.Model.Opening,
    floors: HSCore.Model.Floor[]
  ): boolean {
    const areAllFloors = floors.every(floor => floor instanceof HSCore.Model.Floor);
    if (!areAllFloors) {
      return false;
    }

    const isValidOpeningType =
      opening instanceof HSCore.Model.Hole || opening instanceof HSCore.Model.Door;
    if (!isValidOpeningType) {
      return false;
    }

    if (opening.isDoorStoneMaterialEnabled()) {
      return false;
    }

    if (!HSCore.Util.Math.isZero(opening.z)) {
      return false;
    }

    return this.isOpeningInRoomGivenFloors(opening, floors);
  }
}