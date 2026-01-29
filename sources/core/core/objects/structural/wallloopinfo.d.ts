/**
 * 墙体循环信息模块
 * 
 * 提供了用于处理建筑图层、房间和墙体循环几何信息的类型定义。
 * 包含墙体面、楼板面、天花板面以及它们之间的关联关系。
 */

import type { Wall } from './wall-types';
import type { TgRoomInfo } from './tg-room-info';
import type { TgLayerInfo } from './tg-layer-info';

/**
 * 墙体面集合信息
 */
export interface WallFacesInfo {
  /** 墙体结构列表 */
  walls: Wall[];
  /** 面对象列表 */
  faces: Face[];
  /** 循环路径 */
  loop: LoopPath;
}

/**
 * 独立墙体面信息
 */
export interface IsolatedWallFacesInfo {
  /** 墙体列表 */
  walls: Wall[];
  /** 面列表 */
  faces: Face[];
  /** 循环路径列表 */
  loop: LoopPath[];
}

/**
 * 循环信息
 */
export interface LoopInfo {
  /** 循环路径 */
  loopPath: LoopPath;
}

/**
 * 房间内墙体侧面映射表
 * 键为墙体ID，值为面类型
 */
export type WallsInRoomSideMap = Record<string, FaceType>;

/**
 * 房间几何信息
 */
export interface RoomGeometry {
  /** 外轮廓路径 */
  outer: LoopPath;
}

/**
 * 墙体循环信息类
 * 
 * 表示由墙体围合形成的封闭区域信息，包含墙体面、几何轮廓等。
 */
export declare class WallLoopInfo extends TgRoomInfo {
  private _isolatedWallFaces?: IsolatedWallFacesInfo;
  private _wallsInRoomSide?: WallsInRoomSideMap;

  /**
   * 构造函数
   * @param roomInfo - 房间信息对象
   * @param layer - 所属图层
   */
  constructor(roomInfo: RoomInfo, layer: Layer);

  /**
   * 获取循环几何路径
   */
  get loopGeom(): LoopPath;

  /**
   * 获取循环信息
   */
  get loop(): LoopInfo;

  /**
   * 获取独立墙体面信息
   * 包含不与其他结构相连的墙体面
   */
  get isolatedWallFaces(): IsolatedWallFacesInfo;

  /**
   * 获取房间侧墙体映射表
   * 记录每个墙体在房间内的面类型（内侧/外侧）
   */
  get wallsInRoomSide(): WallsInRoomSideMap;

  /**
   * 获取墙体面信息
   * 包含所有墙体结构、面对象和循环路径
   */
  get wallFaces(): WallFacesInfo;
}

/**
 * 楼板房间信息类
 * 
 * 表示由楼板和墙体围合的房间空间信息，包含天花板、内墙等。
 */
export declare class FloorRoomInfo extends TgRoomInfo {
  /** 关联的楼板对象 */
  readonly floor: Floor;

  private _ceilingFace?: Face;
  private _interiorWalls?: Wall[];
  private _wallsInRoomSide?: WallsInRoomSideMap;

  /**
   * 构造函数
   * @param floor - 楼板对象
   * @param roomInfo - 房间信息对象
   * @param layer - 所属图层
   */
  constructor(floor: Floor, roomInfo: RoomInfo, layer: Layer);

  /**
   * 获取天花板面
   * 惰性计算并缓存楼板对应的天花板面
   */
  get ceilingFace(): Face | undefined;

  /**
   * 获取循环信息
   */
  get loop(): LoopInfo;

  /**
   * 获取墙体面信息
   */
  get wallFaces(): WallFacesInfo;

  /**
   * 获取房间内的内墙列表
   * 内墙是指完全位于房间内部的墙体，不作为边界墙
   */
  get interiorWalls(): Wall[];

  /**
   * 获取房间侧墙体映射表
   */
  get wallsInRoomSide(): WallsInRoomSideMap;

  /**
   * 获取边界墙体列表
   * 返回围合房间的所有墙体结构
   */
  get boundWalls(): Wall[];

