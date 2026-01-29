import { Line3d, Line2d, Vector2, Vector3, MathAlg, Log } from './geometry';
import { ClipperPlusLibWrapper } from './clipper';

interface XYZ {
  x: number;
  y: number;
  z: number;
}

interface Arc {
  height: number;
}

interface Wall {
  id?: number;
  from: XYZ;
  to: XYZ;
  thickness: number;
  bearing: number;
  height: number;
  type: string;
  arc?: Arc;
  originWalls?: Wall[];
}

interface Opening {
  position: XYZ;
  swing?: number;
}

interface Model {
  walls: Wall[];
  originWalls?: Wall[];
  openings: Opening[];
}

interface FloorPlan {
  model: Model;
}

interface MergeInterval {
  p1: number;
  p2: number;
}

interface ClipperEdge {
  oldId?: number[];
  isRev: boolean;
  edge: {
    curve: Line2d;
  };
}

interface ClipperHole {
  map: (fn: (edge: ClipperEdge) => void) => void;
}

interface ClipperResult {
  root: {
    holes: ClipperHole[];
  };
}

interface CurveWithId {
  curve: Line2d;
  id: number;
}

export class ColinearWallMerger {
  /**
   * Merge colinear walls in the floor plan
   */
  static mergeColinearWall(floorPlan: FloorPlan): void {
    this.normalize(floorPlan);
    this.iterateMerge(floorPlan);
    this.splitInnerWalls(floorPlan);
    this.filterZeroLengthWalls(floorPlan);
  }

  /**
   * Iteratively merge connected colinear walls
   */
  static iterateMerge(floorPlan: FloorPlan): void {
    const mergedWalls: Wall[] = [];
    const walls = floorPlan.model.walls;
    const openings = floorPlan.model.openings;
    const wallOpeningMap = this._getWallOpeningMp(walls, openings);
    const processedIndices: number[] = [];

    for (let currentIndex = 0; currentIndex < walls.length; currentIndex++) {
      if (processedIndices.includes(currentIndex)) {
        continue;
      }

      let currentWall = walls[currentIndex];
      let searchIndex = currentIndex;

      if (currentWall.arc && currentWall.arc.height > 0) {
        mergedWalls.push(currentWall);
        continue;
      }

      while (searchIndex < walls.length) {
        if (processedIndices.includes(searchIndex)) {
          searchIndex++;
          continue;
        }

        const candidateWall = walls[searchIndex];

        if (currentIndex === searchIndex) {
          searchIndex++;
          continue;
        }

        if (
          (candidateWall.arc && candidateWall.arc.height > 0) ||
          candidateWall.type !== currentWall.type ||
          candidateWall.bearing !== currentWall.bearing ||
          Math.abs(candidateWall.thickness - currentWall.thickness) > 0.001
        ) {
          searchIndex++;
          continue;
        }

        const currentLine = new Line3d(currentWall.from, currentWall.to);
        const candidateLine = new Line3d(candidateWall.from, candidateWall.to);
        const mergedLine = this._mergeConnectColine(currentLine, candidateLine);

        if (mergedLine) {
          processedIndices.push(searchIndex);
          currentWall = this._mergeWall(currentWall, candidateWall, mergedLine, wallOpeningMap);
          searchIndex = currentIndex;
        } else {
          searchIndex++;
        }
      }

      mergedWalls.push(currentWall);
    }

    floorPlan.model.originWalls = floorPlan.model.walls;
    floorPlan.model.walls = mergedWalls;
  }

  /**
   * Split inner walls based on outer wall boundaries
   */
  static splitInnerWalls(floorPlan: FloorPlan): void {
    const outerWallMap = this._extractOuterWallMp(floorPlan);
    const splitWalls = this._splitInnerWalls(floorPlan, outerWallMap);
    floorPlan.model.walls = splitWalls;
  }

