import { HSCore } from './HSCore';
import { Matrix3, Vector2, Polygon, Loop, PolyCurve, Line2d, MathAlg } from './GeometryCore';
import { ClipperPlusLibWrapper } from './ClipperPlusLib';

/**
 * Beam clipping utility for spatial constraint calculations.
 * Handles intersection and boolean operations between beams and room boundaries.
 */
export class BeamClipper {
  /** Singleton instance */
  private static _instance?: BeamClipper;

  /** Cached room polygon geometries for performance optimization */
  private roomPolygonCache: Polygon[];

  constructor() {
    this.roomPolygonCache = [];
  }

  /**
   * Gets the singleton instance of BeamClipper.
   * @returns The shared BeamClipper instance
   */
  public static getInstance(): BeamClipper {
    if (!this._instance) {
      this._instance = new BeamClipper();
    }
    return this._instance;
  }

  /**
   * Clips a beam to fit within room boundaries and avoid other beams.
   * Adjusts beam position and scale based on available space.
   * 
   * @param beam - The customized beam to be clipped
   * @param parameter - Parameter value for intersection calculation
   */
  public clipBeam(beam: HSCore.Model.NCustomizedBeam, parameter: number): void {
    const roomStructures = HSCore.Util.Room.getRoomsStructureIn(beam);
    
    if (roomStructures.length === 0) {
      return;
    }

    const positionCurve = beam.positionCurve;
    const leftOffset = positionCurve.getLeftNormal().normalized().multiplied(beam.XSize / 2);
    const rightOffset = positionCurve.getRightNormal().normalized().multiplied(beam.XSize / 2);
    
    const leftTransform = Matrix3.makeTranslate(leftOffset);
    const rightTransform = Matrix3.makeTranslate(rightOffset);
    
    const leftCurve = positionCurve.clone().transformed(leftTransform);
    const rightCurve = positionCurve.clone().transformed(rightTransform);
    
    // Extend curves for intersection calculations
    const EXTENSION_LENGTH = 10000;
    positionCurve.extendDouble(EXTENSION_LENGTH);
    leftCurve.extendDouble(EXTENSION_LENGTH);
    rightCurve.extendDouble(EXTENSION_LENGTH);

    const parentRoom = roomStructures[0].parent;
    if (!parentRoom) {
      return;
    }

    let roomPolygons: Polygon[];
    
    // Use cached room polygons or calculate new ones
    if (this.roomPolygonCache.length === 0) {
      const walls = Object.values(parentRoom.walls).filter(wall => 
        wall.isFlagOff(HSCore.Model.WallFlagEnum.heightEditable)
      );
      
      const wallParts = Object.values(parentRoom.structures).filter(structure => 
        structure.isWallPart()
      );
      
      roomPolygons = this.calcRoomPathFromStructureWalls(walls, wallParts);
      this.roomPolygonCache = roomPolygons;
    } else {
      roomPolygons = this.roomPolygonCache;
    }

    let optimalDirection: PolyCurve | undefined;
    let minLength = 1000;

    // Process each room structure
    for (const roomStructure of roomStructures) {
      const overlappingBeams: HSCore.Model.NCustomizedBeam[] = [];
      
      // Find other beams in the same room
      parentRoom.forEachBeam((otherBeam: HSCore.Model.IBeam) => {
        if (
          otherBeam instanceof HSCore.Model.NCustomizedBeam &&
          otherBeam.isContentInRoom(roomStructure) &&
          otherBeam.id !== beam.id
        ) {
          overlappingBeams.push(otherBeam);
        }
      });

      // Create polygons for overlapping beams
      const beamPolygons = overlappingBeams.map(otherBeam => 
        new Polygon(new Loop(otherBeam.profile))
      );

      // Calculate available space by subtracting beam polygons from room
      let availableSpace = MathAlg.BoolOperate2d.polygonExDifference(roomPolygons, beamPolygons);
      availableSpace = availableSpace.map(polygon => 
        new Polygon(polygon.toPaths())
      );

      // Intersect left edge with available space
      const leftIntersections = MathAlg.BoolOperate2d.polylineIntersect(
        new PolyCurve([leftCurve]),
        availableSpace,
        true
      ).map(curve => this.mergePolyCurve(curve));

      leftIntersections.forEach(polyCurve => {
        polyCurve.userData = { type: 'left' };
        polyCurve.getAllCurves().forEach(curve => {
          curve.userData = { type: 'left' };
        });
      });

      // Intersect right edge with available space
      const rightIntersections = MathAlg.BoolOperate2d.polylineIntersect(
        new PolyCurve([rightCurve]),
        availableSpace,
        true
      ).map(curve => this.mergePolyCurve(curve));

      rightIntersections.forEach(polyCurve => {
        polyCurve.userData = { type: 'right' };
        polyCurve.getAllCurves().forEach(curve => {
          curve.userData = { type: 'right' };
        });
      });

      // Collect valid curve segments at parameter position
      const validSegments: any[] = [];
      const allIntersections = [...leftIntersections, ...rightIntersections];
      
      allIntersections.forEach(polyCurve => {
        polyCurve.getAllCurves().forEach(curve => {
          const paramValue = curve.getParamAt(parameter);
          
          if (curve.getRange().containsPoint(paramValue)) {
            if (!curve.getDirection().isSameDirection(positionCurve.getDirection())) {
              curve.reverse();
            }
            validSegments.push(curve);
          }
        });
      });

      if (validSegments.length === 0) {
        return;
      }

      // Calculate optimal beam direction and length
      const clippedDirection = this.calcCuttedBeamDiretion(
        availableSpace,
        validSegments,
        positionCurve.clone()
      );
      
      const directionLength = clippedDirection.getLength();
      if (directionLength < minLength) {
        minLength = directionLength;
        optimalDirection = clippedDirection;
      }
    }

    // Apply calculated position and scale to beam
    if (optimalDirection) {
      const midpoint = optimalDirection.getMidPt();
      beam.x = midpoint.x;
      beam.y = midpoint.y;
      
      const scaleRatio = optimalDirection.getLength() / beam.YLength;
      beam.YScale = scaleRatio;
    }
  }

