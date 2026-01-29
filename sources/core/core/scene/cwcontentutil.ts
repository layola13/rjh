interface ContentEntity {
  z: number;
  ZSize: number;
  x?: number;
  y?: number;
  contentType: ContentType;
  getHost?: () => ContentEntity | null;
  getUniqueParent(): Layer;
}

interface ContentType {
  isTypeOf(type: HSCatalog.ContentTypeEnum | HSCatalog.ContentTypeEnum[]): boolean;
}

interface Layer {
  // Layer interface definition
}

interface Face {
  worldRawPath2d: {
    outer: Curve[];
    holes: Curve[];
  };
}

interface Curve {
  getLength(): number;
  getProjectedPtBy(point: ContentEntity): Vector2;
  containsPoint(point: Vector2): boolean;
}

interface Vector2 {
  x: number;
  y: number;
  distanceTo(point: ContentEntity | Vector2): number;
}

interface Loop {
  constructor(curve: Curve);
}

interface Polygon {
  constructor(loops: Loop[]);
}

interface RoomInfo {
  faces: Face[];
  ceilings: Ceiling[];
}

interface Room {
  roomInfos: RoomInfo[];
}

interface Ceiling {
  worldRawPath2d: {
    outer: Curve;
    holes: Curve[];
  };
}

enum ToHostMaxDistance {
  toHostMaxDistance = 0.1
}

export class CWContentUtil {
  private static readonly TO_HOST_MAX_DISTANCE = 0.1;

  static getHostFace(entity: ContentEntity): ContentEntity | Face | Ceiling | undefined {
    const findHost = (current: ContentEntity | null): ContentEntity | null => {
      if (!current || current instanceof HSCore.Model.Floor || current instanceof HSCore.Model.Wall) {
        return current;
      }
      return findHost(current.getHost?.() ?? null);
    };

    let hostEntity = findHost(entity);
    const entityLayer = Util.Layer.getEntityLayer(entity);

    if (hostEntity && Util.Layer.getEntityLayer(hostEntity) !== entityLayer) {
      hostEntity = undefined;
    }

    if (hostEntity && !(hostEntity instanceof HSCore.Model.Floor)) {
      return hostEntity;
    }

    let checkFloor = true;
    let checkCeiling = true;
    let useEntityZ = true;

    if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Lighting) &&
        !entity.contentType.isTypeOf([
          HSCatalog.ContentTypeEnum.CabinetLighting,
          HSCatalog.ContentTypeEnum.DeskLighting,
          HSCatalog.ContentTypeEnum.FloorLamp
        ])) {
      if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.WallLamp)) {
        checkCeiling = false;
        checkFloor = true;
      } else {
        checkCeiling = true;
        checkFloor = false;
      }
    } else if (entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ColdWaterValve)) {
      checkCeiling = false;
      useEntityZ = false;
    }

    let minDistance = useEntityZ ? entity.z : undefined;

    const rooms = Util.Room.getRoomsContentIn(entity, entityLayer);
    const room = rooms[0];
    if (!room) {
      return hostEntity;
    }

    const hasRoomInfo = room.roomInfos.length > 0 && room.roomInfos[0];
    if (!hasRoomInfo) {
      return hostEntity;
    }

    const roomInfo = hasRoomInfo;

    if (checkFloor && (minDistance === undefined || Math.abs(minDistance) > CWContentUtil.TO_HOST_MAX_DISTANCE)) {
      for (const face of roomInfo.faces) {
        const outerCurve = face.worldRawPath2d.outer.find((curve) =>
          MathUtil.isNearlyBigger(curve.getLength(), 0)
        );

        if (!outerCurve) {
          continue;
        }

        const projectedPoint = outerCurve.getProjectedPtBy(entity);
        if (!outerCurve.containsPoint(projectedPoint)) {
          continue;
        }

        const distance = projectedPoint.distanceTo(entity);
        if (minDistance === undefined || minDistance > distance) {
          minDistance = distance;
          hostEntity = face;
        }
      }
    }

    if (checkCeiling) {
      const parentLayer = entity.getUniqueParent();
      const layerHeight = HSCore.Util.Layer.getLayerHeight(parentLayer);

      if (minDistance !== undefined && Math.abs(layerHeight - (entity.z + entity.ZSize)) < minDistance) {
        const ceiling = roomInfo.ceilings.find((ceiling) => {
          const { outer, holes } = ceiling.worldRawPath2d;
          const loops: Loop[] = [];

          loops.push(new Loop(outer));
          holes.forEach((hole) => loops.push(new Loop(hole)));

          const polygon = new Polygon(loops);
          const point = new Vector2(entity.x ?? 0, entity.y ?? 0);

          return MathAlg.PositionJudge.ptToPolygon(point, polygon) !== MathAlg.PtLoopPositonType.OUT;
        });

        if (ceiling) {
          hostEntity = ceiling;
        }
      }
    }

    return hostEntity;
  }
}