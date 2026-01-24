/**
 * SlabBuilder模块 - 楼板构建器
 * 负责管理楼板的创建、更新和维护
 */

import type { Entity, Entity_IO } from './Entity';
import type { Layer } from './Layer';
import type { Face } from './Face';
import type { Structure } from './Structure';
import type { Wall } from './Wall';
import type { RoomRegion } from './RoomRegion';
import type { SlabRegion } from './SlabRegion';
import type { TopoFace } from './TopoFace';
import type { CoEdge } from './CoEdge';
import type { Curve } from './Curve';

/**
 * 楼板记录面数据
 */
export interface SlabRecordFace {
  /** 主面ID */
  masterId: string;
  /** 是否为辅助面 */
  isAux: boolean;
  /** 面类型 */
  type?: string;
}

/**
 * 结构面信息
 */
export interface StructureFaceInfo {
  /** 结构ID */
  structureId: string;
  /** 拓扑键 */
  topoKey: string;
  /** 面类型 */
  type: string;
  /** 曲线 */
  curve?: Curve;
}

/**
 * 路径数据结构
 */
export interface PathData {
  /** 外轮廓曲线 */
  outer: Curve[];
  /** 内孔曲线数组 */
  holes: Curve[][];
}

/**
 * 共边路径数据
 */
export interface CoEdgePath {
  /** 外轮廓共边 */
  outer: CoEdge[];
  /** 内孔共边数组 */
  holes: CoEdge[][];
}

/**
 * 房间信息
 */
export interface RoomInfo {
  /** 结构面信息 */
  structureFaceInfos: {
    outer: StructureFaceInfo[];
    holes: StructureFaceInfo[][];
  };
  /** 房间区域 */
  region: RoomRegion;
  /** 关联的结构 */
  structures: Structure[];
  /** 关联的面 */
  faces: Face[];
  /** 路径 */
  path: PathData;
  /** 几何信息 */
  geometry: unknown;
  /** 拓扑面 */
  topoFaces: TopoFace[];
}

/**
 * 楼板信息
 */
export interface SlabInfo {
  /** 结构面信息数组 */
  structureFaceInfos: StructureFaceInfo[];
  /** 楼板区域 */
  region: SlabRegion;
  /** 路径 */
  path: PathData;
  /** 几何信息 */
  geometry: unknown;
  /** 关联的结构 */
  structures: Structure[];
  /** 关联的面 */
  faces: Face[];
  /** 拓扑面 */
  topoFaces: TopoFace[];
  /** 楼板内的结构 */
  structuresInSlab: (Wall | Structure)[];
}

/**
 * 全局路径信息
 */
export interface GlobalPathInfo {
  /** 路径数据 */
  path: PathData;
  /** 关联的墙体ID */
  linkWallIds: string[];
}

/**
 * 外墙信息
 */
export interface OuterWallInfo {
  /** 外墙侧面类型 */
  outerWallSide?: string;
  /** 是否反向 */
  reversed: boolean;
}

/**
 * 面对象数据
 */
export interface FaceObject {
  /** 面ID */
  id: string;
  /** 面对象信息 */
  obj: {
    /** 拓扑键 */
    topoKey: string;
    /** 是否为辅助面 */
    isAux: boolean;
    /** 关联的楼板信息 */
    linkSlabInfo: {
      id: string;
      type?: string;
    };
  };
}

/**
 * 楼板构建器IO处理类
 * 负责楼板数据的序列化和反序列化
 */
export declare class SlabBuilder_IO extends Entity_IO {
  /**
   * 获取单例实例
   */
  static instance(): SlabBuilder_IO;

  /**
   * 导出楼板数据
   * @param entity - 要导出的楼板构建器实体
   * @param callback - 导出回调函数
   * @param includeChildren - 是否包含子对象
   * @param options - 导出选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: SlabBuilder,
    callback?: (data: unknown[], entity: SlabBuilder) => void,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * 加载楼板数据
   * @param entity - 目标楼板构建器实体
   * @param data - 要加载的数据
   * @param context - 加载上下文
   */
  load(entity: SlabBuilder, data: unknown, context: unknown): void;

