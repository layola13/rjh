interface RawSlabInfo {
  structures: unknown[];
  structuresInSlab: unknown[];
  faces: unknown[];
  path: SlabPath;
  geometry: unknown;
  structureFaceInfos: FaceTopoInfo[];
}

interface SlabPath {
  outer: Curve[];
  holes: Curve[];
}

interface Curve {
  // Define curve properties based on actual usage
  [key: string]: unknown;
}

interface Vector {
  x: number;
  y: number;
  z?: number;
}

interface SlabGeometry {
  outer: Vector[];
  holes: never[];
}

interface FaceTopoInfo {
  topoKey: string;
}

interface FaceInfo {
  faceInfo: unknown;
}

interface Face {
  faceInfo: unknown;
}

interface RoomBuilder {
  getFaceByTopoKey(topoKey: string): { map<T>(fn: (face: Face) => T): T[] };
}

interface UniqueParent {
  roomBuilder: RoomBuilder;
}

interface Slab {
  path?: SlabPath;
  getUniqueParent(): UniqueParent;
}

class TgWallUtil {
  static getVectorsFromCurves(curves: Curve[]): Vector[] {
    // Implementation would be defined elsewhere
    return [];
  }
}

class TgSlabUtil {
  static getSlabRawPath(slab: Slab): SlabPath {
    // Implementation would be defined elsewhere
    return { outer: [], holes: [] };
  }
}

export class TgSlabInfo {
  private readonly _rawSlabInfo: RawSlabInfo;
  public readonly slab: Slab;
  public readonly structures: unknown[];
  public readonly structuresInSlab: unknown[];
  public readonly faces: unknown[];
  public readonly rawPath: SlabPath;
  public readonly rawGeometry: unknown;

  constructor(slab: Slab, rawSlabInfo: RawSlabInfo) {
    this._rawSlabInfo = rawSlabInfo;
    this.slab = slab;
    this.structures = this._rawSlabInfo.structures;
    this.structuresInSlab = this._rawSlabInfo.structuresInSlab;
    this.faces = this._rawSlabInfo.faces;
    this.rawPath = this._rawSlabInfo.path;
    this.rawGeometry = this._rawSlabInfo.geometry;
  }

  private _getFaceInfo(faceTopoInfo: FaceTopoInfo): unknown[] {
    return this.slab
      .getUniqueParent()
      .roomBuilder.getFaceByTopoKey(faceTopoInfo.topoKey)
      .map((face: Face) => face.faceInfo);
  }

  get path(): SlabPath {
    return this.slab.path ?? TgSlabUtil.getSlabRawPath(this.slab);
  }

  get geometry(): SlabGeometry {
    return {
      outer: TgWallUtil.getVectorsFromCurves(this.path.outer),
      holes: []
    };
  }

  get structureFaceInfos(): unknown[] {
    return this._rawSlabInfo.structureFaceInfos.reduce(
      (accumulator: unknown[], faceTopoInfo: FaceTopoInfo) => {
        this._getFaceInfo(faceTopoInfo).forEach((faceInfo: unknown) => {
          accumulator.push(faceInfo);
        });
        return accumulator;
      },
      []
    );
  }
}