/**
 * 楼板编辑 - 绘制正多边形命令
 * 用于在楼板编辑模式下添加多边形洞口
 * @module CmdDrawRegularPolygon
 */

import { DrawRegularPolygonGizmo } from './DrawRegularPolygonGizmo';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 2D Gizmo 配置选项
 */
interface IGizmoOptions {
  /** 渲染上下文 */
  context: unknown;
  /** 显示图层配置 */
  displayLayers: {
    /** 临时图层 */
    temp: unknown;
  };
}

/**
 * 楼板编辑 - 绘制正多边形命令类
 * 继承自超常草图2D绘制正多边形命令基类
 */
export class CmdDrawRegularPolygon extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExRegularPolygon {
  /**
   * 上下文对象，包含事务管理器
   */
  protected context: {
    transManager: {
      createRequest: (requestType: string, params: unknown[]) => unknown;
    };
  };

  /**
   * 2D草图构建器
   */
  protected sketch2dBuilder: unknown;

  /**
   * 创建2D Gizmo（图形操纵器）
   * @param options - Gizmo配置选项
   * @returns 正多边形绘制Gizmo实例
   */
  protected _create2DGizmo(options: IGizmoOptions): DrawRegularPolygonGizmo {
    return new DrawRegularPolygonGizmo(
      options.context,
      options.displayLayers.temp,
      this
    );
  }

  /**
   * 创建绘制请求
   * @param params - 绘制参数
   * @returns 事务请求对象
   */
  protected _createRequest(params: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.SlabEdit.DrawRegularPolygon,
      [this.sketch2dBuilder, params]
    );
  }

  /**
   * 获取命令描述信息
   * @returns 命令的中文描述
   */
  public getDescription(): string {
    return '楼板编辑添加多边形洞';
  }

  /**
   * 获取命令所属分类
   * @returns 日志分组类型 - 楼板编辑
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}