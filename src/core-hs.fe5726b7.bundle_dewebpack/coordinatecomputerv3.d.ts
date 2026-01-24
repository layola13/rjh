/**
 * 三维坐标计算器 V3
 * 
 * 用于处理2D草图到铺装坐标系的转换，提供矩阵变换、路径转换等核心功能。
 * 支持点、线、面的坐标变换，以及与THREE.js的集成。
 * 
 * @module CoordinateComputerV3
 */

import { Matrix3 } from 'three';

/**
 * 2D向量接口
 */
interface Vector2 {
  x: number;
  y: number;
  /**
   * 对向量应用矩阵变换
   * @param matrix 变换矩阵
   * @returns 变换后的新向量
   */
  transform(matrix: TransformMatrix): Vector2;
}

/**
 * 变换矩阵接口
 */
interface TransformMatrix {
  /**
   * 将矩阵转换为数组形式
   * @returns 矩阵数据数组
   */
  toArray(): number[];
}

/**
 * 线环结构 - 表示闭合的点集合
 */
interface WireLoop {
  /** 外部轮廓点集 */
  outerLoop: Vector2[];
  /** 内部孔洞轮廓点集（可选） */
  innerLoops?: Vector2[][];
}

/**
 * 路径数据结构 - 包含外轮廓和孔洞
 */
interface PathData {
  /** 外部轮廓 */
  outer: Vector2[];
  /** 内部孔洞集合（可选） */
  holes?: Vector2[][];
}

/**
 * 2D草图接口
 */
interface Sketch2D {
  /** 草图包含的面集合 */
  faces: Face[];
}

/**
 * 面数据接口
 */
interface Face {
  // 面的具体属性由DataModelConvertor定义
}

/**
 * 构造函数参数接口
 */
interface CoordinateComputerConfig {
  /** 2D草图数据 */
  sketch2d: Sketch2D;
}

/**
 * 坐标计算器 V3
 * 
 * 负责将2D草图坐标系转换到铺装（Pave）坐标系，提供统一的坐标变换接口。
 * 内部维护一个变换矩阵，所有变换操作都基于该矩阵进行。
 * 
 * @example
 *