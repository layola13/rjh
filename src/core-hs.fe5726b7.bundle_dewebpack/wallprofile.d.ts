/**
 * 墙体轮廓管理类
 * 负责计算和管理墙体的几何形状、边界、交叉点等信息
 */
export declare class WallProfile {
  /** 关联的墙体实体 */
  readonly entity: Wall;
  
  /** 数据库实例，用于缓存端点计算结果 */
  readonly database: Database;
  
  /** 部分墙体映射表，键为端点ID */
  partialWalls: Record<string, Wall[]>;
  
  /** 内部缓存的轮廓几何数据 */
  private _profile?: THREE.Vector3[];
  
  /** 内部缓存的索引数组 */
  private _indices?: number[];
  
  /** 内部缓存的边界几何数据 */
  private _borderGeometry?: THREE.Vector3[];
  
  /** 脏标记，指示是否需要重新计算 */
  private _dirty: boolean;
  
  /**
   * 构造函数
   * @param entity - 墙体实体对象
   * @param context - 包含数据库实例的上下文对象
   */
  constructor(entity: Wall, context: { database: Database });
  
  /**
   * 获取墙体轮廓几何数据
   * 如果数据脏，会自动触发重新计算
   */
  get geometry(): THREE.Vector3[] | undefined;
  
  /**
   * 获取轮廓索引数组
   * 如果数据脏，会自动触发重新计算
   */
  get indices(): number[] | undefined;
  
  /**
   * 获取边界几何数据
   * 延迟计算，首次访问时计算并缓存
   */
  get borderGeometry(): THREE.Vector3[] | null;
  
  /**
   * 计算边界几何
   * 处理圆弧墙体和直线墙体的边界偏移
   * @returns 边界几何点数组，失败返回null
   */
  private _calBorderGeometry(): THREE.Vector3[] | null;
  
  /**
   * 设置部分墙体
   * @param partialWalls - 部分墙体映射表
   */
  setPartialWalls(partialWalls: Record<string, Wall[]>): void;
  
  /**
   * 清除所有数据
   */
  clear(): void;
  
  /**
   * 清除缓存数据
   * 删除端点的缓存数据，重置内部状态
   */
  clearCachedData(): void;
  
  /**
   * 计算墙体轮廓
   * 内部方法，处理墙体几何的核心逻辑
   */
  private _computeProfile(): void;
  
  /**
   * 执行计算
   * 如果脏标记为true，触发轮廓计算并清除脏标记
   */
  compute(): void;
  
  /**
   * 合并几何数据
   * 将起点和终点的几何数据与墙体几何合并
   * @param startGeometry - 起点几何数据
   * @param endGeometry - 终点几何数据
   * @param wallGeometry - 墙体几何数据
   * @param wall - 墙体实体
   * @returns 合并后的几何数据和索引，失败返回undefined
   */
  private _combineGeometry(
    startGeometry: THREE.Vector3[],
    endGeometry: THREE.Vector3[],
    wallGeometry: THREE.Vector3[],
    wall: Wall
  ): { geometry: THREE.Vector3[]; indices: number[] } | { geometry: undefined; indices: undefined };
  
  /**
   * 获取或计算端点处的墙体几何
   * 优先从数据库缓存获取，不存在则计算并缓存
   * @param point - 端点对象
   * @param partialWalls - 该端点的部分墙体列表
   * @returns 端点处各墙体的几何映射表
   */
  private _getOrComputeWallGeomsAtEndPoint(
    point: Point,
    partialWalls?: Wall[]
  ): Record<string, THREE.Vector3[]> | undefined;
  
  /**
   * 计算端点处的墙体几何
   * 处理多个墙体在端点的交叉、裁剪和合并
   * @param point - 端点对象
   * @param partialWalls - 该端点的部分墙体列表
   * @returns 端点处各墙体的几何映射表
   */
  private _computeWallGeomsAtEndPoint(
    point: Point,
    partialWalls?: Wall[]
  ): Record<string, THREE.Vector3[]>;
  
  /**
   * 计算单个墙体在端点的几何
   * 处理与相邻墙体的交叉计算
   * @param wall - 墙体对象
   * @param point - 端点对象
   * @param neighbors - 分类后的相邻墙体
   * @param wrapInfo - 墙体包裹信息
   * @param cache - 计算结果缓存
   * @param includeNonHeightEditable - 是否包含非高度可编辑墙体
   * @param additionalWalls - 需要额外处理的墙体列表
   * @returns 墙体在端点的几何数据
   */
  private _computeWallGeomAtEndPoint(
    wall: Wall,
    point: Point,
    neighbors: ClassifiedNeighborWalls,
    wrapInfo: WallWrapInfo,
    cache: Map<string, IntersectionResult>,
    includeNonHeightEditable: boolean,
    additionalWalls: AdditionalWall[]
  ): THREE.Vector3[] | undefined;
  
