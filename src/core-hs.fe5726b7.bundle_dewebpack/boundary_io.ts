import { Entity, Entity_IO } from './Entity';
import { MaterialData } from './MaterialData';
import { clonePoint2ds } from './GeometryUtil';
import { BoundaryUtil } from './BoundaryUtil';
import { EntityField } from './EntityField';
import { Logger } from './Logger';

interface DumpOptions {
  version?: string;
  [key: string]: unknown;
}

interface BoundaryDump {
  cornerType: string;
  boundaryType: string;
  width: number;
  wallPolygons: string[];
  wallCorners: string[];
  seekId: string;
  isBoundaryBrick: boolean;
  boundaryMaterial?: string;
  cornerMaterial?: string;
}

interface BoundaryPoints {
  wallPolygons: WallPolygon[];
  wallCorners: WallCorner[];
}

interface Point2D {
  x: number;
  y: number;
}

interface TransformMatrix {
  m00_: number;
  m01_: number;
  m02_: number;
  m10_: number;
  m11_: number;
  m12_: number;
}

interface SeamArgs {
  material?: { color: number } | MaterialData;
  width?: number;
}

interface WallPolygon extends Entity {
  id: string;
  points: Point2D[];
  pattern?: Pattern;
  material: MaterialData;
  setPattern(pattern: Pattern): void;
  dirtyMaterial(): void;
}

interface WallCorner extends Entity {
  id: string;
  points: Point2D[];
  pattern?: Pattern;
  material: MaterialData;
  setPattern(pattern: Pattern): void;
  dirtyMaterial(): void;
}

interface Pattern {
  seamColor: number;
  seamWidth: number;
  seamMaterial: MaterialData;
  setSeamArgs(args: SeamArgs): void;
  clone(): Pattern;
}

interface Room extends Entity {
  boundaries: Boundary[];
  getInnerBoundaryPointsIndex(index: number): Point2D[];
}

export class Boundary_IO extends Entity_IO {
  private static _Boundary_IO_Instance: Boundary_IO;

  static instance(): Boundary_IO {
    if (!Boundary_IO._Boundary_IO_Instance) {
      Boundary_IO._Boundary_IO_Instance = new Boundary_IO();
    }
    return Boundary_IO._Boundary_IO_Instance;
  }

  dump(
    entity: Boundary,
    callback?: (dump: unknown[], entity: Boundary) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const dump = super.dump(entity, undefined, includeChildren, options);
    const boundaryDump = dump[0] as BoundaryDump;

    boundaryDump.cornerType = entity.cornerType;
    boundaryDump.boundaryType = entity.boundaryType;
    boundaryDump.width = entity.width;
    boundaryDump.wallPolygons = entity.wallPolygons.map(polygon => polygon.id);
    boundaryDump.wallCorners = entity.wallCorners.map(corner => corner.id);
    boundaryDump.seekId = entity.seekId;
    boundaryDump.isBoundaryBrick = entity.isBoundaryBrick;

    if (entity.boundaryMaterial) {
      boundaryDump.boundaryMaterial = entity.boundaryMaterial.id;
      MaterialData.dumpMaterialData(entity.boundaryMaterial, options);
    }

    if (entity.cornerMaterial) {
      boundaryDump.cornerMaterial = entity.cornerMaterial.id;
      MaterialData.dumpMaterialData(entity.cornerMaterial, options);
    }

    if (callback) {
      callback(dump, entity);
    }

    return dump;
  }

