/**
 * 绘图请求模块
 * 提供板片编辑和各种几何图形的绘制请求类
 */

import { HSApp } from '518193';
import { HSCore } from '635589';

/**
 * 板片编辑绘图请求基类
 * 用于处理2D草图的区域绘制和更新
 */
export declare class SlabEditDrawRequest extends HSApp.ExtraordinarySketch2d.Request.ExtraordinaryDrawRequest {
  /**
   * 2D草图构建器实例
   */
  protected sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder;

  /**
   * 构造函数
   * @param sketch2dBuilder - 2D草图构建器实例
   * @param curves - 绘制的曲线集合
   */
  constructor(
    sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder,
    curves: unknown
  );

  /**
   * 执行绘图请求
   * 将曲线添加为区域并更新图层
   */
  doRequest(): void;
}

/**
 * 矩形绘制请求
 * 用于在2D草图中绘制矩形
 */
export declare class DrawRectangleRequest extends SlabEditDrawRequest {
  /**
   * 构造函数
   * @param sketch2dBuilder - 2D草图构建器实例
   * @param curves - 矩形的边界曲线
   */
  constructor(
    sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder,
    curves: unknown
  );
}

/**
 * 圆形绘制请求
 * 用于在2D草图中绘制圆形
 */
export declare class DrawCircleRequest extends SlabEditDrawRequest {
  /**
   * 构造函数
   * @param sketch2dBuilder - 2D草图构建器实例
   * @param curves - 圆形的边界曲线
   */
  constructor(
    sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder,
    curves: unknown
  );
}

/**
 * 正多边形绘制请求
 * 用于在2D草图中绘制正多边形
 */
export declare class DrawRegularPolygonRequest extends SlabEditDrawRequest {
  /**
   * 构造函数
   * @param sketch2dBuilder - 2D草图构建器实例
   * @param curves - 正多边形的边界曲线
   */
  constructor(
    sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder,
    curves: unknown
  );
}

/**
 * 区域数据接口
 * 描述2D草图中的区域结构
 */
interface RegionData {
  /** 外边界曲线 */
  outer: unknown[];
  /** 内部孔洞集合 */
  holes: unknown[];
  /** 拓扑标识符 */
  topo: string;
}