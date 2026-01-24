/**
 * 绘制多边形请求模块
 * 用于在2D草图中创建多边形区域的请求处理类
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

/**
 * 绘制多边形请求类
 * 继承自ExDrawLinesRequest，用于处理多边形绘制操作
 */
export class DrawPolygonsRequest extends HSApp.ExtraordinarySketch2d.Request.ExDrawLinesRequest {
  /**
   * 2D草图构建器实例
   * 负责管理和更新草图图层
   */
  private sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder;

  /**
   * 多边形区域集合
   * @private
   */
  private _regions: Array<{ topo: string }>;

  /**
   * 构造函数
   * @param sketch2dBuilder - 2D草图构建器实例
   * @param regions - 多边形区域数据
   */
  constructor(
    sketch2dBuilder: HSCore.Model.LayerSketch2dBuilder,
    regions: Array<{ topo: string }>
  ) {
    super(sketch2dBuilder, regions);

    this.sketch2dBuilder = sketch2dBuilder;
    this._regions = regions;

    // 为每个区域设置拓扑标签，标记为孔洞拓扑
    this._regions.forEach((region) => {
      region.topo = `-1_${HSCore.Model.LayerSketch2dBuilder.HoleTopoTag}`;
    });
  }

  /**
   * 执行绘制请求
   * 调用父类方法并更新草图图层
   * @override
   */
  doRequest(): void {
    // 调用父类的doRequest方法
    super.doRequest();

    // 更新草图构建器的图层
    this.sketch2dBuilder.updateLayer();
  }
}