  /**
   * 获取下一个墙体面
   * @param wallFace - 当前墙体面
   * @returns 按逆时针方向的下一个墙体面
   */
  getNextWallFace(wallFace: Face): Face | undefined;

  /**
   * 获取上一个墙体面
   * @param wallFace - 当前墙体面
   * @returns 按顺时针方向的上一个墙体面
   */
  getPrevWallFace(wallFace: Face): Face | undefined;
}

/**
 * 图层信息类
 * 
 * 管理图层中所有房间信息，包括墙体循环、楼板房间、天花板等。
 * 提供按面、楼板、天花板查询房间信息的方法。
 */
export declare class LayerInfo extends TgLayerInfo {
  private _wallLoopInfos: WallLoopInfo[];
  private _floorsFloorRoomInfo: Map<string, FloorRoomInfo>;
  private _ceilingsFloorRoomInfo: Map<string, FloorRoomInfo>;

  /**
   * 初始化图层信息
   * 
   * 遍历图层中的所有原始房间信息，创建对应的 WallLoopInfo 和 FloorRoomInfo 对象。
   * 建立楼板ID到房间信息、天花板ID到房间信息的映射关系。
   */
  init(): void;

  /**
   * 根据面获取墙体循环信息
   * @param face - 面对象
   * @returns 包含该面的墙体循环信息，未找到则返回 undefined
   */
  getFaceWallLoopInfo(face: Face): WallLoopInfo | undefined;

  /**
   * 根据楼板获取房间信息
   * @param floor - 楼板对象
   * @returns 该楼板对应的房间信息，未找到则返回 undefined
   */
  getFloorRoomInfo(floor: Floor): FloorRoomInfo | undefined;

  /**
   * 根据天花板面获取房间信息
   * @param ceilingFace - 天花板面对象
   * @returns 该天花板对应的房间信息，未找到则返回 undefined
   */
  getCeilingRoomInfo(ceilingFace: Face): FloorRoomInfo | undefined;

  /**
   * 根据面获取房间信息
   * @param face - 面对象
   * @returns 包含该面的房间信息，未找到则返回 undefined
   */
  getFaceRoomInfo(face: Face): FloorRoomInfo | undefined;

  /**
   * 根据墙体获取相关的房间信息列表
   * @param wall - 墙体对象
   * @returns 包含该墙体的所有房间信息数组
   */
  getWallRoomsInfo(wall: Wall): FloorRoomInfo[];
}

// ==================== 依赖类型定义 ====================

/**
 * 面对象
 */
export interface Face {
  /** 面ID */
  id: string;

  /**
   * 获取面关联的结构列表
   */
  getLinkStructure(): Structure[];

  /**
   * 获取面的主结构
   */
  getMaster(): Structure | undefined;
}

/**
 * 结构基类
 */
export interface Structure {
  /** 结构ID */
  id: string;

  /**
   * 获取面在该结构上的类型
   * @param face - 面对象
   */
  getFaceType(face: Face): FaceType;
}

/**
 * 楼板对象
 */
export interface Floor {
  /** 楼板ID */
  id: string;
}

/**
 * 图层对象
 */
export interface Layer {
  /** 楼板构建器 */
  slabBuilder: SlabBuilder;

  /**
   * 遍历图层中的所有楼板
   * @param callback - 回调函数
   */
  forEachFloor(callback: (floor: Floor) => void): void;
}

/**
 * 楼板构建器
 */
export interface SlabBuilder {
  /**
   * 获取楼板的房间信息
   * @param floor - 楼板对象
   */
  getFloorRoomInfo(floor: Floor): RoomInfo | undefined;
}

/**
 * 原始房间信息
 */
export interface RoomInfo {
  /** 房间几何信息 */
  geometry: RoomGeometry;
  /** 房间相关的面列表 */
  faces: Face[];
  /** 房间相关的结构列表 */
  structures: Structure[];
}

/**
 * 循环路径类型
 * 表示封闭几何轮廓的路径数据
 */
export type LoopPath = unknown;

/**
 * 面类型枚举
 */
export enum FaceType {
  /** 内侧面 */
  Interior = 'interior',
  /** 外侧面 */
  Exterior = 'exterior',
}