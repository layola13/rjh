/**
 * UV坐标辅助类
 * 用于处理3D模型表面的UV坐标映射，支持投影、坐标系转换等功能
 */

import { Vector3, Plane, Coordinate3 } from './Vector3Module'; // 假设模块路径
import * as THREE from 'three';

/**
 * 多边形2D包围盒信息
 */
interface PolygonBoundingBox2D {
  /** 包围盒矩形范围 */
  square: {
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    minZ: number;
    maxZ: number;
  };
  /** 包围盒中心点 */
  center: {
    x: number;
    y: number;
  };
  /** 包围盒面积 */
  area: number;
  /** 左上角坐标 */
  lefttop: {
    x: number;
    y: number;
  };
}

/**
 * 多边形3D包围盒信息
 */
interface PolygonBoundingBox3D {
  /** 包围盒立方体范围 */
  square: {
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    minZ: number;
    maxZ: number;
  };
  /** 包围盒中心点 */
  center: {
    x: number;
    y: number;
    z: number;
  };
  /** X轴尺寸 */
  XSize: number;
  /** Y轴尺寸 */
  YSize: number;
  /** Z轴尺寸 */
  ZSize: number;
}

/**
 * 子路径数据结构
 */
interface SubPath {
  /** 顶点索引数组 */
  indices: number[];
}

/**
 * 平滑边数据
 */
type SmoothEdge = number[];

/**
 * 面的自定义数据
 */
interface FaceCustomData {
  /** UV基准点 */
  uvBasePoint?: Vector3;
  /** 是否为平滑面 (1表示是) */
  isSmoothFace?: number;
  /** 平滑边索引 */
  smoothEdge?: SmoothEdge;
  /** X方向向量 */
  xDirection?: Vector3;
}

/**
 * 面数据结构
 */
interface FaceData {
  /** 目标法向量 [x, y, z] */
  targetNormal: [number, number, number];
  /** 子路径集合 */
  subPaths: SubPath[];
  /** 自定义数据 */
  customData?: FaceCustomData;
}

/**
 * UV映射配置选项
 */
interface UVMappingOptions {
  /** UV基准点 */
  uvBasePoint?: Vector3;
  /** 是否为地板 */
  floor?: boolean;
  /** X方向向量 */
  xDirection?: Vector3;
}

/**
 * 投影数据结构
 */
interface ProjectionData {
  /** X轴射线 [x, y, z] */
  xRay: [number, number, number];
  /** 投影平面 */
  plane: {
    /** 平面常数 */
    constant: number;
  };
}

/**
 * UV坐标轴结果
 */
interface UVCoordinateAxes {
  /** X轴射线 */
  xAxis: THREE.Ray;
  /** Y轴射线 */
  yAxis: THREE.Ray;
}

/**
 * UV坐标辅助类
 * 负责将3D几何体的顶点映射到2D UV坐标空间
 */
export declare class UVCoordHelper {
  /** 全局坐标系 */
  private readonly globalCoordinateSystem: unknown;

  /**
   * 构造函数
   * @param globalCoordinateSystem 全局坐标系对象
   */
  constructor(globalCoordinateSystem: unknown);

  /**
   * 获取UV局部坐标系的X轴和Y轴
   * @param faceData 面数据
   * @param projectionData 投影数据
   * @param vertices 顶点数组
   * @param options UV映射配置选项
   * @param surfaceType 表面类型（如 "ceiling"）
   * @returns UV坐标轴（X轴和Y轴射线）
   */
  getUVLocalXY(
    faceData: FaceData,
    projectionData: ProjectionData,
    vertices: Vector3[],
    options?: UVMappingOptions,
    surfaceType?: string
  ): UVCoordinateAxes;

  /**
   * 从面数据和顶点数组提取3D路径
   * @param faceData 面数据
   * @param vertices 顶点数组
   * @returns 3D路径数组（多边形顶点数组的数组）
   */
  get3DPath(faceData: FaceData, vertices: Vector3[]): Vector3[][];

  /**
   * 判断是否需要反转投影平面
   * @param normal 法向量
   * @param surfaceType 表面类型
   * @returns 如果需要反转返回true
   */
  needReverseProjectionPlane(normal: Vector3, surfaceType?: string): boolean;

  /**
   * 判断是否为平滑面
   * @param faceData 面数据
   * @returns 如果是平滑面返回true
   */
  isSmoothFace(faceData: FaceData): boolean;

  /**
   * 将2D点投影到3D空间
   * @param plane 投影平面
   * @param constant 平面常数
   * @param point2D 2D点
   * @returns 投影后的3D点
   */
  projection3DPoint(plane: Plane, constant: number, point2D: THREE.Vector3): Vector3;

  /**
   * 将3D路径投影到2D平面
   * @param plane 投影平面
   * @param constant 平面常数
   * @param paths 3D路径数组
   * @returns 2D路径数组
   */
  projectTo2dPath(plane: Plane, constant: number, paths: Vector3[][]): Vector3[][];

  /**
   * 将多个3D路径投影到2D平面（带坐标系参数）
   * @param plane 投影平面
   * @param constant 平面常数
   * @param paths 3D路径数组
   * @param coordinateSystem 坐标系
   * @returns 2D路径数组
   */
  projection2DPaths(
    plane: Plane,
    constant: number,
    paths: Vector3[][],
    coordinateSystem: unknown
  ): Vector3[][];

  /**
   * 计算点沿射线方向的距离
   * @param ray 射线
   * @param point 目标点
   * @param optionalTarget 可选的输出向量
   * @returns 沿射线方向的距离
   */
  directionDistance(ray: THREE.Ray, point: THREE.Vector3, optionalTarget?: THREE.Vector3): number;

  /**
   * 获取合理的投影平面
   * @param normal 法向量
   * @param polygon 多边形顶点数组
   * @param surfaceType 表面类型
   * @returns 调整后的平面，如果无法构建则返回undefined
   */
  getReasonablePlane(normal: Vector3, polygon: Vector3[], surfaceType?: string): Plane | undefined;

  /**
   * 获取合理的X轴射线方向
   * @param normal 法向量
   * @param polygon 多边形顶点数组
   * @returns 计算出的X轴方向向量
   */
  getReasonableXRay(normal: Vector3, polygon: Vector3[]): Vector3;

  /**
   * 获取2D多边形的包围盒
   * @param polygon 2D多边形顶点数组
   * @returns 包围盒信息，如果多边形无效则返回undefined
   */
  getPolygonBoundingBox(polygon: Vector3[]): PolygonBoundingBox2D | undefined;

  /**
   * 获取3D多边形的包围盒
   * @param polygon 3D多边形顶点数组
   * @returns 3D包围盒信息，如果多边形无效则返回undefined
   */
  getPolygonBoundingBox3d(polygon: Vector3[]): PolygonBoundingBox3D | undefined;

  /**
   * 从多边形顶点创建平面
   * @param polygon 多边形顶点数组
   * @returns 构建的平面，如果失败则返回undefined
   */
  getPlaneFromPolygon(polygon: Vector3[]): Plane | undefined;

  /**
   * 从多边形中提取三个不共线的有效点
   * @param polygon 多边形顶点数组
   * @returns 三个有效点的数组，如果找不到则返回undefined
   * @private
   */
  private _getThreeQualifiedPoints(polygon: Vector3[]): [Vector3, Vector3, Vector3] | undefined;
}