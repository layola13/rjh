import { Entity, Entity_IO } from './Entity';
import { EntityField } from './decorators';
import { TgUtil } from './TgUtil';
import { TgWallUtil } from './TgWallUtil';
import { FaceHoleType } from './FaceHoleType';
import { loadRecordFace, getRecordFaceFinalKey, BeamRecordFace } from './RecordFace';
import { TrimmedSurface } from './TrimmedSurface';
import { BeamFaceType } from './BeamFaceType';
import { SplitHelper } from './SplitHelper';
import { NCustomizedBeamUtil } from './NCustomizedBeamUtil';
import { BuilderUtil } from './BuilderUtil';
import { FaceUtil } from './FaceUtil';
import { SplitSpaceMixpaintUtil } from './SplitSpaceMixpaintUtil';

interface FaceMapRecord {
  fId: string;
  record: unknown;
}

interface DumpResult {
  fM?: FaceMapRecord[];
  [key: string]: unknown;
}

interface LoadedFields {
  faceMap?: Map<string, BeamRecordFace>;
}

interface FaceBaseInfo {
  outerPath: unknown;
  innerPaths: unknown[];
  surface: unknown;
  sameDirWithSurface: boolean;
}

interface PathBeamPair {
  path: unknown;
  beam: unknown;
}

interface BrepFaceData {
  brepFace: unknown;
  face?: unknown;
  extraKey?: string;
  material?: unknown;
  oldFaceInfo?: unknown;
}

interface WirePath {
  outer: unknown;
  holes: unknown[];
}

interface SurfaceObj {
  surface: unknown;
  sameDirWithSurface: boolean;
}

interface FaceGeometry {
  wirePath: WirePath;
  surfaceObj: SurfaceObj;
}

interface BrepFaceComparison {
  s: unknown;
  o: unknown;
  i: unknown[];
  d: boolean;
}

interface SpaceOptions {
  splitData?: {
    ignoreMatchFaceId?: Set<string>;
  };
}

interface RoomBuilderContext {
  spaceOptions?: SpaceOptions;
}

interface RoomBuilder {
  ctx?: RoomBuilderContext;
}

interface Layer {
  beams: Record<string, unknown>;
  beamBuilder: BeamBuilder;
  roomBuilder: RoomBuilder;
  removeChild(id: string): void;
  addChild(entity: unknown): void;
  getFaceQuery(): unknown[];
}

interface MaterialInfo {
  mixpaint?: {
    faceEntity: unknown;
  };
  [key: string]: unknown;
}

export class BeamBuilder_IO extends Entity_IO {
  private static _instance: BeamBuilder_IO;

  public static instance(): BeamBuilder_IO {
    if (!BeamBuilder_IO._instance) {
      BeamBuilder_IO._instance = new BeamBuilder_IO();
    }
    return BeamBuilder_IO._instance;
  }

  public dump(
    entity: BeamBuilder,
    callback?: (result: unknown[], entity: BeamBuilder) => void,
    includeId: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeId, options);
    const data = result[0] as DumpResult;
    const faceMapArray: FaceMapRecord[] = [];

    entity.faceMap.forEach((record, faceId) => {
      faceMapArray.push({
        fId: faceId,
        record: record.dump()
      });
    });

    if (faceMapArray.length) {
      data.fM = faceMapArray;
    }

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  public load(entity: BeamBuilder, data: DumpResult, options: unknown): void {
    super.load(entity, data, options);

    const { fM: faceMapData } = data;
    const fields: LoadedFields = {};

    if (faceMapData) {
      const faceMap = new Map<string, BeamRecordFace>();
      faceMapData.forEach(item => {
        faceMap.set(item.fId, loadRecordFace(item.record));
      });
      fields.faceMap = faceMap;
    }

    Entity_IO.setEntityFields(entity, fields);
  }
}

export class BeamBuilder extends Entity {
  private _layer: Layer;

  @EntityField({
    postSet(this: BeamBuilder, oldValue: unknown, newValue: Map<string, BeamRecordFace>): void {
      BuilderUtil.validateFaceMap(this._layer, newValue, 'beamBuilder', this._id);
    }
  })
  public faceMap: Map<string, BeamRecordFace>;

  constructor(id: string = '', layer: Layer) {
    super(id);
    this._layer = layer;
    this.faceMap = new Map<string, BeamRecordFace>();
  }

  public hasTopoKey(key: string): boolean {
    return Array.from(this.faceMap.values()).filter(record => record.originKey === key).length > 0;
  }