  load(entity: Boundary, dump: BoundaryDump, options: DumpOptions = {}): void {
    super.load(entity, dump, options);

    entity.cornerType = dump.cornerType;
    entity.boundaryType = dump.boundaryType;
    entity.__width = dump.width;

    const wallPolygons: WallPolygon[] = [];
    dump.wallPolygons.forEach(polygonId => {
      const polygon = Entity.loadFromDumpById(polygonId, options) as WallPolygon | null;
      if (polygon) {
        wallPolygons.push(polygon);
      }
    });
    entity.wallPolygons = wallPolygons;

    const wallCorners: WallCorner[] = [];
    dump.wallCorners.forEach(cornerId => {
      const corner = Entity.loadFromDumpById(cornerId, options) as WallCorner | null;
      if (corner) {
        wallCorners.push(corner);
      }
    });
    entity.wallCorners = wallCorners;

    entity.seekId = dump.seekId;
    entity.isBoundaryBrick = dump.isBoundaryBrick;

    Logger.console.assert(
      !!dump.boundaryMaterial && !!dump.cornerMaterial,
      `${entity.tag} materials not saved properly`
    );

    if (HSCore.Util.Version.isEarlierThan(options.version, "0.14")) {
      const boundaryMaterialData = new MaterialData();
      if (dump.boundaryMaterial) {
        const materialDump = dump.boundaryMaterial as any;
        if (materialDump.useColor) {
          materialDump.colorMode = HSCore.Material.ColorModeEnum.color;
          materialDump.useColor = undefined;
        }
        boundaryMaterialData.setMaterialData(materialDump);
      }
      entity.boundaryMaterial = boundaryMaterialData;

      const cornerMaterialData = new MaterialData();
      if (dump.cornerMaterial) {
        const materialDump = dump.cornerMaterial as any;
        if (materialDump.useColor) {
          materialDump.colorMode = HSCore.Material.ColorModeEnum.color;
          materialDump.useColor = undefined;
        }
        cornerMaterialData.setMaterialData(materialDump);
      }
      entity.cornerMaterial = cornerMaterialData;
    } else {
      if (dump.boundaryMaterial) {
        entity.boundaryMaterial = MaterialData.loadFromDumpById(dump.boundaryMaterial, options);
      }
      if (dump.cornerMaterial) {
        entity.cornerMaterial = MaterialData.loadFromDumpById(dump.cornerMaterial, options);
      }
    }
  }
}

export class Boundary extends Entity {
  static readonly CornerTileTypeEnum = {
    NoCornerTile: "noCornerTile",
    CornerTile1: "cornerTile1",
    CornerTile2: "cornerTile2"
  } as const;

  static readonly BoundaryTypeEnum = {
    NonBoundaryTile: "nonBoundaryTile",
    BoundaryTile: "boundaryTile"
  } as const;

  seekId: string = "";
  
  @EntityField({ defaultValue: "" })
  boundaryType!: string;

  @EntityField({ defaultValue: "" })
  cornerType!: string;

  private __wallPolygons: WallPolygon[] = [];

  @EntityField({
    get(this: Boundary): WallPolygon[] {
      return this.__wallPolygons.slice();
    },
    partialSet(this: Boundary, value: WallPolygon[]): void {
      this._setWallPolygons(value);
    }
  })
  wallPolygons: WallPolygon[] = [];

  private __wallCorners: WallCorner[] = [];

  @EntityField({
    get(this: Boundary): WallCorner[] {
      return this.__wallCorners.slice();
    },
    partialSet(this: Boundary, value: WallCorner[]): void {
      this._setWallCorners(value);
    }
  })
  wallCorners: WallCorner[] = [];

  private __boundaryMaterial?: MaterialData;

  @EntityField({
    partialSet(this: Boundary, value: MaterialData): void {
      if (value) {
        this.__boundaryMaterial = value.clone();
      }
    },
    equals(this: Boundary, value: MaterialData): boolean {
      return !!this.__boundaryMaterial && this.__boundaryMaterial.equals(value);
    }
  })
  boundaryMaterial?: MaterialData;

  private __cornerMaterial?: MaterialData;

  @EntityField({
    partialSet(this: Boundary, value: MaterialData): void {
      if (value) {
        this.__cornerMaterial = value.clone();
      }
    },
    equals(this: Boundary, value: MaterialData): boolean {
      return !!this.__cornerMaterial && this.__cornerMaterial.equals(value);
    }
  })
  cornerMaterial?: MaterialData;

  __width: number = 0;

  @EntityField()
  width: number = 0;

  private __wallPattern?: Pattern;

  @EntityField({
    get(this: Boundary): Pattern | undefined {
      let pattern: Pattern | undefined;
      if (this.__wallPattern) {
        pattern = this.__wallPattern;
      } else if (this.wallPolygons.length > 0) {
        pattern = this.wallPolygons[0].pattern;
      }
      if (!pattern) {
        Logger.console.assert(false, "Boundary data too old，delete and recreate please");
      }
      return pattern;
    },
    partialSet(this: Boundary, value: Pattern): void {
      this.__wallPattern = value;
    }
  })
  wallPattern?: Pattern;

