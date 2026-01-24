/**
 * 装饰线条模块
 * 用于处理建筑装饰线条的创建、分割和变换操作
 */

import { Box } from './geometry';
import { Param } from './param';
import { WinPolygon, ShapeType } from './polygon';
import { DecorationComponent, DecorationComponentParser, DecorationBarType } from './decoration';

/**
 * 装饰线条序列化接口
 */
interface DecorationBarJSON {
  /** 组件列表 */
  cps: unknown[];
  /** 装饰类型 */
  tp: DecorationBarType;
}

/**
 * 装饰线条类
 * 管理装饰组件集合，支持多边形分割和空间变换
 */
export declare class DecorationBar {
  /** 装饰组件数组 */
  components: DecorationComponent[];
  
  /** 装饰线条类型 */
  private _type: DecorationBarType;
  
  /** 宿主多边形 */
  hostPoly: WinPolygon;
  
  /** 半线宽（单位：毫米） */
  semiBarWidth: number;

  /**
   * 构造函数
   * @param components - 装饰组件数组
   * @param type - 装饰线条类型，默认为中式装饰
   */
  constructor(components: DecorationComponent[], type?: DecorationBarType);

  /**
   * 序列化为JSON对象
   * @returns 包含组件和类型信息的JSON对象
   */
  private _toJSON(): DecorationBarJSON;

  /**
   * 从JSON数据反序列化
   * @param data - 序列化的装饰线条数据
   */
  private _deserialize(data: DecorationBarJSON): void;

  /**
   * 分割装饰线条为多个多边形
   * 每个组件根据宿主多边形边界创建独立的多边形实例
   * @returns 分割后的多边形数组，继承原宿主多边形的ID
   */
  split(): WinPolygon[];

  /**
   * 平移装饰线条
   * @param offset - 平移向量或偏移量
   */
  translate(offset: unknown): void;
}