  /**
   * Filter out walls with zero or near-zero length
   */
  static filterZeroLengthWalls(floorPlan: FloorPlan): void {
    const EPSILON = 1e-6;
    floorPlan.model.walls = floorPlan.model.walls.filter((wall) => {
      const fromVector = new Vector2(wall.from);
      const toVector = new Vector2(wall.to);
      return fromVector.distanceTo(toVector) > EPSILON;
    });
  }

  /**
   * Extract outer wall mapping using clipper boolean operations
   */
  private static _extractOuterWallMp(floorPlan: FloorPlan): Map<number, Line2d[]> {
    const clipper = new ClipperPlusLibWrapper();
    const outerWallMap = new Map<number, Line2d[]>();
    const curvesWithIds: CurveWithId[] = [];
    let wallId = 0;

    for (const wall of floorPlan.model.originWalls ?? []) {
      wall.id = ++wallId;
      curvesWithIds.push({
        curve: new Line2d(wall.from, wall.to),
        id: wall.id,
      });
    }

    const clipperResult: ClipperResult = clipper.exbool(curvesWithIds, 1e-6, {
      clean: 1,
      scaleFix: 0,
    });

    clipperResult.root.holes.forEach((hole) => {
      hole.map((edge) => {
        if (edge.oldId && edge.oldId.length > 0) {
          edge.oldId.forEach((id) => {
            const curve = edge.isRev ? edge.edge.curve.reversed() : edge.edge.curve;
            if (outerWallMap.has(id)) {
              outerWallMap.get(id)!.push(curve);
            } else {
              outerWallMap.set(id, [curve]);
            }
          });
        }
      });
    });

    return outerWallMap;
  }

  /**
   * Split inner walls that are not part of outer boundaries
   */
  private static _splitInnerWalls(floorPlan: FloorPlan, outerWallMap: Map<number, Line2d[]>): Wall[] {
    const EPSILON = 1e-6;
    const resultWalls: Wall[] = [];

    for (const wall of floorPlan.model.walls) {
      if (!wall.originWalls || wall.originWalls.length === 0) {
        resultWalls.push(wall);
        continue;
      }

      const wallLine = new Line3d(wall.from, wall.to);
      const innerWalls = wall.originWalls.filter((originWall) => {
        if (!outerWallMap.has(originWall.id!)) {
          return true;
        }

        const outerCurves = outerWallMap.get(originWall.id!)!;
        const totalOuterLength = outerCurves.reduce((sum, curve) => sum + curve.getLength(), 0);
        const originWallLength = new Line3d(originWall.from, originWall.to).getLength();

        return Math.abs(totalOuterLength - originWallLength) >= EPSILON;
      });

      if (innerWalls.length === 0) {
        resultWalls.push({
          from: wallLine.getStartPt().toXYZ(),
          to: wallLine.getEndPt().toXYZ(),
          thickness: wall.thickness,
          bearing: wall.bearing,
          height: wall.height,
          type: wall.type,
        });
      } else {
        const splitWalls = this._splitInnerWallsFromBaseLine(wallLine, wall, innerWalls);
        resultWalls.push(...splitWalls);
      }
    }

    return resultWalls;
  }

