/**
 * Decorator class for serializing and deserializing parametric opening entities (doors, windows)
 * Handles conversion between entity objects and their serialized dump format
 */
export class ParametricOpeningDecorator {
  private readonly _entity: ParametricOpening | ParametricDoor;

  constructor(entity: ParametricOpening | ParametricDoor) {
    this._entity = entity;
  }

  /**
   * Serializes the parametric opening entity to a dump object
   * @returns Serialized representation of the entity
   */
  dump(): ParametricOpeningDump {
    const entity = this._entity;
    const bottomFace = entity.getBottomFaces()[0];
    const isDoor = entity instanceof ParametricDoor;

    const dump: ParametricOpeningDump = {
      seekId: entity.seekId,
      storeProperty: entity.storeProperty,
      children: this.getChildren(entity),
      openingType: HSConstants.Constants.ParametricOpeningType,
      metaInfoDump: this.dumpMetaInfo(entity.metaInfo)
    };

    if (bottomFace) {
      dump.doorStone = {
        enable: isDoor && entity.isDoorStoneMaterialEnabled(),
        materialSeekId: isDoor ? bottomFace.material?.seekId : undefined,
        mixPave: isDoor ? bottomFace.material?.mixpaint?.mixPave?.dump() : undefined
      };
    }

    return dump;
  }

  /**
   * Serializes meta information including dependencies and subparts
   * @param metaInfo - Meta information object to serialize
   * @returns Serialized meta information
   */
  private dumpMetaInfo(metaInfo?: MetaInfo): MetaInfoDump {
    const dump: MetaInfoDump = {
      dependentMetaDateIds: [],
      subpartMetaDateIds: [],
      subpartInfos: []
    };

    metaInfo?.dependentMetaDates?.forEach((metaDate) => {
      if (metaDate) {
        dump.dependentMetaDateIds.push(metaDate.seekId);
      }
    });

    metaInfo?.subpartMetaDates?.forEach((metaDate) => {
      dump.subpartMetaDateIds.push(metaDate.seekId);
    });

    metaInfo?.subpartInfos?.forEach((subpartInfo, key) => {
      dump.subpartInfos?.push([key, this.dumpMetaInfo(subpartInfo)]);
    });

    return dump;
  }

  /**
   * Recursively extracts child opening information
   * @param entity - Parent entity to extract children from
   * @returns Array of serialized child openings
   */
  private getChildren(entity: ParametricOpening): ChildOpeningDump[] {
    const children: ChildOpeningDump[] = [];

    Object.values(entity.children).forEach((child) => {
      if (child instanceof ParametricOpening) {
        children.push({
          eid: child.eId,
          seekid: child.seekId,
          storeProperty: child.storeProperty,
          children: this.getChildren(child),
          metaInfoDump: this.dumpMetaInfo(child.metaInfo)
        });
      }
    });

    return children;
  }

  /**
   * Creates a parametric opening entity from metadata
   * @param metadata - Building product metadata
   * @param face - Optional face to attach the opening to
   * @param wallEdge - Wall edge information
   * @returns Created parametric opening entity or undefined
   */
  static create(
    metadata: BuildingProductMeta,
    face?: Face,
    wallEdge?: WallEdge
  ): ParametricOpening | ParametricDoor | undefined {
    if (!metadata) return undefined;

    const EntityClass = HSCore.Util.Content.isParametricDoor(metadata)
      ? Entity.getClass(HSConstants.ModelClass.ParametricDoor)
      : Entity.getClass(HSConstants.ModelClass.ParametricOpening);

    if (!EntityClass) return undefined;

    const entity = new EntityClass();
    entity.initByMeta(metadata);

    if (face && face instanceof Face && !(face instanceof Floor || face instanceof Ceiling)) {
      const curve = face.faceInfo.curve;
      if (curve) {
        const startPoint = curve.getStartPt();
        const endPoint = curve.getEndPt();
        const angle = -getAngleHorizontaleCCW(startPoint, endPoint);
        entity.ZRotation = this.normalizeAngle(angle);
      }
    }

    if (!wallEdge) return entity;

    const edgeConfig: EdgeConfig = {
      width: wallEdge.width,
      length: wallEdge.length,
      wall: wallEdge
    };

    if (wallEdge.jointCurve instanceof Arc2d) {
      edgeConfig.chordHeight = this.getArcWallChordHeight(wallEdge);
      edgeConfig.length = wallEdge.jointCurve.getStartPt().distanceTo(wallEdge.jointCurve.getEndPt());
    }

    entity.setEdgeList([edgeConfig]);
    return entity;
  }

