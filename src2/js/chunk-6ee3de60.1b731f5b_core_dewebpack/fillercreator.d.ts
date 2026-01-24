/**
 * 填充物创建器模块
 * 用于创建不同类型的填充物实例（玻璃、屏风、遮阳板等）
 */

import { ShapeType, Glass, ScreenFiller, Shade, Panel, Empty } from './shapes';

/**
 * 填充物序列化数据接口
 */
interface FillerData {
  /** 填充物类型 */
  type: ShapeType;
  /** 其他序列化属性 */
  [key: string]: unknown;
}

/**
 * 填充物基类接口
 */
interface IFiller {
  /** 填充物类型 */
  type: ShapeType;
  /** 反序列化方法 */
  deserialize(data: FillerData): void;
}

/**
 * 填充物创建器工厂函数类型
 */
type FillerCreatorFunction = (param1: unknown, param2: unknown) => IFiller;

/**
 * 填充物创建器映射表类型
 */
type FillerCreatorMap = Record<ShapeType, FillerCreatorFunction>;

/**
 * 填充物创建器类
 * 使用单例模式和工厂模式创建不同类型的填充物实例
 */
export declare class FillerCreator {
  /**
   * 单例实例
   * @private
   */
  private static instance?: FillerCreator;

  /**
   * 获取单例实例
   * @returns FillerCreator实例
   */
  static get Ins(): FillerCreator;

  /**
   * 填充物创建器映射表
   * 存储不同类型填充物的创建函数
   */
  private creator: FillerCreatorMap;

  /**
   * 构造函数
   * 初始化各种填充物类型的创建器
   */
  constructor();

  /**
   * 创建填充物实例
   * @param data - 可选的序列化数据，用于恢复填充物状态
   * @param param1 - 创建参数1（具体含义由各填充物类型决定）
   * @param param2 - 创建参数2（具体含义由各填充物类型决定）
   * @param defaultType - 默认填充物类型，当data未提供时使用，默认为ShapeType.Glass
   * @returns 创建的填充物实例
   */
  create(
    data: FillerData | undefined,
    param1: unknown,
    param2: unknown,
    defaultType?: ShapeType
  ): IFiller;
}