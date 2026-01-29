/**
 * 房间信息类型声明文件
 * 提供对Telegram或其他系统中房间数据的访问和处理功能
 */

import { Vector2, Polygon, Loop, MathAlg } from './math-module';
import { TgUtil } from './tg-util';
import { ClipMode } from './clip-mode';

/**
 * 面信息接口
 * 描述房间中的一个面（墙面、地面等）
 */
export interface FaceInfo {
  /** 面的唯一标识 */
  id: string;
  /** 面的顺序 */
  order: number;
  /** 其他面的属性 */
  [key: string]: unknown;
}

/**
 * 拓扑键接口
 * 用于标识面的拓扑结构
 */
export interface TopoKeyInfo {
  /** 拓扑键 */
  topoKey: string;
  /** 是否为辅助面 */
  isAux: boolean;
}

/**
 * 结构面信息接口
 * 包含外轮廓和内孔的面信息
 */
export interface StructureFaceInfos {
  /** 外轮廓面信息列表 */
  outer: FaceInfo[];
  /** 内孔面信息列表（每个孔是一个FaceInfo数组） */
  holes: FaceInfo[][];
}

/**
 * 路径接口
 * 描述2D路径，包含外轮廓和孔洞
 */
export interface Path2D {
  /** 外轮廓点数组 */
  outer: Vector2[];
  /** 孔洞点数组的数组 */
  holes: Vector2[][];
}

/**
 * 分割曲线信息接口
 */
export interface SplitCurveInfo {
  /** 曲线数据 */
  curve: unknown;
}

/**
 * 区域信息接口
 */
export interface RegionInfo {
  /** 区域唯一标识 */
  id: string;
  /** 分割曲线列表 */
  splitCurves: SplitCurveInfo[];
}

/**
 * 空间信息接口
 */
export interface SpaceInfo {
  /** 空间标识 */
  id: string;
  /** 其他空间属性 */
  [key: string]: unknown;
}

/**
 * 地板/天花板元素接口
 */
export interface FloorOrCeilingElement {
  /** 世界坐标系下的原始2D路径 */
  worldRawPath2d: Path2D;
}

/**
 * 面对象接口
 */
export interface Face {
  /** 面ID */
  id: string;
  /** 面信息 */
  faceInfo: FaceInfo;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 梁面接口
 */
export interface BeamFace {
  /** 原始路径 */
  rawPath: Path2D;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 梁信息接口
 */
export interface BeamInfo {
  /** 面列表 */
  faceList: BeamFace[];
}

/**
 * 房间构建器接口
 */
export interface RoomBuilder {
  /** 面映射表 */
  faceMap: Map<string, FaceInfo>;
  /**
   * 根据拓扑键获取面
   * @param topoKey - 拓扑键
   * @returns 面对象数组
   */
  getFaceByTopoKey(topoKey: string): Face[];
}

/**
 * 图层信息接口
 */
export interface LayerInfo {
  /**
   * 根据房间区域ID获取空间信息
   * @param regionId - 区域ID
   * @returns 空间信息数组
   */
  getSpaceInfosByRoomRegion(regionId: string): SpaceInfo[];
}

/**
 * 图层接口
 * 表示包含房间、地板、天花板等元素的建筑图层
 */
export interface Layer {
  /** 房间构建器 */
  roomBuilder: RoomBuilder;
  /** 图层信息 */
  layerInfo: LayerInfo;
  /** 梁信息映射表 */
  beams: Record<string, BeamInfo>;
  /**
   * 遍历所有地板
   * @param callback - 每个地板元素的回调函数
   */
  forEachFloor(callback: (floor: FloorOrCeilingElement) => void): void;
  /**
   * 遍历所有天花板
   * @param callback - 每个天花板元素的回调函数
   */
  forEachCeiling(callback: (ceiling: FloorOrCeilingElement) => void): void;
}

/**
 * 原始房间信息接口
 * 包含房间的所有原始数据
 */
export interface RawRoomInfo {
  /** 结构面信息 */
  structureFaceInfos: {
    /** 外轮廓拓扑键信息 */
    outer: TopoKeyInfo[];
    /** 孔洞拓扑键信息数组 */
    holes: TopoKeyInfo[][];
  };
  /** 区域信息 */
  region: RegionInfo;
  /** 路径信息 */
  path: Path2D;
  /** 几何信息 */
  geometry: unknown;
  /** 结构列表 */
  structures: unknown[];
  /** 面列表 */
  faces: unknown[];
}

/**
 * Telegram房间信息类
 * 提供对房间数据的高级访问接口，包括结构、空间、地板、天花板等信息
 */
export declare class TgRoomInfo {
  /** 原始房间信息 */
  private readonly _rawRoomInfo: RawRoomInfo;
  /** 所属图层 */
  private readonly _layer: Layer;
  /** 世界坐标系路径映射表 */
  private readonly _worldRawPath2dMap?: Map<FloorOrCeilingElement, Path2D>;
  
  /** 缓存的结构面信息 */
  private _structureFaceInfos?: StructureFaceInfos;
  /** 缓存的地板列表 */
  private _floors?: FloorOrCeilingElement[];
  /** 缓存的天花板列表 */
  private _ceilings?: FloorOrCeilingElement[];
  /** 缓存的梁面列表 */
  private _beamFaces?: BeamFace[];

  /**
   * 构造函数
   * @param rawRoomInfo - 原始房间信息
   * @param layer - 所属图层
   * @param worldRawPath2dMap - 可选的世界坐标系路径映射表
   */
  constructor(
    rawRoomInfo: RawRoomInfo,
    layer: Layer,
    worldRawPath2dMap?: Map<FloorOrCeilingElement, Path2D>
  );

  /**
   * 获取面信息
   * @param topoKeyInfo - 拓扑键信息
   * @returns 面信息数组，如果是辅助面则返回空数组
   */
  private _getFaceInfo(topoKeyInfo: TopoKeyInfo): FaceInfo[];

  /**
   * 获取结构面信息
   * 包含外轮廓和孔洞的面信息，按顺序排列
   */
  get structureFaceInfos(): StructureFaceInfos;

  /**
   * 获取分割曲线
   * 返回区域的所有分割曲线
   */
  get splitCurves(): unknown[];

  /**
   * 判断路径是否在房间内
   * @param path - 待检测的2D路径
   * @returns 如果路径与房间有交集返回true
   */
  private _isPathInRoom(path: Path2D): boolean;

  /**
   * 获取空间信息列表
   * 返回与此房间区域关联的所有空间信息
   */
  get spaceInfos(): SpaceInfo[];

  /**
   * 获取地板列表
   * 返回所有与房间区域相交的地板元素
   */
  get floors(): FloorOrCeilingElement[];

  /**
   * 获取天花板列表
   * 返回所有与房间区域相交的天花板元素
   */
  get ceilings(): FloorOrCeilingElement[];

  /**
   * 获取结构列表
   */
  get structures(): unknown[];

  /**
   * 获取面列表
   */
  get faces(): unknown[];

  /**
   * 获取梁面列表
   * 返回所有至少有一个顶点在房间多边形内的梁面
   */
  get beamFaces(): BeamFace[];

  /**
   * 获取房间路径
   * 包含外轮廓和孔洞的2D路径
   */
  get path(): Path2D;

  /**
   * 获取房间几何信息
   */
  get geometry(): unknown;
}