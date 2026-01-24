/**
 * 三角形边缘数据结构，用于表示三角网格中的一条边
 */
export declare class TriEdge {
  /** 边的起始顶点索引 */
  readonly from: number;
  
  /** 边的终止顶点索引 */
  readonly to: number;
  
  /** 边的唯一标识符，格式为 "from-to" 或 "to-from"（保证较小索引在前） */
  private readonly _id: string;
  
  /**
   * 构造一条三角形边
   * @param from 起始顶点索引
   * @param to 终止顶点索引
   */
  constructor(from: number, to: number);
  
  /**
   * 获取边的唯一标识符
   */
  get id(): string;
}

/**
 * 多段线数据结构，由顶点数组和索引数组组成
 */
export declare class PolyLine {
  /** 顶点坐标数组 */
  readonly pts: Vector3[];
  
  /** 索引数组，每两个索引定义一条线段 */
  readonly indices: number[];
  
  /**
   * 构造多段线
   * @param pts 顶点坐标数组
   * @param indices 索引数组
   */
  constructor(pts: Vector3[], indices: number[]);
  
  /**
   * 使用平面裁剪多段线
   * @param plane 裁剪平面
   * @returns 裁剪后的多段线，如果完全被裁剪则返回 undefined
   */
  clipByPlane(plane: Plane): PolyLine | undefined;
  
  /**
   * 使用闭合环路裁剪多段线
   * @param baseCoord 基准坐标系
   * @param loop 闭合环路
   * @returns 裁剪后的多段线，如果完全被裁剪则返回 undefined
   */
  clipByLoop(baseCoord: unknown, loop: Loop): PolyLine | undefined;
  
  /**
   * 计算多段线的总长度
   * @returns 所有线段长度之和
   */
  getLength(): number;
}

/**
 * 图形裁剪工具类，提供网格、多段线等几何体的裁剪功能
 * @singleton
 */
export declare class GraphicsCutter {
  /**
   * 私有构造函数，使用 getInstance() 获取实例
   */
  private constructor();
  
  /**
   * 获取 GraphicsCutter 单例实例
   */
  static getInstance(): GraphicsCutter;
  
  /**
   * 使用障碍物裁剪几何体（面和边）
   * @param geometry 待裁剪的几何体数据，包含 faces 和 edges
   * @param obstacles 障碍物信息数组，每个包含 baseCoord、loop、extruderHeight
   * @param localCoord 局部坐标系
   * @param options 裁剪选项
   * @param options.isBackgroundWallArray 是否为背景墙数组模式
   * @param options.isSweepModel 是否为扫掠模型模式
   * @param options.notFill 是否不填充裁剪区域
   * @returns 裁剪后的几何体数据
   */
  clipGeomByObstacles(
    geometry: GeometryData,
    obstacles: ObstacleInfo[],
    localCoord: unknown,
    options?: ClipOptions
  ): GeometryData;
  
  /**
   * 使用障碍物裁剪扫掠几何体
   * @param geometry 待裁剪的几何体数据
   * @param model 模型对象
   * @returns 裁剪后的几何体数据
   */
  clipSweepGeomByObstacles(geometry: GeometryData, model: unknown): GeometryData;
  
  /**
   * 使用障碍物裁剪混合铺装
   * @param mixPave 混合铺装数据，包含 meshDefs 和 objects
   * @param obstacles 障碍物信息数组
   * @param localCoord 局部坐标系
   * @returns 裁剪后的混合铺装数据
   */
  clipMixpaveByObstacles(
    mixPave: MixPaveData,
    obstacles: ObstacleInfo[],
    localCoord: unknown
  ): MixPaveData;
  
  /**
   * 使用平面数组裁剪几何体
   * @param geometry 待裁剪的几何体数据
   * @param planes 裁剪平面数组
   * @returns 裁剪后的几何体数据
   */
  clipGeomByPlanes(geometry: GeometryData, planes: unknown[]): GeometryData;
  
  /**
   * 使用平面数组裁剪混合铺装
   * @param mixPave 混合铺装数据
   * @param planes 裁剪平面数组
   * @returns 裁剪后的混合铺装数据
   */
  clipMixpaveByPlanes(mixPave: MixPaveData, planes: unknown[]): MixPaveData;
  
  /**
   * 使用平面数组裁剪路径
   * @param path 路径曲线数组
   * @param planes 裁剪平面数组
   * @returns 裁剪后的路径曲线数组
   */
  clipPathByPlanes(path: Curve3d[], planes: unknown[]): Curve3d[];
  
  /**
   * 从网格提取线框（边界环路）
   * @param mesh 网格数据
   * @returns 线框点数组的数组，每个子数组代表一个闭合环路
   */
  meshwire(mesh: MeshData): Vector3[][];
  
  /**
   * 将网格数据转换回面几何体数据
   * @param mesh 网格数据
   * @param faceGeom 原始面几何体数据（作为模板）
   * @param transformMatrix 可选的变换矩阵
   * @param suffix 可选的 meshKey 后缀
   * @returns 面几何体数据
   */
  convertMeshBack2FaceGeom(
    mesh: MeshData,
    faceGeom: FaceGeometryData,
    transformMatrix?: unknown,
    suffix?: number
  ): FaceGeometryData;
  
  /**
   * 将网格数据转换回网格定义数据
   * @param mesh 网格数据
   * @param meshDef 原始网格定义数据（作为模板）
   * @param transformMatrix 可选的变换矩阵
   * @returns 网格定义数据
   */
  convertMeshBack2MeshDef(
    mesh: MeshData,
    meshDef: MeshDefData,
    transformMatrix?: unknown
  ): MeshDefData;
  
