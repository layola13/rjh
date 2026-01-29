import { Polygon, Loop, Vector2, MathAlg } from './math-library';
import { TgUtil } from './tg-util';
import { ClipMode } from './clip-mode';

interface RawPath2D {
  outer: any[];
  holes: any[][];
}

interface FaceTopoInfo {
  isAux: boolean;
  topoKey: string;
}

interface StructureFaceInfos {
  outer: FaceTopoInfo[];
  holes: FaceTopoInfo[][];
}

interface Region {
  id: string;
  splitCurves: Array<{ curve: any }>;
}

interface RawRoomInfo {
  structureFaceInfos: StructureFaceInfos;
  region: Region;
  path: RawPath2D;
  geometry: any;
  structures: any[];
  faces: any[];
}

interface FaceInfo {
  id: string;
  order: number;
  faceInfo: any;
}

interface Face {
  id: string;
  faceInfo: any;
  rawPath: RawPath2D;
}

interface RoomBuilder {
  getFaceByTopoKey(topoKey: string): Face[];
  faceMap: Map<string, FaceInfo>;
}

interface LayerInfo {
  getSpaceInfosByRoomRegion(regionId: string): any[];
}

interface Floor {
  worldRawPath2d: any;
}

interface Ceiling {
  worldRawPath2d: any;
}

interface Beam {
  faceList: Face[];
}

interface Layer {
  roomBuilder: RoomBuilder;
  layerInfo: LayerInfo;
  beams: Record<string, Beam>;
  forEachFloor(callback: (floor: Floor) => void): void;
  forEachCeiling(callback: (ceiling: Ceiling) => void): void;
}

export class TgRoomInfo {
  private readonly _rawRoomInfo: RawRoomInfo;
  private readonly _layer: Layer;
  private readonly _worldRawPath2dMap?: Map<any, any>;
  private _structureFaceInfos?: { outer: any[]; holes: any[][] };
  private _floors?: Floor[];
  private _ceilings?: Ceiling[];
  private _beamFaces?: Face[];

  constructor(
    rawRoomInfo: RawRoomInfo,
    layer: Layer,
    worldRawPath2dMap?: Map<any, any>
  ) {
    this._rawRoomInfo = rawRoomInfo;
    this._layer = layer;
    this._worldRawPath2dMap = worldRawPath2dMap;
  }

  private _getFaceInfo(faceTopoInfo: FaceTopoInfo): any[] {
    if (faceTopoInfo.isAux) {
      return [];
    }

    const faces = this._layer.roomBuilder.getFaceByTopoKey(faceTopoInfo.topoKey);
    faces.sort((a, b) => {
      const orderA = this._layer.roomBuilder.faceMap.get(a.id)?.order ?? 0;
      const orderB = this._layer.roomBuilder.faceMap.get(b.id)?.order ?? 0;
      return orderB - orderA;
    });

    return faces.map(face => face.faceInfo);
  }

  get structureFaceInfos(): { outer: any[]; holes: any[][] } {
    if (!this._structureFaceInfos) {
      const outer = this._rawRoomInfo.structureFaceInfos.outer.reduce(
        (accumulator, topoInfo) => {
          this._getFaceInfo(topoInfo).forEach(faceInfo => accumulator.push(faceInfo));
          return accumulator;
        },
        [] as any[]
      );

      const holes = this._rawRoomInfo.structureFaceInfos.holes.map(hole =>
        hole.reduce(
          (accumulator, topoInfo) => {
            this._getFaceInfo(topoInfo).forEach(faceInfo => accumulator.push(faceInfo));
            return accumulator;
          },
          [] as any[]
        )
      );

      this._structureFaceInfos = { outer, holes };
    }

    return this._structureFaceInfos;
  }

  get splitCurves(): any[] {
    return this._rawRoomInfo.region.splitCurves.map(item => item.curve);
  }

  private _isPathInRoom(path: any): boolean {
    return TgUtil.clip([path], [this._rawRoomInfo.path], ClipMode.Inter).length > 0;
  }

  get spaceInfos(): any[] {
    return this._layer.layerInfo.getSpaceInfosByRoomRegion(this._rawRoomInfo.region.id);
  }

  get floors(): Floor[] {
    if (!this._floors) {
      const allFloors: Floor[] = [];
      this._layer.forEachFloor(floor => allFloors.push(floor));

      this._floors = allFloors.filter(floor => {
        const worldPath = this._worldRawPath2dMap?.get(floor) ?? floor.worldRawPath2d;
        return this._isPathInRoom(worldPath);
      });
    }

    return this._floors;
  }

  get ceilings(): Ceiling[] {
    if (!this._ceilings) {
      const allCeilings: Ceiling[] = [];
      this._layer.forEachCeiling(ceiling => allCeilings.push(ceiling));

      this._ceilings = allCeilings.filter(ceiling => {
        const worldPath = this._worldRawPath2dMap?.get(ceiling) ?? ceiling.worldRawPath2d;
        return this._isPathInRoom(worldPath);
      });
    }

    return this._ceilings;
  }

  get structures(): any[] {
    return this._rawRoomInfo.structures;
  }

  get faces(): any[] {
    return this._rawRoomInfo.faces;
  }

  get beamFaces(): Face[] {
    if (!this._beamFaces) {
      const loops = [this._rawRoomInfo.path.outer]
        .concat(this._rawRoomInfo.path.holes)
        .map(path => new Loop(path));
      const polygon = new Polygon(loops);

      const allBeamFaces = Object.values(this._layer.beams)
        .map(beam => beam.faceList)
        .flat();

      this._beamFaces = allBeamFaces.filter(face => {
        const startPoints = face.rawPath.outer.map(segment => segment.getStartPt());
        return startPoints.some(point => {
          const position = MathAlg.PositionJudge.ptToPolygon(new Vector2(point), polygon);
          return position !== MathAlg.PtLoopPositonType.OUT;
        });
      });
    }

    return this._beamFaces;
  }

  get path(): RawPath2D {
    return this._rawRoomInfo.path;
  }

  get geometry(): any {
    return this._rawRoomInfo.geometry;
  }
}