/**
 * 3D内容尺寸计算和对齐工具模块
 * 提供内容尺寸调整、吸附对齐偏移量计算等功能
 */

import type * as THREE from 'three';

/**
 * 3D坐标点接口
 */
export interface Point3D {
  /** X轴坐标 */
  x: number;
  /** Y轴坐标 */
  y: number;
  /** Z轴坐标 */
  z: number;
}

/**
 * 缩放比例信息
 */
export interface ScaleInfo {
  /** X轴缩放比例 */
  XScale: number;
  /** Y轴缩放比例 */
  YScale: number;
  /** Z轴缩放比例 */
  ZScale: number;
}

/**
 * 内容对象接口（扩展自3D坐标点和缩放信息）
 */
export interface Content extends Point3D, ScaleInfo {
  /** X轴方向长度 */
  XLength: number;
  /** Y轴方向长度 */
  YLength: number;
  /** Z轴方向长度 */
  ZLength: number;
  /** X轴方向尺寸 */
  XSize: number;
  /** Y轴方向尺寸 */
  YSize: number;
  /** Z轴方向尺寸 */
  ZSize: number;
  /** 厚度（用于壁龛等） */
  thickness?: number;
  
  /**
   * 检查是否启用指定标志
   * @param flag - 内容标志枚举值
   * @returns 是否启用该标志
   */
  isFlagOn(flag: number): boolean;
}

/**
 * 目标尺寸（部分Point3D，可能只包含x/y/z中的部分属性）
 */
export type TargetSize = Partial<Point3D>;

/**
 * 尺寸范围约束
 */
export interface SizeConstraint {
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
}

/**
 * 吸附信息接口
 */
export interface SnapInfo {
  /** 吸附的宿主对象 */
  host: unknown;
  /** 吸附方向 */
  direction: number;
  /** 法向量 */
  normal?: THREE.Vector3;
}

/**
 * 内容最小有效尺寸常量
 */
export const CONTENT_MINIMUM_VALID_SIZE: number;

/**
 * 计算保持吸附对齐所需的偏移量
 * 
 * 当内容对象尺寸发生变化时，计算为了保持与墙体、天花板、地板等元素的吸附关系
 * 需要对内容位置进行的偏移调整
 * 
 * @param content - 当前内容对象
 * @param targetSize - 目标尺寸（可能只包含x/y/z中的部分属性）
 * @returns 需要应用的偏移量坐标
 * 
 * @example
 *