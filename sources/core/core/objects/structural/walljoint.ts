import { EntityTransactionType } from './Entity';
import { EntityField } from './EntityField';
import { Entity, Entity_IO } from './EntityCore';
import { JointType } from './JointType';
import { MathAlg } from './MathAlg';
import { TgWallUtil } from './TgWallUtil';
import { JointUtil } from './JointUtil';
import { BuilderUtil } from './BuilderUtil';
import { Logger } from './Logger';

enum JointPointType {
  from = "from",
  to = "to",
  between = "between"
}

interface Wall {
  id: string;
  toPoints: any[];
  fromPoints: any[];
  toPaths: any;
  fromPaths: any;
  jointCurve: any;
  width: number;
  curve: any;
}

interface WallInfo {
  wall: Wall;
  type: JointPointType;
}

interface WallJointFilterOptions {
  exclude?: number;
  include?: number;
}

interface WallJointsCache {
  from?: WallJoint;
  to?: WallJoint;
  between: WallJoint[];
}

interface Point {
  point: any;
  distanceTo(other: any): number;
}

class WallLinkInfo {
  wall: Wall;
  tr: any;
  tl: any;
  fl: any;
  fr: any;
  toPath: any;
  fromPath: any;
  private _floorplan: any;

  constructor(wall: Wall) {
    this.wall = wall;
    this._floorplan = (globalThis as any).HSCore.Doc.getDocManager().activeDocument;
    this.resetPath();
  }

  resetPath(): void {
    this.tr = this.wall.toPoints[0];
    const toLength = this.wall.toPoints.length;
    this.tl = this.wall.toPoints[toLength - 1];
    this.fl = this.wall.fromPoints[0];
    const fromLength = this.wall.fromPoints.length;
    this.fr = this.wall.fromPoints[fromLength - 1];
    this.toPath = this.wall.toPaths;
    this.fromPath = this.wall.fromPaths;
  }

  mirror(): void {
    this.resetPath();
  }

  get from(): WallJoint | undefined {
    return this._floorplan.wallJointManager.getWallFromJoint(this.wall);
  }

  get to(): WallJoint | undefined {
    return this._floorplan.wallJointManager.getWallToJoint(this.wall);
  }

  get curve(): any {
    return this.wall.jointCurve;
  }

  get loffset(): number {
    return this.wall.width / 2;
  }

  get roffset(): number {
    return this.wall.width / 2;
  }
}

class WallJointManager extends Entity {
  @EntityField({
    postSet() {
      this._wallJointsCache = undefined;
      this.dirty();
    }
  })
  private _wallJointMap: Map<Wall, Set<WallJoint>> = new Map();
  
  private _wallLink: Map<Wall, WallLinkInfo> = new Map();
  private _wallJointsCache?: Map<Wall, WallJointsCache>;

  addJoint2Wall(wall: Wall, joint: WallJoint): void {
    const newMap = new Map(this._wallJointMap);
    let joints = newMap.get(wall);
    joints = joints ? new Set(joints) : new Set();
    joints.add(joint);
    newMap.set(wall, joints);
    this._wallJointMap = newMap;
  }

  removeJointFromWall(wall: Wall, joint: WallJoint): void {
    const newMap = new Map(this._wallJointMap);
    let joints = newMap.get(wall);
    if (joints) {
      joints = new Set(joints);
      joints.delete(joint);
      newMap.set(wall, joints);
      this._wallJointMap = newMap;
    }
  }

  removeWall(wall: Wall): void {
    this.removeWallJoints(wall);
    const newMap = new Map(this._wallJointMap);
    newMap.delete(wall);
    this._wallJointMap = newMap;
    this._wallLink.delete(wall);
  }

  removeWallJoints(wall: Wall): void {
    this.getWallJoints(wall).forEach(joint => joint.destroy());
  }

  getWallJoints(wall: Wall): WallJoint[] {
    const joints = this._wallJointMap.get(wall);
    return joints ? Array.from(joints) : [];
  }

  getWallFromJoint(wall: Wall): WallJoint | undefined {
    return this.getWallEndJoint(wall, JointPointType.from);
  }

  getWallFromJoints(wall: Wall): WallJoint[] {
    return this.getWallEndJoints(wall, JointPointType.from);
  }

  getWallToJoint(wall: Wall): WallJoint | undefined {
    return this.getWallEndJoint(wall, JointPointType.to);
  }

  getWallToJoints(wall: Wall): WallJoint[] {
    return this.getWallEndJoints(wall, JointPointType.to);
  }

  getWallEndJoint(wall: Wall, pointType: JointPointType, options?: WallJointFilterOptions): WallJoint | undefined {
    let joints = this.getWallEndJoints(wall, pointType, options);
    if (!options) {
      joints = joints.filter(joint => !(joint.type & JointType.Tangent));
    }
    return joints[0];
  }

