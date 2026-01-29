import { Face_IO, Face } from './Face';
import { Entity } from './Entity';
import { EntityField } from './EntityField';
import { MaterialIdEnum } from './Material';

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

class Floor_IO extends Face_IO {
  load(
    entity: Floor,
    data: any,
    context: any,
    metadata: any
  ): void {
    super.load(entity, data, context, metadata);

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
  roomType?: string;

  @EntityField()
  roomTypeDisplayName?: string;

  __roomType?: string;
  __roomTypeDisplayName: string;

  constructor(id: string = "") {
    super(id);
    this.__roomTypeDisplayName = "";
  }

  getIO(): Floor_IO {
    return Floor_IO.instance();
  }

  forEachSurface(
    callback?: (surfaceType: RoomSurfaceTypeEnum) => void,
    context?: any
  ): void {
    if (!callback) return;

    const surfaces: RoomSurfaceTypeEnum[] = [];
    surfaces.push(RoomSurfaceTypeEnum.floor);

    surfaces.forEach((surfaceType) => {
      callback.call(context, surfaceType);
    });
  }
}

Entity.registerClass(HSConstants.ModelClass.NgFloor, Floor);

export { Floor, RoomFlagEnum, RoomSurfaceTypeEnum, Floor_IO };