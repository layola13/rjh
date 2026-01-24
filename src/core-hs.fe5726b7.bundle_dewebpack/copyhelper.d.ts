/**
 * CopyHelper - 用于处理3D几何体复制和匹配的辅助工具类
 * 提供Brep（边界表示）之间的面、边、顶点匹配功能
 */

import type { Matrix4, Point3d, Line3d, Arc3d, Tolerance } from './geometry';
import type { Brep, Face, Coedge, Vertex } from './topology';

/**
 * 复制辅助类 - 单例模式
 * 用于在两个Brep之间查找匹配的几何元素
 */
export declare class CopyHelper {
  private static _instance?: CopyHelper;

  private constructor();

  /**
   * 获取CopyHelper的单例实例
   * @returns CopyHelper实例
   */
  static getInstance(): CopyHelper;

  /**
   * 计算匹配的共边路径
   * 根据源Brep和标签列表，在目标Brep中找到对应的共边标签
   * 
   * @param sourceBrep - 源边界表示对象
   * @param coedgeTags - 源Brep中的共边标签数组
   * @param targetBrep - 目标边界表示对象
   * @returns 目标Brep中匹配的共边标签数组，如果匹配失败返回空数组
   */
  calcMatchingCoedgePath(
    sourceBrep: Brep,
    coedgeTags: number[],
    targetBrep: Brep
  ): number[];

  /**
   * 计算匹配的面
   * 根据面标签在两个Brep之间查找匹配的面
   * 
   * @param sourceBrep - 源边界表示对象
   * @param faceTag - 源Brep中的面标签
   * @param targetBrep - 目标边界表示对象
   * @returns 目标Brep中匹配的面标签，如果未找到返回undefined
   */
  calcMatchingFace(
    sourceBrep: Brep,
    faceTag: number,
    targetBrep: Brep
  ): number | undefined;

  /**
   * 获取匹配的面对象
   * 在目标Brep中查找与源面几何相同的面
   * 
   * @param sourceFace - 源面对象
   * @param targetBrep - 目标边界表示对象
   * @param transformMatrix - 从源Brep到目标Brep的变换矩阵
   * @returns 匹配的面对象，如果未找到返回undefined
   */
  getMatchingFace(
    sourceFace: Face,
    targetBrep: Brep,
    transformMatrix: Matrix4
  ): Face | undefined;

  /**
   * 获取匹配的共边
   * 在目标面中查找与源共边几何相同的共边
   * 
   * @param sourceCoedge - 源共边对象
   * @param targetFace - 目标面对象
   * @returns 匹配的共边对象，如果未找到返回undefined
   */
  getMatchingCoedge(
    sourceCoedge: Coedge,
    targetFace: Face
  ): Coedge | undefined;

  /**
   * 判断两个面是否相同
   * 通过比较顶点位置和法向量判断
   * 
   * @param face1 - 第一个面
   * @param face2 - 第二个面
   * @param transformMatrix - 变换矩阵
   * @returns 如果两个面几何相同返回true，否则返回false
   */
  judgeSameFace(
    face1: Face,
    face2: Face,
    transformMatrix: Matrix4
  ): boolean;

  /**
   * 判断点是否在点集中
   * 使用几何容差进行比较
   * 
   * @param point - 待检查的点
   * @param points - 点集数组
   * @returns 如果点在点集中返回true，否则返回false
   */
  pointInPTS(point: Point3d, points: Point3d[]): boolean;

  /**
   * 根据标签获取共边
   * 在Brep的所有面中搜索指定标签的共边
   * 
   * @param brep - 边界表示对象
   * @param tag - 共边标签
   * @returns 匹配的共边对象，如果未找到返回undefined
   */
  getCoedgeByTag(brep: Brep, tag: number): Coedge | undefined;

  /**
   * 根据标签获取面
   * 在Brep中搜索指定标签的面
   * 
   * @param brep - 边界表示对象
   * @param tag - 面标签
   * @returns 匹配的面对象，如果未找到返回undefined
   */
  getFaceByTag(brep: Brep, tag: number): Face | undefined;

  /**
   * 获取Brep到Brep的变换矩阵
   * 计算从源Brep包围盒中心到目标Brep包围盒中心的平移矩阵
   * 
   * @param sourceBrep - 源边界表示对象
   * @param targetBrep - 目标边界表示对象
   * @returns 4x4变换矩阵
   */
  getBrep2BrepMatrix(sourceBrep: Brep, targetBrep: Brep): Matrix4;
}