  private __cornerPattern?: Pattern;

  @EntityField({
    get(this: Boundary): Pattern | undefined {
      if (this.__cornerPattern) {
        return this.__cornerPattern;
      } else if (this.__wallCorners.length > 0) {
        return this.__wallCorners[0].pattern;
      }
      return undefined;
    },
    partialSet(this: Boundary, value: Pattern): void {
      this.__cornerPattern = value;
    }
  })
  cornerPattern?: Pattern;

  @EntityField()
  isBoundaryBrick!: boolean;

  @EntityField()
  _suitableBoundaryWidth?: number;

  needUpdate: boolean = true;

  constructor(tag: string = "", parent?: Entity) {
    super(tag, parent);
  }

  static create(
    cornerType: string,
    boundaryType: string,
    width: number,
    boundaryMaterial: MaterialData,
    cornerMaterial: MaterialData,
    seekId: string,
    isBoundaryBrick: boolean,
    wallPattern?: Pattern,
    cornerPattern?: Pattern
  ): Boundary {
    const boundary = new Boundary();
    boundary.cornerType = cornerType;
    boundary.boundaryType = boundaryType;
    boundary.width = width;
    boundary.boundaryMaterial = boundaryMaterial;
    boundary.cornerMaterial = cornerMaterial;
    boundary.seekId = seekId;
    boundary.isBoundaryBrick = isBoundaryBrick;
    boundary.wallPattern = wallPattern;
    boundary.cornerPattern = cornerPattern;
    boundary.setSeamArgs({
      material: { color: 0xFFFFFF },
      width: 0.002
    });
    return boundary;
  }

  getIO(): Boundary_IO {
    return Boundary_IO.instance();
  }

  set seamColor(color: number) {
    Logger.console.assert(false, "过时的seamColor API");
    this.setSeamArgs({
      material: this.seamMaterial.clone({ color })
    });
  }

  get seamColor(): number {
    return this.wallPattern ? this.wallPattern.seamColor : 0xFFFFFF;
  }

  set seamWidth(width: number) {
    Logger.console.assert(false, "过时的seamWidth API");
    this.setSeamArgs({ width });
  }

  get seamWidth(): number {
    return this.wallPattern ? this.wallPattern.seamWidth : 0.002;
  }

  get seamMaterial(): MaterialData {
    return this.wallPattern ? this.wallPattern.seamMaterial : new MaterialData();
  }

  setSeamArgs(args: SeamArgs): void {
    this.wallPattern?.setSeamArgs(args);
    this.cornerPattern?.setSeamArgs(args);
  }

  private _setWallPolygons(polygons: WallPolygon[]): void {
    this.replaceChildren(this.__wallPolygons, polygons);
    this.__wallPolygons = polygons.slice();
  }

  private _setWallCorners(corners: WallCorner[]): void {
    this.replaceChildren(this.__wallCorners, corners);
    this.__wallCorners = corners.slice();
  }

  isNoBoundaryTile(): boolean {
    return this.boundaryType !== Boundary.BoundaryTypeEnum.NonBoundaryTile;
  }

  transform(matrix: TransformMatrix): void {
    this.getPoints().forEach(point => {
      const newX = matrix.m00_ * point.x + matrix.m01_ * point.y + matrix.m02_;
      const newY = matrix.m10_ * point.x + matrix.m11_ * point.y + matrix.m12_;
      point.x = newX;
      point.y = newY;
    });
  }

  getPoints(): Point2D[] {
    const points: Point2D[] = [];

    for (let i = 0; i < this.wallPolygons.length; i++) {
      this.wallPolygons[i].points.forEach(point => {
        if (!points.includes(point)) {
          points.push(point);
        }
      });
    }

    for (let i = 0; i < this.wallCorners.length; i++) {
      this.wallCorners[i].points.forEach(point => {
        if (!points.includes(point)) {
          points.push(point);
        }
      });
    }

    return points;
  }

