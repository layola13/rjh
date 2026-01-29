import { Wall } from './Wall';
import { MathUtil, Vector2, Matrix3, PeriodInterval } from './MathUtil';
import { OpeningHelper } from './OpeningHelper';
import { TgWallUtil } from './TgWallUtil';

const SIMILARITY_TOLERANCE = 1e-4;
const EXACT_MATCH_TOLERANCE = 1e-9;

interface WallOpening {
  host: Wall;
  x: number;
  y: number;
  rotation: number;
  XSize: number;
  XScale: number;
  XLength: number;
  thickness: number;
  profile?: string;
  supportPM(): boolean;
  updateByPM(size: number): void;
  refreshFrontProfile(svg: string): void;
}

interface Curve {
  getProjectedPtBy(point: Vector2 | WallOpening): Vector2;
  containsPoint(point: Vector2, tolerance?: number): boolean;
  getParamAt(point: Vector2 | WallOpening): number;
  getTangentAt(param: number): Vector2;
}

interface PathSegment {
  getLength(): number;
  getStartPt(): Vector2;
}

interface Wall {
  curve: Curve;
  width: number;
  leftPaths: PathSegment[];
  rightPaths: PathSegment[];
  path: PathSegment[];
  transRotation: number;
  isArcWall(): boolean;
}

interface ProfileShape {
  outer: unknown[];
  holes: unknown[];
}

/**
 * Fixes wall opening positions, sizes, and profiles to ensure they conform to wall geometry
 */
export class OpeningFixer {
  private static ins: OpeningFixer = new OpeningFixer();

  constructor() {}

  /**
   * Fix all openings in the provided list
   * @param openings - List of wall openings to fix
   */
  public fixOpenings(openings: WallOpening[]): void {
    const wallOpenings = openings.filter(opening => 
      HSCore.Util.Content.isWallOpening(opening)
    );

    const validOpenings = wallOpenings.filter(opening => {
      if (opening.host instanceof Wall) {
        const projectedPoint = opening.host.curve.getProjectedPtBy(opening);
        if (
          opening.host.curve.containsPoint(projectedPoint) &&
          MathUtil.isNearlySmallerOrEqual(
            projectedPoint.distanceTo(opening),
            opening.host.width / 2
          )
        ) {
          return true;
        }
      }
      return false;
    });

    this._fixSimilarOpenings(validOpenings);

    validOpenings.forEach(opening => {
      this._fixXSize(opening);
      this._fixPositionToWallCurve(opening);
      this._fixRotation(opening);
      this._fixPositionToWallPath(opening);
    });

    wallOpenings.forEach(opening => this._fixOpeningProfile(opening));
  }

  /**
   * Adjust opening position to align with wall curve
   */
  private _fixPositionToWallCurve(opening: WallOpening): void {
    const wall = opening.host;

    if (!HSCore.Util.Content.isWallNiche(opening)) {
      const position = new Vector2(opening);

      if (!wall.curve.containsPoint(position, EXACT_MATCH_TOLERANCE)) {
        const projectedPoint = wall.curve.getProjectedPtBy(position);
        opening.x = projectedPoint.x;
        opening.y = projectedPoint.y;
      }
    }
  }

  /**
   * Fix opening horizontal size to match wall path lengths
   */
  private _fixXSize(opening: WallOpening): void {
    const wall = opening.host;

    if (!HSCore.Util.Content.isWallNiche(opening) && !wall.isArcWall()) {
      const leftPaths = wall.leftPaths;
      const rightPaths = wall.rightPaths;

      const leftLength = leftPaths.reduce(
        (total, path) => total + path.getLength(),
        0
      );
      const rightLength = rightPaths.reduce(
        (total, path) => total + path.getLength(),
        0
      );

      let targetSize: number | undefined;
      const currentSize = opening.XSize;

      if (
        MathUtil.isNearlyEqual(currentSize, leftLength, SIMILARITY_TOLERANCE) &&
        !MathUtil.isNearlyEqual(currentSize, leftLength, EXACT_MATCH_TOLERANCE)
      ) {
        targetSize = leftLength;
      } else if (
        MathUtil.isNearlyEqual(currentSize, rightLength, SIMILARITY_TOLERANCE) &&
        !MathUtil.isNearlyEqual(currentSize, rightLength, EXACT_MATCH_TOLERANCE)
      ) {
        targetSize = rightLength;
      }

      if (targetSize !== undefined) {
        this._editOpeningXSize(opening, targetSize);
      }
    }
  }

