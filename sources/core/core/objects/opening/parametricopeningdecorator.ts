import { Arc2d, Line2d, MathAlg } from './geometry';
import { MetaManager } from './meta-manager';
import { MixPave } from './mix-pave';
import { getAngleHorizontaleCCW } from './angle-utils';
import { ParametricOpening } from './parametric-opening';
import { Face } from './face';
import { Entity } from './entity';
import { Floor } from './floor';
import { Ceiling } from './ceiling';
import { ParametricDoor } from './parametric-door';
import { Material } from './material';
import { PaintsUtil } from './paints-util';

interface MetaInfo {
  dependentMetaDates?: BuildingProductMeta[];
  subpartMetaDates?: BuildingProductMeta[];
  subpartInfos?: Map<string, MetaInfo>;
}

interface MetaInfoDump {
  dependentMetaDateIds: string[];
  subpartMetaDateIds: string[];
  subpartInfos: Array<[string, MetaInfoDump]>;
}

interface ChildDump {
  eid: string;
  seekid: string;
  storeProperty: Map<string, unknown>;
  children: ChildDump[];
  metaInfoDump: MetaInfoDump;
}

interface DoorStoneDump {
  enable: boolean;
  materialSeekId?: string;
  mixPave?: unknown;
}

interface EntityDump {
  seekId: string;
  storeProperty: Map<string, unknown>;
  children: ChildDump[];
  openingType: string;
  metaInfoDump: MetaInfoDump;
  doorStone?: DoorStoneDump;
}

interface EdgeConfig {
  width: number;
  length: number;
  wall: Wall;
  chordHeight?: number;
}

interface Wall {
  jointCurve: Arc2d | Line2d;
  width: number;
  length: number;
  roomInfos: unknown[];
  leftFaces: Record<string, Face>;
  rightFaces: Record<string, Face>;
}

interface BuildingProductMeta {
  seekId: string;
  [key: string]: unknown;
}

interface RoomInfo {
  [key: string]: unknown;
}

export class ParametricOpeningDecorator {
  private _entity: ParametricOpening | ParametricDoor;

  constructor(entity: ParametricOpening | ParametricDoor) {
    this._entity = entity;
  }

  dump(): EntityDump {
    const entity = this._entity;
    const bottomFace = entity.getBottomFaces()[0];
    const isDoor = entity instanceof ParametricDoor;

    const dump: EntityDump = {
      seekId: entity.seekId,
      storeProperty: entity.storeProperty,
      children: this.getChildren(entity),
      openingType: HSConstants.Constants.ParametricOpeningType,
      metaInfoDump: this.dumpMetaInfo(entity.metaInfo)
    };

    if (bottomFace) {
      dump.doorStone = {
        enable: !!isDoor && entity.isDoorStoneMaterialEnabled(),
        materialSeekId: isDoor ? bottomFace.material?.seekId : undefined,
        mixPave: isDoor ? bottomFace.material?.mixpaint?.mixPave?.dump() : undefined
      };
    }

    return dump;
  }

  dumpMetaInfo(metaInfo?: MetaInfo): MetaInfoDump {
    const dump: MetaInfoDump = {
      dependentMetaDateIds: [],
      subpartMetaDateIds: [],
      subpartInfos: []
    };

    metaInfo?.dependentMetaDates?.forEach((meta) => {
      if (meta) {
        dump.dependentMetaDateIds.push(meta.seekId);
      }
    });

    metaInfo?.subpartMetaDates?.forEach((meta) => {
      dump.subpartMetaDateIds.push(meta?.seekId);
    });

    metaInfo?.subpartInfos?.forEach((info, key) => {
      dump.subpartInfos?.push([key, this.dumpMetaInfo(info)]);
    });

    return dump;
  }

