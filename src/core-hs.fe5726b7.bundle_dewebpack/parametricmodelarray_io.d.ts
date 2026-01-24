/**
 * ParametricModelArray 模块
 * 提供参数化模型数组的创建、管理和渲染功能
 */

import { Entity, Entity_IO, EntityFlagEnum } from './Entity';
import { NCustomizedParametricModel } from './NCustomizedParametricModel';
import { Polygon } from './Polygon';
import { Manager } from './Manager';
import { Signal } from './Signal';
import { NCustomizedFeatureModelUtil } from './NCustomizedFeatureModelUtil';
import { GraphicsCutter } from './GraphicsCutter';
import { NCPBackgroundWallSubpart } from './NCPBackgroundWallSubpart';
import { BigXY } from './BigXY';
import { ParametricContentSubpart } from './ParametricContentSubpart';
import { ParametricModelContent } from './ParametricModelContent';
import { MeshTransformUtil } from './MeshTransformUtil';
import { Logger } from './Logger';
import { Matrix4, Vector3, Curve3d } from './GeometryTypes';

/**
 * 面图形数据接口
 */
export interface FaceGraphicData {
  /** 包围盒坐标 */
  bounding: number[];
  /** 顶点位置数组 */
  vertexPositions: number[];
  /** 面路径集合 */
  facePaths: Vector3[][];
  /** 曲面对象 */
  surface: Surface;
  /** 网格唯一标识 */
  meshKey: string;
}

/**
 * 边图形数据接口
 */
export interface EdgeGraphicData {
  /** 包围盒坐标 */
  bounding: number[];
  /** 顶点位置数组 */
  vertexPositions: number[];
  /** 网格唯一标识 */
  meshKey: string;
}

/**
 * 图形数据容器接口
 */
export interface GraphicsData {
  /** 面数据映射表 (meshKey -> FaceGraphicData) */
  faces: Map<string, FaceGraphicData>;
  /** 边数据映射表 (meshKey -> EdgeGraphicData) */
  edges: Map<string, EdgeGraphicData>;
  /** 内容数据映射表 */
  contents: Map<string, unknown>;
}

/**
 * 投影路径接口
 */
export interface ProjectionPath {
  /** 2D路径点集合 */
  paths: Vector2[][];
  /** 实际3D路径集合 */
  realPaths: Curve3d[];
  /** 图形路径标识符 */
  graphicsPath: string;
}

/**
 * 投影数据接口
 */
export interface ProjectionData {
  /** 投影路径集合 */
  paths: ProjectionPath[];
  /** 合并后的联合路径 (可选) */
  unioned?: Vector2[][][];
}

/**
 * 曲面接口
 */
export interface Surface {
  /** 应用变换矩阵 */
  transform(matrix: Matrix4): void;
  /** 判断是否为平面 */
  isPlane(): boolean;
  /** 获取原点坐标 */
  getOrigin(): Vector3;
  /** 获取坐标系 */
  getCoord(): Coordinate;
}

/**
 * 坐标系接口
 */
export interface Coordinate {
  /** 获取Z轴方向向量 */
  getDz(): Vector3;
  /** 获取X轴方向向量 */
  getDx(): Vector3;
}

/**
 * 平面接口
 */
export interface Plane {
  /** 克隆平面 */
  clone(): Plane;
  /** 应用变换矩阵 */
  transform(matrix: Matrix4): Plane;
  /** 求逆变换矩阵 */
  inversed(): Matrix4;
  /** 获取平面坐标系 */
  getCoord(): Coordinate;
}

/**
 * 数组初始化参数接口
 */
export interface ArrayInitParams {
  /** 实体唯一标识 */
  eId: string;
  /** 源模型ID */
  srcId: string;
  /** 变换矩阵数组 */
  matrix?: Matrix4[];
  /** 最后一次操作参数 */
  last?: {
    /** 分割平面 */
    plane?: Plane;
    /** 变换矩阵 */
    matrix?: Matrix4;
  };
}

/**
 * 序列化选项接口
 */
export interface SerializationOptions {
  /** 是否使用缓存投影 */
  useCacheProjection?: boolean;
  [key: string]: unknown;
}

/**
 * 光带实体接口
 */
export interface LightBandEntity extends Entity {
  /** 光带唯一标识 */
  lightBandId: string;
  /** 获取3D扫掠路径 */
  getSweepPath3D(): Curve3d[];
  /** 参数配置 */
  parameters?: {
    pathCoedge3dsTags: (string | Curve3d)[];
  };
}

/**
 * 灯槽实体接口
 */
export interface LightSlotEntity extends Entity {
  /** 灯槽唯一标识 */
  lightSlotId: string;
  /** 获取3D扫掠路径 */
  getSweepPath3D(): Curve3d[];
  /** 参数配置 */
  parameters?: {
    pathCoedge3dsTags: (string | Curve3d)[];
  };
}

/**
 * 线条装饰实体接口
 */
