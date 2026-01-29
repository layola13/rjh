import { HSCore } from './HSCore';
import { Loop, MathAlg, Tolerance, Line2d, Curve2d, Point2d } from './MathLibrary';

interface Point {
  x: number;
  y: number;
}

interface CurveSegment {
  start: Point;
  end: Point;
}

interface OpeningData {
  id: string;
  seekId: string;
  contentType: string;
  outline: CurveSegment[];
  direction?: number[];
  overlaps: CurveSegment[];
  height: number;
  elevation: number;
}

interface RoomHole {
  // Define based on actual structure
  [key: string]: unknown;
}

interface RoomData {
  walls: CurveSegment[];
  roomHoles: RoomHole[];
  doors: OpeningData[];
  windows: OpeningData[];
  holes: OpeningData[];
  parametricOpenings: OpeningData[];
  roomHeight: number;
}

interface Content {
  id: string;
  seekId: string;
  contentType: {
    getTypeString(): string;
  };
  ZSize: number;
  z: number;
  swing?: number;
  pathSegments?: Curve2d[];
  XSize: number;
  YSize: number;
  rotation: number;
  x?: number;
  y?: number;
}

interface Room {
  worldRawPath2d: {
    outer: Curve2d[];
    holes: RoomHole[];
  };
  structureFaces: StructureFace[];
  roomInfo?: {
    spaceInfos: SpaceInfo[];
  };
  ceilingHeight3d: number;
}

interface StructureFace {
  faceInfo?: {
    curve: unknown;
  };
  openings: Opening[];
  parametricOpenings: ParametricOpening[];
}

interface SpaceInfo {
  floors: Room[];
  structureFaces?: StructureFace[];
}

type Opening = Door | Window | Hole;
type Door = HSCore.Model.Door;
type Window = HSCore.Model.Window;
type Hole = HSCore.Model.Hole;
type ParametricOpening = HSCore.Model.ParametricOpening;

const MILLIMETERS_PER_METER = 1000;
const TOLERANCE_LINEAR = 0.001;
const TOLERANCE_ANGULAR = Math.PI / 180;
const MIN_OVERLAP_LENGTH = 0.01;
const MIN_CURVE_LENGTH = 0.01;

function convertCurveToSegment(curve: Curve2d): CurveSegment {
  return {
    start: {
      x: MILLIMETERS_PER_METER * curve.getStartPt().data[0],
      y: MILLIMETERS_PER_METER * curve.getStartPt().data[1]
    },
    end: {
      x: MILLIMETERS_PER_METER * curve.getEndPt().data[0],
      y: MILLIMETERS_PER_METER * curve.getEndPt().data[1]
    }
  };
}

function processOpening(
  wallCurves: Curve2d[],
  outputArray: OpeningData[],
  opening: Content,
  includeDirection: boolean = false
): void {
  const curves = new Loop(
    opening instanceof HSCore.Model.ParametricOpening
      ? opening.pathSegments
      : getContentOutline(opening)
  ).getAllCurves();

  const direction = includeDirection
    ? curves[opening.swing === 0 || opening.swing === 3 ? 3 : 1].getDirection()
    : undefined;

  const overlappingCurves = curves
    .filter((curve) =>
      curve.isLine2d() &&
      wallCurves.some((wallCurve) =>
        MathAlg.CalculateOverlap.curve2ds(
          wallCurve,
          curve,
          new Tolerance(TOLERANCE_LINEAR, TOLERANCE_ANGULAR)
        ).some((overlap) => overlap.range1.getLength() > MIN_OVERLAP_LENGTH)
      )
    )
    .map(convertCurveToSegment);

  if (overlappingCurves.length > 0) {
    outputArray.push({
      id: opening.id,
      seekId: opening.seekId,
      contentType: opening.contentType.getTypeString(),
      outline: curves.map(convertCurveToSegment),
      direction: direction?.data,
      overlaps: overlappingCurves,
      height: MILLIMETERS_PER_METER * opening.ZSize,
      elevation: MILLIMETERS_PER_METER * opening.z
    });
  }
}

function filterShortCurves(curves: Curve2d[]): Curve2d[] {
  const result: Curve2d[] = [];
  const clonedCurves = curves.map((curve) => curve.clone());

  for (let index = 0; index < clonedCurves.length; index++) {
    const currentCurve = clonedCurves[index];

    if (currentCurve.getLength() > MIN_CURVE_LENGTH) {
      result.push(currentCurve);
    } else {
      const midPoint = currentCurve.getMidPt();
      const previousCurve = result[result.length - 1];

      if (previousCurve) {
        const newCurve = previousCurve.getStartPt().distanceTo(midPoint) < previousCurve.getEndPt().distanceTo(midPoint)
          ? new Line2d(midPoint, previousCurve.getEndPt())
          : new Line2d(previousCurve.getStartPt(), midPoint);
        result.pop();
        result.push(newCurve);
      } else {
        const lastIndex = clonedCurves.length - 1;
        const lastCurve = clonedCurves[lastIndex];

        if (lastCurve) {
          const newCurve = lastCurve.getStartPt().distanceTo(midPoint) < lastCurve.getEndPt().distanceTo(midPoint)
            ? new Line2d(midPoint, lastCurve.getEndPt())
            : new Line2d(lastCurve.getStartPt(), midPoint);
          clonedCurves[lastIndex] = newCurve;
        }
      }

      const nextIndex = index === clonedCurves.length - 1 ? 0 : index + 1;
      const nextCurve = clonedCurves[nextIndex];

      if (nextCurve) {
        const newCurve = nextCurve.getStartPt().distanceTo(midPoint) < nextCurve.getEndPt().distanceTo(midPoint)
          ? new Line2d(midPoint, nextCurve.getEndPt())
          : new Line2d(nextCurve.getStartPt(), midPoint);
        clonedCurves[nextIndex] = newCurve;
      }
    }
  }

  return result.length > 1 ? result : [];
}