  /**
   * 加载后处理
   * @param entity - 已加载的楼板构建器实体
   * @param context - 加载上下文
   */
  postLoad(entity: SlabBuilder, context: unknown): void;
}

/**
 * 楼板构建器主类
 * 负责管理楼板的创建、更新和维护逻辑
 */
export declare class SlabBuilder extends Entity {
  /**
   * 构造函数
   * @param id - 实体ID
   * @param layer - 所属图层
   */
  constructor(id?: string, layer?: Layer);

  // ==================== 属性 ====================

  /** 所属图层 */
  readonly layer: Layer;

  /** 面映射表：面ID -> 楼板记录面 */
  faceMap: Map<string, SlabRecordFace>;

  /** 房间区域列表 */
  roomRegionList: RoomRegion[];

  /** 房间区域数据列表 */
  readonly roomRegionDataList: Array<{
    topoIds: string[];
    data: unknown;
  }>;

  /** 房间信息列表（缓存） */
  readonly roomInfos: RoomInfo[];

  /** 楼板信息列表（缓存） */
  readonly slabInfos: SlabInfo[];

  /** 内墙区域列表 */
  readonly interiorWallRegions: unknown[];

  /** 外墙区域列表 */
  readonly outWallRegions: unknown[];

  /** 房间区域（只读） */
  readonly roomRegions: RoomRegion[];

  /** 面对象列表 */
  readonly faceObjs: FaceObject[];

  // ==================== 核心构建方法 ====================

  /**
   * 执行完整的楼板构建流程
   * 更新结构变化后的楼板
   */
  build(): void;

  /**
   * 根据2D草图构建天花板楼板
   * @param sketch2d - 2D草图数据
   */
  buildCeilingFromSketch2d(sketch2d: unknown): void;

  /**
   * 根据2D草图构建地板楼板
   * @param sketch2d - 2D草图数据
   */
  buildFloorFromSketch2d(sketch2d: unknown): void;

  // ==================== 面管理方法 ====================

  /**
   * 添加室外面
   * @param face - 面对象
   * @param master - 主面对象
   * @param type - 面类型
   * @param isAux - 是否为辅助面
   */
  addOutdoorFace(face: Face, master: unknown, type: string, isAux: boolean): void;

  /**
   * 移除室外面
   * @param faceId - 面ID
   */
  removeOutdoorFace(faceId: string): void;

  /**
   * 更新室外面
   * @param faceId - 面ID
   * @param master - 主面对象
   * @param type - 面类型
   * @param isAux - 是否为辅助面
   */
  updateOutdoorFace(faceId: string, master: unknown, type: string, isAux: boolean): void;

  /**
   * 移除楼板面
   * @param faces - 面数组或面ID数组
   */
  removeSlabFaces(faces: Face[] | string[]): void;

  /**
   * 添加楼板面到房间区域
   * @param faceIds - 面ID数组
   * @param roomRegionId - 房间区域ID
   */
  addSlabFaceToRoomRegion(faceIds: string[], roomRegionId?: string): void;

  /**
   * 通过记录添加楼板面
   * @param records - 面记录数组
   * @param roomRegionId - 房间区域ID
   */
  addSlabFacesByRecord(
    records: Array<{ face: Face; record: SlabRecordFace }>,
    roomRegionId?: string
  ): void;

  /**
   * 添加楼板面
   * @param master - 主对象
   * @param faces - 面对象映射
   * @param isAux - 是否为辅助面
   * @param roomRegionId - 房间区域ID
   */
  addSlabFaces(
    master: { id: string },
    faces: Record<string, Record<string, Face>>,
    isAux: boolean,
    roomRegionId?: string
  ): void;

  /**
   * 清理自由面（未关联的面）
   */
  cleanFreeFaces(): void;

  // ==================== 查询方法 ====================

  /**
   * 获取楼板面关联的结构面
   * @param slabFace - 楼板面
   * @returns 结构面数组
   */
  getSlabFaceLinkedStructFaces(slabFace: Face): Face[];