  /**
   * Split inner walls along a baseline
   */
  private static _splitInnerWallsFromBaseLine(baseline: Line3d, wall: Wall, innerWalls: Wall[]): Wall[] {
    const EPSILON = 1e-6;
    const resultWalls: Wall[] = [];
    const intervals: MergeInterval[] = [];

    for (const innerWall of innerWalls) {
      const closestFrom = baseline.getClosestPoint(innerWall.from);
      const closestTo = baseline.getClosestPoint(innerWall.to);

      const direction = closestTo.subtracted(closestFrom);
      const isSameDirection = direction.isSameDirection(baseline.getDirection());

      if (isSameDirection) {
        intervals.push({
          p1: baseline.getParamAt(closestFrom),
          p2: baseline.getParamAt(closestTo),
        });
        resultWalls.push({
          from: closestFrom.toXYZ(),
          to: closestTo.toXYZ(),
          thickness: wall.thickness,
          bearing: wall.bearing,
          height: wall.height,
          type: wall.type,
        });
      } else {
        intervals.push({
          p1: baseline.getParamAt(closestTo),
          p2: baseline.getParamAt(closestFrom),
        });
        resultWalls.push({
          from: closestTo.toXYZ(),
          to: closestFrom.toXYZ(),
          thickness: wall.thickness,
          bearing: wall.bearing,
          height: wall.height,
          type: wall.type,
        });
      }
    }

    const mergedIntervals: MergeInterval[] = [];
    intervals.sort((a, b) => a.p1 - b.p1);

    for (let i = 0; i < intervals.length; i++) {
      const currentInterval = intervals[i];

      if (i !== intervals.length - 1) {
        for (let j = i + 1; j < intervals.length; j++) {
          const nextInterval = intervals[j];
          if (nextInterval.p1 > currentInterval.p2) {
            break;
          }
          if (nextInterval.p2 > currentInterval.p2) {
            currentInterval.p2 = nextInterval.p2;
          }
          i++;
        }
      }

      mergedIntervals.push(currentInterval);
    }

    let currentParam = baseline.getStartParam();
    let intervalIndex = 0;

    if (Math.abs(baseline.getStartParam() - mergedIntervals[0].p1) < EPSILON) {
      currentParam = mergedIntervals[0].p2;
      intervalIndex = 1;
    }

    for (; intervalIndex < mergedIntervals.length; intervalIndex++) {
      resultWalls.push({
        from: baseline.getPtAt(currentParam).toXYZ(),
        to: baseline.getPtAt(mergedIntervals[intervalIndex].p1).toXYZ(),
        thickness: wall.thickness,
        bearing: wall.bearing,
        height: wall.height,
        type: wall.type,
      });
      currentParam = mergedIntervals[intervalIndex].p2;
    }

    if (Math.abs(currentParam - baseline.getEndParam()) > EPSILON) {
      resultWalls.push({
        from: baseline.getPtAt(currentParam).toXYZ(),
        to: baseline.getEndPt().toXYZ(),
        thickness: wall.thickness,
        bearing: wall.bearing,
        height: wall.height,
        type: wall.type,
      });
    }

    return resultWalls;
  }

  /**
   * Merge two walls into one
   */
  private static _mergeWall(
    wall1: Wall,
    wall2: Wall,
    mergedLine: Line3d,
    wallOpeningMap: Map<Wall, Opening[]>
  ): Wall {
    const mergedWall: Wall = {
      thickness: wall1.thickness,
      bearing: wall1.bearing,
      from: mergedLine.getStartPt().toXYZ(),
      to: mergedLine.getEndPt().toXYZ(),
      height: wall1.height,
      type: wall1.type,
      originWalls: [],
    };

    const openings1 = wallOpeningMap.has(wall1) ? wallOpeningMap.get(wall1)! : [];
    const wall1Direction = new Vector2(wall1.to).subtracted(new Vector2(wall1.from));
    const wall2Direction = new Vector2(wall2.to).subtracted(new Vector2(wall2.from));
    const angle = Math.min(wall1Direction.angleTo(wall2Direction), wall2Direction.angleTo(wall1Direction));
    const isReversed = angle > Math.PI / 2;

    const openings2 = wallOpeningMap.get(wall2) ?? [];

    if (openings2.length > 0) {
      for (const opening of openings2) {
        const closestPoint = mergedLine.getClosestPoint(opening.position);
        opening.position = closestPoint;

        if (isReversed && opening.swing !== undefined) {
          opening.swing = [2, 3, 0, 1][opening.swing];
        }

        openings1.push(opening);
      }

      if (wallOpeningMap.has(wall1)) {
        wallOpeningMap.set(wall1, []);
      }
      if (wallOpeningMap.has(wall2)) {
        wallOpeningMap.set(wall2, []);
      }
    }

    wallOpeningMap.set(mergedWall, openings1);

    if (wall1.originWalls === undefined) {
      mergedWall.originWalls!.push(wall1);
    } else {
      mergedWall.originWalls!.push(...wall1.originWalls);
    }

    if (wall2.originWalls === undefined) {
      mergedWall.originWalls!.push(wall2);
    } else {
      mergedWall.originWalls!.push(...wall2.originWalls);
    }

    return mergedWall;
  }