  getWallEndJoints(wall: Wall, pointType: JointPointType, options?: WallJointFilterOptions): WallJoint[] {
    const jointSet = this._wallJointMap.get(wall);
    if (!jointSet) return [];

    const result: WallJoint[] = [];
    for (const joint of jointSet) {
      if (options) {
        if (options.exclude && joint.type & options.exclude) continue;
        if (options.include) {
          if (joint.type & options.include && joint.getWallPointType(wall) === pointType) {
            result.push(joint);
          }
        } else if (joint.getWallPointType(wall) === pointType) {
          result.push(joint);
        }
      } else if (joint.getWallPointType(wall) === pointType) {
        result.push(joint);
      }
    }

    return result.sort((a, b) => {
      if (a.type !== b.type) return a.type - b.type;
      if (a.order !== b.order) return a.order - b.order;
      return a.walls[0].width - b.walls[0].width;
    });
  }

  getWallBetweenJoints(wall: Wall): WallJoint[] {
    const jointSet = this._wallJointMap.get(wall);
    if (!jointSet) return [];

    const result: WallJoint[] = [];
    for (const joint of jointSet) {
      if (joint.getWallPointType(wall) === JointPointType.between) {
        result.push(joint);
      }
    }
    return result;
  }

  getWallLink(wall: Wall): WallLinkInfo {
    let link = this._wallLink.get(wall);
    if (!link) {
      link = new WallLinkInfo(wall);
      this._wallLink.set(wall, link);
    }
    return link;
  }

  clear(): void {
    this._wallJointMap = new Map();
    this._wallLink.clear();
  }

  get wallJoints(): Map<Wall, WallJointsCache> {
    if (this._wallJointsCache) return this._wallJointsCache;

    const cache = new Map<Wall, WallJointsCache>();
    for (const [wall, jointSet] of this._wallJointMap) {
      const wallJointsInfo: WallJointsCache = {
        from: undefined,
        to: undefined,
        between: []
      };

      for (const joint of jointSet) {
        const pointType = joint.getWallPointType(wall);
        if (pointType) {
          if (!wallJointsInfo.from && JointUtil.isFromPointType(pointType)) {
            wallJointsInfo.from = joint;
          } else if (!wallJointsInfo.to && JointUtil.isToPointType(pointType)) {
            wallJointsInfo.to = joint;
          } else {
            wallJointsInfo.between.push(joint);
          }
        }
      }
      cache.set(wall, wallJointsInfo);
    }

    this._wallJointsCache = cache;
    return cache;
  }

  get wallJointList(): WallJoint[] {
    const jointSet = new Set<WallJoint>();
    for (const joints of this._wallJointMap.values()) {
      joints.forEach(joint => jointSet.add(joint));
    }
    return [...jointSet];
  }

  doLoad(dumpData: any[], context: any): void {
    for (const jointData of dumpData) {
      let isValid = true;
      if (jointData) {
        for (const wallId of Object.keys(jointData.wallInfos)) {
          if (!Entity.loadFromDumpById(wallId, context)) {
            isValid = false;
          }
        }
      } else {
        isValid = false;
      }

      if (isValid) {
        new WallJoint(jointData.id).load(jointData, context);
      } else {
        this._log("加载时：发现非法接头数据", jointData);
        Logger.console.error("加载时：发现非法接头数据");
      }
    }
  }

  doDump(entity: any, includeRef: boolean = true, options: any = {}): any[] {
    return this.wallJointList
      .filter(joint => {
        if (!joint.wallInfos.length) return false;
        if (!joint.wallInfos.every(info => this.doc.getEntityById(info.wall.id) !== undefined)) {
          this._log("保存时：发现非法接头数据", joint.wallInfos);
          Logger.console.error("保存时：发现非法接头数据");
          return false;
        }
        return true;
      })
      .map(joint => joint.dump(entity, includeRef, options)[0]);
  }

  private _log(message: string, data: any): void {
    BuilderUtil.logError("HSCore.WallJointManager", "wallJointDump", message, "wallJointDump", data);
  }

  isRoot(): boolean {
    return true;
  }
}