  public build(): void {
    const pathBeamPairs: PathBeamPair[] = [];

    Object.values(this._layer.beams).forEach(beam => {
      const profile = (beam as any).calcProfile(true);
      if (profile) {
        pathBeamPairs.push({
          path: profile[0],
          beam
        });
      }
    });

    if (pathBeamPairs.length) {
      new NCustomizedBeamUtil(this._layer).build();
    } else {
      for (const [faceId] of this._layer.beamBuilder.faceMap) {
        this._layer.removeChild(faceId);
      }
      this._layer.beamBuilder.faceMap = new Map();

      this._layer.getFaceQuery().forEach(face => {
        const faceAny = face as any;
        if (faceAny.holes.some((hole: any) => hole.type === FaceHoleType.BeamHole)) {
          faceAny.holes = faceAny.holes.filter((hole: any) => hole.type !== FaceHoleType.BeamHole);
          faceAny.updateFaceMixpaint();
        }
      });
    }

    this.cleanFreeFaces();
    (HSCore.Util.Layer as any).dirtyLayerInfo(this._layer);
  }

  private _getTrimmed(brepFace: unknown): unknown {
    const { outerPath, innerPaths, surface, sameDirWithSurface } = TgUtil.getFaceBaseInfo(brepFace);
    return TrimmedSurface.createByBoundary3d(surface, [outerPath].concat(innerPaths), sameDirWithSurface);
  }

  public addFace(originKey: string, brepFace: any): string[] {
    let faceDataList: BrepFaceData[];
    const isAux = brepFace.userData.isAux;
    const beamId = brepFace.userData.beam.id;

    if (isAux) {
      faceDataList = [{ brepFace }];
    } else {
      const trimmedSurface = this._getTrimmed(brepFace);
      const splitFaces = this._getSplitFaces(originKey, trimmedSurface);

      if (this._isVertical(originKey)) {
        new SplitHelper(this._layer).sortVerticalTrimmedSurface(trimmedSurface, splitFaces);
      }

      faceDataList = splitFaces.map((face, index) => ({
        brepFace: face,
        extraKey: index === 0 ? undefined : `${index}`
      }));
    }

    return this._handleChangeData(faceDataList, originKey, beamId, isAux);
  }

  public cleanFreeFaces(): void {
    BuilderUtil.cleanFreeFaces(this._layer, this);
  }

  public updateFace(originKey: string, brepFace: any): string[] {
    const isAux = brepFace.userData.isAux;
    const beamId = brepFace.userData.beam.id;
    let existingFaces: any[] = [];

    this.faceMap.forEach((record, faceId) => {
      if (record.originKey === originKey) {
        existingFaces.push(this.doc.getEntityById(faceId));
      }
    });

    const ignoreMatchFaceId = this._layer.roomBuilder.ctx?.spaceOptions?.splitData?.ignoreMatchFaceId;
    if (ignoreMatchFaceId?.size) {
      existingFaces = existingFaces.filter(face => !ignoreMatchFaceId.has(face.id));
    }

    let faceDataList: BrepFaceData[];

    if (isAux) {
      faceDataList = [{
        brepFace,
        face: existingFaces[0]
      }];
    } else {
      const trimmedSurface = this._getTrimmed(brepFace);
      const splitFaces = this._getSplitFaces(originKey, trimmedSurface);

      if (!splitFaces.length) {
        return [];
      }

      const splitHelper = new SplitHelper(this._layer);

      if (splitFaces.length === 1) {
        faceDataList = [{
          brepFace: splitFaces[0],
          face: existingFaces.find(face => {
            const record = this.faceMap.get(face.id);
            return record?.finalKey === getRecordFaceFinalKey(originKey);
          })
        }];
      } else if (this._isVertical(originKey)) {
        splitHelper.sortVerticalTrimmedSurface(trimmedSurface, splitFaces);

        if (this._layer.roomBuilder.ctx?.spaceOptions?.splitData) {
          faceDataList = splitHelper.matchMaterial(existingFaces, splitFaces);
        } else {
          faceDataList = splitFaces.map((face, index) => {
            const extraKey = index === 0 ? undefined : `${index}`;
            const existingFace = existingFaces.find(f => {
              const record = this.faceMap.get(f.id);
              return record?.finalKey === getRecordFaceFinalKey(originKey, extraKey);
            });
            return {
              brepFace: face,
              extraKey,
              face: existingFace
            };
          });
        }
      } else {
        faceDataList = splitHelper.matchMaterial(existingFaces, splitFaces);
      }
    }

    return this._handleChangeData(faceDataList, originKey, beamId, isAux);
  }

  private _isVertical(originKey: string): boolean {
    return [
      BeamFaceType.left,
      BeamFaceType.right,
      BeamFaceType.back,
      BeamFaceType.front
    ].some(type => originKey.includes(type));
  }

