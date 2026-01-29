import { EntityField } from './decorators';
import { Entity_IO, Entity } from './Entity';
import { Opening } from './Opening';
import { ParametricOpening } from './ParametricOpening';
import { DOpening } from './DOpening';
import { WallTopoFace } from './WallTopoFace';
import { Loop } from './Loop';
import { PolyCurve } from './PolyCurve';
import { MathAlg } from './MathAlg';

export enum BizType {
  Wall = "Wall",
  Slab = "Slab"
}

interface TgHoleConstructorParams {
  id: string;
  sourceId?: string;
  bizType?: BizType;
}

interface DumpedTgHoleData {
  id: string;
  sId: string;
  cNames: string[];
  bType: BizType;
}

interface LoadContext {
  cNames?: string[];
  [key: string]: unknown;
}

interface RoomBuilderContext {
  roomBuilder: {
    topoFaces: WallTopoFace[];
    faceMap: Map<string, { originKey: string }>;
  };
  slabBuilder: {
    faceObjs: Array<{ obj: { isAux: boolean }; id: string }>;
  };
}

interface FaceEntity {
  faceInfo?: {
    curve?: unknown;
  };
  isAux?: boolean;
  [key: string]: unknown;
}

interface ShellInfo {
  [key: string]: unknown;
}

export class TgHole_IO extends Entity_IO {
  private static _instance: TgHole_IO;

  static instance(): TgHole_IO {
    if (!TgHole_IO._instance) {
      TgHole_IO._instance = new TgHole_IO();
    }
    return TgHole_IO._instance;
  }

  dump(
    entity: TgHole,
    callback?: (data: unknown[], entity: TgHole) => void,
    includeMetadata: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown[] {
    const dumpedData = super.dump(entity, undefined, includeMetadata, options);
    const mainData = dumpedData[0] as DumpedTgHoleData;
    
    mainData.sId = entity.sourceId;
    mainData.cNames = Array.from(entity._curLinkNames);
    mainData.bType = entity.bizType;
    
    if (callback) {
      callback(dumpedData, entity);
    }
    
    return dumpedData;
  }

  load(entity: TgHole, data: LoadContext, context: unknown): void {
    super.load(entity, data, context);
    
    const { cNames } = data;
    const fields: Partial<TgHole> = {};
    
    if (cNames) {
      fields._curLinkNames = new Set(cNames);
    }
    
    Entity_IO.setEntityFields(entity, fields);
  }

  postLoad(entity: TgHole, data: LoadContext): void {
    super.postLoad(entity, data);
  }
}

export class TgHole extends Entity {
  @EntityField()
  bizType: BizType = BizType.Wall;

  @EntityField()
  _curLinkNames: Set<string> = new Set();

  @EntityField()
  _nextLinkNames?: Set<string>;

  @EntityField()
  linkFaces: FaceEntity[] = [];

  sourceId: string;
  source?: Opening | ParametricOpening | DOpening;

  constructor(params: TgHoleConstructorParams) {
    super(params.id);
    
    const internalFields = {
      bizType: params.bizType || BizType.Wall
    };
    
    this.setInternalFields(internalFields);
    this.sourceId = params.sourceId || "";
    this.source = this.doc.getEntityById(this.sourceId) as Opening | ParametricOpening | DOpening | undefined;
  }

  isRoot(): boolean {
    return true;
  }

  getIO(): TgHole_IO {
    return TgHole_IO.instance();
  }

  static load(data: DumpedTgHoleData, context: unknown): TgHole {
    const hole = new TgHole({
      id: data.id,
      sourceId: data.sId,
      bizType: data.bType
    });
    
    hole.load(data, context);
    return hole;
  }

  isValid(): boolean {
    return this.source instanceof Opening ||
           this.source instanceof ParametricOpening ||
           this.source instanceof DOpening;
  }

  isEmpty(): boolean {
    return !this._curLinkNames.size && !this._nextLinkNames?.size;
  }

