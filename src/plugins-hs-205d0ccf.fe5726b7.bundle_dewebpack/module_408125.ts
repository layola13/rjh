interface FurnitureInfo {
  id: string;
  type: string;
  style: string;
  size: [number, number, number];
  scale: [number, number, number];
  position: [number, number, number];
  rotation: [number, number, number];
}

interface RecommendData {
  id: string;
  type: string;
  style: string;
  area: number;
  furniture_info: FurnitureInfo[];
}

interface FurnitureEntity {
  seekId: string;
  contentType: {
    getTypeString(): string;
    isTypeOf(type: unknown): boolean;
  };
  metadata: {
    productStyle: string;
  };
  XSize: number;
  YSize: number;
  ZSize: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  rotation: number;
  getHoleZ?(): number;
}

interface RoomEntity {
  id: string;
  roomType: string;
}

interface EntityWithFlag {
  isFlagOn?(flag: unknown): boolean;
}

class FurnitureRecommendService {
  static getFurnitureInfo(entity: FurnitureEntity): FurnitureInfo[] {
    const {
      seekId,
      contentType,
      metadata,
      XSize,
      YSize,
      ZSize,
      XScale,
      YScale,
      ZScale,
      x,
      y,
      XRotation,
      YRotation,
      rotation
    } = entity;

    let zPosition = entity.z;

    if (
      entity instanceof HSCore.Model.ParametricOpening &&
      contentType.isTypeOf(HSCatalog.ContentTypeEnum.BayWindow) &&
      entity.getHoleZ
    ) {
      zPosition = entity.getHoleZ();
    }

    return [
      {
        id: seekId,
        type: contentType.getTypeString(),
        style: metadata.productStyle,
        size: [XSize, YSize, ZSize],
        scale: [XScale, YScale, ZScale],
        position: [x, y, zPosition],
        rotation: [XRotation, YRotation, rotation]
      }
    ];
  }

  static isDefaultEnv(): boolean {
    return HSApp.App.getApp().isUnderDefaultEnvironment();
  }

  static prepareRecommendData(
    room: RoomEntity,
    furniture: FurnitureEntity,
    style: string
  ): RecommendData {
    const furnitureInfo = this.getFurnitureInfo(furniture);

    return {
      id: `${room.roomType}-${room.id}`,
      type: room.roomType || "",
      style,
      area: HSCore.Util.Room.getArea(room),
      furniture_info: furnitureInfo
    };
  }

  static isContentExist(entities: EntityWithFlag[]): boolean {
    return entities.some((entity) => {
      return (
        entity &&
        entity.isFlagOn &&
        !entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed)
      );
    });
  }
}

export default FurnitureRecommendService;