  /**
   * Merge two connected colinear lines
   */
  private static _mergeConnectColine(line1: Line3d, line2: Line3d): Line3d | undefined {
    const DISTANCE_TOLERANCE = 0.45 * 0.001;
    const ANGLE_TOLERANCE = Math.PI / 1800;

    const positionRelation = MathAlg.PositionJudge.curveToCurve(
      line1,
      line2,
      DISTANCE_TOLERANCE,
      ANGLE_TOLERANCE
    );

    if (
      !line1.isParallelTo(line2, ANGLE_TOLERANCE) ||
      ![
        MathAlg.CurveCuvePositonType.INTERSECT_IN,
        MathAlg.CurveCuvePositonType.INTERSECT_ON,
        MathAlg.CurveCuvePositonType.OVERLAP,
        MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP,
      ].includes(positionRelation)
    ) {
      return undefined;
    }

    let isConnected = false;

    if (
      line1.getEndPt().equals(line2.getStartPt(), DISTANCE_TOLERANCE) ||
      line1.getStartPt().equals(line2.getEndPt(), DISTANCE_TOLERANCE) ||
      line1.getEndPt().equals(line2.getEndPt(), DISTANCE_TOLERANCE) ||
      line1.getStartPt().equals(line2.getStartPt(), DISTANCE_TOLERANCE)
    ) {
      isConnected = true;
    }

    if (MathAlg.CalculateIntersect.curve2ds(line1, line2, DISTANCE_TOLERANCE).length > 0) {
      isConnected = true;
    }

    if (!isConnected) {
      return undefined;
    }

    const extendedLine = line1.clone().extendDouble(1000);
    const params = [
      extendedLine.getParamAt(line1.getStartPt()),
      extendedLine.getParamAt(line1.getEndPt()),
      extendedLine.getParamAt(line2.getStartPt()),
      extendedLine.getParamAt(line2.getEndPt()),
    ];

    params.sort((a, b) => a - b);
    extendedLine.setRange(params[0], params[3]);

    return extendedLine;
  }

  /**
   * Create a map of walls to their openings
   */
  private static _getWallOpeningMp(walls: Wall[], openings: Opening[]): Map<Wall, Opening[]> {
    const EPSILON = 1e-6;
    const wallOpeningMap = new Map<Wall, Opening[]>();

    for (const wall of walls) {
      const wallLine = new Line2d(wall.from, wall.to);
      const wallOpenings: Opening[] = [];

      for (const opening of openings) {
        if (wallLine.containsPoint(opening.position, EPSILON)) {
          wallOpenings.push(opening);
        }
      }

      wallOpeningMap.set(wall, wallOpenings);
    }

    return wallOpeningMap;
  }

  /**
   * Normalize wall data
   */
  static normalize(floorPlan: FloorPlan): void {
    for (const wall of floorPlan.model.walls) {
      wall.from.z = 0;
      wall.to.z = 0;
      wall.thickness = Math.ceil(1000 * wall.thickness) / 1000;
    }
  }

  /**
   * Debug output helper
   */
  private static _printOutput(walls: Wall[], openings: Opening[]): void {
    const debugOutput: unknown[] = [];

    for (const wall of walls) {
      debugOutput.push(new Line2d(wall.from, wall.to));
    }

    for (const opening of openings) {
      debugOutput.push(new Vector3(opening.position));
    }

    Log.d(debugOutput);
  }
}