  hasChange(): boolean {
    return this._nextLinkNames !== undefined;
  }

  setNextLinkNames(linkNames: Set<string>): void {
    if (!this._isSameLinkNames(linkNames, this._curLinkNames)) {
      this._nextLinkNames = linkNames;
    }
  }

  refreshLinkNames(): void {
    if (this._nextLinkNames) {
      this._curLinkNames = new Set(this._nextLinkNames);
      this._nextLinkNames = undefined;
    }
  }

  refreshLinkFaces(context: RoomBuilderContext): void {
    const resultFaces = new Set<FaceEntity>();

    if (!this.isValid()) {
      this.linkFaces = Array.from(resultFaces);
      return;
    }

    if (this.bizType === BizType.Wall) {
      this._refreshWallLinkFaces(context, resultFaces);
    } else if (this.bizType === BizType.Slab) {
      this._refreshSlabLinkFaces(context, resultFaces);
    }

    this.linkFaces = Array.from(resultFaces);
  }

  get allLinkNames(): string[] {
    const allNames = new Set<string>();
    
    this._curLinkNames.forEach(name => allNames.add(name));
    this._nextLinkNames?.forEach(name => allNames.add(name));
    
    return Array.from(allNames);
  }

  get oldLinkNames(): string[] {
    return Array.from(this._curLinkNames);
  }

  get linkNames(): string[] {
    return this._nextLinkNames 
      ? Array.from(this._nextLinkNames) 
      : Array.from(this._curLinkNames);
  }

  get shellInfos(): ShellInfo[] {
    return this.source?.shellInfos || [];
  }

  private _refreshWallLinkFaces(context: RoomBuilderContext, resultFaces: Set<FaceEntity>): void {
    const sourceProfiles = (this.source instanceof Opening || this.source instanceof DOpening)
      ? [this.source.bottomProfile]
      : this.source!.bottomProfile;
    
    const loops = sourceProfiles.map(profile => new Loop(profile));
    const validTopoKeys = new Set<string>();

    context.roomBuilder.topoFaces.forEach(face => {
      if (face instanceof WallTopoFace && 
          !face.isAux && 
          face.coEdge !== undefined && 
          this._curLinkNames.has(face.topoName.id)) {
        validTopoKeys.add(face.topoKey);
      }
    });

    const facesByOriginKey = new Map<string, FaceEntity[]>();
    
    context.roomBuilder.faceMap.forEach((faceData, entityId) => {
      if (validTopoKeys.has(faceData.originKey)) {
        if (!facesByOriginKey.has(faceData.originKey)) {
          facesByOriginKey.set(faceData.originKey, []);
        }
        const entity = this.doc.getEntityById(entityId) as FaceEntity;
        facesByOriginKey.get(faceData.originKey)!.push(entity);
      }
    });

    facesByOriginKey.forEach(faces => {
      if (faces.length === 1) {
        resultFaces.add(faces[0]);
      } else {
        faces.forEach(face => {
          if (face.faceInfo?.curve) {
            const polyCurve = new PolyCurve([face.faceInfo.curve]);
            const intersections = MathAlg.BoolOperate2d.polylineIntersect(polyCurve, loops, true);
            
            if (intersections.length > 0) {
              resultFaces.add(face);
            }
          }
        });
      }
    });
  }

  private _refreshSlabLinkFaces(context: RoomBuilderContext, resultFaces: Set<FaceEntity>): void {
    context.slabBuilder.faceObjs.forEach(faceObj => {
      if (!faceObj.obj.isAux && this._curLinkNames.has(faceObj.id)) {
        const entity = this.doc.getEntityById(faceObj.id) as FaceEntity;
        resultFaces.add(entity);
      }
    });
  }

  private _isSameLinkNames(set1: Set<string>, set2: Set<string>): boolean {
    if (set1.size !== set2.size) {
      return false;
    }
    
    if (set1.size === 0) {
      return true;
    }
    
    return Array.from(set1).every(name => set2.has(name));
  }
}