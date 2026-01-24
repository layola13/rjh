/**
 * 绘制圆形命令模块
 * 用于在楼板编辑中添加圆形洞口
 * @module CmdDrawCircle
 */

import { HSApp } from './HSApp';
import { DrawCircleGizmo } from './DrawCircleGizmo';

/**
 * 2D Gizmo 创建参数接口
 */
interface IGizmoCreateParams {
  /** 上下文对象 */
  context: unknown;
  /** 显示图层集合 */
  displayLayers: {
    /** 临时图层 */
    temp: unknown;
  };
}

/**
 * 绘制圆形命令类
 * 继承自超常规草图2D绘制圆形命令
 * 用于在楼板编辑模式下绘制圆形洞口
 * @extends {HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExCircle}
 */
export class CmdDrawCircle extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExCircle {
  /**
   * 草图2D构建器实例
   */
  private sketch2dBuilder: unknown;

  /**
   * 上下文对象
   */
  protected context: {
    /** 事务管理器 */
    transManager: {
      /**
       * 创建请求
       * @param requestType 请求类型
       * @param params 请求参数
       */
      createRequest(requestType: string, params: unknown[]): unknown;
    };
  };

  /**
   * 创建2D Gizmo对象
   * @param params - Gizmo创建参数
   * @returns 绘制圆形的Gizmo实例
   */
  protected _create2DGizmo(params: IGizmoCreateParams): DrawCircleGizmo {
    return new DrawCircleGizmo(
      params.context,
      params.displayLayers.temp,
      this
    );
  }

  /**
   * 创建绘制圆形的请求
   * @param circleData - 圆形数据参数
   * @returns 创建的请求对象
   */
  protected _createRequest(circleData: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.SlabEdit.DrawCircle,
      [this.sketch2dBuilder, circleData]
    );
  }

  /**
   * 获取命令描述信息
   * @returns 命令的中文描述
   */
  public getDescription(): string {
    return '楼板编辑添加圆形洞';
  }

  /**
   * 获取命令所属分类
   * @returns 日志分组类型
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}

/**
 * 全局常量命名空间
 */
declare const HSFPConstants: {
  /** 请求类型 */
  RequestType: {
    /** 楼板编辑相关请求 */
    SlabEdit: {
      /** 绘制圆形请求类型 */
      DrawCircle: string;
    };
  };
  /** 日志分组类型 */
  LogGroupTypes: {
    /** 楼板编辑日志分组 */
    SlabEdit: string;
  };
};