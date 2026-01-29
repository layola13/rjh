import { HSCore } from './HSCore';
import { Matrix3, Vector2, Polygon, Loop, PolyCurve, Line2d, MathAlg } from './GeometryLib';
import { ClipperPlusLibWrapper } from './ClipperWrapper';

interface CurveWithMetadata {
  curve: any;
  lregion: string;
  id: string;
}

interface UserData {
  type: 'left' | 'right';
}

interface ClipperResult {
  list: Array<{
    outer: Array<{ edge: { curve: any }; isRev: boolean }>;
    holes: Array<Array<{ edge: { curve: any }; isRev: boolean }>>;
    oldId: any[];
  }>;
}

export class BeamClipper {
  private static _instance?: BeamClipper;
  private roomPolygonCache: Polygon[] = [];

  private constructor() {}

  public static getInstance(): BeamClipper {
    if (!this._instance) {
      this._instance = new BeamClipper();
    }
    return this._instance;
  }

  /**
   * Clips a beam based on room structure and other beams
   * @param beam - The beam to be clipped
   * @param parameter - The clipping parameter
   */
  public clipBeam(beam: any, parameter: number): void {
    const roomsStructure = HSCore.Util.Room.getRoomsStructureIn(beam);
    
    if (roomsStructure.length === 0) {
      return;
    }

    const positionCurve = beam.positionCurve;
    const leftNormal = positionCurve.getLeftNormal().normalized().multiplied(beam.XSize / 2);
    const rightNormal = positionCurve.getRightNormal().normalized().multiplied(beam.XSize / 2);
    
    const leftTransform = Matrix3.makeTranslate(leftNormal);
    const rightTransform = Matrix3.makeTranslate(rightNormal);
    
    const leftCurve = positionCurve.clone().transformed(leftTransform);
    const rightCurve = positionCurve.clone().transformed(rightTransform);
    
    const extendDistance = 10000;
    positionCurve.extendDouble(extendDistance);
    leftCurve.extendDouble(extendDistance);
    rightCurve.extendDouble(extendDistance);

    const parentRoom = roomsStructure[0].parent;
    
    if (!parentRoom) {
      return;
    }

    let roomPolygons: Polygon[];
    
    if (this.roomPolygonCache.length === 0) {
      const walls = Object.values(parentRoom.walls).filter((wall: any) => 
        wall.isFlagOff(HSCore.Model.WallFlagEnum.heightEditable)
      );
      
      const structures = Object.values(parentRoom.structures).filter((structure: any) => 
        structure.isWallPart()
      );
      
      roomPolygons = this.calcRoomPathFromStructureWalls(walls, structures);
      this.roomPolygonCache = roomPolygons;
    } else {
      roomPolygons = this.roomPolygonCache;
    }

    let resultDirection: any = undefined;
    let minLength = 1000;

    for (const room of roomsStructure) {
      const beamsInRoom: any[] = [];
      
      parentRoom.forEachBeam((otherBeam: any) => {
        if (
          otherBeam instanceof HSCore.Model.NCustomizedBeam &&
          otherBeam.isContentInRoom(room) &&
          otherBeam.id !== beam.id
        ) {
          beamsInRoom.push(otherBeam);
        }
      });

      const beamPolygons = beamsInRoom.map((b: any) => 
        new Polygon(new Loop(b.profile))
      );

      let clippedPolygons = MathAlg.BoolOperate2d.polygonExDifference(roomPolygons, beamPolygons);
      clippedPolygons = clippedPolygons.map((poly: any) => 
        new Polygon(poly.toPaths())
      );

      const leftIntersections = MathAlg.BoolOperate2d.polylineIntersect(
        new PolyCurve([leftCurve]),
        clippedPolygons,
        true
      ).map((poly: any) => this.mergePolyCurve(poly));

      leftIntersections.forEach((poly: any) => {
        poly.userData = { type: 'left' } as UserData;
        poly.getAllCurves().forEach((curve: any) => {
          curve.userData = { type: 'left' } as UserData;
        });
      });

      const rightIntersections = MathAlg.BoolOperate2d.polylineIntersect(
        new PolyCurve([rightCurve]),
        clippedPolygons,
        true
      ).map((poly: any) => this.mergePolyCurve(poly));

      rightIntersections.forEach((poly: any) => {
        poly.userData = { type: 'right' } as UserData;
        poly.getAllCurves().forEach((curve: any) => {
          curve.userData = { type: 'right' } as UserData;
        });
      });

      const validCurves: any[] = [];
      
      [...leftIntersections, ...rightIntersections].forEach((poly: any) => {
        poly.getAllCurves().forEach((curve: any) => {
          const param = curve.getParamAt(parameter);
          if (curve.getRange().containsPoint(param)) {
            if (!curve.getDirection().isSameDirection(positionCurve.getDirection())) {
              curve.reverse();
            }
            validCurves.push(curve);
          }
        });
      });

      if (validCurves.length === 0) {
        return undefined;
      }

      const direction = this.calcCuttedBeamDiretion(
        clippedPolygons,
        validCurves,
        positionCurve.clone()
      );
      
      const length = direction.getLength();
      
      if (length < minLength) {
        minLength = length;
        resultDirection = direction;
      }
    }

    if (resultDirection) {
      const midPoint = resultDirection.getMidPt();
      beam.x = midPoint.x;
      beam.y = midPoint.y;
      
      const scale = resultDirection.getLength() / beam.YLength;
      beam.YScale = scale;
    }
  }