  /**
   * 获取结构面关联的楼板面
   * @param structFace - 结构面
   * @returns 楼板面或undefined
   */
  getStructFaceLinkedSlabFace(structFace: Face): Face | undefined;

  /**
   * 获取楼板信息
   * @param slab - 楼板对象
   * @returns 楼板信息或undefined
   */
  getSlabInfo(slab: { baseProfile: { getLoopCurves2d(): Curve[] } }): SlabInfo | undefined;

  /**
   * 获取地板房间信息
   * @param floor - 地板对象
   * @returns 房间信息或undefined
   */
  getFloorRoomInfo(floor: { worldRawPath2d: PathData }): RoomInfo | undefined;

  /**
   * 获取外墙信息
   * @param wall - 墙体对象
   * @returns 外墙信息
   */
  getOuterWallInfo(wall: Wall & { direction: unknown }): OuterWallInfo;

  /**
   * 判断墙体是否为内墙
   * @param wall - 墙体对象
   * @returns 是否为内墙
   */
  isInteriorWall(wall: { id: string }): boolean;

  /**
   * 判断墙体是否为共享墙
   * @param wall - 墙体对象
   * @returns 是否为共享墙
   */
  isWallShared(wall: Wall): boolean;

  /**
   * 获取楼板路径
   * @returns 路径数组
   */
  getSlabPaths(): PathData[];

  /**
   * 获取房间路径
   * @returns 路径数组
   */
  getRoomPaths(): PathData[];

  /**
   * 获取全局路径
   * @returns 路径数组
   */
  getGlobalPaths(): PathData[];

  /**
   * 获取全局路径信息
   * @param filterByRoom - 是否按房间过滤
   * @returns 全局路径信息数组
   */
  getGlobalPathInfos(filterByRoom?: boolean): GlobalPathInfo[];

  /**
   * 根据拓扑键获取最大索引
   * @param topoKey - 拓扑键
   * @returns 最大索引值
   */
  getMaxIndexByTopoKey(topoKey: string): number;

  // ==================== 更新和维护方法 ====================

  /**
   * 刷新布尔运算结果
   */
  refreshExbool(): void;

  /**
   * 更新房间区域
   */
  updateRoomRegion(): void;

  /**
   * 更新楼板面到结构面的映射关系
   * @param existingMap - 已存在的映射表
   */
  updateSlabFaceToStructFaces(existingMap?: Map<Face, Face[]>): void;

  /**
   * 准备楼板旧信息
   * @returns 楼板旧信息对象
   */
  prepareSlabOldInfos(): {
    oldLayerSlabInfo?: unknown;
    oldRoomRegions?: RoomRegion[];
    slabFitType?: unknown;
    ceilingSlabRegionsForInter?: unknown;
  };

  /**
   * 清除缓存数据
   */
  clearCache(): void;

  /**
   * 清空所有数据
   */
  clear(): void;

  /**
   * 标记为脏数据（需要重新构建）
   */
  dirty(): void;

  // ==================== 变换方法 ====================

  /**
   * 镜像变换
   * @param axis - 镜像轴
   */
  mirror(axis: unknown): void;

  /**
   * 平移变换
   * @param vector - 平移向量
   */
  translate(vector: unknown): void;

  // ==================== 实体接口实现 ====================

  /**
   * 判断是否为根实体
   * @returns 始终返回true
   */
  isRoot(): boolean;

  /**
   * 获取IO处理器
   * @returns IO处理器实例
   */
  getIO(): SlabBuilder_IO;

  /**
   * 字段变化回调
   * @param fieldName - 字段名
   * @param newValue - 新值
   * @param oldValue - 旧值
   */
  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void;

  // ==================== 静态方法 ====================

  /**
   * 记录错误日志
   * @param title - 错误标题
   * @param message - 错误消息
   * @param errorType - 错误类型
   * @param details - 错误详情
   */
  static logError(
    title: string,
    message: string,
    errorType: string,
    details: unknown
  ): void;
}