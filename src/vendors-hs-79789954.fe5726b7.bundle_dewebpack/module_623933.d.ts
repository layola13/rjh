/**
 * 几何图形相交检测模块
 * 提供直线与圆弧之间的相交信息计算功能
 */

import * as THREE from 'three';

/**
 * 相交信息结果
 */
export interface IntersectionInfo {
  /** 相交点坐标数组 */
  intersects: THREE.Vector3[];
  /** 当前图形的参数数组（参数化表示的相交位置） */
  thisParams: number[];
  /** 目标图形的参数数组（参数化表示的相交位置） */
  thatParams: number[];
}

/**
 * 直线相交信息（内部使用）
 */
interface LineIntersectionResult {
  /** 相交点 */
  intersect: THREE.Vector3;
  /** 第一条直线的参数 */
  param1: number;
  /** 第二条直线的参数 */
  param2: number;
}

/**
 * 圆弧与直线相交信息（内部使用）
 */
interface ArcLineIntersectionResult {
  /** 相交点数组 */
  intersects: THREE.Vector3[];
  /** 圆弧参数数组 */
  arcParams: number[];
  /** 直线参数数组 */
  lineParams: number[];
}

/**
 * 圆弧相交信息（内部使用）
 */
interface ArcArcIntersectionResult {
  /** 相交点数组 */
  intersects: THREE.Vector3[];
  /** 第一个圆弧的参数数组 */
  arc1Params: number[];
  /** 第二个圆弧的参数数组 */
  arc2Params: number[];
}

/**
 * 直线与直线相交检测模块
 */
declare const lineLineIntersection: {
  getIntersectionInfo2(
    line1: THREE.Line3,
    line2: THREE.Line3,
    extended: boolean
  ): LineIntersectionResult | null;
};

/**
 * 圆弧相关相交检测模块
 */
declare const arcIntersection: {
  /** 获取圆弧与直线的相交信息 */
  getArcLineIntersectionInfo(
    arc: unknown,
    line: THREE.Line3
  ): ArcLineIntersectionResult | null;
  
  /** 获取圆弧与圆弧的相交信息 */
  getArcArcIntersectionInfo(
    arc1: unknown,
    arc2: unknown
  ): ArcArcIntersectionResult | null;
};

/**
 * 几何图形相交检测工具
 */
export interface GeometryIntersection {
  /**
   * 获取两个几何图形的相交信息
   * 支持直线（THREE.Line3）与圆弧之间的相交检测
   * 
   * @param geometry1 - 第一个几何图形（直线或圆弧）
   * @param geometry2 - 第二个几何图形（直线或圆弧）
   * @returns 相交信息，如果不相交则返回 null
   * 
   * @example
   *