  /**
   * Normalizes angle to range [-180, 180]
   * @param angle - Angle in degrees
   * @returns Normalized angle
   */
  private static normalizeAngle(angle: number): number {
    angle %= 360;
    if (angle > 180) {
      angle -= 360;
    } else if (angle < -180) {
      angle += 360;
    }
    return angle;
  }

  /**
   * Calculates chord height for arc wall
   * @param wallEdge - Wall edge with arc curve
   * @returns Chord height value
   */
  static getArcWallChordHeight(wallEdge: WallEdge): number {
    const jointCurve = wallEdge.jointCurve as Arc2d;
    const chordLine = new Line2d(jointCurve.getStartPt(), jointCurve.getEndPt());
    const midPoint = jointCurve.getMidPt();

    if (wallEdge.roomInfos.length > 0) {
      const hasLeftRoomFaces = Object.values(wallEdge.leftFaces).some(
        (face) => face.roomInfos.length > 0
      );
      const hasRightRoomFaces = Object.values(wallEdge.rightFaces).some(
        (face) => face.roomInfos.length > 0
      );

      if (hasLeftRoomFaces && !hasRightRoomFaces) {
        return jointCurve.isCCW()
          ? MathAlg.Distance.pointToCurve2d(midPoint, chordLine)
          : -MathAlg.Distance.pointToCurve2d(midPoint, chordLine);
      }

      if (!hasLeftRoomFaces && hasRightRoomFaces) {
        return jointCurve.isCCW()
          ? -MathAlg.Distance.pointToCurve2d(midPoint, chordLine)
          : MathAlg.Distance.pointToCurve2d(midPoint, chordLine);
      }
    }

    return MathAlg.Distance.pointToCurve2d(midPoint, chordLine);
  }

  /**
   * Loads entity data from dump, optionally preserving window dimensions
   * @param dump - Serialized entity data
   * @param preserveWindowDimensions - Whether to preserve existing window width/height
   */
  loadOther(dump: ParametricOpeningDump, preserveWindowDimensions: boolean = false): void {
    const entity = this._entity;
    let originalWidth: unknown;
    let originalHeight: unknown;

    if (preserveWindowDimensions) {
      originalWidth = entity.storeProperty.get(
        HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowWidth
      );
      originalHeight = entity.storeProperty.get(
        HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowHeight
      );
    }

    ParametricOpeningDecorator.loadChildren(entity, dump);
    entity.initByMeta(entity.metadata);
    entity.storeProperty = new Map(dump.storeProperty);

    if (preserveWindowDimensions) {
      if (originalWidth !== undefined) {
        entity.storeProperty.set(
          HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowWidth,
          originalWidth
        );
      }
      if (originalHeight !== undefined) {
        entity.storeProperty.set(
          HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowHeight,
          originalHeight
        );
      }
    }

    ParametricOpeningDecorator.loadMetaInfo(entity, dump);
    entity.buildOpening(entity.metadata, entity.metaInfo);
  }

  /**
   * Loads door stone material and appearance from dump
   * @param doorStone - Serialized door stone data
   */
  loadDoorStone(doorStone?: DoorStoneDump): void {
    if (!doorStone || !(this._entity instanceof ParametricDoor)) {
      return;
    }

    this._entity.setDoorStoneMaterialStatus(doorStone.enable);

    const materialSeekId = doorStone.materialSeekId;
    if (materialSeekId) {
      const materialMeta = MetaManager.instance().getBuildingProductMeta(materialSeekId);
      const material = Material.create(materialMeta);
      this._entity.bottomFaceMaterial = material;

      const bottomFace = this._entity.getBottomFaces()[0];
      if (bottomFace) {
        PaintsUtil.updateFaceMixpaint(bottomFace);
      }

      if (doorStone.mixPave) {
        const mixPave = MixPave.load(doorStone.mixPave);
        if (this._entity.bottomFaceMaterial.mixpaint) {
          this._entity.bottomFaceMaterial.mixpaint.mixPave = mixPave;
        }
      }
    }

    const doorStoneFace = this._entity.getDoorStoneFace();
    if (doorStoneFace) {
      PaintsUtil.updateFaceMixpaint(doorStoneFace);
      doorStoneFace.dirtyMaterial();

      const floors = new Set<Floor>();
      this._entity.getRefreshFloors().forEach((floor) => floors.add(floor));
      floors.forEach((floor) => floor.dirtyGeometry());
    }
  }

