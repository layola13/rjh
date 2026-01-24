/**
 * 连续曲面模块
 * 提供曲面的创建、变换、网格化等功能
 */

import type { Wire } from './Wire';
import type { Coordinate3, Cylinder, Plane, Line3d, SmoothPoly3d, SmoothPoly2d, Line2d, Tolerance, Matrix4 } from './Geometry';
import type { ContinuousCurve2d } from './ContinuousCurve2d';
import type { HalfPlane } from './HalfPlane';

/**
 * 扩展几何元素类型枚举
 */
export enum EXT_EN_GEO_ELEMENT_TYPE {
  /** 单一平面 */
  EN_SINGLE = 'single',
  /** 连续曲面 */
  EN_CONTINUOUS = 'continuous'
}

/**
 * 几何元素类型枚举
 */
export enum EN_GEO_ELEMENT_TYPE {
  /** 二维线段 */
  EN_LINE_2D = 'line2d'
}

/**
 * 二维点
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 三维点
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 二维曲线接口
 */
export interface Curve2D {
  /** 离散化曲线 */
  discrete(): Point2D[];
  /** 获取起点 */
  getStartPt(): Point2D;
  /** 获取终点 */
  getEndPt(): Point2D;
  /** 获取曲线类型 */
  getType(): EN_GEO_ELEMENT_TYPE;
}

/**
 * 三维曲线接口
 */
export interface Curve3D {
  /** 离散化曲线 */
  discrete(): Point3D[];
  /** 反转曲线方向 */
  reversed(): Curve3D;
}

/**
 * 半边数据结构
 */
export interface Coedge3D {
  /** 是否与边同向 */
  getSameDirWithEdge(): boolean;
  /** 获取关联的边 */
  getEdge(): Edge3D;
  /** 获取曲线 */
  getCurve(): Curve3D;
}

/**
 * 三维边
 */
export interface Edge3D {
  /** 获取边的曲线 */
  getCurve(): Curve3D;
}

/**
 * 网格数据结构
 */
export interface MeshData {
  /** 顶点坐标数组 (x1,y1,z1, x2,y2,z2, ...) */
  vertices: number[];
  /** 法向量数组 (可选) */
  normals?: number[];
  /** UV 坐标数组 (可选) */
  uvs?: number[];
  /** 索引数组 (可选) */
  indices?: number[];
}

/**
 * 标准化网格数据
 */
export interface StandardMesh {
  /** 材质标识 */
  material: unknown;
  /** 网格ID */
  id: string;
  /** 维度 (通常为3) */
  dimension: number;
  /** UV坐标 */
  uvs: Float32Array;
  /** 顶点坐标 */
  vertices: Float32Array;
  /** 索引数组 */
  indices: Uint32Array;
  /** 法向量 */
  normals: Float32Array;
}

/**
 * 数学网格数据 (原始格式)
 */
export interface MathMesh {
  /** 面数组 [[v1, v2, v3], ...] */
  faces: number[][];
  /** UV坐标 [[u, v], ...] */
  uvs: number[][];
  /** 顶点坐标 [[x, y, z], ...] */
  vertices: number[][];
  /** 法向量 [[nx, ny, nz], ...] */
  normals: number[][];
}

/**
 * 曲面序列化数据 (单一平面)
 */
export interface SinglePlaneData {
  type: EXT_EN_GEO_ELEMENT_TYPE.EN_SINGLE;
  /** 基础平面数据 */
  face: unknown;
  /** 半平面约束列表 */
  hps: unknown[];
}

/**
 * 曲面序列化数据 (连续曲面)
 */
export interface ContinuousSurfaceData {
  type: EXT_EN_GEO_ELEMENT_TYPE.EN_CONTINUOUS;
  /** 基础柱面数据 */
  face: unknown;
  /** 所有单一平面数据 */
  allFace: (SinglePlaneData | ContinuousSurfaceData | unknown)[];
}

/**
 * 曲面序列化数据联合类型
 */
export type SurfaceData = SinglePlaneData | ContinuousSurfaceData | unknown;

/**
 * 单一平面类
 * 表示一个由半平面约束的平面区域
 * @extends Plane
 */
export declare class Single extends Plane {
  /** 半平面约束列表 */
  private _st: HalfPlane[];

  /**
   * 构造单一平面
   * @param basePlane - 基础平面 (可选)
   * @param halfPlanes - 半平面约束列表 (默认空数组)
   */
  constructor(basePlane?: Plane, halfPlanes?: HalfPlane[]);

  /**
   * 返回变换后的新平面 (不改变原对象)
   * @param transform - 变换矩阵
   * @returns 变换后的新平面
   */
  transformed(transform: Matrix4): Single;

  /**
   * 就地变换平面
   * @param transform - 变换矩阵
   * @returns 变换后的自身 (支持链式调用)
   */
  transform(transform: Matrix4): this;

  /**
   * 检查点是否在平面约束区域内
   * @param point - 待检查的二维点
   * @returns true 表示点在区域内
   */
  check(point: Point2D): boolean;

  /**
   * 获取半平面约束列表
   * @returns 半平面数组
   */
  getSt(): HalfPlane[];