  private _getSplitFaces(originKey: string, trimmedSurface: unknown): unknown[] {
    let splitCurves: unknown[];

    const isVertical = [
      BeamFaceType.left,
      BeamFaceType.right,
      BeamFaceType.back,
      BeamFaceType.front
    ].some(type => originKey.includes(type));

    if (isVertical) {
      splitCurves = new SplitHelper(this._layer).getBeamSideFaceSplitCurves(trimmedSurface);
    } else {
      splitCurves = new SplitHelper(this._layer).getBeamBottomFaceSplitCurves(trimmedSurface);
    }

    return TgWallUtil.splitBrepFace(trimmedSurface, splitCurves);
  }

  private _handleChangeData(
    faceDataList: BrepFaceData[],
    originKey: string,
    masterId: string,
    isAux: boolean
  ): string[] {
    const resultFaceIds: string[] = [];
    const hasSpaceOptions = !!this._layer.roomBuilder.ctx?.spaceOptions;
    const newFaceMap = new Map(this.faceMap);

    faceDataList.forEach(data => {
      const { brepFace, extraKey, face, material, oldFaceInfo } = data;
      let targetFace: any;
      let needsUpdate = true;

      if (face) {
        targetFace = face;
        const { wirePath, surfaceObj } = targetFace as FaceGeometry;
        const oldGeometry: BrepFaceComparison = {
          s: surfaceObj.surface,
          o: wirePath.outer,
          i: wirePath.holes,
          d: surfaceObj.sameDirWithSurface
        };

        const { outerPath, innerPaths, surface, sameDirWithSurface } = TgUtil.getFaceBaseInfo(brepFace);
        const newGeometry: BrepFaceComparison = {
          s: surface,
          o: outerPath,
          i: innerPaths,
          d: sameDirWithSurface
        };

        if (TgWallUtil.isSameBrepFace(oldGeometry, newGeometry)) {
          needsUpdate = false;
        } else {
          FaceUtil.updateFace(targetFace, outerPath, innerPaths, surface, sameDirWithSurface);
        }
      } else {
        targetFace = TgWallUtil.createModelFaceFromBrepFace(brepFace);
        this._layer.addChild(targetFace);
      }

      if (needsUpdate) {
        if (hasSpaceOptions) {
          if (material && oldFaceInfo?.material) {
            const oldMaterial = oldFaceInfo.material as MaterialInfo;
            if (oldMaterial.mixpaint) {
              oldMaterial.mixpaint.faceEntity = targetFace;
            }
            targetFace.material = oldMaterial;
          }
          SplitSpaceMixpaintUtil.updateFaceMixpaint(targetFace, oldFaceInfo);
        } else {
          if (material) {
            TgWallUtil.cloneMaterial(targetFace, material);
          }
          (HSCore.Util.Paints as any).updateFaceMixpaint(targetFace);
        }
      }

      newFaceMap.set(targetFace.id, new BeamRecordFace({
        masterId,
        originKey,
        isAux,
        extraKey
      }));

      resultFaceIds.push(targetFace.id);
    });

    this.faceMap = newFaceMap;
    return resultFaceIds;
  }

  public mirror(axis: unknown): void {
    this.mirrorFaceMap();
  }

  private mirrorFaceMap(): void {
    const getMaxIndex = (prefix: string): number => {
      const indices = Array.from(this.faceMap.values())
        .filter(record => record.originKey?.startsWith(prefix))
        .map(record => {
          const parts = record.originKey!.split('/');
          return parseInt(parts[2]);
        });
      indices.sort((a, b) => b - a);
      return indices[0];
    };

    const prefixMaxMap = new Map<string, number>();
    for (const [, record] of this.faceMap) {
      const parts = record.originKey!.split('/');
      const prefix = `${parts[0]}/${parts[1]}/`;
      if (prefixMaxMap.has(prefix)) continue;
      const maxIndex = getMaxIndex(prefix);
      prefixMaxMap.set(prefix, maxIndex);
    }

    const mirroredFaceMap = new Map<string, BeamRecordFace>();
    for (const [faceId, record] of this.faceMap) {
      const parts = record.originKey!.split('/');
      const prefix = `${parts[0]}/${parts[1]}/`;

      if (parts[1] === 'back') {
        parts[1] = 'front';
      } else if (parts[1] === 'front') {
        parts[1] = 'back';
      }

      const maxIndex = prefixMaxMap.get(prefix)!;
      parts[2] = (maxIndex - parseInt(parts[2])).toString();

      let newOriginKey = parts[0];
      for (let i = 1; i < parts.length; i++) {
        newOriginKey += '/';
        newOriginKey += parts[i];
      }

      const clonedRecord = record.clone();
      clonedRecord.originKey = newOriginKey;
      mirroredFaceMap.set(faceId, clonedRecord);
    }

    this.faceMap = mirroredFaceMap;
  }

  public isRoot(): boolean {
    return true;
  }

  public getIO(): BeamBuilder_IO {
    return BeamBuilder_IO.instance();
  }
}