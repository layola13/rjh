import { Coordinate3, EN_GEO_ELEMENT_TYPE } from './Coordinate3';
import { Content_IO, Content } from './Content';
import { Entity } from './Entity';
import { EntityField } from './EntityField';
import { defaultMaterialData } from './defaultMaterialData';
import { loadSegment3D, loadSegment2D, tryFixMultiParentsData } from './geometryUtils';
import { EntityProxyTypeEnum, EntityProxyFactory } from './EntityProxy';

const MATERIAL_COMPONENT_KEY = "material";
const SIDE_MATERIAL_COMPONENT_KEY = "sideMaterial";

interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Segment2D {
  getType(): EN_GEO_ELEMENT_TYPE;
  getStartPt(): Point2D;
  getEndPt(): Point2D;
  discreteBySegmentCount(count: number): Point2D[];
  dump(): unknown;
}

interface Segment3D {
  isLine3d(): boolean;
  isArc3d(): boolean;
  getStartPt(): Point3D;
  getEndPt(): Point3D;
  discreteBySegmentCount(count: number): Point3D[];
  dump(): unknown;
}

interface HoleInfo {
  depth: number;
  side: string;
  paths: Segment3D[];
}

interface HolePathInfo {
  path: Segment2D[];
  from: number;
  to: number;
}

interface HolePathsWithDirection {
  pathsInfo: HolePathInfo[];
  coordinate3: Coordinate3;
}

interface DExtrudingDump {
  points: Point3D[];
  height: number;
  hiddenByConstrain: boolean;
  customizationContentType: string[];
  isFunctionComponent: boolean;
  imodelParentId?: string;
  fixK?: number;
  fixS?: number;
  materialId?: string;
  localId?: string;
  direction?: [number, number, number];
  segmentPaths?: unknown[][];
  holePathsWithDirection?: {
    pathsInfo: Array<{ path: unknown[]; from: number; to: number }>;
    coordinate3: unknown;
  };
  segmentPathsDepth?: Record<string, number>;
  textureType?: string;
  sideTextureType?: string;
  holes?: Array<{ depth: number; side: string; paths: unknown[] }>;
  masterId?: string;
  modelCutPlanes: unknown[];
  material?: string;
}

interface MaterialData {
  // Define material data structure
}

interface Material {
  // Define material interface
}

