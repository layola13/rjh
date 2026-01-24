/**
 * 楼板编辑 - 绘制矩形命令
 * 用于在楼板编辑模式下添加矩形洞口的命令类
 * @module CmdDrawRectangle
 */

import { HSApp } from './HSApp';
import { DrawRectangleGizmo } from './DrawRectangleGizmo';

/**
 * Gizmo 创建参数接口
 */
interface GizmoCreateParams {
  /** 上下文对象 */
  context: unknown;
  /** 显示图层集合 */
  displayLayers: {
    /** 临时图层 */
    temp: unknown;
  };
}

/**
 * 楼板编辑绘制矩形命令类
 * 继承自超常草图2D矩形绘制命令，用于在楼板上添加矩形洞口
 * @extends {HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExRectangle}
 */
export declare class CmdDrawRectangle extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExRectangle {
  /**
   * 草图2D构建器实例
   */
  sketch2dBuilder: unknown;

  /**
   * 命令上下文
   */
  context: {
    /** 事务管理器 */
    transManager: {
      /**
       * 创建请求
       * @param requestType 请求类型
       * @param params 请求参数数组
       * @returns 创建的请求对象
       */
      createRequest(requestType: string, params: unknown[]): unknown;
    };
  };

  /**
   * 创建2D Gizmo（图形控制器）
   * @param params Gizmo创建参数
   * @returns 矩形绘制Gizmo实例
   */
  protected _create2DGizmo(params: GizmoCreateParams): DrawRectangleGizmo;

  /**
   * 创建命令请求
   * @param data 请求数据
   * @returns 楼板编辑绘制矩形的请求对象
   */
  protected _createRequest(data: unknown): unknown;

  /**
   * 获取命令描述信息
   * @returns 返回命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令所属分类
   * @returns 返回日志分组类型（楼板编辑）
   */
  getCategory(): string;
}

/**
 * 全局常量 - HSFPConstants 命名空间
 */
declare global {
  namespace HSFPConstants {
    /** 请求类型枚举 */
    namespace RequestType {
      /** 楼板编辑相关请求类型 */
      namespace SlabEdit {
        /** 绘制矩形请求类型标识 */
        const DrawRectangle: string;
      }
    }

    /** 日志分组类型枚举 */
    namespace LogGroupTypes {
      /** 楼板编辑日志分组标识 */
      const SlabEdit: string;
    }
  }
}