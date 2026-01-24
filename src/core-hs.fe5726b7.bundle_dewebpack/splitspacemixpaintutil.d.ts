/**
 * 空间分割混合绘制工具类
 * 
 * 提供用于处理空间分割和混合绘制操作的静态方法。
 * 该工具类主要用于计算基准点和更新面的混合绘制属性。
 * 
 * @module SplitSpaceMixpaintUtil
 */

import { Vector2 } from './Vector2';
import { Path } from './Path';
import { PaintsUtil } from './PaintsUtil';

/**
 * 包围盒接口
 * 定义2D空间中的边界框
 */
export interface BoundingBox {
  /** 边界框的最小点坐标 */
  min: Vector2;
  /** 边界框的最大点坐标 */
  max: Vector2;
}

/**
 * 原始路径数据接口
 */
export interface RawPath {
  /** 外部路径数据 */
  outer: unknown;
}

/**
 * 面对象接口
 * 表示一个具有路径和边界的几何面
 */
export interface FaceObject {
  /** 原始路径数据 */
  rawPath: RawPath;
}

/**
 * 表面对象接口
 * 提供获取2D曲线的方法
 */
export interface SurfaceObject {
  /**
   * 根据路径数据获取2D曲线集合
   * @param pathData - 路径数据
   * @returns 2D曲线数组
   */
  getCurve2ds(pathData: unknown): unknown[];
}

/**
 * 混合绘制选项接口
 */
export interface MixpaintOptions {
  /** 外部路径数据 */
  outerPath: unknown;
  /** 表面对象，包含曲线获取方法 */
  surfaceObj: SurfaceObject;
}

/**
 * 混合绘制更新配置接口
 */
export interface MixpaintUpdateConfig {
  /** 用于混合绘制计算的基准点 */
  basePoint: Vector2;
}

/**
 * 空间分割混合绘制工具类
 * 
 * 提供静态方法用于：
 * - 计算两个边界框之间的基准点
 * - 更新面对象的混合绘制属性
 */
export declare class SplitSpaceMixpaintUtil {
  /**
   * 根据两个路径的边界框计算基准点
   * 
   * 基准点是从第一个路径的最小点到第二个路径左上角的偏移向量。
   * 
   * @param firstPath - 第一个路径对象，用于提供参考最小点
   * @param secondPath - 第二个路径对象，用于计算目标点
   * @returns 相对于第一个路径最小点的二维向量偏移
   * 
   * @example
   *