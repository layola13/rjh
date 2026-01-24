/**
 * Outdoor and slab geometry utility module
 * Provides methods for spatial queries and geometric operations on building slabs
 */

import { Vector2, Loop, Plane, MathAlg, MathUtil } from './math-library';
import { HSCore } from './core';

/**
 * Tolerance value for outdoor geometric calculations
 * Used for floating-point comparisons in spatial operations
 */
export const outdoorTolerance: number = 1e-4;

/**
 * Point type enumeration for reference points
 */
interface ReferencePoint {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Point type (endpoint, midpoint, etc.) */
  type: string;
}

/**
 * Closed region structure with outer boundary and optional holes
 */
interface ClosedRegion {
  /** Outer boundary curves */
  outer: any[];
  /** Inner hole boundaries */
  holes: any[][];
}

/**
 * Utility class for outdoor and slab-related geometric operations
 * Provides static methods for spatial queries and clipping operations
 */
export class Util {
  /**
   * Private constructor - utility class with static methods only
   */
  private constructor() {}

  /**
   * Get all outdoor floor 2D paths from the active document
   * @returns Array of world raw 2D paths for each outdoor floor
   */
  static getOutdoorPaths(): any[] {
    return Util.getOutdoorFloors().map((floor) => floor.worldRawPath2d);
  }

  /**
   * Retrieve all outdoor floor objects from the scene's outdoor layer
   * @returns Array of outdoor floor instances
   */
  static getOutdoorFloors(): any[] {
    const outdoorLayer = HSCore.Doc.getDocManager().activeDocument.scene.outdoorLayer;
    const floors: any[] = [];
    
    outdoorLayer.forEachFloor((floor: any) => {
      floors.push(floor);
    });
    
    return floors;
  }

  /**
   * Check if a point is inside the root slab (excluding edges)
   * @param point - 2D point coordinates to test
   * @returns True if point is strictly inside any root slab room
   */
  static isPointInSideRootSlab(point: number[]): boolean {
    const roomPaths = HSCore.Doc.getDocManager().activeDocument.scene.rootLayer.slabBuilder.getRoomPaths();
    const testPoint = new Vector2(point);

    for (const path of roomPaths) {
      const outerLoop = new Loop(path.outer);
      const positionResult = MathAlg.PositionJudge.ptToLoop(
        testPoint,
        outerLoop,
        outdoorTolerance
      );

      if (positionResult.type === MathAlg.PtLoopPositonType.IN) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if a point is on or inside the root slab (including edges)
   * @param point - 2D point coordinates to test
   * @returns True if point intersects with any root slab boundary
   */
  static isPointOnRootSlab(point: number[]): boolean {
    const globalPaths = HSCore.Doc.getDocManager().activeDocument.scene.rootLayer.slabBuilder.getGlobalPaths();
    const testPoint = new Vector2(point);

    return globalPaths.some((path) => {
      const outerLoop = new Loop(path.outer);
      const positionResult = MathAlg.PositionJudge.ptToLoop(
        testPoint,
        outerLoop,
        outdoorTolerance
      );
      return positionResult.type !== MathAlg.PtLoopPositonType.OUT;
    });
  }

  /**
   * Check if a point intersects with any outer layer slab
   * @param point - 2D point coordinates to test
   * @returns True if point is inside or on any outdoor slab boundary
   */
  static isPointIntersectWithOuterLayerSlab(point: number[]): boolean {
    const outdoorPaths = Util.getOutdoorPaths();
    const testPoint = new Vector2(point);

    return outdoorPaths.some((path) => {
      const positionResult = MathAlg.PositionJudge.ptToLoop(
        testPoint,
        new Loop(path.outer)
      );
      return positionResult.type !== MathAlg.PtLoopPositonType.OUT;
    });
  }

  /**
   * Check if closed regions remain after subtracting existing slabs
   * Filters out regions that are completely covered by existing floor slabs
   * @param region - Closed region to test against existing slabs
   * @returns Remaining regions after boolean difference operation
   */
  static isClosedRegionsWithSlab(region: any): any[] {
    const outdoorLayer = HSCore.Doc.getDocManager().activeDocument.scene.outdoorLayer;
    const regionDifferences = HSCore.Util.Slab.getOutdoorRegionUnionsDiffSlabsOuter([region]);
    
    const existingFloorRegions: Array<{ outer: Loop; area: number }> = [];
    const floorFaces = Object.values(outdoorLayer.faces).filter(
      (face) => face instanceof HSCore.Model.Floor
    );

    for (const floor of floorFaces as any[]) {
      const zHeight = floor.wirePath.outer[0].getStartPt().z;
      const projectionPlane = Plane.XOY(zHeight);
      const outerLoop2D = new Loop(
        floor.wirePath.outer.map((curve: any) => projectionPlane.getCurve2d(curve))
      );

      existingFloorRegions.push({
        outer: outerLoop2D,
        area: outerLoop2D.calcArea(),
      });
    }

    return regionDifferences.filter((diff) => {
      const diffLoop = new Loop(diff.outer);
      const diffArea = diffLoop.calcArea();

      // Skip negligible areas
      if (diffArea < outdoorTolerance) {
        return false;
      }

      // Find existing floors with matching area
      const matchingFloors = existingFloorRegions
        .filter((existing) => MathUtil.isNearlyEqual(existing.area, diffArea))
        .map((existing) => existing.outer);

      // Keep region if no matching floors or if difference exists
      if (matchingFloors.length === 0) {
        return true;
      }

      const remainingAfterDiff = MathAlg.BoolOperate2d.polygonExDifference(
        [diffLoop],
        matchingFloors,
        outdoorTolerance
      );

      return remainingAfterDiff.length > 0;
    });
  }

  /**
   * Clip a loop region by subtracting root slab areas
   * Performs boolean difference operation between input loop and all root slabs
   * @param loop - Input loop to clip (will be reversed if clockwise)
   * @returns Array of resulting closed regions after clipping
   */
  static clipWithRootSlab(loop: Loop): ClosedRegion[] {
    // Ensure counter-clockwise orientation
    if (!loop.isAnticlockwise()) {
      loop.reverse();
    }

    const rootSlabLoops = HSCore.Doc.getDocManager()
      .activeDocument.scene.rootLayer.slabBuilder.getGlobalPaths()
      .map((path) => new Loop(path.outer));

    let clippedRegions = MathAlg.BoolOperate2d.polygonExDifference(
      [loop],
      rootSlabLoops,
      outdoorTolerance
    );

    // Filter out negligible areas
    clippedRegions = clippedRegions.filter(
      (region) => region.calcArea() > outdoorTolerance
    );

    return clippedRegions.map((region) => {
      const loops = region.getLoops();
      return {
        outer: loops[0].getAllCurves(),
        holes: loops.slice(1).map((hole) => hole.getAllCurves()),
      };
    });
  }

  /**
   * Extract reference points from root slab boundaries
   * Collects endpoints and midpoints from all slab outer boundaries
   * @returns Array of reference points with type annotations
   */
  static getRootSlabReferencePoints(): ReferencePoint[] {
    const referencePoints: ReferencePoint[] = [];
    const globalPaths = HSCore.Doc.getDocManager()
      .activeDocument.scene.rootLayer.slabBuilder.getGlobalPaths();

    globalPaths.forEach((path) => {
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