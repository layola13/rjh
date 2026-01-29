import { TgUtil } from './TgUtil';
import { MathAlg } from './MathAlg';
import { FaceInfo } from './FaceInfo';
import { TgWallUtil } from './TgWallUtil';
import { Logger } from './Logger';

export class StructureFaceInfo extends FaceInfo {
  private readonly _rawFaceInfo: RawFaceInfo;
  private readonly _loopInfo?: LoopInfo;
  public readonly curve: Curve | undefined;

  constructor(face: Face, rawFaceInfo: RawFaceInfo, loopInfo?: LoopInfo) {
    super(face);
    this._rawFaceInfo = rawFaceInfo;
    this._loopInfo = loopInfo;
    this.curve = this._getCurve();
  }

  get linkStructures(): Structure[] {
    const structures: Structure[] = [];
    
    this._rawFaceInfo.linkStructureIds.forEach((id: string) => {
      const entity = this.face.doc.getEntityById(id);
      if (entity) {
        structures.push(entity);
      }
    });

    const facesByTopoKey = this.face.getUniqueParent().roomBuilder.getFaceByTopoKey(this._rawFaceInfo.topoKey);
    
    if (facesByTopoKey.length !== 1 && this.curve) {
      return structures.filter((structure: Structure) =>
        structure.path.some((pathCurve: Curve) =>
          [
            MathAlg.CurveCuvePositonType.OVERLAP,
            MathAlg.CurveCuvePositonType.TOTALLY_OVERLAP
          ].includes(
            MathAlg.PositionJudge.curveCurveOverlap(pathCurve, this.curve!)
          )
        )
      );
    }
    
    return structures;
  }

  get prev(): Face | undefined {
    return this._loopInfo 
      ? TgUtil.getPrevWallFace(this.face, this._loopInfo) 
      : undefined;
  }

  get next(): Face | undefined {
    return this._loopInfo 
      ? TgUtil.getNextWallFace(this.face, this._loopInfo) 
      : undefined;
  }

  get linkSlabFace(): Face | undefined {
    const parent = this.face.getUniqueParent();
    return parent?.slabBuilder.getStructFaceLinkedSlabFace(this.face);
  }

  get curves(): Curve[] {
    return TgUtil.getFaceHorizonPlaneIntersect(this.face, 0);
  }

  private _getCurve(): Curve | undefined {
    const facesByTopoKey = this.face.getUniqueParent().roomBuilder.getFaceByTopoKey(this._rawFaceInfo.topoKey);
    
    if (facesByTopoKey.length !== 1) {
      const curve = TgWallUtil.getVerticalFaceCurve(
        this.face.wirePath.outer,
        this.face.surfaceObj.surface,
        this.face.surfaceObj.sameDirWithSurface
      );
      
      if (curve) {
        return curve;
      }
      
      Logger.console.error("区域划分后的info，存在错误的curve！！！！");
    }
    
    return this._rawFaceInfo.curve;
  }
}

interface RawFaceInfo {
  linkStructureIds: string[];
  topoKey: string;
  curve?: Curve;
}

interface LoopInfo {
  [key: string]: unknown;
}

interface Face {
  doc: Document;
  getUniqueParent(): Parent;
  wirePath: WirePath;
  surfaceObj: SurfaceObj;
}

interface Document {
  getEntityById(id: string): Structure | undefined;
}

interface Parent {
  roomBuilder: RoomBuilder;
  slabBuilder: SlabBuilder;
}

interface RoomBuilder {
  getFaceByTopoKey(topoKey: string): Face[];
}

interface SlabBuilder {
  getStructFaceLinkedSlabFace(face: Face): Face | undefined;
}

interface Structure {
  path: Curve[];
}

interface Curve {
  [key: string]: unknown;
}

interface WirePath {
  outer: unknown;
}

interface SurfaceObj {
  surface: unknown;
  sameDirWithSurface: boolean;
}