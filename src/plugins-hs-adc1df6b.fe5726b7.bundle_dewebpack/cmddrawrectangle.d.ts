/**
 * 外部区域绘制 - 矩形绘制命令
 * 
 * 该模块提供了在2D草图中绘制矩形的命令实现
 * 继承自 CmdDrawExRectangle 基类
 * 
 * @module CmdDrawRectangle
 */

import { HSApp } from './HSApp';
import { DrawRectangleGizmo } from './DrawRectangleGizmo';

/**
 * 2D Gizmo 创建参数接口
 */
export interface IGizmoCreateParams {
  /** 绘图上下文 */
  context: any;
  /** 显示图层配置 */
  displayLayers: {
    /** 临时图层 */
    temp: any;
  };
}

/**
 * 矩形绘制命令类
 * 
 * 用于在户外区域绘图中添加矩形图形
 * 支持2D交互式绘制和请求管理
 * 
 * @extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExRectangle
 */
export declare class CmdDrawRectangle extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExRectangle {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 创建2D Gizmo（图形交互控件）
   * 
   * @param params - Gizmo创建参数
   * @returns 矩形绘制Gizmo实例
   */
  protected _create2DGizmo(params: IGizmoCreateParams): DrawRectangleGizmo;

  /**
   * 创建绘制请求
   * 
   * 通过事务管理器创建矩形绘制请求
   * 
   * @param data - 绘制数据参数
   * @returns 创建的请求对象
   */
  protected _createRequest(data: any): any;

  /**
   * 获取命令描述
   * 
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * 
   * @returns 日志分组类型（户外绘图）
   */
  getCategory(): string;
}