  /**
   * 计算墙体裁剪后的几何
   * @param sourceWall - 源墙体
   * @param targetWall - 目标墙体
   * @param point - 交叉点
   * @param sourceGeometry - 源墙体几何
   * @param targetGeometry - 目标墙体几何
   * @returns 裁剪后的源墙体几何
   */
  private _wallTrimedGeometry(
    sourceWall: Wall,
    targetWall: Wall,
    point: Point,
    sourceGeometry: THREE.Vector3[],
    targetGeometry: THREE.Vector3[]
  ): THREE.Vector3[];
  
  /**
   * 计算部分墙体在端点的几何集合
   * @param walls - 墙体数组
   * @param point - 端点对象
   * @param existingGeometries - 已存在的几何映射表
   * @param allGeometries - 所有墙体的几何映射表
   * @returns 部分墙体的几何映射表
   */
  private _computePartialWallGeomsAtEndPoint(
    walls: Wall[],
    point: Point,
    existingGeometries: Record<string, THREE.Vector3[]>,
    allGeometries: Record<string, THREE.Vector3[]>
  ): Record<string, THREE.Vector3[]>;
  
  /**
   * 计算单个部分墙体在端点的几何
   * @param wall - 墙体对象
   * @param point - 端点对象
   * @param boundaryLines - 边界线数组
   * @param allGeometries - 所有墙体的几何映射表
   * @param otherWalls - 其他墙体数组
   * @returns 部分墙体的几何数据
   */
  private _computePartialWallGeomAtEndPoint(
    wall: Wall,
    point: Point,
    boundaryLines: THREE.Line3[],
    allGeometries: Record<string, THREE.Vector3[]>,
    otherWalls: Wall[]
  ): THREE.Vector3[] | undefined;
}

/**
 * 墙体实体接口
 */
interface Wall {
  /** 墙体唯一标识符 */
  id: string;
  
  /** 墙体标签 */
  tag: string;
  
  /** 起点 */
  from: Point;
  
  /** 终点 */
  to: Point;
  
  /** 墙体长度 */
  length: number;
  
  /** 墙体3D高度 */
  height3d: number;
  
  /**
   * 验证墙体有效性
   */
  validate(): boolean;
  
  /**
   * 检查墙体标记
   * @param flag - 标记枚举值
   */
  isFlagOn(flag: WallFlagEnum): boolean;
}

/**
 * 端点接口
 */
interface Point {
  /** 端点唯一标识符 */
  id: string;
  
  /** X坐标 */
  x: number;
  
  /** Y坐标 */
  y: number;
  
  /** Z坐标（可选） */
  z?: number;
}

/**
 * 数据库接口
 */
interface Database {
  /**
   * 检查是否存在指定键
   */
  has(key: string): boolean;
  
  /**
   * 获取指定键的值
   */
  get<T>(key: string): T | undefined;
  
  /**
   * 设置键值对
   */
  set<T>(key: string, value: T): void;
  
  /**
   * 删除指定键
   */
  delete(key: string): void;
}

/**
 * 分类后的相邻墙体
 */
interface ClassifiedNeighborWalls {
  /** 左侧墙体 */
  left?: Wall;
  
  /** 右侧墙体 */
  right?: Wall;
  
  /** 左侧角度 */
  leftAngle?: number;
  
  /** 右侧角度 */
  rightAngle?: number;
}

/**
 * 墙体包裹信息
 */
interface WallWrapInfo {
  /** 是否被包裹 */
  isWrapped: boolean;
  
  /** 左侧是否被包裹 */
  isLeftWrapped: boolean;
  
  /** 右侧是否被包裹 */
  isRightWrapped: boolean;
}

/**
 * 交叉结果
 */
interface IntersectionResult {
  /** 交叉点 */
  intersect: THREE.Vector3;
  
  /** 内部点数组 */
  inners: THREE.Vector3[];
}

/**
 * 额外墙体信息
 */
interface AdditionalWall {
  /** 墙体对象 */
  wall: Wall;
  
  /** 连接点 */
  point: Point;
}

/**
 * 墙体标记枚举
 */
enum WallFlagEnum {
  /** 高度可编辑 */
  heightEditable = 1
}

/**
 * THREE.Vector3扩展
 * 添加圆弧信息和参数属性
 */
declare module 'three' {
  interface Vector3 {
    /** 圆弧信息（可选） */
    arcInfo?: ArcInfo;
    
    /** 参数值（可选） */
    param?: number;
    
    /** 关联的曲线（可选） */
    curve?: THREE.Line3 | THREE.ArcCurve;
  }
}

/**
 * 圆弧信息
 */
interface ArcInfo {
  /** 圆心 */
  center: Point;
  
  /** 半径 */
  radius: number;
  
  /** 是否顺时针 */
  clockwise: boolean;
}