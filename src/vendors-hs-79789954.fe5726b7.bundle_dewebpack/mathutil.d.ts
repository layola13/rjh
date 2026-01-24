/**
 * 数学工具类模块
 * 提供3D几何计算、坐标系转换、平面创建等功能
 */

import type * as THREE from 'three';
import type { Matrix4, Vector3, Line2d, Vector2 } from './math-types';
import type { FinitePlane } from './geometry';
import type { HSBox3 } from './box-types';

/**
 * 实体类型枚举
 */
export enum EN_TYPE {
  /** 左侧面 */
  EN_LEFT = 'left',
  /** 右侧面 */
  EN_RIGHT = 'right',
  /** 前侧面 */
  EN_FRONT = 'front',
  /** 后侧面 */
  EN_BACK = 'back',
  /** 底面 */
  EN_BOTTOM = 'bottom',
  /** 顶面 */
  EN_TOP = 'top'
}

/**
 * 实体尺寸接口
 */
export interface EntityDimensions {
  /** X方向长度 */
  XLength: number;
  /** Y方向长度 */
  YLength: number;
  /** Z方向长度 */
  ZLength: number;
  /** X方向尺寸 */
  XSize: number;
  /** Y方向尺寸 */
  YSize: number;
  /** Z方向尺寸 */
  ZSize: number;
}

/**
 * 坐标系接口
 */
export interface CoordinateSystem {
  /**
   * 获取世界坐标系到局部坐标系的转换矩阵
   */
  getWorldToLocalMatrix(): Matrix4;
}

/**
 * 平面接口
 */
export interface Plane {
  /**
   * 获取平面法向量
   */
  getNorm(): Vector3;
  
  /**
   * 获取平面原点
   */
  getOrigin(): Vector3;
  
  /**
   * 获取坐标系
   */
  getCoord(): CoordinateSystem;
}

/**
 * 带表面的面接口
 */
export interface FaceWithSurface {
  /** 表面对象 */
  surface: Plane;
}

/**
 * 变换参数接口
 */
export interface TransformParams {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** X方向缩放 */
  XScale: number;
  /** Y方向缩放 */
  YScale: number;
  /** Z方向缩放 */
  ZScale: number;
  /** X轴旋转角度（度） */
  XRotation: number;
  /** Y轴旋转角度（度） */
  YRotation: number;
  /** Z轴旋转角度（度） */
  ZRotation: number;
}

/**
 * 数学工具类
 * 提供3D空间中的几何计算、坐标变换、平面创建等静态方法
 */
export declare class MathUtil {
  /**
   * 计算两个包围盒之间的距离向量
   * @param box1 - 第一个包围盒
   * @param box2 - 第二个包围盒
   * @returns 距离向量（从box2.min指向box1.min）
   */
  static distanceOfBox(box1: HSBox3, box2: HSBox3): Vector3;

  /**
   * 判断两个平面是否相等
   * 通过比较法向量和点到原点的距离判断
   * @param surface1 - 第一个平面
   * @param surface2 - 第二个平面
   * @returns 如果两平面相等返回true，否则返回false
   */
  static isSurfaceEqual(surface1: Plane, surface2: Plane): boolean;

  /**
   * 在根坐标系中创建平面
   * @param entity - 实体尺寸信息
   * @param targetEntity - 目标实体（用于坐标系转换）
   * @param faceType - 面类型（左/右/前/后/顶/底）
   * @returns 创建的有限平面对象
   */
  static createSurfaceInRootCoordSys(
    entity: EntityDimensions,
    targetEntity: unknown,
    faceType: EN_TYPE
  ): FinitePlane;

  /**
   * 根据2D曲线在根坐标系中创建平面
   * @param entity - 实体尺寸信息
   * @param curve2d - 2D曲线对象
   * @param targetEntity - 目标实体（用于坐标系转换）
   * @returns 创建的侧面平面对象
   */
  static createSurfaceInRootCoordSysByCurve2d(
    entity: EntityDimensions,
    curve2d: Line2d,
    targetEntity: unknown
  ): FinitePlane;

  /**
   * 根据曲线创建侧面平面
   * @param entity - 实体尺寸信息
   * @param curve2d - 2D曲线（目前仅支持Line2d）
   * @param transformMatrix - 可选的变换矩阵
   * @returns 创建的有限平面对象
   */
  static createSideSurfaceByCurve(
    entity: EntityDimensions,
    curve2d: Line2d,
    transformMatrix?: Matrix4
  ): FinitePlane;

  /**
   * 根据实体和面类型创建平面
   * @param entity - 实体尺寸信息
   * @param faceType - 面类型（左/右/前/后/顶/底）
   * @param transformMatrix - 可选的变换矩阵
   * @returns 创建的有限平面对象
   */
  static createSurface(
    entity: EntityDimensions,
    faceType: EN_TYPE,
    transformMatrix?: Matrix4
  ): FinitePlane;

  /**
   * 获取多个面的包围盒
   * @param faces - 面对象数组
   * @param baseEntity - 基准实体（可选）
   * @returns 计算出的包围盒
   */
  static getBoundFacesBox(
    faces: FaceWithSurface[],
    baseEntity?: unknown
  ): HSBox3;

  /**
   * 根据方向向量获取对应的坐标轴索引
   * @param direction - 方向向量
   * @returns 轴索引（0=X轴, 1=Y轴, 2=Z轴）
   */
  static getAxisIndexByDirection(direction: Vector3): 0 | 1 | 2;

  /**
   * 根据方向向量获取对应的坐标轴名称
   * @param direction - 方向向量
   * @returns 轴名称（'x' | 'y' | 'z'）
   */
  static getAxisNameByDirection(direction: Vector3): 'x' | 'y' | 'z';

  /**
   * 判断包围盒是否在两个平面之间
   * @param box - 要检测的包围盒
   * @param plane1 - 第一个平面
   * @param plane2 - 第二个平面
   * @returns 如果包围盒在两平面之间返回true，否则返回false
   */
  static isBoxBetweenTwoPlane(
    box: HSBox3,
    plane1: Plane,
    plane2: Plane
  ): boolean;

  /**
   * 根据变换参数获取变换矩阵
   * 包含位移、旋转、缩放的组合变换
   * @param params - 变换参数
   * @returns Three.js Matrix4对象
   */
  static getMatrixOf(params: TransformParams): THREE.Matrix4;

  /**
   * 获取多个变换的全局组合矩阵
   * @param transformList - 变换参数数组
   * @returns 组合后的全局变换矩阵
   */
  static getGlobalMatrix(transformList: TransformParams[]): THREE.Matrix4;

  /**
   * 计算从矩阵M1到矩阵M2的相对变换矩阵
   * @param matrix1 - 源矩阵M1
   * @param matrix2 - 目标矩阵M2
   * @returns 相对变换矩阵（M2⁻¹ * M1）
   */
  static getM1ToM2(matrix1: THREE.Matrix4, matrix2: THREE.Matrix4): THREE.Matrix4;
}

/**
 * 默认导出
 */
export default MathUtil;