  /**
   * Recursively loads child openings from dump
   * @param parentEntity - Parent entity to attach children to
   * @param dump - Serialized parent entity data
   */
  private static loadChildren(
    parentEntity: ParametricOpening,
    dump: ParametricOpeningDump | ChildOpeningDump
  ): void {
    dump.children.forEach((childDump) => {
      const childMeta = MetaManager.instance().getBuildingProductMeta(childDump.seekid);
      if (!childMeta) return;

      const childEntity = ParametricOpening.create(childMeta);
      if (!childEntity) return;

      childDump.children.forEach((grandchildDump) => {
        this.loadChildren(childEntity, grandchildDump);
      });

      parentEntity.addChild(childEntity);
      childEntity.eId = childDump.eid;
      childEntity.storeProperty = new Map(childDump.storeProperty);
      this.loadMetaInfo(childEntity, childDump);
      childEntity.buildOpening(childMeta, childEntity.metaInfo);
    });
  }

  /**
   * Loads meta information into entity from dump
   * @param entity - Target entity
   * @param dump - Serialized entity data containing meta info
   */
  private static loadMetaInfo(
    entity: ParametricOpening,
    dump: ParametricOpeningDump | ChildOpeningDump
  ): void {
    const reconstructMetaInfo = (metaInfoDump?: MetaInfoDump): MetaInfo => {
      const metaInfo: MetaInfo = {
        dependentMetaDates: [],
        subpartMetaDates: [],
        subpartInfos: new Map()
      };

      metaInfo.dependentMetaDates = metaInfoDump?.dependentMetaDateIds?.map((seekId) => {
        if (seekId) {
          return MetaManager.instance().getBuildingProductMeta(seekId);
        }
        return undefined;
      });

      metaInfo.subpartMetaDates = metaInfoDump?.subpartMetaDateIds?.map((seekId) => {
        if (seekId) {
          return MetaManager.instance().getBuildingProductMeta(seekId);
        }
        return undefined;
      });

      metaInfoDump?.subpartInfos?.forEach((subpartEntry) => {
        metaInfo.subpartInfos.set(subpartEntry[0], reconstructMetaInfo(subpartEntry[1]));
      });

      return metaInfo;
    };

    if (dump.metaInfoDump) {
      entity.metaInfo = reconstructMetaInfo(dump.metaInfoDump);
    }
  }

  /**
   * Extracts all seek IDs from dump including nested dependencies
   * @param dump - Serialized entity data
   * @returns Array of all unique seek IDs
   */
  static getAllSeekIds(dump: ParametricOpeningDump): string[] {
    const seekIds: string[] = [];
    seekIds.push(dump.seekId);

    if (dump.doorStone?.materialSeekId) {
      seekIds.push(dump.doorStone.materialSeekId);
    }

    const collectMetaSeekIds = (metaInfoDump?: MetaInfoDump): void => {
      metaInfoDump?.dependentMetaDateIds?.forEach((seekId) => {
        if (seekId && !seekIds.includes(seekId)) {
          seekIds.push(seekId);
        }
      });

      metaInfoDump?.subpartMetaDateIds?.forEach((seekId) => {
        if (seekId && !seekIds.includes(seekId)) {
          seekIds.push(seekId);
        }
      });

      metaInfoDump?.subpartInfos?.forEach((subpartEntry) => {
        collectMetaSeekIds(subpartEntry[1]);
      });
    };

    collectMetaSeekIds(dump.metaInfoDump);
    return seekIds;
  }
}

// Type Definitions

