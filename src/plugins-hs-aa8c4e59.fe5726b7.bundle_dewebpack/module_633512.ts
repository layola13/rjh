interface Position {
  x: number;
  y: number;
  z: number;
}

interface Size {
  YSize: number;
}

interface Rotation {
  z: number;
}

interface Scale {
  XScale: number;
  YScale: number;
}

interface ContentMeta {
  contentType: {
    isTypeOf(type: any): boolean;
  };
  zIndex: string;
  XLength: number;
  YLength: number;
}

interface Room {
  id: string;
  roomType: string;
  forEachWall(callback: (wall: Wall) => void): void;
  getOuterLoopPolygon(): Polygon;
}

interface Wall {
  id: string;
  from: Point;
  to: Point;
  outline: Polygon;
}

interface Point {
  id: string;
  x: number;
  y: number;
}

interface Polygon {
  // Polygon structure definition
}

interface SubListItem {
  id: string;
  sub_list?: SubListItem[];
}

interface HostParams {
  meta: ContentMeta;
  position: Position;
  room: Room;
  size: Size;
  rotation: Rotation;
  scale: Scale;
}

interface SnappedFaceParams {
  room: Room;
  position: Position;
  size: Size;
  meta: ContentMeta;
  rotation: Rotation;
  scale: Scale;
}

interface WallFaceParams {
  x: number;
  y: number;
  XLength: number;
  XScale: number;
  YLength: number;
  YScale: number;
  ZRotation: number;
}

interface OpeningsInfo {
  doors: any[];
  holes: any[];
  windows: any[];
  bayWindows: any[];
}

interface WallInfo {
  lines: Record<string, {
    inner: number[][];
    middle: string[];
  }>;
  points: Record<string, number[]>;
}

interface RecommendData {
  id: string;
  type: string;
  style: string;
  area: number;
  height: number;
  floor: any;
  door_info: any[];
  hole_info: any[];
  window_info: any[];
  baywindow_info: any[];
  furniture_info: any[];
  decorate_info: any[];
  wall_info?: WallInfo;
}

interface RoomsRecommendation {
  id: string;
  style: string;
  room: RecommendData[];
  height: number;
}

const WALL_Z_INDEX = 400;
const DISTANCE_THRESHOLD = 0.03;

export default class ContentHelper {
  static getHost(params: HostParams): any {
    const { meta, position, room, size, rotation, scale } = params;
    let host: any;

    if (meta.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttachedLighting)) {
      host = HSCore.Util.Floor.getFloorCeiling(room);
    } else {
      const isWallZIndex = WALL_Z_INDEX === parseFloat(meta.zIndex);
      const snappedFace = isWallZIndex && this.getSnappedFace({
        room,
        position,
        size,
        meta,
        rotation,
        scale
      });

      if (snappedFace) {
        host = snappedFace;
      } else if (position.z === 0 || HSCore.Util.Math.nearlyEquals(position.z, 0)) {
        host = room;
      } else if (position.z !== 0) {
        host = undefined;
      }
    }