  /**
   * 将多段线数据转换回边几何体数据
   * @param polyline 多段线数据
   * @param edgeGeom 原始边几何体数据（作为模板）
   * @returns 边几何体数据
   */
  convertPolylineBack2EdgeGeom(polyline: PolyLine, edgeGeom: EdgeGeometryData): EdgeGeometryData;
  
  /**
   * 将面几何体数据转换为网格数据
   * @param faceGeom 面几何体数据
   * @param transformMatrix 可选的变换矩阵
   * @returns 网格数据
   */
  convertFaceGeom2Mesh(faceGeom: FaceGeometryData, transformMatrix?: unknown): MeshData;
  
  /**
   * 将边几何体数据转换为多段线数据
   * @param edgeGeom 边几何体数据
   * @returns 多段线数据
   */
  convertEdgeGeom2PolyLine(edgeGeom: EdgeGeometryData): PolyLine;
  
  /**
   * 将混合铺装数据转换为网格数据
   * @param meshDef 网格定义数据
   * @param transformMatrix 可选的变换矩阵
   * @returns 网格数据
   */
  convertMixPave2Mesh(meshDef: MeshDefData, transformMatrix?: unknown): MeshData;
  
  /**
   * 内部方法：变换网格数据
   * @param mesh 网格数据
   * @param transformMatrix 变换矩阵
   * @param swapYZ 是否交换 Y 和 Z 坐标
   * @param negateZ 是否对 Z 坐标取反
   * @returns 变换后的网格数据
   */
  private _transformMesh(
    mesh: MeshData,
    transformMatrix: TransformMatrix,
    swapYZ?: boolean,
    negateZ?: boolean
  ): MeshData;
  
  /** 单例实例 */
  private static _instance: GraphicsCutter;
}

// ==================== 辅助类型定义 ====================

/**
 * 三维向量
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 平面
 */
interface Plane {
  // 平面定义
}

/**
 * 闭合环路
 */
interface Loop {
  // 环路定义
}

/**
 * 三维曲线
 */
interface Curve3d {
  // 曲线定义
}

/**
 * 变换矩阵
 */
interface TransformMatrix {
  data: number[][];
}

/**
 * 网格数据
 */
interface MeshData {
  /** 顶点坐标数组（展平的 x, y, z 序列） */
  vertices: number[];
  /** 面索引数组（三角形索引） */
  faces: number[];
  /** 法线数组（展平的 nx, ny, nz 序列） */
  normals: number[];
  /** UV 坐标数组 */
  uvs: number[];
}

/**
 * 面几何体数据
 */
interface FaceGeometryData {
  /** 顶点数量 */
  vertexCount: number;
  /** 顶点坐标数组 */
  vertexPositions: number[];
  /** 顶点法线数组 */
  vertexNormals: number[];
  /** 顶点 UV 坐标数组 */
  vertexUVs: number[];
  /** 索引数量 */
  indexCount: number;
  /** 索引数组 */
  indices: number[];
  /** 面路径（线框） */
  facePaths?: Vector3[][];
  /** 包围盒 [minX, minY, minZ, maxX, maxY, maxZ] */
  bounding?: number[];
  /** 网格键值 */
  meshKey: string;
  /** 表面信息 */
  surface?: Plane;
  /** 面法线 */
  faceNormal?: Vector3;
  /** 面 X 轴方向 */
  faceXRay?: Vector3;
  /** 面 Y 轴方向 */
  faceYRay?: Vector3;
}

/**
 * 边几何体数据
 */
interface EdgeGeometryData {
  /** 顶点数量 */
  vertexCount: number;
  /** 顶点坐标数组 */
  vertexPositions: number[];
  /** 索引数组 */
  indices: number[];
  /** 索引数量 */
  indexCount: number;
  /** 平滑索引数组（可选） */
  smoothIndices?: number[];
  /** 包围盒 [minX, minY, minZ, maxX, maxY, maxZ] */
  bounding?: number[];
}

/**
 * 网格定义数据
 */
interface MeshDefData {
  /** 网格键值 */
  meshKey: string;
  /** 顶点数量 */
  vertexCount: number;
  /** 顶点坐标数组 */
  vertexPositions: number[];
  /** 顶点法线数组 */
  vertexNormals: number[];
  /** 顶点 UV 坐标数组 */
  vertexUVs: number[];
  /** 索引数量 */
  indexCount: number;
  /** 面索引数组 */
  faceIndices: number[];
}

/**
 * 几何体数据
 */
interface GeometryData {
  /** 面数据映射表（键 -> 面几何体） */
  faces: Map<string, FaceGeometryData>;
  /** 边数据映射表（键 -> 边几何体） */
  edges: Map<string, EdgeGeometryData>;
  /** 内容数据映射表（可选） */
  contents?: Map<string, unknown>;
}

/**
 * 混合铺装数据
 */
interface MixPaveData {
  /** 网格定义数组 */
  meshDefs: MeshDefData[];
  /** 对象数组 */
  objects: Array<{ mesh: string; [key: string]: unknown }>;
}

/**
 * 障碍物信息
 */
interface ObstacleInfo {
  /** 基准坐标系 */
  baseCoord: unknown;
  /** 闭合环路 */
  loop: Loop;
  /** 拉伸高度 */
  extruderHeight: number;
}

/**
 * 裁剪选项
 */
interface ClipOptions {
  /** 是否为背景墙数组模式 */
  isBackgroundWallArray?: boolean;
  /** 是否为扫掠模型模式 */
  isSweepModel?: boolean;
  /** 是否不填充裁剪区域 */
  notFill?: boolean;
}