/**
 * 装饰条解析器模块
 * 用于根据类型标识解析和反序列化不同类型的装饰条对象
 */

import {
  DecorationBarType,
  DecorationBarChinese,
  DecorationBarChinese2,
  DecorationBarChinese3,
  DecorationBarChinese4,
  DecorationBarPrairie,
  DecorationBarColonial,
  DecorationBarDiamond,
  DecorationBarSemiArc
} from './decoration-bar-types';

/**
 * 装饰条序列化数据接口
 */
export interface DecorationBarSerializedData {
  /** 装饰条类型标识 */
  tp: DecorationBarType;
  /** 其他序列化属性 */
  [key: string]: unknown;
}

/**
 * 装饰条基类接口
 */
export interface IDecorationBar {
  /**
   * 反序列化方法
   * @param data - 序列化的装饰条数据
   */
  deserialize(data: DecorationBarSerializedData): void;
}

/**
 * 装饰条解析器类
 * 负责根据类型创建相应的装饰条实例并进行反序列化
 */
export class DecorationBarParser {
  /**
   * 解析装饰条数据并返回对应的装饰条实例
   * 
   * @param data - 包含类型标识的序列化装饰条数据
   * @returns 反序列化后的装饰条实例
   * @throws {Error} 当装饰条类型不支持时抛出异常
   * 
   * @example
   *