  public clearCache(): void {
    this.roomPolygonCache = [];
  }

  private calcRoomPathFromStructureWalls(walls: any[], structures: any[]): Polygon[] {
    const clipperWrapper = new ClipperPlusLibWrapper();
    const curvesWithMetadata: CurveWithMetadata[] = [];

    walls.forEach((wall: any) => {
      wall.path.forEach((curve: any, index: number) => {
        curvesWithMetadata.push({
          curve: curve,
          lregion: wall.id,
          id: `${wall.id}_${index}`
        });
      });
    });

    structures.forEach((structure: any) => {
      structure.profile.forEach((curve: any, index: number) => {
        curvesWithMetadata.push({
          curve: curve,
          lregion: structure.id,
          id: `${structure.id}_${index}`
        });
      });
    });

    const tolerance = 1e-6;
    const clipperResult: ClipperResult = clipperWrapper.exbool(curvesWithMetadata, tolerance, {
      clean: 1,
      scaleFix: 0
    });

    const polygons: Polygon[] = [];
    const filteredResults = clipperResult.list.filter((result: any) => 
      result.outer.length > 0 && result.oldId.length === 0
    );

    for (const result of filteredResults) {
      const outerCurves = result.outer.map((edge: any) => 
        edge.isRev ? edge.edge.curve.reversed() : edge.edge.curve
      );

      const holeCurves = result.holes.map((hole: any) => 
        hole.map((edge: any) => 
          edge.isRev ? edge.edge.curve.reversed() : edge.edge.curve
        )
      );

      const loops = [new Loop(outerCurves), ...holeCurves.map((curves: any) => new Loop(curves))];
      polygons.push(new Polygon(loops));
    }

    return polygons;
  }

