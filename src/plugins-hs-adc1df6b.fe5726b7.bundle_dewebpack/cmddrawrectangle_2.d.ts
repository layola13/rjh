/**
 * 矩形绘制命令模块
 * 用于绘制矩形屋顶的命令类
 * @module CmdDrawRectangle
 */

import { HSApp } from './518193';
import { DrawRectangleGizmo } from './934655';

/**
 * Gizmo创建参数接口
 * 定义创建2D Gizmo所需的上下文和图层信息
 */
export interface GizmoCreationParams {
  /** 绘图上下文 */
  context: unknown;
  /** 显示图层配置 */
  displayLayers: {
    /** 临时图层 */
    temp: unknown;
  };
}

/**
 * 请求创建参数类型
 * 传递给事务管理器创建请求的参数
 */
export type RequestParams = unknown;

/**
 * 矩形绘制命令类
 * 继承自超常规2D草图矩形绘制命令，用于绘制矩形屋顶
 * @extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExRectangle
 */
export declare class CmdDrawRectangle extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExRectangle {
  /**
   * 2D草图构建器
   * 用于管理和更新2D草图数据
   */
  protected sketch2dBuilder: {
    /** 清空草图 */
    clear(): void;
    /** 更新2D草图 */
    updateSketch2d(sketch: unknown): void;
    /** 获取当前草图 */
    getSketch(): unknown;
  };

  /**
   * 命令上下文
   * 包含事务管理器等核心功能
   */
  protected context: {
    /** 事务管理器 */
    transManager: {
      /** 创建请求 */
      createRequest(type: string, params: unknown[]): unknown;
    };
  };

  /**
   * 构造函数
   * 初始化矩形绘制命令实例
   */
  constructor();

  /**
   * 创建2D Gizmo
   * 用于矩形绘制的交互式图形操控器
   * @param params - Gizmo创建参数
   * @returns 矩形绘制Gizmo实例
   */
  protected _create2DGizmo(params: GizmoCreationParams): DrawRectangleGizmo;

  /**
   * 创建绘制请求
   * 清空并更新草图构建器，然后创建矩形屋顶绘制请求
   * @param params - 请求参数
   * @returns 创建的请求对象
   */
  protected _createRequest(params: RequestParams): unknown;

  /**
   * 获取命令描述
   * @returns 命令的中文描述文本
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令所属的日志分组类型（屋顶绘制）
   */
  getCategory(): string;
}

/**
 * HSFPConstants 常量命名空间声明
 * 包含请求类型和日志分组类型的常量定义
 */
declare global {
  namespace HSFPConstants {
    /** 请求类型常量 */
    namespace RequestType {
      /** 屋顶绘制相关请求类型 */
      namespace RoofsDrawing {
        /** 绘制矩形屋顶请求类型 */
        const DrawRectangle: string;
      }
    }

    /** 日志分组类型常量 */
    namespace LogGroupTypes {
      /** 屋顶绘制日志分组 */
      const RoofsDrawing: string;
    }
  }
}