export class DExtruding_IO extends Content_IO {
  dump(
    entity: DExtruding,
    callback?: (dump: unknown[], entity: DExtruding) => void,
    includeChildren: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown[] {
    const baseDump = super.dump(entity, undefined, includeChildren, options);
    const dumpData = baseDump[0] as DExtrudingDump;

    dumpData.points = entity.points.slice();
    dumpData.height = entity.height;
    dumpData.hiddenByConstrain = entity.hiddenByConstrain;
    dumpData.customizationContentType = entity.customizationContentType;
    dumpData.isFunctionComponent = entity.isFunctionComponent;
    dumpData.imodelParentId = entity.imodelParentId;
    dumpData.fixK = entity.fixK;
    dumpData.fixS = entity.fixS;
    dumpData.materialId = entity.materialId;

    if (entity.__localId) {
      dumpData.localId = entity.__localId;
    }

    if (entity.__direction) {
      dumpData.direction = [entity.__direction.x, entity.__direction.y, entity.__direction.z];
    }

    if (entity.__segmentPaths) {
      dumpData.segmentPaths = entity.__segmentPaths.map(path => 
        path.map(segment => segment.dump())
      );
    }

    if (entity.__holePathsWithDirection) {
      dumpData.holePathsWithDirection = {
        pathsInfo: entity.__holePathsWithDirection.pathsInfo.map(info => ({
          path: info.path.map(segment => segment.dump()),
          from: info.from,
          to: info.to
        })),
        coordinate3: entity.__holePathsWithDirection.coordinate3.dump()
      };
    }

    if (entity.__segmentPathsDepth) {
      dumpData.segmentPathsDepth = entity.__segmentPathsDepth;
    }

    if (entity.__textureType) {
      dumpData.textureType = entity.__textureType;
    }

    if (entity.__sideTextureType) {
      dumpData.sideTextureType = entity.__sideTextureType;
    }

    if (entity.__holes) {
      dumpData.holes = entity.__holes.map(hole => ({
        depth: hole.depth,
        side: hole.side,
        paths: hole.paths.map(path => path.dump())
      }));
    }

    dumpData.masterId = entity.__masterId;
    dumpData.modelCutPlanes = entity.__modelCutPlanes.map(plane => plane.dump());

    if (callback) {
      callback(baseDump, entity);
    }

    return baseDump;
  }

  load(entity: DExtruding, data: DExtrudingDump, context: unknown): void {
    if (!data.seekId) {
      (data as any).seekId = "generated";
    }

    super.load(entity, data, context);

    entity.__points = data.points;
    entity.__height = data.height;
    entity.__hiddenByConstrain = data.hiddenByConstrain;
    entity.__customizationContentType = data.customizationContentType || [];
    entity.__localId = data.localId || "";
    entity.__sideTextureType = data.sideTextureType || "";
    entity.__textureType = data.textureType || "";
    entity.__isFunctionComponent = data.isFunctionComponent;
    entity.__imodelParentId = data.imodelParentId;
    entity.__fixK = data.fixK;
    entity.__fixS = data.fixS;
    entity.__materialId = data.materialId;

    if (typeof data.material === "string") {
      const material = Entity.loadFromDumpById(data.material, context);
      if (material) {
        entity._materialByComponent.set(MATERIAL_COMPONENT_KEY, material);
      }
    }

    entity.__masterId = data.masterId;

    if (data.direction) {
      entity.__direction = new THREE.Vector3(
        data.direction[0],
        data.direction[1],
        data.direction[2]
      ).normalize();
    }

    if (data.segmentPaths) {
      entity.__segmentPaths = data.segmentPaths.map(path =>
        path.map(segment => loadSegment3D(segment))
      );
    }

    if (data.holePathsWithDirection) {
      entity.__holePathsWithDirection = {
        pathsInfo: data.holePathsWithDirection.pathsInfo.map(info => ({
          path: info.path.map(segment => loadSegment2D(segment)),
          from: info.from,
          to: info.to
        })),
        coordinate3: new Coordinate3().load(data.holePathsWithDirection.coordinate3)
      };
    } else {
      entity.__holePathsWithDirection = undefined;
    }

    if (data.segmentPathsDepth) {
      entity.__segmentPathsDepth = data.segmentPathsDepth;
    }

    if (data.holes) {
      entity.__holes = data.holes.map(hole => ({
        depth: hole.depth,
        side: hole.side,
        paths: hole.paths.map(path => loadSegment3D(path))
      }));
    }

    if (data.modelCutPlanes) {
      entity.__modelCutPlanes = data.modelCutPlanes.map(plane =>
        new Coordinate3().load(plane)
      );
    }
  }
}

export class DExtruding extends Content {
  __points: Point3D[] = [];
  __height: number = 0.018;
  __hiddenByConstrain: boolean = false;
  __customizationContentType: string[] = [];
  __isFunctionComponent: boolean = false;
  __imodelParentId?: string;
  __fixK?: number;
  __fixS?: number;
  __materialId?: string;
  __localId: string = "";
  __direction: THREE.Vector3 = new THREE.Vector3(0, 0, 1);
  __segmentPaths: Segment3D[][] = [];
  __segmentPathsDepth: Record<string, number> = {};
  __holes?: HoleInfo[];
  __holePathsWithDirection?: HolePathsWithDirection;
  __masterId?: string;
  __modelCutPlanes: Coordinate3[] = [];
  __textureType?: string;
  __sideTextureType?: string;
  _seekId: string = "local";

  constructor(id: string = "", metadata?: unknown) {
    super(id, metadata);
  }