    return host;
  }

  static getSnappedFace(params: SnappedFaceParams): any {
    const { room, position, size, meta, rotation, scale } = params;
    let closestWall: Wall | undefined;
    const { x: posX, y: posY } = position;
    const { XLength, YLength } = meta;
    const { XScale, YScale } = scale;
    const zRotation = rotation.z;
    let minDistance = Number.MAX_VALUE;

    room.forEachWall((wall: Wall) => {
      const distance = HSCore.Util.Math.closestDistanceToPolygon(
        { x: posX, y: posY },
        wall.outline
      );

      if (distance - size.YSize / 2 < DISTANCE_THRESHOLD && minDistance > distance) {
        minDistance = distance;
        closestWall = wall;
      }
    });

    if (closestWall) {
      const wallFaceParams: WallFaceParams = {
        x: posX,
        y: posY,
        XLength,
        XScale,
        YLength,
        YScale,
        ZRotation: zRotation
      };
      return HSCore.Util.Content.getNearWallFace(closestWall, wallFaceParams);
    }

    return undefined;
  }

  static getSubListSeekIds(item: SubListItem): string[] {
    const ids: string[] = [];
    ids.push(item.id);

    if (item.sub_list) {
      item.sub_list.forEach((subItem: SubListItem) => {
        ids.xPushCollection(this.getSubListSeekIds(subItem));
      });
    }

    return ids;
  }

  static getAllSeekIds(items: SubListItem[]): string[] {
    const allIds: string[] = [];

    items.forEach((item: SubListItem) => {
      allIds.xPushCollection(this.getSubListSeekIds(item));
    });

    return allIds;
  }

  static isDefaultEnv(): boolean {
    return HSApp.App.getApp().isUnderDefaultEnvironment();
  }

  static getRoomsInfoForRecommendation(): RoomsRecommendation {
    const app = HSApp.App.getApp();
    const roomsData: RecommendData[] = [];
    const designStyle = HSApp.Util.Recommend.getDesignStyle();

    HSCore.Util.Layer.getActiveLayer().forEachRoom((room: Room) => {
      const { contentsIncludeGroup, decorativeContents } = HSApp.Util.Recommend.getRoomContents(room);
      roomsData.push(
        this.prepareRecommendData(room, contentsIncludeGroup, decorativeContents, designStyle, true, true)
      );
    });

    return {
      id: app.designMetadata.get("designId"),
      style: designStyle,
      room: roomsData,
      height: app.floorplan.scene.activeLayer.height
    };
  }

  static prepareRecommendData(
    room: Room,
    contents: any[],
    decorativeContents: any[],
    designStyle: string,
    includeOpenings: boolean = false,
    includeWallInfo: boolean = false
  ): RecommendData {
    const app = HSApp.App.getApp();
    const floorPoint = HSApp.Util.Recommend.getFloorPoint(room);
    const openingsInfo: OpeningsInfo = HSApp.Util.Recommend.getOpeningsInfo(room, includeOpenings);
    const { doors, holes, windows, bayWindows } = openingsInfo;
    const furnitureInfo = HSApp.Util.Recommend.getFurnitureOrDecorateInfo(contents);
    const decorateInfo = HSApp.Util.Recommend.getFurnitureOrDecorateInfo(decorativeContents);

    const data: RecommendData = {
      id: `${room.roomType}-${room.id}`,
      type: room.roomType || "",
      style: designStyle,
      area: HSCore.Util.Room.getArea(room),
      height: app.floorplan.scene.activeLayer.height,
      floor: floorPoint,
      door_info: doors,
      hole_info: holes,
      window_info: windows,
      baywindow_info: bayWindows,
      furniture_info: furnitureInfo,
      decorate_info: decorateInfo
    };

    if (includeWallInfo) {
      data.wall_info = this.getWallInfo(room);
    }

    return data;
  }

  static getWallInfo(room: Room): WallInfo {
    const wallInfo: WallInfo = {
      lines: {},
      points: {}
    };

    if (HSCore.Util.Room.isSmallRoom(room)) {
      return wallInfo;
    }

    const outerPolygon = room.getOuterLoopPolygon();

    const processWall = (wall: Wall): void => {
      const geometry = HSApp.App.getApp().geometryManager.getGeometry(wall).geometry;
      const innerPoints: number[][] = [];

      if (geometry) {
        geometry.forEach((point: Point) => {
          const { x, y } = point;
          if (HSCore.Util.Math.isPointInPolygon({ x, y }, outerPolygon)) {
            innerPoints.push([x, y]);
          }
        });

        wallInfo.lines[wall.id] = {
          inner: innerPoints,
          middle: [wall.from.id, wall.to.id]
        };
        wallInfo.points[wall.from.id] = [wall.from.x, wall.from.y];
        wallInfo.points[wall.to.id] = [wall.to.x, wall.to.y];
      }
    };

    room.forEachWall((wall: Wall) => {
      processWall(wall);
    });

    const faceRoomInfo = HSCore.Doc.getDocManager().geometryManager.getFaceRoomInfoExt(room);
    if (faceRoomInfo.isolatedWallFaces?.walls) {
      faceRoomInfo.isolatedWallFaces.walls.forEach((wall: Wall) => {
        processWall(wall);
      });
    }

    return wallInfo;
  }
}