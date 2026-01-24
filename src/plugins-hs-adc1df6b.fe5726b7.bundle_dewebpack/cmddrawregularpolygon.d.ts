/**
 * 正多边形绘制命令模块
 * 用于在2D草图中绘制正多边形区域
 * @module CmdDrawRegularPolygon
 */

import { HSApp } from './types/HSApp';
import { DrawRegularPolygonGizmo } from './DrawRegularPolygonGizmo';
import { HSFPConstants } from './constants/HSFPConstants';

/**
 * 2D Gizmo创建参数接口
 */
interface GizmoCreateParams {
  /** 绘图上下文 */
  context: unknown;
  /** 显示层配置 */
  displayLayers: {
    /** 临时绘制层 */
    temp: unknown;
  };
}

/**
 * 正多边形绘制命令类
 * 继承自超常规2D草图的正多边形绘制命令基类
 * 用于在外部区域绘制模式下添加正多边形区域
 * @extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExRegularPolygon
 */
export declare class CmdDrawRegularPolygon extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExRegularPolygon {
  /**
   * 2D草图构建器实例
   */
  protected sketch2dBuilder: unknown;

  /**
   * 命令执行上下文
   */
  protected context: {
    /** 事务管理器 */
    transManager: {
      /**
       * 创建请求
       * @param requestType - 请求类型
       * @param args - 请求参数数组
       */
      createRequest(requestType: string, args: unknown[]): unknown;
    };
  };

  /**
   * 构造函数
   */
  constructor();

  /**
   * 创建2D绘制辅助器（Gizmo）
   * @param params - Gizmo创建参数
   * @returns 正多边形绘制Gizmo实例
   * @protected
   */
  protected _create2DGizmo(params: GizmoCreateParams): DrawRegularPolygonGizmo;

  /**
   * 创建绘制请求
   * 将正多边形绘制操作提交到事务管理器
   * @param data - 绘制数据参数
   * @returns 创建的请求对象
   * @protected
   */
  protected _createRequest(data: unknown): unknown;

  /**
   * 获取命令描述信息
   * @returns 命令的文字描述
   */
  getDescription(): string;

  /**
   * 获取命令所属分类
   * @returns 日志分组类型（外部区域绘制）
   */
  getCategory(): string;
}