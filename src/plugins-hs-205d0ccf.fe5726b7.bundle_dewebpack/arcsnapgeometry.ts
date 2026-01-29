import { Vector2, Line2d, Arc2d, Circle2d, Loop, CONST, MathAlg } from './geometry';
import { HSCore } from './core';

export enum SnapGeomType {
  CenterPoint = 1,
  CornerPoint = 2,
  CenterLine = 3,
  LineEdge = 4,
  CircleEdge = 5,
  ArcEdge = 6
}

interface GeometryEntity {
  tag: string;
  geometry?: Vector2[];
  curve?: Line2d | Arc2d;
  faceList?: Face[];
  center?: Vector2;
  radius?: number;
  width?: number;
  middle?: Vector2;
  profile?: Array<Line2d | Circle2d>;
  positionCurve?: Line2d;
  YSize?: number;
  id?: string;
  roomInfos?: RoomInfo[];
  wirePath?: { outer: Array<Line2d | any> };
  isArcWall(): boolean;
}

interface Face {
  faceInfo?: { curve?: Line2d | Arc2d };
  getOuterLoopPolygon(): Vector2[];
}

interface RoomInfo {
  splitCurves: Array<Line2d | Arc2d>;
}

interface ExtractOptions {
  includeRoomCurves: boolean;
}

interface FloorData {
  walls: GeometryEntity[];
  structures: GeometryEntity[];
  beams: GeometryEntity[];
  holes: GeometryEntity[];
  room?: GeometryEntity;
}

export abstract class SnapGeometry {
  public from: GeometryEntity;
  public type: SnapGeomType;
  private _userID: string = '';
  public relatedGeometries?: SnapGeometry[];

  constructor(from: GeometryEntity, type: SnapGeomType) {
    this.from = from;
    this.type = type;
  }

  public getID(): string {
    return `${this.from.tag}:${this.type.toString()}:${this.userID}`;
  }

  public get userID(): string {
    return this._userID;
  }

  public set userID(value: string) {
    this._userID = value;
  }

  public setupRelationShip(geometries: SnapGeometry[]): void {
    this.relatedGeometries = geometries;
  }
}

export class PointSnapGeometry extends SnapGeometry {
  public geo: Vector2;

  constructor(geo: Vector2, from: GeometryEntity, type: SnapGeomType) {
    super(from, type);
    this.geo = geo;
  }

  public getRelatedLineGeometry(): LineSnapGeometry[] {
    const result: LineSnapGeometry[] = [];
    if (!this.relatedGeometries) return result;

    for (const relatedGeom of this.relatedGeometries) {
      if (relatedGeom instanceof LineSnapGeometry) {
        if (relatedGeom.type !== SnapGeomType.CenterLine) {
          const startPt = relatedGeom.geo.getStartPt();
          const endPt = relatedGeom.geo.getEndPt();
          if (startPt.equals(this.geo) || endPt.equals(this.geo)) {
            result.push(relatedGeom);
          }
        }
      }
    }
    return result;
  }
}

export class LineSnapGeometry extends SnapGeometry {
  public geo: Line2d;

  constructor(geo: Line2d, from: GeometryEntity, type: SnapGeomType) {
    super(from, type);
    this.geo = geo;
  }
}

export class CircleSnapGeometry extends SnapGeometry {
  public geo: Circle2d;

  constructor(geo: Circle2d, from: GeometryEntity, type: SnapGeomType) {
    super(from, type);
    this.geo = geo;
  }
}

export class ArcSnapGeometry extends SnapGeometry {
  public geo: Arc2d;

  constructor(geo: Arc2d, from: GeometryEntity, type: SnapGeomType) {
    super(from, type);
    this.geo = geo;
  }
}

export class SnapGeomHelper {
  private static _instance?: SnapGeomHelper;

  public static getInstance(): SnapGeomHelper {
    if (!this._instance) {
      this._instance = new SnapGeomHelper();
    }
    return this._instance;
  }