  /**
   * Clears the cached room polygon data.
   */
  public clearCache(): void {
    this.roomPolygonCache = [];
  }

  /**
   * Calculates room boundary polygons from walls and structural elements.
   * Uses boolean operations to merge overlapping geometries.
   * 
   * @param walls - Wall elements defining room boundaries
   * @param wallParts - Additional structural wall components
   * @returns Array of polygons representing room boundaries
   */
  private calcRoomPathFromStructureWalls(
    walls: HSCore.Model.IWall[],
    wallParts: HSCore.Model.IStructure[]
  ): Polygon[] {
    const clipperWrapper = new ClipperPlusLibWrapper();
    const edges: Array<{ curve: any; lregion: string; id: string }> = [];

    // Collect all wall path curves
    walls.forEach(wall => {
      wall.path.forEach((curve, index) => {
        edges.push({
          curve,
          lregion: wall.id,
          id: `${wall.id}_${index}`
        });
      });
    });

    // Collect all wall part profile curves
    wallParts.forEach(wallPart => {
      wallPart.profile.forEach((curve, index) => {
        edges.push({
          curve,
          lregion: wallPart.id,
          id: `${wallPart.id}_${index}`
        });
      });
    });

    const TOLERANCE = 0.000001;
    const booleanResult = clipperWrapper.exbool(edges, TOLERANCE, {
      clean: 1,
      scaleFix: 0
    });

    // Filter for new outer boundaries only
    const newRegions = booleanResult.list.filter(region => 
      region.outer.length > 0 && region.oldId.length === 0
    );

    const resultPolygons: Polygon[] = [];

    for (const region of newRegions) {
      // Build outer boundary loop
      const outerCurves = region.outer.map(edge => 
        edge.isRev ? edge.edge.curve.reversed() : edge.edge.curve
      );

      // Build hole loops
      const holeCurves = region.holes.map(hole =>
        hole.map(edge => edge.isRev ? edge.edge.curve.reversed() : edge.edge.curve)
      );

      const holeLoops = holeCurves.map(curves => new Loop(curves));
      const polygon = new Polygon([new Loop(outerCurves), ...holeLoops]);
      
      resultPolygons.push(polygon);
    }

    return resultPolygons;
  }

