import { Vector2, Loop, MathAlg, PtLoopPositonType, Plane, MathUtil } from './math-library';
import { HSCore } from './hs-core';

const OUTDOOR_TOLERANCE = 1e-4;

interface ReferencePoint {
  x: number;
  y: number;
  type: string;
}

interface PathData {
  outer: any[];
  holes?: any[][];
}

interface FloorRegion {
  outer: Loop;
  area: number;
}

class Util {
  static getOutdoorPaths(): PathData[] {
    return Util.getOutdoorFloors().map((floor) => floor.worldRawPath2d);
  }

  static getOutdoorFloors(): any[] {
    const outdoorLayer = HSCore.Doc.getDocManager().activeDocument.scene.outdoorLayer;
    const floors: any[] = [];
    
    outdoorLayer.forEachFloor((floor: any) => {
      floors.push(floor);
    });
    
    return floors;
  }

  static isPointInSideRootSlab(point: { x: number; y: number }): boolean {
    const roomPaths = HSCore.Doc.getDocManager()
      .activeDocument.scene.rootLayer.slabBuilder.getRoomPaths();
    const vector = new Vector2(point);

    for (const path of roomPaths) {
      const loop = new Loop(path.outer);
      const positionResult = MathAlg.PositionJudge.ptToLoop(
        vector,
        loop,
        OUTDOOR_TOLERANCE
      );

      if (positionResult.type === PtLoopPositonType.IN) {
        return true;
      }
    }

    return false;
  }

  static isPointOnRootSlab(point: { x: number; y: number }): boolean {
    const globalPaths = HSCore.Doc.getDocManager()
      .activeDocument.scene.rootLayer.slabBuilder.getGlobalPaths();
    const vector = new Vector2(point);

    return globalPaths.some((path: PathData) => {
      const loop = new Loop(path.outer);
      const positionResult = MathAlg.PositionJudge.ptToLoop(
        vector,
        loop,
        OUTDOOR_TOLERANCE
      );
      return positionResult.type !== PtLoopPositonType.OUT;
    });
  }

  static isPointIntersectWithOuterLayerSlab(point: { x: number; y: number }): boolean {
    const outdoorPaths = Util.getOutdoorPaths();
    const vector = new Vector2(point);

    return outdoorPaths.some((path: PathData) => {
      const loop = new Loop(path.outer);
      const positionResult = MathAlg.PositionJudge.ptToLoop(vector, loop);
      return positionResult.type !== PtLoopPositonType.OUT;
    });
  }

  static isClosedRegionsWithSlab(region: any): any[] {
    const outdoorLayer = HSCore.Doc.getDocManager().activeDocument.scene.outdoorLayer;
    const regionUnions = HSCore.Util.Slab.getOutdoorRegionUnionsDiffSlabsOuter([region]);
    const floorRegions: FloorRegion[] = [];

    const floors = Object.values(outdoorLayer.faces).filter(
      (face: any) => face instanceof HSCore.Model.Floor
    );

    for (const floor of floors) {
      const zHeight = floor.wirePath.outer[0].getStartPt().z;
      const plane = Plane.XOY(zHeight);
      const outerLoop = new Loop(
        floor.wirePath.outer.map((curve: any) => plane.getCurve2d(curve))
      );

      floorRegions.push({
        outer: outerLoop,
        area: outerLoop.calcArea(),
      });
    }

    return regionUnions.filter((union: PathData) => {
      const loop = new Loop(union.outer);
      const area = loop.calcArea();

      if (area < OUTDOOR_TOLERANCE) {
        return false;
      }

      const matchingFloors = floorRegions
        .filter((floorRegion) => MathUtil.isNearlyEqual(floorRegion.area, area))
        .map((floorRegion) => floorRegion.outer);

      if (matchingFloors.length === 0) {
        return true;
      }

      const difference = MathAlg.BoolOperate2d.polygonExDifference(
        [loop],
        matchingFloors,
        OUTDOOR_TOLERANCE
      );

      return difference.length > 0;
    });
  }

  static clipWithRootSlab(loop: Loop): PathData[] {
    if (!loop.isAnticlockwise()) {
      loop.reverse();
    }

    const globalPaths = HSCore.Doc.getDocManager()
      .activeDocument.scene.rootLayer.slabBuilder.getGlobalPaths()
      .map((path: PathData) => new Loop(path.outer));

    let difference = MathAlg.BoolOperate2d.polygonExDifference(
      [loop],
      globalPaths,
      OUTDOOR_TOLERANCE
    );

    difference = difference.filter(
      (diffLoop: Loop) => diffLoop.calcArea() > OUTDOOR_TOLERANCE
    );

    return difference.map((diffLoop: Loop) => {
      const loops = diffLoop.getLoops();
      return {
        outer: loops[0].getAllCurves(),
        holes: loops.slice(1).map((holeLoop: Loop) => holeLoop.getAllCurves()),
      };
    });
  }

  static getRootSlabReferencePoints(): ReferencePoint[] {
    const referencePoints: ReferencePoint[] = [];
    const globalPaths = HSCore.Doc.getDocManager()
      .activeDocument.scene.rootLayer.slabBuilder.getGlobalPaths();

    globalPaths.forEach((path: PathData) => {
      path.outer.forEach((curve: any) => {
        const startPoint = curve.getStartPt();
        const midPoint = curve.getMidPt();

        referencePoints.push({
          x: startPoint.x,
          y: startPoint.y,
          type: HSCore.Util.Sketch2d.pointTypes.endPoint,
        });

        referencePoints.push({
          x: midPoint.x,
          y: midPoint.y,
          type: HSCore.Util.Sketch2d.pointTypes.lineMidPoint,
        });
      });
    });

    return referencePoints;
  }
}

export { Util, OUTDOOR_TOLERANCE as outdoorTolerance };