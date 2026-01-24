/**
 * 装饰组件解析器模块
 * 用于解析各种类型的装饰组件（边、角、多边形、线等）
 */

import { Point } from './geometric-types';
import {
  DecorationComponentType,
  DecoraitonReferencePoint,
  DecoraitonReference,
  DecorationPolyEdge,
  DecorationCorner,
  DecorationPoly,
  DecorationLine,
  DecorationLineArbitrary
} from './decoration-types';

/**
 * 装饰组件的基础数据接口
 */
interface DecorationComponentData {
  /** 装饰组件类型 */
  tp: DecorationComponentType;
  /** 其他序列化数据 */
  [key: string]: unknown;
}

/**
 * 装饰组件解析器
 * 负责将序列化的装饰组件数据反序列化为对应的装饰对象
 */
export declare class DecorationComponentParser {
  /**
   * 解析装饰组件数据
   * @param data - 序列化的装饰组件数据
   * @returns 对应类型的装饰组件实例
   * @throws {Error} 当遇到不支持的组件类型时抛出异常
   */
  static parse(
    data: DecorationComponentData
  ): DecorationPolyEdge | DecorationCorner | DecorationPoly | DecorationLine | DecorationLineArbitrary;

  /**
   * 解析装饰参考点
   * @param data - 序列化的参考点数据
   * @returns 装饰参考点实例
   */
  static parsePoint(data: unknown): DecoraitonReferencePoint;

  /**
   * 解析多边形边装饰
   * @param data - 序列化的边装饰数据
   * @returns 多边形边装饰实例
   */
  static parseEdge(data: unknown): DecorationPolyEdge;

  /**
   * 解析角装饰
   * @param data - 序列化的角装饰数据
   * @returns 角装饰实例
   */
  static parseCorner(data: unknown): DecorationCorner;

  /**
   * 解析多边形装饰
   * @param data - 序列化的多边形装饰数据
   * @returns 多边形装饰实例
   */
  static parsePoly(data: unknown): DecorationPoly;

  /**
   * 解析直线装饰
   * @param data - 序列化的直线装饰数据
   * @returns 直线装饰实例
   */
  static parseLine(data: unknown): DecorationLine;

  /**
   * 解析任意线装饰
   * @param data - 序列化的任意线装饰数据
   * @returns 任意线装饰实例
   */
  static parseLineArbitrary(data: unknown): DecorationLineArbitrary;
}