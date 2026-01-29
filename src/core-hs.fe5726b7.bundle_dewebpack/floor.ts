import { Face_IO, Face } from './Face';
import { Entity, EntityField } from './Entity';
import { MaterialIdEnum } from './Material';
import { Wall } from './Wall';

enum RoomFlagEnum {
  ceilingOff = 256,
  hoverOn = 512,
  clickOn = 1024,
  dimensionOff = 2048,
  roomtypeOff = 4096
}

Object.freeze(RoomFlagEnum);

enum RoomSurfaceTypeEnum {
  floor = "floor",
  ceiling = "ceiling"
}

Object.freeze(RoomSurfaceTypeEnum);

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadContext {
  version: string;
  data?: Record<string, { seekId?: string }>;
}

interface FloorData {
  roomType?: string;
  roomTypeDisplayName?: string;
  material?: string;
  [key: string]: unknown;
}

interface RoomInfo {
  structures: unknown[];
  faces: unknown[];
}

class Floor_IO extends Face_IO {
  dump(
    entity: Floor,
    callback?: (dumped: unknown[], entity: Floor) => void,
    includeDefaults: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const dumped = super.dump(entity, undefined, includeDefaults, options);
    const firstElement = dumped[0] as FloorData;
    
    firstElement.roomType = entity.__roomType;
    firstElement.roomTypeDisplayName = entity.__roomTypeDisplayName;
    
    if (callback) {
      callback(dumped, entity);
    }
    
    return dumped;
  }

  load(entity: Floor, data: FloorData, context: LoadContext): void {
    super.load(entity, data, context);
    
    if (HSCore.Util.Version.isEarlierThan(context.version, "0.29")) {
      const materialData = context.data && data.material 
        ? context.data[data.material] 
        : undefined;
      
      if (materialData?.seekId === MaterialIdEnum.generated) {
        entity.material.seekId = HSConstants.Constants.DEFAULT_FLOOR_MATERIAL_SEEKID;
      }
    }
    
    entity.__roomType = data.roomType;
    entity.__roomTypeDisplayName = data.roomTypeDisplayName;
  }

  migrateLoad(entity: Floor, data: FloorData, context: LoadContext): void {
    super.migrateLoad(entity, data, context);
    
    if (HSCore.Util.Version.isEarlierThan(context.version, "0.29")) {
      const materialData = context.data && data.material 
        ? context.data[data.material] 
        : undefined;
      
      if (materialData?.seekId === MaterialIdEnum.generated) {
        entity.material.seekId = HSConstants.Constants.DEFAULT_FLOOR_MATERIAL_SEEKID;
      }
    }
    
    entity.__roomType = data.roomType;
    entity.__roomTypeDisplayName = data.roomTypeDisplayName;
  }
}

class Floor extends Face {
  @EntityField()
  __roomType?: string;

  @EntityField()
  __roomTypeDisplayName: string;

  constructor(id: string = "", document?: unknown) {
    super(id, document);
    this.__roomTypeDisplayName = "";
  }

  static create(
    id: string,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ): Floor {
    const floor = new Floor();
    Face._initFace(floor, id, param2, param3, param4);
    return floor;
  }

  getIO(): Floor_IO {
    return Floor_IO.instance();
  }

  forEachWall(callback: (wall: Wall) => void, context?: unknown): void {
    if (!callback) return;

    let structures: unknown[] = [];
    for (const roomInfo of this.roomInfos) {
      structures.push(...roomInfo.structures);
    }
    
    structures = [...new Set(structures)];
    
    structures
      .filter((structure): structure is Wall => structure instanceof Wall)
      .forEach((wall: Wall) => {
        callback.call(context, wall);
      });
  }

  forEachSurface(callback: (surface: RoomSurfaceTypeEnum) => void, context?: unknown): void {
    if (!callback) return;

    const surfaces: RoomSurfaceTypeEnum[] = [];
    surfaces.push(RoomSurfaceTypeEnum.floor);
    
    surfaces.forEach((surface: RoomSurfaceTypeEnum) => {
      callback.call(context, surface);
    });
  }

  get ceilingHeight3d(): number {
    const parent = this.getUniqueParent();
    return parent instanceof HSCore.Model.Layer ? parent.height : 0;
  }

  get roomInfos(): RoomInfo[] {
    const layer = HSCore.Util.Layer.getEntityLayer(this);
    return layer instanceof HSCore.Model.Layer 
      ? this.doc.getLayerInfo(layer).getFloorRoomInfos(this) 
      : [];
  }

  forEachStructureFace(callback: (face: unknown) => void, context?: unknown): void {
    if (!callback) return;
    
    this.structureFaces.forEach((face: unknown) => {
      callback.call(context, face);
    });
  }

  get structureFaces(): unknown[] {
    const faces: unknown[] = [];
    for (const roomInfo of this.roomInfos) {
      faces.push(...roomInfo.faces);
    }
    return [...new Set(faces)];
  }
}

Entity.registerClass(HSConstants.ModelClass.NgFloor, Floor);

export { Floor_IO, RoomSurfaceTypeEnum, RoomFlagEnum, Floor };