export interface MoldingEntity extends Entity {
  /** 线条装饰唯一标识 */
  moldingId: string;
  /** 获取3D扫掠路径 */
  getSweepPath3D(): Curve3d[];
  /** 参数配置 */
  parameters?: {
    pathCoedge3dsTags: (string | Curve3d)[];
  };
}

/**
 * ParametricModelArray IO处理器
 * 负责参数化模型数组的序列化/反序列化
 */
export declare class ParametricModelArray_IO extends Entity_IO {
  /**
   * 获取IO处理器单例
   */
  static instance(): ParametricModelArray_IO;

  /**
   * 序列化实体数据
   * @param entity - 要序列化的实体
   * @param context - 序列化上下文
   * @param includeChildren - 是否包含子实体
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: ParametricModelArray,
    context?: unknown,
    includeChildren?: boolean,
    options?: SerializationOptions
  ): Array<{ eId: string; [key: string]: unknown }>;

  /**
   * 反序列化实体数据
   * @param entity - 目标实体对象
   * @param data - 序列化数据
   * @param options - 反序列化选项
   */
  load(
    entity: ParametricModelArray,
    data: { eId: string; [key: string]: unknown },
    options?: SerializationOptions
  ): void;
}

/**
 * 参数化模型数组类
 * 用于管理和渲染多个参数化模型实例的数组排列
 */
export declare class ParametricModelArray extends Entity {
  /** 实体唯一标识 */
  eId?: string;
  /** 源模型ID */
  srcId?: string;
  /** 源模型引用 */
  srcModel?: NCustomizedParametricModel | Entity;
  /** 分割平面 */
  splitPlane?: Plane;
  /** 变换矩阵数组 */
  matrixes?: Matrix4[];
  /** 顶视图投影缓存 */
  topProjection?: ProjectionData[];
  /** 底视图投影缓存 */
  bottomProjection?: ProjectionData[];
  /** 前视图投影缓存 */
  frontProjection?: ProjectionData[];
  /** 光带实体集合 */
  lightBands: LightBandEntity[];
  /** 灯槽实体集合 */
  lightSlots: LightSlotEntity[];
  /** 线条装饰实体集合 */
  moldings: MoldingEntity[];
  /** 内容实体映射表 */
  contents: Map<string, ParametricModelContent>;
  /** 数组变更信号 */
  signalArrayChanged: Signal<ParametricModelArray>;
  /** 图形数据缓存 */
  private _graphicsData?: GraphicsData;

  /**
   * 构造函数
   * @param name - 实体名称
   * @param parent - 父实体
   */
  constructor(name?: string, parent?: Entity);

  /**
   * 初始化数组配置
   * @param params - 初始化参数
   */
  initArray(params: ArrayInitParams): void;

  /**
   * 标记几何体需要更新
   */
  dirtyGeometry(): void;

  /**
   * 获取图形渲染数据
   * @returns 包含面、边和内容的图形数据
   */
  getGraphicsData(): GraphicsData;

  /**
   * 异步获取图形渲染数据
   * @returns Promise包裹的图形数据
   */
  getGraphicsDataAsync(): Promise<GraphicsData>;

  /**
   * 应用矩阵变换到图形数据
   * @param data - 原始图形数据
   * @param matrix - 变换矩阵
   * @returns 变换后的图形数据
   */
  transformGraphicsData(data: GraphicsData, matrix: Matrix4): GraphicsData;

  /**
   * 应用偏移到投影数据
   * @param projections - 投影数据数组
   * @param offset - XY平面偏移量
   * @returns 变换后的投影数据
   */
  transformProjectionData(projections: ProjectionData[], offset: { x: number; y: number }): ProjectionData[];

  /**
   * 获取裁剪坐标系
   * @returns 裁剪平面坐标系，如无则返回undefined
   */
  getClipCoord(): Coordinate | undefined;

  /**
   * 转换变换矩阵数组（考虑子部件矩阵）
   * @param matrices - 原始矩阵数组
   * @returns 转换后的矩阵数组
   */
  transformMatrixes(matrices: Matrix4[]): Matrix4[];

  /**
   * 递归获取源模型的图形数据
   * @param model - 源模型实体
   * @param accumulator - 累积的图形数据
   * @returns 合并后的图形数据
   */
  getSrcModelGraphicsData(model: Entity, accumulator?: GraphicsData): GraphicsData;

  /**
   * 递归获取源模型的顶视图投影
   * @param model - 源模型实体
   * @returns 投影数据数组
   */
  getSrcModelTopProjections(model: Entity): ProjectionData[] | undefined;

  /**
   * 递归获取源模型的前视图投影
   * @param model - 源模型实体
   * @returns 投影数据数组
   */
  getSrcModelFrontProjections(model: Entity): ProjectionData[] | undefined;

  /**
   * 合并投影路径为联合区域
   * @param projections - 投影数据数组
   * @returns 合并后的多边形路径
   */
  private _getUnion(projections: ProjectionData[]): Vector2[][][];

  /**
   * 获取宿主实体
   * @returns 宿主实体或null
   */
  getHost(): Entity | null;