  public extract(floorData: FloorData, options: ExtractOptions = { includeRoomCurves: false }): SnapGeometry[] {
    let geometries: SnapGeometry[] = [];

    for (const wall of floorData.walls) {
      geometries = geometries.concat(this.extractFromWall(wall));
    }

    for (const structure of floorData.structures) {
      geometries = geometries.concat(this.extractFromStructure(structure));
    }

    for (const beam of floorData.beams) {
      geometries = geometries.concat(this.extractFromBeam(beam));
    }

    for (const hole of floorData.holes) {
      geometries = geometries.concat(this.extractFromHole(hole));
    }

    if (floorData.room) {
      geometries = geometries.concat(this.extractFromRoom(floorData.room, options));
    }

    return geometries;
  }

  public extractFromWall(wall: GeometryEntity): SnapGeometry[] {
    const geometries: SnapGeometry[] = [];

    if (wall.geometry) {
      for (const point of wall.geometry) {
        geometries.push(new PointSnapGeometry(point, wall, SnapGeomType.CornerPoint));
      }
    }

    const midPt = wall.curve!.getMidPt();
    geometries.push(new PointSnapGeometry(midPt, wall, SnapGeomType.CenterPoint));

    if (wall.faceList) {
      for (const face of wall.faceList) {
        const polygon = face.getOuterLoopPolygon();
        if (!polygon || polygon.length === 0) continue;
        if (polygon.every(p => p.z === polygon[0].z)) continue;

        const curve = face.faceInfo?.curve;
        if (!curve) continue;

        if (curve instanceof Line2d) {
          geometries.push(new LineSnapGeometry(curve, wall, SnapGeomType.LineEdge));
        } else if (curve instanceof Arc2d) {
          geometries.push(new ArcSnapGeometry(curve, wall, SnapGeomType.ArcEdge));
        } else {
          console.assert(false, 'extractFromWall: unknown curve type!');
        }
      }
    }

    if (wall.isArcWall()) {
      const center = new Vector2(wall.center!);
      const radius = wall.radius!;
      const distanceToCenter = midPt.clone().distanceTo(center) - radius;
      const offsetVector = midPt.clone().subtract(center).normalize().multiply(distanceToCenter);
      const innerPt = midPt.clone().subtract(offsetVector);
      const outerPt = midPt.clone().add(offsetVector);

      geometries.push(new ArcSnapGeometry(wall.curve as Arc2d, wall, SnapGeomType.ArcEdge));
      geometries.push(new LineSnapGeometry(new Line2d(innerPt, outerPt), wall, SnapGeomType.CenterLine));
    } else {
      const wallWidth = wall.width!;
      const perpendicular = wall.curve!.getDirection().clone().vecRotate(CONST.PI_2).normalize().multiply(wallWidth / 2);
      const leftPt = midPt.clone().subtract(perpendicular);
      const rightPt = midPt.clone().add(perpendicular);

      geometries.push(new LineSnapGeometry(wall.curve as Line2d, wall, SnapGeomType.LineEdge));
      geometries.push(new LineSnapGeometry(new Line2d(leftPt, rightPt), wall, SnapGeomType.CenterLine));
    }

    for (const geom of geometries) {
      geom.setupRelationShip(geometries);
    }

    return geometries;
  }

  public extractFromStructure(structure: GeometryEntity): SnapGeometry[] {
    if (
      structure instanceof HSCore.Model.NCustomizedSquareColumn ||
      structure instanceof HSCore.Model.NCustomizedFlue ||
      structure instanceof HSCore.Model.NCustomizedRiser
    ) {
      return this.extractFromSquareStructure(structure);
    } else if (
      structure instanceof HSCore.Model.NCustomizedCircleColumn ||
      structure instanceof HSCore.Model.NCustomizedOutlet
    ) {
      return this.extractFromCircleStructure(structure);
    }
    return [];
  }

