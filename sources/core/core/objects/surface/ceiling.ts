import { MaterialUtil } from './MaterialUtil';
import { Face, Face_IO } from './Face';
import { Entity, EntityField } from './Entity';
import { Signal } from './Signal';
import { Wall } from './Wall';
import { RoomSurfaceTypeEnum } from './RoomSurfaceType';

interface DumpOptions {
  saveDesign?: boolean;
  [key: string]: unknown;
}

interface LoadOptions {
  version?: string;
  [key: string]: unknown;
}

interface DivideInfo {
  [key: string]: unknown;
}

interface CeilingData {
  divideInfo?: DivideInfo;
  isSplitCeiling?: boolean;
  [key: string]: unknown;
}

interface Material {
  mixpaint?: {
    transform(matrix: unknown): void;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface RoomInfo {
  structures: unknown[];
  faces: unknown[];
}

interface LayerInfo {
  getCeilingRoomInfos(ceiling: Ceiling): RoomInfo[];
}

export class Ceiling_IO extends Face_IO {
  dump(
    entity: Ceiling,
    callback?: (result: CeilingData[], entity: Ceiling) => void,
    includeGeometry: boolean = true,
    options: DumpOptions = {}
  ): CeilingData[] {
    if (entity.isSplitCeiling && options.saveDesign) {
      return [];
    }

    HSCore.Util.Ceiling.dumpCeilingDivideInfo(entity, entity.getMaster());

    const result = super.dump(entity, undefined, includeGeometry, options);
    const data = result[0];

    data.divideInfo = entity.divideInfo;

    if (entity.isSplitCeiling) {
      data.isSplitCeiling = entity.isSplitCeiling;
    }

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  load(entity: Ceiling, data: CeilingData, options: LoadOptions = {}): void {
    super.load(entity, data, options);

    entity.__divideInfo = data.divideInfo;
    entity.isSplitCeiling = !!data.isSplitCeiling;

    if (
      HSCore.Util.Version.isEarlierThan(options.version, '0.14') &&
      entity.__material?.mixpaint &&
      MaterialUtil.isRCP(entity)
    ) {
      const matrix = MaterialUtil.getMigrateCeilingRCPMatrix(entity.__material.mixpaint);
      entity.__material.mixpaint.transform(matrix);
    }
  }

  migrateLoad(entity: Ceiling, data: CeilingData, options: LoadOptions = {}): void {
    super.migrateLoad(entity, data, options);

    entity.__divideInfo = data.divideInfo;
    entity.isSplitCeiling = !!data.isSplitCeiling;

    if (
      HSCore.Util.Version.isEarlierThan(options.version, '0.14') &&
      entity.__material?.mixpaint &&
      MaterialUtil.isRCP(entity)
    ) {
      const matrix = MaterialUtil.getMigrateCeilingRCPMatrix(entity.__material.mixpaint);
      entity.__material.mixpaint.transform(matrix);
    }
  }
}

export class Ceiling extends Face {
  @EntityField()
  divideInfo?: DivideInfo;

  __divideInfo?: DivideInfo;
  __material?: Material;

  signalContentAdded: Signal<this>;
  signalContentRemoved: Signal<this>;
  isSplitCeiling: boolean = false;

  constructor(id: string = '', doc?: unknown) {
    super(id, doc);
    this.signalContentAdded = new Signal(this);
    this.signalContentRemoved = new Signal(this);
    this.isSplitCeiling = false;
  }

  static create(
    id: string,
    geometry: unknown,
    material: unknown,
    doc: unknown
  ): Ceiling {
    const ceiling = new Ceiling();
    Face._initFace(ceiling, id, geometry, material, doc);
    return ceiling;
  }

  getIO(): Ceiling_IO {
    return Ceiling_IO.instance();
  }

  forEachWall(
    callback: (wall: Wall) => void,
    context?: unknown
  ): void {
    if (!callback) return;

    let structures: unknown[] = [];
    for (const roomInfo of this.roomInfos) {
      structures.push(...roomInfo.structures);
    }

    structures = [...new Set(structures)];

    structures
      .filter((structure): structure is Wall => structure instanceof Wall)
      .forEach((wall) => {
        callback.call(context, wall);
      });
  }

  forEachSurface(
    callback: (surfaceType: RoomSurfaceTypeEnum) => void,
    context?: unknown
  ): void {
    if (callback) {
      callback.call(context, RoomSurfaceTypeEnum.floor);
    }
  }

  get roomInfos(): RoomInfo[] {
    const layer = HSCore.Util.Layer.getEntityLayer(this);
    return (layer && this.doc.getLayerInfo(layer).getCeilingRoomInfos(this)) || [];
  }

  forEachStructureFace(
    callback: (face: unknown) => void,
    context?: unknown
  ): void {
    if (callback) {
      this.structureFaces.forEach((face) => {
        callback.call(context, face);
      });
    }
  }

  get structureFaces(): unknown[] {
    const faces: unknown[] = [];
    for (const roomInfo of this.roomInfos) {
      faces.push(...roomInfo.faces);
    }
    return [...new Set(faces)];
  }
}

Entity.registerClass(HSConstants.ModelClass.NgCeiling, Ceiling);