  get needClip(): boolean {
    return !!(this.modelCutPlanes?.length);
  }

  static create(metadata: any): DExtruding | null {
    if (!metadata || !metadata.contentType) {
      log.error(
        `Content.create: invalid input metadata '${JSON.stringify(metadata)}'.`,
        "HSCore.CreateEntity.Error"
      );
      return null;
    }

    const instance = new DExtruding();
    instance.metadata = metadata;
    return instance;
  }

  getPaths(): Point3D[][] {
    if (this.segmentPaths.length) {
      return this.segmentPaths.map(path => {
        const points: Point3D[] = [];
        const segmentCount = path.length;

        for (let i = 0; i < segmentCount; i++) {
          const discretePoints: Point3D[] = [];

          if (path[i].isLine3d()) {
            discretePoints.push(path[i].getStartPt(), path[i].getEndPt());
          } else if (path[i].isArc3d()) {
            discretePoints.push(...path[i].discreteBySegmentCount(15));
          }

          discretePoints.forEach(point => {
            if (points.length === 0 || !HSCore.Util.Math.isSamePoint3(points[points.length - 1], point)) {
              points.push(point);
            }
          });
        }

        if (points.length > 1 && HSCore.Util.Math.isSamePoint3(points[points.length - 1], points[0])) {
          points.pop();
        }

        return points;
      });
    }

    return this.points;
  }

  getHolePathsWithDirection(): { paths: Array<{ points: Point2D[]; from: number; to: number }>; coordinate3: Coordinate3 } | undefined {
    if (!this.holePathsWithDirection) {
      return undefined;
    }

    return {
      paths: this.holePathsWithDirection.pathsInfo.map(pathInfo => {
        const points: Point2D[] = [];

        pathInfo.path.forEach(segment => {
          if (segment.getType() === EN_GEO_ELEMENT_TYPE.EN_LINE_2D) {
            points.push(segment.getStartPt(), segment.getEndPt());
          } else if (segment.getType() === EN_GEO_ELEMENT_TYPE.EN_ARC_2D) {
            points.push(...segment.discreteBySegmentCount(6));
          }
        });

        if (HSCore.Util.Math.isClockwise(points)) {
          points.reverse();
        }

        return {
          points,
          from: pathInfo.from,
          to: pathInfo.to
        };
      }),
      coordinate3: this.holePathsWithDirection.coordinate3
    };
  }

  getTopPaths(): Point2D[][] {
    return [this._getTopPaths()[0].map(point => ({ x: point.x, y: point.y }))];
  }

  _getTopPaths(): Point2D[][] {
    const paths = this.getPaths();

    if (!this.__direction) {
      return paths as any;
    }

    if (HSCore.Util.Math.isSamePoint3(this.__direction, { x: 0, y: 0, z: 1 })) {
      return [paths[0].map(point => ({ x: point.x + this.x, y: point.y + this.y }))];
    }

    return [
      HSCore.Util.DEntityUtils.BoundUtil.getLocalBoundOutline(this).map(point => ({
        x: point.x + this.x,
        y: point.y + this.y
      }))
    ];
  }

  getGlobalBound3dPoints(): Point3D[] {
    return HSCore.Util.DEntityUtils.BoundUtil.getGlobalBound3dPoints(this);
  }

  getGlobalBoundingBox3d(): unknown {
    return HSCore.Util.DEntityUtils.BoundUtil.getGlobalBoundingBox3d(this);
  }

  getBoundingBox3d(): unknown {
    return HSCore.Util.DEntityUtils.BoundUtil.getBoundingBox3d(this);
  }

  getBound3dPoints(): Point3D[] {
    return HSCore.Util.DEntityUtils.BoundUtil.getBound3dPoints(this);
  }

  getLocalBound3dPoints(): Point3D[] {
    return HSCore.Util.DEntityUtils.BoundUtil.getLocalBound3dPoints(this);
  }