export function mergeCurves(curves: Curve2d[]): Curve2d[] {
  const result: Curve2d[] = [];

  for (let index = 0; index < curves.length; index++) {
    const currentCurve = curves[index];
    const lastIndex = result.length - 1;
    const lastCurve = result[lastIndex];

    if (
      lastCurve &&
      lastCurve.isLine2d() &&
      currentCurve.isLine2d() &&
      lastCurve.getDirection().isSameDirection(currentCurve.getDirection(), TOLERANCE_ANGULAR)
    ) {
      result[lastIndex] = new Line2d(lastCurve.getStartPt(), currentCurve.getEndPt());
    } else {
      result.push(currentCurve);
    }

    if (index === curves.length - 1) {
      const firstCurve = result[0];
      const finalCurve = result[result.length - 1];

      if (
        firstCurve.isLine2d() &&
        finalCurve.isLine2d() &&
        finalCurve.getDirection().isSameDirection(firstCurve.getDirection(), TOLERANCE_ANGULAR)
      ) {
        result.pop();
        result[0] = new Line2d(finalCurve.getStartPt(), firstCurve.getEndPt());
      }
    }
  }

  return result;
}

export function getContentOutline(content: Content): Point[] {
  const points: Point[] = [];
  const origin: Point = { x: 0, y: 0 };
  const contentVector = HSCore.Util.Math.Vec2.fromCoordinate(content);

  const topLeft = HSCore.Util.Math.rotatePointCW(
    origin,
    { x: -content.XSize / 2, y: content.YSize / 2 },
    content.rotation
  ).add(content);

  const topRight = HSCore.Util.Math.rotatePointCW(
    origin,
    { x: content.XSize / 2, y: content.YSize / 2 },
    content.rotation
  ).add(content);

  points[3] = topLeft;
  points[2] = topRight;
  points[1] = {
    x: 2 * contentVector.x - topLeft.x,
    y: 2 * contentVector.y - topLeft.y
  };
  points[0] = {
    x: 2 * contentVector.x - topRight.x,
    y: 2 * contentVector.y - topRight.y
  };

  return points;
}

export function generateRoomData(room?: Room): RoomData | undefined {
  const targetRoom = room || HSApp.App.getApp().selectionManager.selected()[0];

  if (!targetRoom) {
    return undefined;
  }

  const filteredWalls = filterShortCurves(targetRoom.worldRawPath2d.outer);

  if (filteredWalls.length === 0) {
    return undefined;
  }

  const mergedWalls = mergeCurves(filteredWalls);
  const roomHoles = targetRoom.worldRawPath2d.holes;
  let structureFaces = targetRoom.structureFaces;

  const spaceInfos = targetRoom.roomInfo?.spaceInfos;
  if (spaceInfos) {
    const matchingSpace = spaceInfos.find((spaceInfo) =>
      spaceInfo.floors.includes(targetRoom)
    );

    if (matchingSpace?.structureFaces) {
      structureFaces = matchingSpace.structureFaces;
    }
  }

  structureFaces = structureFaces.filter((face) => face.faceInfo?.curve);

  const doors: OpeningData[] = [];
  const windows: OpeningData[] = [];
  const holes: OpeningData[] = [];
  const parametricOpenings: OpeningData[] = [];

  structureFaces.forEach((face) => {
    face.openings.forEach((opening) => {
      if (opening instanceof HSCore.Model.Door && !doors.some((door) => door.id === opening.id)) {
        processOpening(mergedWalls, doors, opening, true);
      } else if (opening instanceof HSCore.Model.Window && !windows.some((window) => window.id === opening.id)) {
        processOpening(mergedWalls, windows, opening);
      } else if (opening instanceof HSCore.Model.Hole && !holes.some((hole) => hole.id === opening.id)) {
        processOpening(mergedWalls, holes, opening);
      }
    });

    face.parametricOpenings.forEach((opening) => {
      if (
        opening instanceof HSCore.Model.ParametricOpening &&
        !parametricOpenings.some((paramOpening) => paramOpening.id === opening.id)
      ) {
        processOpening(mergedWalls, parametricOpenings, opening);
      }
    });
  });

  return {
    walls: mergedWalls.map(convertCurveToSegment),
    roomHoles,
    doors,
    windows,
    holes,
    parametricOpenings,
    roomHeight: MILLIMETERS_PER_METER * targetRoom.ceilingHeight3d
  };
}