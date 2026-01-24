/**
 * 基础绘图请求模块
 * 提供草图绘制的基础请求类和具体形状绘制请求类
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

/**
 * 曲线拓扑信息接口
 */
interface ExCurve {
  /** 曲线对象 */
  curve: {
    clone(): unknown;
    [key: string]: unknown;
  };
  /** 拓扑标识 */
  topo: string;
}

/**
 * 区域定义接口
 */
interface Region {
  /** 外轮廓曲线数组 */
  outer: ExCurve[];
  /** 内孔曲线数组的数组 */
  holes: ExCurve[][];
  /** 拓扑标识字符串 */
  topo: string;
}

/**
 * 草图2D构建器接口
 */
interface Sketch2dBuilder {
  /**
   * 添加区域到草图
   * @param regions - 要添加的区域数组
   */
  addRegions(regions: Region[]): void;
  
  /**
   * 更新附加信息
   * @param appendix - 包含绘图区域的附加数据
   */
  updateAppendix(appendix: { drawRegions: Region[] }): void;
}

/**
 * 基础绘图请求类
 * 继承自特殊草图2D请求基类，提供通用的区域绘制功能
 */
export declare class BaseDrawRequest extends HSApp.ExtraordinarySketch2d.Request.ExtraordinaryDrawRequest {
  /** 内部曲线数组 */
  protected _curves: ExCurve[];
  
  /** 草图2D构建器实例 */
  protected sketch2dBuilder: Sketch2dBuilder;
  
  /**
   * 执行绘图请求
   * 将曲线转换为区域并添加到草图构建器中
   */
  doRequest(): void;
  
  /**
   * 克隆扩展曲线对象
   * @param curve - 要克隆的扩展曲线
   * @returns 克隆后的新曲线对象
   */
  protected _cloneExCurve(curve: ExCurve): ExCurve;
}

/**
 * 矩形绘制请求类
 * 用于处理矩形形状的绘制操作
 */
export declare class DrawRectangleRequest extends BaseDrawRequest {
}

/**
 * 圆形绘制请求类
 * 用于处理圆形形状的绘制操作
 */
export declare class DrawCircleRequest extends BaseDrawRequest {
}

/**
 * 正多边形绘制请求类
 * 用于处理正多边形形状的绘制操作
 */
export declare class DrawRegularPolygonRequest extends BaseDrawRequest {
}