  public extractFromBeam(beam: GeometryEntity): SnapGeometry[] {
    const geometries: SnapGeometry[] = [];
    const beamGeometry = beam.geometry;
    if (!beamGeometry) return geometries;

    for (const point of beamGeometry) {
      const pointGeom = new PointSnapGeometry(point, beam, SnapGeomType.CornerPoint);
      if ((point as any).userData?.ptid) {
        pointGeom.userID = (point as any).userData.ptid;
      }
      geometries.push(pointGeom);
    }

    const centerPt = new PointSnapGeometry(beam.middle!, beam, SnapGeomType.CenterPoint);
    centerPt.userID = 'midPt';
    geometries.push(centerPt);

    if (beam.profile) {
      for (const profileCurve of beam.profile) {
        const lineGeom = new LineSnapGeometry(profileCurve as Line2d, beam, SnapGeomType.LineEdge);
        if ((profileCurve as any).userData?.curveid) {
          lineGeom.userID = (profileCurve as any).userData.curveid;
        }
        geometries.push(lineGeom);
      }
    }

    const centerLine1 = new LineSnapGeometry(beam.positionCurve!, beam, SnapGeomType.CenterLine);
    centerLine1.userID = 'midL1';
    geometries.push(centerLine1);

    const middle = new Vector2(beam.middle!);
    const perpendicular = beam.positionCurve!.getDirection().clone().vecRotate(CONST.PI_2).normalize().multiply(beam.YSize! / 2);
    const pt1 = middle.clone().subtract(perpendicular);
    const pt2 = middle.clone().add(perpendicular);
    const centerLine2 = new LineSnapGeometry(new Line2d(pt1, pt2), beam, SnapGeomType.CenterLine);
    centerLine2.userID = 'midL2';
    geometries.push(centerLine2);

    for (const geom of geometries) {
      geom.setupRelationShip(geometries);
    }

    return geometries;
  }

  public extractFromSquareStructure(structure: GeometryEntity): SnapGeometry[] {
    const geometries: SnapGeometry[] = [];
    const structureGeometry = structure.geometry;
    if (!structureGeometry) return geometries;

    for (const point of structureGeometry) {
      const pointGeom = new PointSnapGeometry(point, structure, SnapGeomType.CornerPoint);
      if ((point as any).userData?.ptid) {
        pointGeom.userID = (point as any).userData.ptid;
      }
      geometries.push(pointGeom);
    }

    const centerPt = new PointSnapGeometry(structure.middle!, structure, SnapGeomType.CenterPoint);
    centerPt.userID = 'midPt';
    geometries.push(centerPt);

    if (structure.profile) {
      for (const profileCurve of structure.profile) {
        const lineGeom = new LineSnapGeometry(profileCurve as Line2d, structure, SnapGeomType.LineEdge);
        if ((profileCurve as any).userData?.curveid) {
          lineGeom.userID = (profileCurve as any).userData.curveid;
        }
        geometries.push(lineGeom);
      }
    }

    const centerLine1 = new LineSnapGeometry(structure.positionCurve!, structure, SnapGeomType.CenterLine);
    centerLine1.userID = 'midL1';
    geometries.push(centerLine1);

    const middle = new Vector2(structure.middle!);
    const perpendicular = structure.positionCurve!.getDirection().clone().vecRotate(CONST.PI_2).normalize().multiply(structure.YSize! / 2);
    const pt1 = middle.clone().subtract(perpendicular);
    const pt2 = middle.clone().add(perpendicular);
    const centerLine2 = new LineSnapGeometry(new Line2d(pt1, pt2), structure, SnapGeomType.CenterLine);
    centerLine2.userID = 'midL2';
    geometries.push(centerLine2);

    for (const geom of geometries) {
      geom.setupRelationShip(geometries);
    }

    return geometries;
  }

  public extractFromCircleStructure(structure: GeometryEntity): SnapGeometry[] {
    const geometries: SnapGeometry[] = [];

    geometries.push(new PointSnapGeometry(structure.middle!, structure, SnapGeomType.CenterPoint));
    geometries.push(new CircleSnapGeometry(structure.profile![0] as Circle2d, structure, SnapGeomType.CircleEdge));
    geometries.push(new LineSnapGeometry(structure.positionCurve!, structure, SnapGeomType.CenterLine));

    const middle = new Vector2(structure.middle!);
    const perpendicular = structure.positionCurve!.getDirection().clone().vecRotate(CONST.PI_2).normalize().multiply(structure.YSize! / 2);
    const pt1 = middle.clone().subtract(perpendicular);
    const pt2 = middle.clone().subtract(perpendicular);
    geometries.push(new LineSnapGeometry(new Line2d(pt1, pt2), structure, SnapGeomType.CenterLine));

    for (const geom of geometries) {
      geom.setupRelationShip(geometries);
    }

    return geometries;
  }

