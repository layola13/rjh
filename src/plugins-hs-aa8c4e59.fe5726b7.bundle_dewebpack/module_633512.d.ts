/**
 * 房间和内容推荐工具类
 * 提供房间分析、墙面捕捉、内容定位等功能
 */

/**
 * 3D 位置坐标
 */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D 位置坐标
 */
export interface Position2D {
  x: number;
  y: number;
}

/**
 * 尺寸信息
 */
export interface Size {
  XSize: number;
  YSize: number;
  ZSize: number;
}

/**
 * 缩放比例
 */
export interface Scale {
  XScale: number;
  YScale: number;
  ZScale: number;
}

/**
 * 旋转角度
 */
export interface Rotation {
  x: number;
  y: number;
  z: number;
}

/**
 * 内容元数据
 */
export interface ContentMeta {
  contentType: any;
  zIndex: string | number;
  XLength: number;
  YLength: number;
}

/**
 * 墙面信息
 */
export interface Wall {
  id: string;
  outline: Position2D[];
  from: WallPoint;
  to: WallPoint;
}

/**
 * 墙面端点
 */
export interface WallPoint {
  id: string;
  x: number;
  y: number;
}

/**
 * 房间对象
 */
export interface Room {
  id: string;
  roomType: string;
  forEachWall(callback: (wall: Wall) => void): void;
  getOuterLoopPolygon(): Position2D[];
}

/**
 * 内容位置参数
 */
export interface ContentPositionParams {
  meta: ContentMeta;
  position: Position3D;
  room: Room;
  size: Size;
  rotation: Rotation;
  scale: Scale;
}

/**
 * 墙面捕捉参数
 */
export interface WallSnapParams {
  room: Room;
  position: Position3D;
  size: Size;
  meta: ContentMeta;
  rotation: Rotation;
  scale: Scale;
}

/**
 * 内容项（包含子列表）
 */
export interface ContentItem {
  id: string;
  sub_list?: ContentItem[];
}

/**
 * 推荐数据（房间信息）
 */
export interface RoomRecommendData {
  id: string;
  type: string;
  style: string;
  area: number;
  height: number;
  floor: Position2D[];
  door_info: OpeningInfo[];
  hole_info: OpeningInfo[];
  window_info: OpeningInfo[];
  baywindow_info: OpeningInfo[];
  furniture_info: ContentInfo[];
  decorate_info: ContentInfo[];
  wall_info?: WallInfo;
}

/**
 * 开口信息（门窗等）
 */
export interface OpeningInfo {
  id: string;
  position: Position2D;
  size: number[];
  rotation: number;
}

/**
 * 内容信息（家具装饰等）
 */
export interface ContentInfo {
  id: string;
  category: string;
  position: Position3D;
  size: Size;
  rotation: Rotation;
}

/**
 * 墙面信息（用于推荐系统）
 */
export interface WallInfo {
  lines: Record<string, WallLineInfo>;
  points: Record<string, [number, number]>;
}

/**
 * 墙面线段信息
 */
export interface WallLineInfo {
  inner: Array<[number, number]>;
  middle: [string, string];
}

/**
 * 设计推荐数据（完整场景）
 */
export interface DesignRecommendData {
  id: string;
  style: string;
  room: RoomRecommendData[];
  height: number;
}

/**
 * 房间内容工具类
 * 提供内容定位、墙面捕捉、推荐数据生成等功能
 */
export default class RoomContentUtil {
  /**
   * 获取内容的宿主对象（房间或天花板）
   * @param params - 内容位置参数
   * @returns 宿主对象（Room 或 Ceiling），如果无法确定则返回 undefined
   */
  static getHost(params: ContentPositionParams): Room | any | undefined;

  /**
   * 获取内容捕捉到的墙面
   * @param params - 墙面捕捉参数
   * @returns 捕捉到的墙面对象，如果未捕捉到则返回 undefined
   */
  static getSnappedFace(params: WallSnapParams): Wall | undefined;

  /**
   * 递归获取内容项及其子列表的所有 ID
   * @param item - 内容项
   * @returns ID 数组
   */
  static getSubListSeekIds(item: ContentItem): string[];

  /**
   * 获取内容列表中所有项的 ID（包括子列表）
   * @param items - 内容项数组
   * @returns 所有 ID 的数组
   */
  static getAllSeekIds(items: ContentItem[]): string[];

  /**
   * 检查当前是否为默认环境
   * @returns 如果是默认环境返回 true
   */
  static isDefaultEnv(): boolean;

  /**
   * 获取所有房间的推荐信息
   * @returns 设计推荐数据（包含所有房间）
   */
  static getRoomsInfoForRecommendation(): DesignRecommendData;

  /**
   * 准备单个房间的推荐数据
   * @param room - 房间对象
   * @param contents - 包含分组的内容列表
   * @param decorativeContents - 装饰性内容列表
   * @param style - 设计风格
   * @param includeOpenings - 是否包含开口信息（默认 false）
   * @param includeWalls - 是否包含墙面信息（默认 false）
   * @returns 房间推荐数据
   */
  static prepareRecommendData(
    room: Room,
    contents: any[],
    decorativeContents: any[],
    style: string,
    includeOpenings?: boolean,
    includeWalls?: boolean
  ): RoomRecommendData;

  /**
   * 获取房间的墙面信息（用于推荐系统）
   * @param room - 房间对象
   * @returns 墙面信息对象
   */
  static getWallInfo(room: Room): WallInfo;
}