/**
 * 拉伸类型枚举
 * 定义墙体、空间等实体的面类型
 */
export enum ExtrudeType {
  /** 右侧面 */
  Right = "right",
  /** 前侧面 */
  Front = "front",
  /** 后侧面 */
  Back = "back",
  /** 左侧面 */
  Left = "left",
  /** 底面 */
  Bottom = "bottom",
  /** 顶面 */
  Top = "top",
  /** 圆形面 */
  Circle = "circle"
}

/**
 * 空间楼板适配类型
 */
export enum SpaceSlabFitType {
  /** 不适配 */
  No = 1,
  /** 已弃用 */
  Deprecated = 2,
  /** 适配 */
  Yes = 3
}

/**
 * 面记录对象接口
 */
export interface FaceRecord {
  /** 原始拓扑键 */
  originKey: string;
  /** 最终拓扑键 */
  finalKey: string;
  /** 主结构ID */
  masterId: string;
  /** 是否为辅助面 */
  isAux?: boolean;
  /** 额外键 */
  extraKey?: string;
  /** 关联结构信息列表 */
  linkStructureInfos: Array<{
    id: string;
    type: string;
  }>;
  
  /** 克隆方法 */
  clone(): FaceRecord;
  /** 序列化方法 */
  dump(): unknown;
  /** 是否为结构面 */
  isStructure(): boolean;
}

/**
 * 拓扑名称接口
 */
export interface TopoName {
  /** 源ID */
  sourceId: string;
  /** 类型 */
  type: string;
  /** 索引 */
  index: number;
  /** 源索引 */
  sourceIndex?: number;
  /** 拓扑名称ID */
  id: string;
  
  /** 克隆方法 */
  clone(): TopoName;
}

/**
 * 共边接口
 */
export interface CoEdge {
  /** 共边ID */
  id: string;
  /** 拓扑名称 */
  topoName: TopoName;
  /** 边ID */
  edgeId: string;
  /** 是否反向 */
  isRev: boolean;
  /** 曲线 */
  curve: unknown;
}

/**
 * 拓扑面接口
 */
export interface TopoFace {
  /** 拓扑键 */
  topoKey: string;
  /** 拓扑名称 */
  topoName: TopoName;
  /** 共边 */
  coEdge?: CoEdge;
  /** Brep面 */
  brepFace: unknown;
  /** 分组Brep面 */
  groupBrepFace?: unknown;
  /** 是否为辅助面 */
  isAux: boolean;
  /** 分组索引 */
  groupIndex?: number;
  /** 关联墙体ID列表 */
  linkWallIds: string[];
}

/**
 * 墙体区域接口
 */
export interface WallRegion {
  /** 区域ID */
  id: string;
  /** 拓扑面列表 */
  topoFaces: TopoFace[];
  /** 关联墙体ID列表 */
  linkWallIds: string[];
  /** 所有共边ID列表 */
  allCoEdgeIds: string[];
  /** 共边路径 */
  coEdgePath: {
    outer: CoEdge[];
    holes: CoEdge[][];
  };
  /** 目标墙体 */
  targetWall: {
    height3d: number;
  };
  /** 外壳包装器 */
  shellWrapper: {
    sideFaces: unknown[][];
    inValid: boolean;
  };
  /** 关联信息 */
  linkInfo: Array<{
    wallId: string;
    index: number;
  }>;
  
  /** 拉伸实体 */
  extrudeBody(param1?: unknown, param2?: unknown, roofOptions?: unknown): void;
  /** 通过Brep面获取拓扑面 */
  getTopoFaceByBrepFace(face: unknown): TopoFace | undefined;
  /** 通过曲线分割面 */
  splitFaceByCurve(topoFace: TopoFace, curve: unknown, linkWallIds: string[]): void;
}

/**
 * RoomBuilder IO类
 * 负责房间构建器的序列化和反序列化
 */
export declare class RoomBuilder_IO {
  /**
   * 获取单例实例
   */
  static instance(): RoomBuilder_IO;
  
  /**
   * 序列化实体
   * @param entity - 要序列化的实体
   * @param callback - 序列化后的回调
   * @param includeChildren - 是否包含子实体
   * @param options - 序列化选项
   * @returns 序列化后的数据
   */
  dump(
    entity: RoomBuilder,
    callback?: (data: unknown, entity: RoomBuilder) => void,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): unknown[];
  
