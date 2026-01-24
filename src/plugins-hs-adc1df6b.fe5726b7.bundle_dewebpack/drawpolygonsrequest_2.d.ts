/**
 * 绘制多边形请求类
 * 用于在2D草图中创建多边形的请求处理
 * @module DrawPolygonsRequest
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

/**
 * 绘制多边形请求类
 * 继承自ExDrawLinesRequest，用于处理多边形绘制操作
 * @extends HSApp.ExtraordinarySketch2d.Request.ExDrawLinesRequest
 */
export declare class DrawPolygonsRequest extends HSApp.ExtraordinarySketch2d.Request.ExDrawLinesRequest {
  /**
   * 2D草图构建器实例
   * 用于管理和更新草图内容
   */
  protected sketch2dBuilder: HSCore.Model.OutdoorDrawingSketch2dBuilder;

  /**
   * 区域集合
   * 存储多边形的各个区域信息
   * @private
   */
  private _regions: Region[];

  /**
   * 构造函数
   * @param sketch2dBuilder - 2D草图构建器实例
   * @param regions - 要绘制的多边形区域数组
   */
  constructor(
    sketch2dBuilder: HSCore.Model.OutdoorDrawingSketch2dBuilder,
    regions: Region[]
  );

  /**
   * 执行请求
   * 处理多边形绘制逻辑并更新草图附录信息
   * @returns void
   */
  doRequest(): void;
}

/**
 * 多边形区域接口
 * 描述单个多边形区域的拓扑信息
 */
interface Region {
  /**
   * 拓扑标识符
   * 格式: "-1_{FaceTopoTag}"
   */
  topo: string;
}

/**
 * HSCore命名空间扩展
 */
declare namespace HSCore.Model {
  /**
   * 户外绘图2D草图构建器
   */
  class OutdoorDrawingSketch2dBuilder {
    /**
     * 面拓扑标签常量
     */
    static readonly FaceTopoTag: string;

    /**
     * 更新附录信息
     * 刷新草图的附加数据
     */
    updateAppendix(): void;
  }
}

/**
 * HSApp命名空间扩展
 */
declare namespace HSApp.ExtraordinarySketch2d.Request {
  /**
   * 扩展绘制线条请求基类
   */
  class ExDrawLinesRequest {
    /**
     * 区域集合
     */
    protected _regions: Region[];

    /**
     * 构造函数
     * @param builder - 草图构建器
     * @param regions - 区域数组
     */
    constructor(builder: unknown, regions: Region[]);

    /**
     * 执行请求的基础方法
     */
    doRequest(): void;
  }
}