  getLocalBoundBox3d(): unknown {
    return HSCore.Util.DEntityUtils.BoundUtil.getLocalBoundBox3d(this);
  }

  get material(): Material {
    let material = this._materialByComponent.get(MATERIAL_COMPONENT_KEY);

    if (!material) {
      material = HSCore.Material.Material.create(defaultMaterialData);
      this._materialByComponent.set(MATERIAL_COMPONENT_KEY, material);
    }

    return material;
  }

  set material(value: Material) {
    super.setMaterial(MATERIAL_COMPONENT_KEY, value);
  }

  get sideMaterial(): Material | undefined {
    return this._materialByComponent.get(SIDE_MATERIAL_COMPONENT_KEY);
  }

  set sideMaterial(value: Material) {
    super.setMaterial(SIDE_MATERIAL_COMPONENT_KEY, value);
  }

  setMaterial(componentOrMaterial: string | Material, material?: Material): void {
    if (typeof componentOrMaterial === "string") {
      if (componentOrMaterial) {
        super.setMaterial(componentOrMaterial, material!);
      } else {
        this.material = material!;
      }
    } else {
      this.material = componentOrMaterial;
    }
  }

  setDirection(direction: Point3D): void {
    this.__direction = new THREE.Vector3(direction.x, direction.y, direction.z).normalize();
    this._invalidateSubgraph();
  }

  dirtyRecursive(): void {
    this.dirtyGeometry();
  }

  onAddedToParent(parent: unknown): void {
    super.onAddedToParent(parent);

    if (Object.keys(this.parents).length > 1) {
      this.logger.error("[DModel-Parent]DExtruding multi parents detected.");
    }
  }

  isContentInLoop(loop: unknown, recursive: boolean = false): boolean {
    const parent = Object.values(this._parents).find(
      p => !(p instanceof HSCore.Model.Layer)
    );

    if (parent) {
      return parent.isContentInLoop(loop, recursive);
    }

    return super.isContentInLoop(loop, recursive);
  }

  isContentInRoom(room: unknown): boolean {
    const parent = Object.values(this._parents).find(
      p => !(p instanceof HSCore.Model.Layer)
    );

    if (parent) {
      return parent.isContentInRoom(room);
    }

    return super.isContentInRoom(room);
  }

  getIO(): DExtruding_IO {
    return DExtruding_IO.instance();
  }

  canTransactField(): boolean {
    return false;
  }

  getUniqueParent(): unknown {
    return super.getUniqueParent() || (tryFixMultiParentsData(this) ? super.getUniqueParent() : undefined);
  }

  getProxyId(): EntityProxyTypeEnum | undefined {
    return EntityProxyTypeEnum.CustomizationProduct;
  }

  getProxyObject(): unknown {
    const proxyId = this.getProxyId();
    if (proxyId) {
      return EntityProxyFactory.getProxyObject(proxyId);
    }
  }

  @EntityField()
  points!: Point3D[];

  @EntityField()
  height!: number;

  @EntityField()
  hiddenByConstrain!: boolean;

  @EntityField()
  customizationContentType!: string[];

  @EntityField()
  isFunctionComponent!: boolean;

  @EntityField()
  imodelParentId?: string;

  @EntityField()
  fixK?: number;

  @EntityField()
  fixS?: number;

  @EntityField()
  materialId?: string;

  @EntityField()
  localId!: string;

  @EntityField()
  direction!: THREE.Vector3;

  @EntityField()
  masterId?: string;

  @EntityField()
  segmentPaths!: Segment3D[][];

  @EntityField()
  segmentPathsDepth!: Record<string, number>;

  @EntityField()
  holes?: HoleInfo[];

  @EntityField()
  holePathsWithDirection?: HolePathsWithDirection;

  @EntityField()
  modelCutPlanes!: Coordinate3[];

  @EntityField()
  textureType?: string;

  @EntityField()
  sideTextureType?: string;
}

Entity.registerClass(HSConstants.ModelClass.DExtruding, DExtruding);