  /**
   * 获取材质
   * @returns 材质对象或undefined
   */
  getMaterial(): unknown;

  /**
   * 判断指定面是否有材质
   * @param meshKey - 网格唯一标识
   * @returns 是否存在材质
   */
  hasFaceMaterial(meshKey: string): boolean;

  /**
   * 递归检查源模型是否有指定面材质
   * @param model - 源模型实体
   * @param faceTag - 面标签
   * @returns 是否存在材质
   */
  srcModelHasFaceMaterial(model: Entity, faceTag: string): boolean;

  /**
   * 获取指定面的材质
   * @param meshKey - 网格唯一标识
   * @returns 材质对象或undefined
   */
  getFaceMaterial(meshKey: string): unknown;

  /**
   * 获取指定面的材质数据
   * @param meshKey - 网格唯一标识
   * @returns 材质数据或undefined
   */
  getFaceMaterialData(meshKey: string): unknown;

  /**
   * 从meshKey提取面标签
   * @param meshKey - 网格唯一标识
   * @returns 面标签字符串
   */
  getFaceTagByMeshKey(meshKey: string): string;

  /**
   * 异步获取顶视图投影
   * @param forceRefresh - 是否强制刷新
   * @param options - 获取选项
   * @returns Promise包裹的投影数据
   */
  getTopProjectionAsync(forceRefresh?: boolean, options?: SerializationOptions): Promise<ProjectionData[] | undefined>;

  /**
   * 获取顶视图投影（同步）
   * @param forceRefresh - 是否强制刷新
   * @param options - 获取选项
   * @returns 投影数据数组
   */
  getTopProjection(forceRefresh?: boolean, options?: SerializationOptions): ProjectionData[] | undefined;

  /**
   * 获取底视图投影
   * @param forceRefresh - 是否强制刷新
   * @returns 投影数据数组
   */
  getBottomProjection(forceRefresh?: boolean): ProjectionData[] | undefined;

  /**
   * 获取前视图投影
   * @param forceRefresh - 是否强制刷新
   * @returns 投影数据数组
   */
  getFrontProjection(forceRefresh?: boolean): ProjectionData[] | undefined;

  /**
   * 根据meshKey获取面图形数据
   * @param meshKey - 网格唯一标识
   * @returns 面图形数据或undefined
   */
  private _getFaceGraphicData(meshKey: string): FaceGraphicData | undefined;

  /**
   * 获取面的投影平面
   * @param meshKey - 网格唯一标识
   * @param faceData - 面图形数据（可选，用于优化）
   * @returns THREE.js平面对象或undefined
   */
  getFaceProjectionPlane(meshKey: string, faceData?: FaceGraphicData): THREE.Plane | undefined;

  /**
   * 获取所有深度光带实体
   * @returns 光带实体数组
   */
  getDeepLightBandEntities(): LightBandEntity[];

  /**
   * 获取所有深度灯槽实体
   * @returns 灯槽实体数组
   */
  getDeepLightSlotEntities(): LightSlotEntity[];

  /**
   * 获取所有深度线条装饰实体
   * @returns 线条装饰实体数组
   */
  getDeepMoldingEntities(): MoldingEntity[];

  /**
   * 获取所有深度内容实体
   * @returns 内容实体映射表
   */
  getDeepContents(): Map<string, ParametricModelContent>;

  /**
   * 清除所有生成的扫掠实体（光带、灯槽、线条装饰）
   */
  clearAllGeneratedSweepers(): void;

  /**
   * 计算子部件到源模型的变换矩阵
   * @param subpart - 子部件实体
   * @returns 累积的变换矩阵
   */
  private _getsubpartToSrcModelMatrix(subpart: Entity): Matrix4;

  /**
   * 生成数组化的光带实体
   * @param lightBands - 源光带实体数组
   */
  generateArrayLightBands(lightBands: LightBandEntity[]): void;

  /**
   * 生成数组化的灯槽实体
   * @param lightSlots - 源灯槽实体数组
   */
  generateArrayLightSlots(lightSlots: LightSlotEntity[]): void;

  /**
   * 生成数组化的线条装饰实体
   * @param moldings - 源线条装饰实体数组
   */
  generateArrayMoldings(moldings: MoldingEntity[]): void;

  /**
   * 创建数组内容实例
   * @returns 新的内容实体
   */
  private _createArrayContent(): ParametricModelContent;

  /**
   * 生成数组化的内容实体
   * @param contents - 源内容实体数组
   * @param sourceModel - 源模型引用
   */
  generateArrayContents(contents: ParametricModelContent[], sourceModel: Entity): void;

  /**
   * 移除不存在的内容实体
   * @param existingIds - 当前存在的内容ID数组
   */
  private _removeInexistentContent(existingIds: string[]): void;

  /**
   * 判断内容是否在房间内
   * @param content - 内容实体
   * @returns 是否在房间内
   */
  isContentInRoom(content: ParametricModelContent): boolean;

  /**
   * 获取IO处理器实例
   * @returns IO处理器
   */
  getIO(): ParametricModelArray_IO;
}