  public extractFromHole(hole: GeometryEntity): SnapGeometry[] {
    const geometries: SnapGeometry[] = [];
    let sumX = 0;
    let sumY = 0;

    const openingHelper = new HSCore.Model.OpeningHelper(hole);
    const lineCurves = openingHelper
      .getRealFrontProfile((hole as any).frontProfile)
      .outer.map((item: any) => item.curve)
      .filter((curve: any) => curve instanceof Line2d);

    const rectangleLines: Line2d[] = [lineCurves[0]];
    for (let i = 1; i < lineCurves.length; ++i) {
      const lastLine = rectangleLines[rectangleLines.length - 1];
      const currentLine = lineCurves[i];
      if (lastLine.getDirection().isPerpendicular(currentLine.getDirection(), 1e-6)) {
        rectangleLines.push(currentLine);
      }
    }
    console.assert(rectangleLines.length === 4, 'snapgeometry: hole rectangle lines calculate failed!');

    const corners: Vector2[] = [];
    for (let i = 0; i < rectangleLines.length; i++) {
      const extendedLine1 = rectangleLines[i].clone().extendDouble(100);
      const extendedLine2 = rectangleLines[i === rectangleLines.length - 1 ? 0 : i + 1].clone().extendDouble(100);
      if (!extendedLine1.isParallelTo(extendedLine2)) {
        const intersection = MathAlg.CalculateIntersect.curve2ds(extendedLine1, extendedLine2)[0].point;
        corners.push(intersection);
      }
    }

    const loop = new Loop(corners);
    const points = loop.getAllPoints();
    if (!points || points.length === 0) return geometries;

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      sumX += point.x;
      sumY += point.y;
      const cornerGeom = new PointSnapGeometry(point, hole, SnapGeomType.CornerPoint);
      cornerGeom.userID = `hole_${i}`;
      geometries.push(cornerGeom);
    }

    const centerPt = new Vector2(sumX / points.length, sumY / points.length);
    const centerGeom = new PointSnapGeometry(centerPt, hole, SnapGeomType.CenterPoint);
    centerGeom.userID = 'midPt';
    geometries.push(centerGeom);

    const curves = loop.getAllCurves();
    for (let i = 0; i < curves.length; ++i) {
      const curve = curves[i];
      const edgeGeom = new LineSnapGeometry(curve, hole, SnapGeomType.LineEdge);
      edgeGeom.userID = `${hole.id}_${i}`;
      geometries.push(edgeGeom);
    }

    for (const geom of geometries) {
      geom.setupRelationShip(geometries);
    }

    return geometries;
  }

  public extractFromRoom(room: GeometryEntity, options: ExtractOptions = { includeRoomCurves: false }): SnapGeometry[] {
    const geometries: SnapGeometry[] = [];
    const splitCurves = room.roomInfos!.length ? room.roomInfos![0].splitCurves : [];

    for (let i = 0; i < splitCurves.length; i++) {
      const curve = splitCurves[i];
      const geom = curve instanceof Line2d
        ? new LineSnapGeometry(curve, room, SnapGeomType.LineEdge)
        : new ArcSnapGeometry(curve, room, SnapGeomType.ArcEdge);
      geom.userID = `${i}`;
      geometries.push(geom);
    }

    if (options.includeRoomCurves) {
      room.wirePath!.outer.forEach((pathItem, index) => {
        if (pathItem instanceof (Line2d as any).constructor.prototype.constructor.prototype.constructor) {
          const line2d = new Line2d(pathItem.getStartPt(), pathItem.getEndPt());
          const lineGeom = new LineSnapGeometry(line2d, room, SnapGeomType.LineEdge);
          lineGeom.userID = `${room.tag}_${index}`;
          geometries.push(lineGeom);
        }
      });
    }

    return geometries;
  }
}