interface ParametricOpeningDump {
  seekId: string;
  storeProperty: Map<string, unknown>;
  children: ChildOpeningDump[];
  openingType: string;
  metaInfoDump?: MetaInfoDump;
  doorStone?: DoorStoneDump;
}

interface ChildOpeningDump {
  eid: string;
  seekid: string;
  storeProperty: Map<string, unknown>;
  children: ChildOpeningDump[];
  metaInfoDump?: MetaInfoDump;
}

interface DoorStoneDump {
  enable: boolean;
  materialSeekId?: string;
  mixPave?: unknown;
}

interface MetaInfoDump {
  dependentMetaDateIds: string[];
  subpartMetaDateIds: string[];
  subpartInfos?: Array<[string, MetaInfoDump]>;
}

interface MetaInfo {
  dependentMetaDates?: Array<BuildingProductMeta | undefined>;
  subpartMetaDates?: Array<BuildingProductMeta | undefined>;
  subpartInfos: Map<string, MetaInfo>;
}

interface EdgeConfig {
  width: number;
  length: number;
  wall: WallEdge;
  chordHeight?: number;
}

interface WallEdge {
  width: number;
  length: number;
  jointCurve: Curve2d | Arc2d;
  roomInfos: unknown[];
  leftFaces: Record<string, Face>;
  rightFaces: Record<string, Face>;
}

// External type references (assumed from imported modules)
declare class ParametricOpening {
  seekId: string;
  eId: string;
  storeProperty: Map<string, unknown>;
  children: Record<string, ParametricOpening>;
  metaInfo?: MetaInfo;
  metadata: BuildingProductMeta;
  ZRotation: number;
  getBottomFaces(): Face[];
  addChild(child: ParametricOpening): void;
  initByMeta(metadata: BuildingProductMeta): void;
  buildOpening(metadata: BuildingProductMeta, metaInfo?: MetaInfo): void;
  setEdgeList(edges: EdgeConfig[]): void;
}

declare class ParametricDoor extends ParametricOpening {
  bottomFaceMaterial: Material;
  isDoorStoneMaterialEnabled(): boolean;
  setDoorStoneMaterialStatus(enabled: boolean): void;
  getDoorStoneFace(): Face | undefined;
  getRefreshFloors(): Floor[];
}

declare class Face {
  faceInfo: { curve?: Curve2d };
  material?: Material;
  roomInfos: unknown[];
  dirtyMaterial(): void;
}

declare class Floor {}
declare class Ceiling {}

declare class Material {
  seekId: string;
  mixpaint?: { mixPave?: MixPave };
  static create(metadata: BuildingProductMeta): Material;
}

declare class MixPave {
  dump(): unknown;
  static load(dump: unknown): MixPave;
}

declare class Arc2d {
  getStartPt(): Point2d;
  getEndPt(): Point2d;
  getMidPt(): Point2d;
  isCCW(): boolean;
}

declare class Line2d {
  constructor(start: Point2d, end: Point2d);
}

interface Point2d {
  distanceTo(other: Point2d): number;
}

interface Curve2d {
  getStartPt(): Point2d;
  getEndPt(): Point2d;
}

interface BuildingProductMeta {
  seekId: string;
}

declare namespace MathAlg.Distance {
  function pointToCurve2d(point: Point2d, curve: Curve2d): number;
}

declare namespace MetaManager {
  function instance(): {
    getBuildingProductMeta(seekId: string): BuildingProductMeta;
  };
}

declare namespace Entity {
  function getClass(modelClass: string): typeof ParametricOpening | typeof ParametricDoor | undefined;
}

declare namespace PaintsUtil {
  function updateFaceMixpaint(face: Face): void;
}

declare function getAngleHorizontaleCCW(start: Point2d, end: Point2d): number;

declare namespace HSConstants {
  namespace Constants {
    const ParametricOpeningType: string;
  }
  namespace ModelClass {
    const ParametricDoor: string;
    const ParametricOpening: string;
  }
  namespace ParametricDoorWindowSystemVariablesName {
    const OrdinaryWindowWidth: string;
    const OrdinaryWindowHeight: string;
  }
}

declare namespace HSCore.Util.Content {
  function isParametricDoor(metadata: BuildingProductMeta): boolean;
}