  /**
   * 将二维半平面转换为三维线段
   * @param halfPlane - 二维半平面
   * @returns 三维线段
   */
  getLine3dByHalfPlane2d(halfPlane: HalfPlane): Line3d;

  /**
   * 克隆平面
   * @returns 新的单一平面对象
   */
  clone(): Single;

  /**
   * 计算线框或曲线列表围成的面积
   * @param wireOrCurves - 线框对象或曲线数组
   * @param isPositive - 是否正向计算 (默认 true)
   * @returns 面积值
   */
  getArea(wireOrCurves: Wire | Curve3D[], isPositive?: boolean): number;

  /**
   * 将平面离散化为网格数据
   * @param meshData - 输入网格数据
   * @returns 离散化后的网格数据
   */
  discreteMesh(meshData: MeshData): MeshData;

  /**
   * 序列化为JSON对象
   * @returns 序列化数据
   */
  dump1(): SinglePlaneData;

  /**
   * 从序列化数据加载单一平面
   * @param data - 序列化数据
   * @returns 单一平面对象
   */
  static load1(data: SinglePlaneData): Single;
}

/**
 * 连续曲面类
 * 表示由多个单一平面组成的连续曲面 (如柱面、锥面等)
 * @extends Cylinder
 */
export declare class ContinuousSurface extends Cylinder {
  /** 组成曲面的所有单一平面 */
  private _allFace: Single[];

  /**
   * 构造连续曲面
   * @param sourceFaces - 源单一平面数组或源曲面对象
   * @param coordinate - 坐标系 (可选)
   * @param radiusA - 第一半径参数 (可选)
   * @param radiusB - 第二半径参数 (可选)
   */
  constructor(
    sourceFaces?: Single[] | ContinuousSurface,
    coordinate?: Coordinate3,
    radiusA?: number,
    radiusB?: number
  );

  /**
   * 返回变换后的新曲面 (不改变原对象)
   * @param transform - 变换矩阵
   * @returns 变换后的新曲面
   */
  transformed(transform: Matrix4): ContinuousSurface;

  /**
   * 就地变换曲面
   * @param transform - 变换矩阵
   * @returns 变换后的自身 (支持链式调用)
   */
  transform(transform: Matrix4): this;

  /**
   * 获取所有单一平面的副本
   * @returns 单一平面数组
   */
  getAllFace(): Single[];

  /**
   * 向曲面添加单一平面
   * @param singlePlane - 要添加的单一平面
   * @returns true 表示添加成功
   */
  pushSinglePlane(singlePlane: Single): boolean;

  /**
   * 克隆曲面
   * @returns 新的连续曲面对象
   */
  clone(): ContinuousSurface;

  /**
   * 将二维曲线投影到曲面上得到三维曲线
   * @param curve2d - 二维曲线
   * @returns 三维光滑多段线
   */
  getCurve3d(curve2d: Curve2D): SmoothPoly3d;

  /**
   * 将三维曲线投影到曲面UV空间得到二维曲线
   * @param curve3d - 三维曲线
   * @returns 二维连续曲线
   */
  getCurve2d(curve3d: Curve3D): ContinuousCurve2d;

  /**
   * 计算线框或曲线列表围成的面积
   * @param wireOrCurves - 线框对象或曲线数组
   * @param isPositive - 是否正向计算 (默认 true)
   * @returns 面积值
   */
  getArea(wireOrCurves: Wire | Curve3D[], isPositive?: boolean): number;

  /**
   * 将曲面离散化为网格数据数组
   * @param meshData - 输入网格数据
   * @returns 离散化后的网格数据数组
   */
  discreteMesh(meshData: MeshData): MeshData[];

  /**
   * 序列化为JSON对象
   * @returns 序列化数据
   */
  dump1(): ContinuousSurfaceData;

  /**
   * 从序列化数据加载连续曲面
   * @param data - 序列化数据
   * @returns 连续曲面对象
   */
  static load1(data: ContinuousSurfaceData): ContinuousSurface;
}

/**
 * 序列化曲面为JSON对象
 * @param surface - 曲面对象 (Single, ContinuousSurface 或其他曲面类型)
 * @returns 序列化数据
 */
export declare function SurfaceDump(surface: Single | ContinuousSurface | unknown): SurfaceData;

/**
 * 从序列化数据加载曲面
 * @param data - 序列化数据
 * @returns 曲面对象 (Single, ContinuousSurface 或其他类型)
 */
export declare function SurfaceLoad(data: SurfaceData): Single | ContinuousSurface | unknown;

/**
 * 将数学网格格式转换为标准网格格式
 * @param mathMesh - 数学网格数据
 * @param meshId - 网格ID
 * @param material - 材质对象
 * @returns 标准网格数据
 */
export declare function mathMeshToMesh(
  mathMesh: MathMesh,
  meshId: string,
  material: unknown
): StandardMesh;

/**
 * 使用变换矩阵变换网格数据
 * @param meshes - 网格数据数组
 * @param transformMatrix - 4x4变换矩阵
 * @param transformNormals - 是否同时变换法向量 (默认 true)
 */
export declare function transformMesh(
  meshes: MeshData[],
  transformMatrix: Matrix4,
  transformNormals?: boolean
): void;