  getChildren(entity: ParametricOpening | ParametricDoor): ChildDump[] {
    const children: ChildDump[] = [];

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

  static create(
    metadata: BuildingProductMeta | undefined,
    face: Face | undefined,
    wall: Wall
  ): ParametricOpening | ParametricDoor | undefined {
    if (!metadata) return;

    let EntityClass: typeof ParametricDoor | typeof ParametricOpening;

    if (HSCore.Util.Content.isParametricDoor(metadata)) {
      EntityClass = Entity.getClass(HSConstants.ModelClass.ParametricDoor);
    } else {
      EntityClass = Entity.getClass(HSConstants.ModelClass.ParametricOpening);
    }

    if (!EntityClass) return;

    const instance = new EntityClass();
    instance.initByMeta(metadata);

    if (face && face instanceof Face && !(face instanceof Floor || face instanceof Ceiling)) {
      const curve = face.faceInfo.curve;
      if (curve) {
        const startPoint = curve.getStartPt();
        const endPoint = curve.getEndPt();
        const angle = -getAngleHorizontaleCCW(startPoint, endPoint);
        const normalizeAngle = (value: number): number => {
          let normalized = value % 360;
          if (normalized > 180) normalized -= 360;
          else if (normalized < -180) normalized += 360;
          return normalized;
        };
        instance.ZRotation = normalizeAngle(angle);
      }
    }

    const jointCurve = wall.jointCurve;
    const edgeConfig: EdgeConfig = {
      width: wall.width,
      length: wall.length,
      wall: wall
    };

    if (wall.jointCurve instanceof Arc2d) {
      edgeConfig.chordHeight = this.getArcWallChordHeight(wall);
      edgeConfig.length = jointCurve.getStartPt().distanceTo(jointCurve.getEndPt());
    }

    instance.setEdgeList([edgeConfig]);
    return instance;
  }

  static getArcWallChordHeight(wall: Wall): number {
    const curve = wall.jointCurve as Arc2d;
    const chordLine = new Line2d(curve.getStartPt(), curve.getEndPt());
    const midPoint = curve.getMidPt();

    if (wall.roomInfos.length > 0) {
      const hasLeftRooms = Object.values(wall.leftFaces).some((face) => face.roomInfos.length > 0);
      const hasRightRooms = Object.values(wall.rightFaces).some((face) => face.roomInfos.length > 0);

      if (hasLeftRooms && !hasRightRooms) {
        return curve.isCCW()
          ? MathAlg.Distance.pointToCurve2d(midPoint, chordLine)
          : -MathAlg.Distance.pointToCurve2d(midPoint, chordLine);
      }

      if (!hasLeftRooms && hasRightRooms) {
        return curve.isCCW()
          ? -MathAlg.Distance.pointToCurve2d(midPoint, chordLine)
          : MathAlg.Distance.pointToCurve2d(midPoint, chordLine);
      }
    }

    return MathAlg.Distance.pointToCurve2d(midPoint, chordLine);
  }

  loadOther(dump: EntityDump, preserveWindowSize: boolean = false): void {
    const entity = this._entity;
    let savedWidth: unknown;
    let savedHeight: unknown;

    if (preserveWindowSize) {
      savedWidth = this._entity.storeProperty.get(HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowWidth);
      savedHeight = this._entity.storeProperty.get(HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowHeight);
    }

    ParametricOpeningDecorator.loadChildren(entity, dump);
    entity.initByMeta(entity.metadata);
    entity.storeProperty = new Map(dump.storeProperty);

    if (preserveWindowSize) {
      if (savedWidth) {
        entity.storeProperty.set(HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowWidth, savedWidth);
      }
      if (savedHeight) {
        entity.storeProperty.set(HSConstants.ParametricDoorWindowSystemVariablesName.OrdinaryWindowHeight, savedHeight);
      }
    }

    ParametricOpeningDecorator.loadMetaInfo(entity, dump);
    entity.buildOpening(entity.metadata, entity.metaInfo);
  }

  loadDoorStone(doorStone: DoorStoneDump | undefined): void {
    if (!doorStone || !(this._entity instanceof ParametricDoor)) return;

    this._entity.setDoorStoneMaterialStatus(doorStone.enable);

    const materialSeekId = doorStone.materialSeekId;
    if (materialSeekId) {
      const materialMeta = MetaManager.instance().getBuildingProductMeta(materialSeekId);
      const material = Material.create(materialMeta);
      this._entity.bottomFaceMaterial = material;

      const bottomFace = this._entity.getBottomFaces()[0];
      if (bottomFace) {
        PaintsUtil.updateFaceMixpaint(bottomFace);

        if (doorStone.mixPave) {
          const mixPave = MixPave.load(doorStone.mixPave);
          if (this._entity.bottomFaceMaterial.mixpaint) {
            this._entity.bottomFaceMaterial.mixpaint.mixPave = mixPave;
          }
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

  static loadChildren(entity: ParametricOpening | ParametricDoor, dump: EntityDump | ChildDump): void {
    dump.children.forEach((childDump) => {
      const childMeta = MetaManager.instance().getBuildingProductMeta(childDump.seekid);
      if (!childMeta) return;

      const childOpening = ParametricOpening.create(childMeta);
      if (!childOpening) return;

      childDump.children.forEach((grandChildDump) => {
        this.loadChildren(childOpening, grandChildDump);
      });

      entity.addChild(childOpening);
      childOpening.eId = childDump.eid;
      childOpening.storeProperty = new Map(childDump.storeProperty);
      this.loadMetaInfo(childOpening, dump);
      childOpening.buildOpening(childMeta, childOpening.metaInfo);
    });
  }

  static loadMetaInfo(entity: ParametricOpening | ParametricDoor, dump: EntityDump | ChildDump): void {
    const reconstructMetaInfo = (dumpData?: MetaInfoDump): MetaInfo => {
      const metaInfo: MetaInfo = {
        dependentMetaDates: [],
        subpartMetaDates: [],
        subpartInfos: new Map()
      };

      metaInfo.dependentMetaDates = dumpData?.dependentMetaDateIds?.map((seekId) => {
        if (seekId) {
          return MetaManager.instance().getBuildingProductMeta(seekId);
        }
      });

      metaInfo.subpartMetaDates = dumpData?.subpartMetaDateIds?.map((seekId) => {
        if (seekId) {
          return MetaManager.instance().getBuildingProductMeta(seekId);
        }
      });

      dumpData?.subpartInfos?.forEach((subpart) => {
        metaInfo.subpartInfos?.set(subpart[0], reconstructMetaInfo(subpart[1]));
      });

      return metaInfo;
    };

    if (dump.metaInfoDump) {
      entity.metaInfo = reconstructMetaInfo(dump.metaInfoDump);
    }
  }

  static getAllSeekIds(dump: EntityDump): string[] {
    const { doorStone } = dump;
    const seekIds: string[] = [];

    seekIds.push(dump.seekId);

    if (doorStone?.materialSeekId) {
      seekIds.push(doorStone.materialSeekId);
    }

    const collectMetaInfoSeekIds = (metaInfoDump?: MetaInfoDump): void => {
      metaInfoDump?.dependentMetaDateIds.forEach((seekId) => {
        if (seekId && !seekIds.includes(seekId)) {
          seekIds.push(seekId);
        }
      });

      metaInfoDump?.subpartMetaDateIds.forEach((seekId) => {
        if (seekId && !seekIds.includes(seekId)) {
          seekIds.push(seekId);
        }
      });

      metaInfoDump?.subpartInfos?.forEach((subpart) => {
        collectMetaInfoSeekIds(subpart[1]);
      });
    };

    collectMetaInfoSeekIds(dump.metaInfoDump);
    return seekIds;
  }
}