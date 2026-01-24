/**
 * DrawRequest 模块
 * 用于处理屋顶绘制请求的类
 */

import { ExtraordinaryDrawRequest } from './ExtraordinaryDrawRequest';
import { RoofsDrawingSketch2dBuilder, RoofDrawingRegion, Sketch, Face, Curve } from './HSCore';
import { App } from './HSApp';

/**
 * 区域定义接口
 */
interface Region {
  /** 外部曲线集合 */
  outer: Curve[];
  /** 孔洞曲线集合 */
  holes: Curve[][];
  /** 拓扑标记，格式: "-1_{RegionTopoTag}" */
  topo: string;
}

/**
 * 草图接口
 */
interface Sketch {
  /** 草图中的面集合 */
  faces: Face[];
  [key: string]: unknown;
}

/**
 * 屋顶绘制请求类
 * 继承自 ExtraordinaryDrawRequest，用于处理屋顶绘制的特殊请求
 */
export declare class DrawRequest extends ExtraordinaryDrawRequest {
  /**
   * 2D 草图构建器实例
   */
  protected sketch2dBuilder: RoofsDrawingSketch2dBuilder;

  /**
   * 曲线集合（继承自父类）
   */
  protected _curves: Curve[];

  /**
   * 构造函数
   * @param sketch2dBuilder - 屋顶绘制的 2D 草图构建器
   * @param curves - 用于绘制的曲线集合
   */
  constructor(sketch2dBuilder: RoofsDrawingSketch2dBuilder, curves: Curve[]);

  /**
   * 执行绘制请求
   * 创建区域并添加到草图构建器中，然后更新附录并添加屋顶绘制区域
   */
  doRequest(): void;

  /**
   * 添加屋顶绘制区域
   * 如果草图只有一个面，则创建 RoofDrawingRegion 并添加到活动图层
   * @private
   */
  private _addRoofDrawingRegion(): void;
}