  /**
   * 反序列化实体
   * @param entity - 目标实体
   * @param data - 序列化数据
   * @param context - 反序列化上下文
   */
  load(entity: RoomBuilder, data: unknown, context: unknown): void;
  
  /**
   * 后加载处理
   * @param entity - 实体
   * @param context - 上下文
   */
  postLoad(entity: RoomBuilder, context: unknown): void;
}

/**
 * 构建上下文接口
 */
export interface BuildContext {
  /** 跳过匹配旧楼板 */
  skipMatchOldSlab?: boolean;
  /** 跳过更新洞口 */
  skipUpdateHole?: boolean;
  /** 空间选项 */
  spaceOptions?: {
    splitData?: {
      ignoreMatchFaceId?: Set<string>;
    };
  };
  /** 切割墙体选项 */
  cutWallOption?: {
    wallId: string;
  };
  /** 楼板选项 */
  slabOption?: unknown;
  /** 房间构建后回调 */
  postRoomBuild?: () => void;
  /** 洞口构建前回调 */
  preHoleBuild?: () => void;
}

/**
 * 面信息接口
 */
export interface FaceInfo {
  /** 结构ID */
  structureId: string;
  /** 面类型 */
  type: string;
  /** 曲线列表 */
  curves: unknown[];
  /** 2D曲线 */
  curve?: unknown;
  /** 是否为辅助面 */
  isAux: boolean;
  /** 拓扑面列表 */
  topoFaces: TopoFace[];
  /** 关联结构ID列表 */
  linkStructureIds: string[];
  /** 拓扑键 */
  topoKey: string;
}

/**
 * 共边信息接口
 */
export interface CoEdgeInfo {
  /** 共边对象 */
  coEdge: CoEdge;
  /** 所属区域 */
  region?: WallRegion;
  /** 拓扑面列表 */
  topoFaces: TopoFace[];
  /** 面ID列表 */
  faceIds: string[];
}

/**
 * 墙体信息接口
 */
export interface WallInfo {
  /** 结构面信息列表 */
  structureFaceInfos: FaceInfo[];
  /** 关联区域列表 */
  regions: WallRegion[];
}

/**
 * 房间构建器类
 * 负责房间的拓扑构建、面管理和几何拉伸
 */
export declare class RoomBuilder {
  /**
   * 构造函数
   * @param id - 实体ID
   * @param layer - 所属图层
   */
  constructor(id?: string, layer?: unknown);
  
  // ==================== 属性 ====================
  
  /** 所有拓扑面 */
  readonly topoFaces: TopoFace[];
  
  /** 拓扑面查询缓存 */
  readonly topoFacesQuery: unknown;
  
  /** 文档指针 */
  readonly fp: unknown;
  
  /** 面对象列表 */
  readonly faceObjs: Array<{
    id: string;
    obj: {
      topoKey: string;
      isAux?: boolean;
      linkWallInfos: Array<{ id: string; type: string }>;
      masterStructureId: string;
    };
  }>;
  
  /** 面映射表 (面ID -> 面记录) */
  faceMap: Map<string, FaceRecord>;
  
  /** 共边列表 */
  readonly coEdgeList: CoEdge[];
  
  /** 墙体区域列表 */
  readonly wallRegions: WallRegion[];
  
  /** 墙体PT区域列表 */
  readonly wallPtRegions: unknown[];
  
  /** PT区域列表 */
  ptRegions: unknown[];
  
  /** 是否为镜像构建 */
  mirrorBuilding: boolean;
  
  // ==================== 查询方法 ====================
  
  /**
   * 通过墙体ID获取墙体区域
   * @param wallId - 墙体ID
   */
  getWallRegion(wallId: string): WallRegion | undefined;
  
  /**
   * 获取关联的墙体区域列表
   * @param wall - 墙体对象
   */
  getLinkedWallRegions(wall: { id: string }): WallRegion[];
  
  /**
   * 通过墙体和结构获取面类型
   * @param faceId - 面ID
   * @param structureId - 结构ID
   */
  getFaceTypeByWall(faceId: string, structureId: string): string | undefined;
  
