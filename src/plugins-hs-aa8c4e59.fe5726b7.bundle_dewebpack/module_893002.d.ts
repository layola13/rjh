/**
 * 数据类型比较工具模块
 * 提供根据不同数据类型获取对应比较函数的功能
 */

import { DataType } from './DataType'; // 假设来自模块 321465
import { MathUtil } from './MathUtil'; // 假设来自模块 815362

/**
 * 二维点坐标类型 [x, y]
 */
export type Point2D = [number, number];

/**
 * 三维点坐标类型 [x, y, z]
 */
export type Point3D = [number, number, number];

/**
 * 比较函数类型 - 用于基本类型（Int, String, Boolean, Unknown）
 */
export type BasicCompareFunction = (a: any, b: any) => boolean;

/**
 * 比较函数类型 - 用于数字类型
 */
export type NumberCompareFunction = (a: number, b: number) => boolean;

/**
 * 比较函数类型 - 用于二维点数组
 */
export type Point2DCompareFunction = (a: Point2D, b: Point2D) => boolean;

/**
 * 比较函数类型 - 用于三维点数组
 */
export type Point3DCompareFunction = (a: Point3D, b: Point3D) => boolean;

/**
 * 比较函数类型 - 用于数字数组
 */
export type NumberArrayCompareFunction = (
  a: number[],
  b: number[],
  compareLength?: number
) => boolean;

/**
 * 所有可能的比较函数类型联合
 */
export type CompareFunction =
  | BasicCompareFunction
  | NumberCompareFunction
  | Point2DCompareFunction
  | Point3DCompareFunction
  | NumberArrayCompareFunction;

/**
 * 根据数据类型获取对应的比较函数
 * 
 * @param dataType - 要比较的数据类型
 * @returns 对应数据类型的比较函数
 * @throws {Error} 当传入不支持的数据类型时抛出错误
 * 
 * @example
 *