class WallJoint_IO extends Entity_IO {
  dump(entity: WallJoint, callback?: Function, includeRef: boolean = true, options: any = {}): any[] {
    const result = super.dump(entity, undefined, includeRef, options);
    const dumpData = result[0];
    const wallInfosMap: Record<string, JointPointType> = {};

    for (let i = 0; i < entity.wallInfos.length; ++i) {
      wallInfosMap[entity.wallInfos[i].wall.id] = entity.wallInfos[i].type;
    }

    dumpData.type = entity.type;
    dumpData.sWall = entity.wallInfos[0].wall.id;
    dumpData.wallInfos = wallInfosMap;
    
    if (entity.order) {
      dumpData.od = entity.order;
    }

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  load(entity: WallJoint, dumpData: any, context: any): void {
    super.load(entity, dumpData, context);

    const wallInfos: WallInfo[] = [];
    const loadWallInfo = (wallId: string): void => {
      const wall = Entity.loadFromDumpById(wallId, context) as Wall;
      const type = dumpData.wallInfos[wallId];
      wallInfos.push({ wall, type });
    };

    const startWallId = (() => {
      let id = dumpData.sWall;
      if (!id) {
        for (const wallId in dumpData.wallInfos) {
          if (JointPointType.between === dumpData.wallInfos[wallId]) {
            id = wallId;
            break;
          }
        }
      }
      return id;
    })();

    if (startWallId) {
      loadWallInfo(startWallId);
    }

    for (const wallId in dumpData.wallInfos) {
      if (wallId !== startWallId) {
        loadWallInfo(wallId);
      }
    }

    entity._updateWallInfos(wallInfos);

    const fields = {
      type: dumpData.type,
      wallInfos,
      order: dumpData.od || 0
    };

    Entity_IO.setEntityFields(entity, fields);
  }
}

class WallJoint extends Entity {
  @EntityField()
  type!: number;

  @EntityField({
    partialSet(this: WallJoint, value: WallInfo[]) {
      this.updateWallInfos(value);
    }
  })
  private __wallInfos: WallInfo[] = [];

  @EntityField()
  order: number = 0;

  static create(type: number): WallJoint {
    const joint = new WallJoint();
    const fields = { type };
    joint.setInternalFields(fields);
    return joint;
  }

  constructor(id: string = "") {
    super(id);
    this.__wallInfos = [];
    this.order = 0;
  }

  get wallInfos(): WallInfo[] {
    return this.__wallInfos;
  }

  set wallInfos(value: WallInfo[]) {
    this.__wallInfos = value;
  }

  get links(): WallLinkInfo[] {
    return this.walls.map(wall => this._doc.wallJointManager.getWallLink(wall));
  }

  get walls(): Wall[] {
    return this.wallInfos.map(info => info.wall);
  }

  isRoot(): boolean {
    return true;
  }

  getIO(): WallJoint_IO {
    return WallJoint_IO.instance();
  }

  addWall(wall: Wall, type: JointPointType): void {
    const newWallInfos = this.wallInfos.slice();
    newWallInfos.push({ wall, type });
    this.wallInfos = newWallInfos;
  }

  removeWall(wall: Wall): void {
    const newWallInfos = this.wallInfos.slice();
    for (let i = 0; i < this.wallInfos.length; ++i) {
      if (this.wallInfos[i].wall === wall) {
        newWallInfos.splice(i, 1);
        this.wallInfos = newWallInfos;
        return;
      }
    }
  }

  getWallPointType(wall: Wall): JointPointType | undefined {
    for (let i = 0; i < this.wallInfos.length; ++i) {
      if (this.wallInfos[i].wall === wall) {
        return this.wallInfos[i].type;
      }
    }
  }

  getLinkWallInfo(wall: Wall): WallInfo | undefined {
    return this.wallInfos.find(info => info.wall !== wall);
  }

  _updateWallInfos(newWallInfos: WallInfo[]): void {
    const oldWalls = this.walls.slice();
    const newWalls = newWallInfos.map(info => info.wall);

    for (let i = 0; i < newWallInfos.length; ++i) {
      const info = newWallInfos[i];
      this._doc.wallJointManager.addJoint2Wall(info.wall, this);
    }

    oldWalls
      .filter(wall => !newWalls.includes(wall))
      .forEach(wall => {
        this._doc.wallJointManager.removeJointFromWall(wall, this);
      });
  }

  updateWallInfos(newWallInfos: WallInfo[]): void {
    this._updateWallInfos(newWallInfos);
    this.__wallInfos = newWallInfos;
  }

  destroy(): void {
    for (const wall of this.walls) {
      this._doc.wallJointManager.removeJointFromWall(wall, this);
    }
    this.transact("", EntityTransactionType.Deletion);
  }

  get point(): any | undefined {
    if (this.walls.length < 2 || this.type & JointType.Tangent) {
      return undefined;
    }

    const sortByDistance = (points: Point[], wall: Wall): void => {
      const pointType = this.getWallPointType(wall);
      if (pointType && pointType !== JointPointType.between) {
        const referencePoint = JointUtil.isFromPointType(pointType)
          ? wall.curve.getStartPt()
          : wall.curve.getEndPt();
        points.sort((a, b) => a.point.distanceTo(referencePoint) - b.point.distanceTo(referencePoint));
      }
    };

    const wall1 = this.walls[0];
    const wall2 = this.walls[1];
    const intersections = MathAlg.CalculateIntersect.curve2ds(
      TgWallUtil.extendCurve(wall1.curve),
      TgWallUtil.extendCurve(wall2.curve)
    );

    sortByDistance(intersections, wall1);
    sortByDistance(intersections, wall2);

    return intersections[0]?.point;
  }
}

export { WallJoint_IO, WallJointManager, JointPointType, WallLinkInfo, WallJoint };