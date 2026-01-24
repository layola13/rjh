/**
 * Empty填充类型模块
 * 用于表示多边形的空填充状态
 */

import { Filler, ShapeType } from './filler-module';

/**
 * 空填充序列化接口
 */
interface EmptyJSON {
  /** 填充类型 */
  type: string;
  /** 多边形ID的JSON表示 */
  pid: unknown;
}

/**
 * 空填充类
 * 继承自Filler基类，表示不进行任何填充的特殊填充类型
 */
export declare class Empty extends Filler {
  /**
   * 宿主对象引用
   */
  host: unknown;

  /**
   * 构造函数
   * @param host - 宿主对象，通常是包含此填充的图形对象
   * @param polygon - 关联的多边形对象
   */
  constructor(host: unknown, polygon: unknown);

  /**
   * 序列化为JSON对象
   * @returns 包含类型和多边形ID的JSON对象
   */
  toJSON(): EmptyJSON;

  /**
   * 从JSON数据反序列化
   * @param data - 序列化的JSON数据
   */
  deserialize(data: EmptyJSON): void;
}