  private calcCuttedBeamDiretion(polygons: Polygon[], curves: any[], centerCurve: any): any {
    let startParam = 0;
    let endParam = 0;

    const allBoundaryCurves = polygons.map((polygon: Polygon) => 
      polygon.getAllCurves()
    ).flat();

    const leftCurves = curves.filter((curve: any) => 
      curve.userData?.type === 'left'
    );
    
    const rightCurves = curves.filter((curve: any) => 
      curve.userData?.type === 'right'
    );

    const firstLeftCurve = leftCurves.length > 0 ? leftCurves[0] : undefined;
    const firstRightCurve = rightCurves.length > 0 ? rightCurves[0] : undefined;

    const maxCoordinate = 100000000;
    const leftStartPoint = firstLeftCurve 
      ? firstLeftCurve.getStartPt() 
      : new Vector2({ x: maxCoordinate, y: maxCoordinate });
    
    const rightStartPoint = firstRightCurve 
      ? firstRightCurve.getStartPt() 
      : new Vector2({ x: maxCoordinate, y: maxCoordinate });

    const leftStartContaining = allBoundaryCurves.filter((curve: any) => 
      curve.containsPoint(leftStartPoint)
    );
    
    const rightStartContaining = allBoundaryCurves.filter((curve: any) => 
      curve.containsPoint(rightStartPoint)
    );

    if (leftStartContaining.length === 0 && rightStartContaining.length === 0) {
      startParam = 0;
    } else if (leftStartContaining.length !== 0 && rightStartContaining.length === 0) {
      startParam = centerCurve.getParamAt(leftStartPoint);
    } else if (leftStartContaining.length === 0 && rightStartContaining.length !== 0) {
      startParam = centerCurve.getParamAt(rightStartPoint);
    } else {
      const hasColinearOrShared = leftStartContaining.some((leftCurve: any) =>
        rightStartContaining.includes(leftCurve) ||
        rightStartContaining.some((rightCurve: any) =>
          rightCurve instanceof Line2d &&
          leftCurve instanceof Line2d &&
          MathAlg.CurveCurveColinear.curve2ds(leftCurve, rightCurve)
        )
      );

      if (hasColinearOrShared) {
        const leftParam = centerCurve.getParamAt(leftStartPoint);
        const rightParam = centerCurve.getParamAt(rightStartPoint);
        startParam = leftParam < rightParam ? leftParam : rightParam;
      } else {
        const leftParam = centerCurve.getParamAt(leftStartPoint);
        const rightParam = centerCurve.getParamAt(rightStartPoint);
        startParam = leftParam < rightParam ? rightParam : leftParam;
      }
    }

    const leftEndPoint = firstLeftCurve 
      ? firstLeftCurve.getEndPt() 
      : new Vector2({ x: maxCoordinate, y: maxCoordinate });
    
    const rightEndPoint = firstRightCurve 
      ? firstRightCurve.getEndPt() 
      : new Vector2({ x: maxCoordinate, y: maxCoordinate });

    const leftEndContaining = allBoundaryCurves.filter((curve: any) => 
      curve.containsPoint(leftEndPoint)
    );
    
    const rightEndContaining = allBoundaryCurves.filter((curve: any) => 
      curve.containsPoint(rightEndPoint)
    );

    if (leftEndContaining.length === 0 && rightEndContaining.length === 0) {
      endParam = 0;
    } else if (leftEndContaining.length !== 0 && rightEndContaining.length === 0) {
      endParam = centerCurve.getParamAt(leftEndPoint);
    } else if (leftEndContaining.length === 0 && rightEndContaining.length !== 0) {
      endParam = centerCurve.getParamAt(rightEndPoint);
    } else {
      const hasColinearOrShared = leftEndContaining.some((leftCurve: any) =>
        rightEndContaining.includes(leftCurve) ||
        rightEndContaining.some((rightCurve: any) =>
          rightCurve instanceof Line2d &&
          leftCurve instanceof Line2d &&
          MathAlg.CurveCurveColinear.curve2ds(leftCurve, rightCurve)
        )
      );

      if (hasColinearOrShared) {
        const leftParam = centerCurve.getParamAt(leftEndPoint);
        const rightParam = centerCurve.getParamAt(rightEndPoint);
        endParam = leftParam > rightParam ? leftParam : rightParam;
      } else {
        const leftParam = centerCurve.getParamAt(leftEndPoint);
        const rightParam = centerCurve.getParamAt(rightEndPoint);
        endParam = leftParam > rightParam ? rightParam : leftParam;
      }
    }

    return centerCurve.setRange(startParam, endParam);
  }

  private mergePolyCurve(polyCurve: PolyCurve): PolyCurve {
    const allCurves = polyCurve.getAllCurves();

    if (!allCurves.every((curve: any) => curve instanceof Line2d)) {
      return polyCurve;
    }

    let currentLine: Line2d | undefined = undefined;
    const mergedLines: Line2d[] = [];

    for (const curve of allCurves) {
      if (!currentLine) {
        currentLine = curve as Line2d;
      } else {
        if (currentLine.isParallelTo(curve)) {
          const range = currentLine.getRange();
          const startParam = currentLine.getParamAt(curve.getStartPt());
          const endParam = currentLine.getParamAt(curve.getEndPt());
          range.expandByPt(startParam);
          range.expandByPt(endParam);
          currentLine.setRange(range);
        } else {
          mergedLines.push(currentLine.clone());
          currentLine = curve as Line2d;
        }
      }
    }

    if (currentLine) {
      mergedLines.push(currentLine.clone());
    }

    return new PolyCurve(mergedLines);
  }
}