  get boundaryBlockPatterns(): Pattern[] {
    const patterns: Pattern[] = [];

    this.wallPolygons.forEach(polygon => {
      if (polygon.pattern) {
        patterns.push(polygon.pattern);
      }
    });

    this.wallCorners.forEach(corner => {
      if (corner.pattern) {
        patterns.push(corner.pattern);
      }
    });

    return patterns;
  }

  getWallPolygonsMaterial(): MaterialData | undefined {
    if (this.wallPolygons && this.wallPolygons.length > 0) {
      return this.wallPolygons[0].material;
    }
    return this.boundaryMaterial;
  }

  getWallCornersMaterial(): MaterialData | undefined {
    if (this.wallCorners && this.wallCorners.length > 0) {
      return this.wallCorners[0].material;
    }
    return this.cornerMaterial;
  }

  private _calculateBoundaryPoints(room: Room): BoundaryPoints {
    let result: BoundaryPoints = {
      wallPolygons: [],
      wallCorners: []
    };

    const boundaryWidth = this.width;
    let boundaryIndex = room.boundaries.indexOf(this);
    if (boundaryIndex < 0) {
      boundaryIndex = room.boundaries.length;
    }

    const innerPoints = room.getInnerBoundaryPointsIndex(boundaryIndex);
    let offsetPolygons = HSCore.Util.Collision.OffsetPolygon([innerPoints], -boundaryWidth, {
      miterLimit: 0.02,
      arcTolerance: 0.01
    });

    if (offsetPolygons.length === 0 || innerPoints.length !== offsetPolygons[0].length) {
      return result;
    }

    const suitableWidth = 1000 * boundaryWidth;
    this._suitableBoundaryWidth = this._suitableBoundaryWidth && this._suitableBoundaryWidth > suitableWidth
      ? this._suitableBoundaryWidth
      : suitableWidth;

    const cornerIndices: number[] = [];
    const clonedInnerPoints = clonePoint2ds(innerPoints);
    const outerPoints = BoundaryUtil.getPolygonOffsetPoints(clonedInnerPoints, boundaryWidth, cornerIndices);

    if (!outerPoints) {
      return result;
    }

    const boundaryPoints = clonePoint2ds(innerPoints);
    const boundaryMaterial = this.__boundaryMaterial;
    const cornerMaterial = this.__cornerMaterial;

    switch (this.cornerType) {
      case Boundary.CornerTileTypeEnum.NoCornerTile:
        result = BoundaryUtil.createShapeWithoutCornerTile(
          boundaryPoints,
          outerPoints,
          this.wallPolygons,
          boundaryMaterial
        );
        break;

      case Boundary.CornerTileTypeEnum.CornerTile1:
        result = BoundaryUtil.createShapeWithCornerTile1(
          boundaryPoints,
          outerPoints,
          cornerIndices,
          this.wallPolygons,
          this.wallCorners,
          boundaryMaterial,
          cornerMaterial
        );
        break;

      case Boundary.CornerTileTypeEnum.CornerTile2:
        result = BoundaryUtil.createShapeWithCornerTile2(
          boundaryPoints,
          outerPoints,
          cornerIndices,
          this.wallPolygons,
          boundaryMaterial
        );
        break;
    }

    return result;
  }

  update(room?: Room, forceUpdate: boolean = false): void {
    if (!this.needUpdate && !forceUpdate) {
      return;
    }

    this.needUpdate = false;

    if (!room) {
      room = this.parent as Room;
    }

    const boundaryPoints = this._calculateBoundaryPoints(room);

    this.wallPolygons = boundaryPoints.wallPolygons;
    if (this.wallPattern) {
      this.wallPolygons.forEach(polygon => {
        const pattern = this.wallPattern!.clone();
        polygon.setPattern(pattern);
        polygon.dirtyMaterial();
      });
    }

    this.wallCorners = boundaryPoints.wallCorners;
    if (this.cornerPattern) {
      this.wallCorners.forEach(corner => {
        const pattern = this.cornerPattern!.clone();
        corner.setPattern(pattern);
        corner.dirtyMaterial();
      });
    }
  }

  isValid(): boolean {
    return this.wallPolygons.length > 0;
  }
}

Entity.registerClass(HSConstants.ModelClass.Boundary, Boundary);