  /**
   * Calculates the valid beam direction range based on room boundaries and obstacles.
   * Determines start and end parameters by analyzing curve intersections.
   * 
   * @param roomPolygons - Available space polygons
   * @param validSegments - Curve segments intersecting the beam
   * @param directionCurve - Base direction curve to be trimmed
   * @returns Trimmed curve representing valid beam placement
   */
  private calcCuttedBeamDiretion(
    roomPolygons: Polygon[],
    validSegments: any[],
    directionCurve: any
  ): any {
    const FAR_POINT_COORD = 100000000;
    
    const allBoundaryCurves = roomPolygons
      .map(polygon => polygon.getAllCurves())
      .flat();

    const leftSegments = validSegments.filter(seg => seg.userData?.type === 'left');
    const rightSegments = validSegments.filter(seg => seg.userData?.type === 'right');

    const leftSegment = leftSegments.length > 0 ? leftSegments[0] : undefined;
    const rightSegment = rightSegments.length > 0 ? rightSegments[0] : undefined;

    const leftStartPoint = leftSegment 
      ? leftSegment.getStartPt() 
      : new Vector2({ x: FAR_POINT_COORD, y: FAR_POINT_COORD });
      
    const rightStartPoint = rightSegment 
      ? rightSegment.getStartPt() 
      : new Vector2({ x: FAR_POINT_COORD, y: FAR_POINT_COORD });

    const leftStartBoundaries = allBoundaryCurves.filter(curve => 
      curve.containsPoint(leftStartPoint)
    );
    
    const rightStartBoundaries = allBoundaryCurves.filter(curve => 
      curve.containsPoint(rightStartPoint)
    );

    let startParam: number;

    if (leftStartBoundaries.length === 0 && rightStartBoundaries.length === 0) {
      startParam = 0;
    } else if (leftStartBoundaries.length !== 0 && rightStartBoundaries.length === 0) {
      startParam = directionCurve.getParamAt(leftStartPoint);
    } else if (leftStartBoundaries.length === 0 && rightStartBoundaries.length !== 0) {
      startParam = directionCurve.getParamAt(rightStartPoint);
    } else {
      // Check if boundaries overlap or are collinear
      const boundariesOverlap = leftStartBoundaries.some(leftCurve =>
        rightStartBoundaries.includes(leftCurve) ||
        rightStartBoundaries.some(rightCurve =>
          rightCurve instanceof Line2d &&
          leftCurve instanceof Line2d &&
          MathAlg.CurveCurveColinear.curve2ds(leftCurve, rightCurve)
        )
      );

      if (boundariesOverlap) {
        const leftParam = directionCurve.getParamAt(leftStartPoint);
        const rightParam = directionCurve.getParamAt(rightStartPoint);
        startParam = leftParam < rightParam ? leftParam : rightParam;
      } else {
        const leftParam = directionCurve.getParamAt(leftStartPoint);
        const rightParam = directionCurve.getParamAt(rightStartPoint);
        startParam = leftParam < rightParam ? rightParam : leftParam;
      }
    }

    // Calculate end parameter using similar logic
    const leftEndPoint = leftSegment 
      ? leftSegment.getEndPt() 
      : new Vector2({ x: FAR_POINT_COORD, y: FAR_POINT_COORD });
      
    const rightEndPoint = rightSegment 
      ? rightSegment.getEndPt() 
      : new Vector2({ x: FAR_POINT_COORD, y: FAR_POINT_COORD });

    const leftEndBoundaries = allBoundaryCurves.filter(curve => 
      curve.containsPoint(leftEndPoint)
    );
    
    const rightEndBoundaries = allBoundaryCurves.filter(curve => 
      curve.containsPoint(rightEndPoint)
    );

    let endParam: number;

    if (leftEndBoundaries.length === 0 && rightEndBoundaries.length === 0) {
      endParam = 0;
    } else if (leftEndBoundaries.length !== 0 && rightEndBoundaries.length === 0) {
      endParam = directionCurve.getParamAt(leftEndPoint);
    } else if (leftEndBoundaries.length === 0 && rightEndBoundaries.length !== 0) {
      endParam = directionCurve.getParamAt(rightEndPoint);
    } else {
      const boundariesOverlap = leftEndBoundaries.some(leftCurve =>
        rightEndBoundaries.includes(leftCurve) ||
        rightEndBoundaries.some(rightCurve =>
          rightCurve instanceof Line2d &&
          leftCurve instanceof Line2d &&
          MathAlg.CurveCurveColinear.curve2ds(leftCurve, rightCurve)
        )
      );

      if (boundariesOverlap) {
        const leftParam = directionCurve.getParamAt(leftEndPoint);
        const rightParam = directionCurve.getParamAt(rightEndPoint);
        endParam = leftParam > rightParam ? leftParam : rightParam;
      } else {
        const leftParam = directionCurve.getParamAt(leftEndPoint);
        const rightParam = directionCurve.getParamAt(rightEndPoint);
        endParam = leftParam > rightParam ? rightParam : leftParam;
      }
    }

    return directionCurve.setRange(startParam, endParam);
  }

  /**
   * Merges consecutive collinear line segments in a polycurve.
   * Optimizes geometry by combining parallel segments into single lines.
   * 
   * @param polyCurve - Input polycurve to be optimized
   * @returns Optimized polycurve with merged segments
   */
  private mergePolyCurve(polyCurve: PolyCurve): PolyCurve {
    const curves = polyCurve.getAllCurves();

    // Only merge if all curves are lines
    const allLines = curves.every(curve => curve instanceof Line2d);
    if (!allLines) {
      return polyCurve;
    }

    let currentLine: Line2d | undefined;
    const mergedCurves: Line2d[] = [];

    for (const curve of curves) {
      if (!currentLine) {
        currentLine = curve as Line2d;
        continue;
      }

      if (currentLine.isParallelTo(curve)) {
        // Extend current line to include parallel segment
        const range = currentLine.getRange();
        const startParam = currentLine.getParamAt(curve.getStartPt());
        const endParam = currentLine.getParamAt(curve.getEndPt());
        
        range.expandByPt(startParam);
        range.expandByPt(endParam);
        currentLine.setRange(range);
      } else {
        mergedCurves.push(currentLine.clone());
        currentLine = curve as Line2d;
      }
    }

    if (currentLine) {
      mergedCurves.push(currentLine.clone());
    }

    return new PolyCurve(mergedCurves);
  }
}