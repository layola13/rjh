/**
 * 同线面工具类
 * 用于处理在同一直线方向上的面(Face)的连接性、几何计算等操作
 */

import { Matrix4 } from './Matrix4';
import { Face } from './Face';
import { Vector2, Vector3 } from './Vector';
import { Surface } from './Surface';
import { Layer } from './Layer';
import { Document } from './Document';

/**
 * 面的2D几何信息
 */
interface FaceGeometry2D {
  /** 外轮廓点集 */
  outer: Vector2[];
  /** 内孔轮廓点集 */
  holes: Vector2[][];
}

/**
 * 面的2D几何信息(带转换矩阵)
 */
interface FaceGeometry2DWithMatrix extends FaceGeometry2D {
  /** 3D转换矩阵 */
  convert3dMatrix: Matrix4;
}

/**
 * 面的几何信息映射结果
 */
interface FacesGeometry2DMapResult {
  /** 面到2D几何的映射表 */
  facesGeometry2DMap: Map<Face, FaceGeometry2D>;
  /** 3D转换矩阵 */
  convert3dMatrix: Matrix4;
}

/**
 * 面的边界信息
 */
interface FaceBound {
  /** 外轮廓 */
  outer: Vector2[];
  /** 内孔 */
  holes: Vector2[][];
  /** 3D转换矩阵 */
  convert3dMatrix: Matrix4;
}

/**
 * 同线面工具类
 * 提供面的同线性判断、连接性检测、几何边界计算等功能
 */
export declare class SameLineFaceUtil {
  /**
   * 获取与指定面在同一直线上且相互连接的所有面
   * @param face - 目标面
   * @param candidates - 候选面列表(可选)，如果不提供则从整个文档中搜索
   * @returns 包含目标面在内的所有同线连接面数组
   */
  static getSameLineConnectedFaces(face: Face, candidates?: Face[]): Face[];

  /**
   * 判断两个面是否在同一直线方向上
   * @param face1 - 第一个面
   * @param face2 - 第二个面
   * @returns 如果两个面的表面方向一致则返回true
   */
  static isSameLineDirectionWithFace(face1: Face, face2: Face): boolean;

  /**
   * 从文档场景中获取所有与指定面同线方向的面
   * @param face - 目标面
   * @returns 所有同线方向的面数组(去重且不包含目标面自身)
   */
  static getSameLineDirectionFaces(face: Face): Face[];

  /**
   * 判断两个面是否相互连接
   * 通过检测面的外轮廓在3D空间中是否有重叠部分来判断
   * @param face1 - 第一个面
   * @param face2 - 第二个面
   * @returns 如果两个面的轮廓有重叠则返回true
   */
  static isConnectedWithFace(face1: Face, face2: Face): boolean;

  /**
   * 获取同线面集合的合并边界
   * 对多个同线面进行布尔并集运算，返回合并后的外轮廓和所有内孔
   * @param targetFace - 目标面
   * @param otherFaces - 其他需要合并的面
   * @returns 合并后的边界信息，如果计算失败则返回null
   */
  static getSameLineFacesBound(
    targetFace: Face,
    otherFaces: Face[]
  ): FaceBound | null;

  /**
   * 获取多个面的2D几何信息映射表
   * 将3D面转换到统一的2D坐标系中进行处理
   * @param targetFace - 目标面
   * @param otherFaces - 其他面
   * @param includeNonRawHoles - 是否包含非原始孔洞(默认false)
   * @returns 包含映射表和转换矩阵的结果对象
   * @private
   */
  private static _getFacesGeometry2DMap(
    targetFace: Face,
    otherFaces: Face[],
    includeNonRawHoles: boolean
  ): FacesGeometry2DMapResult;

  /**
   * 获取单个面的2D几何信息
   * 将面的3D轮廓转换到指定的2D坐标系
   * @param geometryManager - 几何管理器
   * @param face - 目标面
   * @param transformMatrix - 转换矩阵
   * @param includeNonRawHoles - 是否包含非原始孔洞(默认false)
   * @returns 2D几何信息，如果转换失败则返回null
   * @private
   */
  private static _getFaceGeometry2D(
    geometryManager: unknown,
    face: Face,
    transformMatrix: Matrix4,
    includeNonRawHoles?: boolean
  ): FaceGeometry2D | null;
}