  /**
   * Adjust opening position to snap to wall path vertices
   */
  private _fixPositionToWallPath(opening: WallOpening): void {
    if (!HSCore.Util.Content.isWallNiche(opening)) {
      const wall = opening.host;
      let position = new Vector2(opening);

      if (!wall.isArcWall()) {
        position = new Vector2(opening);

        const halfWidth = Vector2.X(opening.XSize / 2);
        const halfThickness = Vector2.Y(opening.thickness / 2);

        const corners = [
          position.added(halfWidth).add(halfThickness),
          position.added(halfWidth).subtract(halfThickness),
          position.subtracted(halfWidth).subtract(halfWidth),
          position.subtracted(halfWidth).add(halfThickness)
        ];

        const rotationMatrix = Matrix3.makeRotate(
          position,
          MathUtil.degreeToRadius(-opening.rotation)
        );

        let offset: Vector2 | undefined;

        corners.forEach(corner => corner.transform(rotationMatrix));

        wall.path.map(segment => segment.getStartPt()).forEach(pathPoint => {
          if (!offset) {
            const matchingCorner = corners.find(
              corner =>
                corner.equals(pathPoint, SIMILARITY_TOLERANCE) &&
                !corner.equals(pathPoint, EXACT_MATCH_TOLERANCE)
            );

            if (matchingCorner) {
              offset = pathPoint.subtracted(matchingCorner);
            }
          }
        });

        if (offset) {
          const newPosition = position.added(offset);
          opening.x = newPosition.x;
          opening.y = newPosition.y;
        }
      }
    }
  }

  /**
   * Fix opening profile to match simplified geometry
   */
  private _fixOpeningProfile(opening: WallOpening): boolean {
    const profile = opening.profile;
    if (!profile) return false;

    let curves = OpeningHelper.getCurvesBySvg(profile);
    const simplified = TgWallUtil.PTInstance().simplfy([curves]);

    if (!simplified[0] || !simplified[0][0] || !simplified[0][0].length) {
      return false;
    }

    curves = simplified[0][0];

    const frontProfile = new OpeningHelper(opening).getFrontProfile();

    if (
      TgWallUtil.isSame2D(
        [{ outer: frontProfile, holes: [] }],
        [{ outer: curves, holes: [] }]
      )
    ) {
      curves = frontProfile;
    }

    if (!curves.length) return false;

    const svg = OpeningHelper.getSvgByCurves(curves);
    opening.refreshFrontProfile(svg);

    return true;
  }

  /**
   * Fix opening rotation to align with wall orientation
   */
  private _fixRotation(opening: WallOpening): void {
    const wall = opening.host;

    if (wall.isArcWall()) {
      const param = wall.curve.getParamAt(opening);
      let tangentAngle =
        (180 * wall.curve.getTangentAt(param).angleTo(Vector2.X())) / Math.PI;
      let oppositeAngle = tangentAngle + 180;

      tangentAngle = PeriodInterval.RegularizeParam(tangentAngle, 360, -180);
      if (MathUtil.isNearlyEqual(tangentAngle, -180)) {
        tangentAngle = 0;
      }

      oppositeAngle = PeriodInterval.RegularizeParam(oppositeAngle, 360, -180);
      if (MathUtil.isNearlyEqual(oppositeAngle, -180)) {
        oppositeAngle = 0;
      }

      const closestAngle = [tangentAngle, oppositeAngle].sort(
        (a, b) => Math.abs(a - opening.rotation) - Math.abs(b - opening.rotation)
      )[0];

      opening.rotation = closestAngle;
    } else {
      if (
        MathUtil.isNearlyEqual(opening.rotation, wall.transRotation, SIMILARITY_TOLERANCE) &&
        !MathUtil.isNearlyEqual(opening.rotation, wall.transRotation, EXACT_MATCH_TOLERANCE)
      ) {
        opening.rotation = wall.transRotation;
      }
    }
  }

  /**
   * Align similar openings to have consistent XSize values
   */
  private _fixSimilarOpenings(openings: WallOpening[]): void {
    const openingsCopy = openings.slice();

    for (let i = 0; i < openingsCopy.length; i++) {
      const currentOpening = openingsCopy[i];
      const currentPosition = new Vector2(currentOpening);

      for (let j = i + 1; j < openingsCopy.length; j++) {
        const compareOpening = openingsCopy[j];
        const comparePosition = new Vector2(compareOpening);

        if (
          comparePosition.equals(currentPosition, SIMILARITY_TOLERANCE) &&
          MathUtil.isNearlyEqual(compareOpening.XSize, currentOpening.XSize, SIMILARITY_TOLERANCE) &&
          !MathUtil.isNearlyEqual(compareOpening.XSize, currentOpening.XSize, EXACT_MATCH_TOLERANCE)
        ) {
          this._editOpeningXSize(compareOpening, currentOpening.XSize);
          openingsCopy.splice(j, 1);
          j -= 1;
        }
      }
    }
  }

  /**
   * Update opening horizontal size using appropriate method
   */
  private _editOpeningXSize(opening: WallOpening, size: number): void {
    if (opening.supportPM()) {
      opening.updateByPM(size);
    } else {
      opening.XScale = size / opening.XLength;
    }
  }
}