  /**
   * 通过共边ID获取共边信息
   * @param coEdgeId - 共边ID
   */
  getCoEdgeInfo(coEdgeId: string): CoEdgeInfo | undefined;
  
  /**
   * 通过墙体ID获取墙体信息
   * @param wallId - 墙体ID
   */
  getWallInfo(wallId: string): WallInfo;
  
  /**
   * 获取墙体关联的其他墙体ID列表
   * @param wallId - 墙体ID
   */
  getWallLinkWalls(wallId: string): string[];
  
  /**
   * 获取面信息
   * @param faceId - 面ID
   */
  getFaceInfo(faceId: string): FaceInfo | undefined;
  
  /**
   * 通过Brep面获取拓扑面
   * @param brepFace - Brep面对象
   */
  getTopoFaceByBrepFace(brepFace: unknown): TopoFace | undefined;
  
  /**
   * 通过拓扑键获取面实体列表
   * @param topoKey - 拓扑键
   */
  getFaceByTopoKey(topoKey: string): unknown[];
  
  /**
   * 通过最终键获取面实体
   * @param finalKey - 最终键
   */
  getFaceByFinalKey(finalKey: string): unknown | undefined;
  
  /**
   * 通过拓扑键获取拓扑面列表
   * @param topoKey - 拓扑键
   */
  getTopoFacesByTopoKey(topoKey: string): TopoFace[];
  
  /**
   * 通过共边ID获取墙体区域
   * @param coEdgeId - 共边ID
   */
  getWallRegionByCoEdgeId(coEdgeId: string): WallRegion | undefined;
  
  /**
   * 获取兄弟共边
   * @param coEdge - 共边对象
   */
  getBrotherCoEdge(coEdge: CoEdge): CoEdge | undefined;
  
  /**
   * 获取兄弟拓扑面列表
   * @param topoFace - 拓扑面
   */
  getBrotherTopoFaces(topoFace: TopoFace): TopoFace[];
  
  /**
   * 通过拓扑面获取关联墙体ID列表
   * @param topoFaces - 拓扑面列表
   */
  getLinkWallIdsByTopoFaces(topoFaces: TopoFace[]): string[];
  
  /**
   * 通过共边ID获取关联墙体ID列表
   * @param coEdgeId - 共边ID
   */
  getLinkWallIdsByCoEdgeId(coEdgeId: string): string[] | undefined;
  
  /**
   * 通过墙体ID和拓扑面获取面类型
   * @param topoFaces - 拓扑面列表
   * @param wallId - 墙体ID
   */
  getFaceTypeByWallId(topoFaces: TopoFace[], wallId: string): string;
  
  /**
   * 获取墙体面的2D曲线
   * @param face - 面实体
   */
  getWallFaceCurve2d(face: { id: string }): unknown | undefined;
  
  // ==================== 构建方法 ====================
  
  /**
   * 清空所有数据
   */
  clear(): void;
  
  /**
   * 刷新拉伸布尔运算
   */
  refreshExbool(): void;
  
  /**
   * 刷新墙体面
   * @returns 变更的面ID集合
   */
  refreshWallFace(): Set<string>;
  
  /**
   * 构建房间
   * @param context - 构建上下文
   */
  build(context?: BuildContext): void;
  
  /**
   * 标记为脏数据（需要重建）
   */
  dirty(): void;
  
  /**
   * 清理自由面
   */
  cleanFreeFaces(): void;
  
  /**
   * 镜像操作
   * @param axis - 镜像轴
   */
  mirror(axis: unknown): void;
  
  /**
   * 镜像面映射表
   */
  mirrorFaceMap(): void;
  
  // ==================== 实体接口 ====================
  
  /**
   * 是否为根实体
   */
  isRoot(): boolean;
  
  /**
   * 获取IO处理器
   */
  getIO(): RoomBuilder_IO;
  
  /**
   * 字段变更回调
   * @param fieldName - 字段名
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;
  
  /**
   * 记录错误日志
   * @param title - 错误标题
   * @param message - 错误消息
   * @param type - 错误类型
   * @param data - 附加数据
   */
  static logError(title: string, message: string, type?: string, data?: unknown): void;
}