/**
 * 楼板编辑倒角命令
 * 用于在2D草图中创建圆角/倒角功能
 * @module CmdDrawFillet
 */

import { DrawFilletGizmo } from './DrawFilletGizmo';
import { HSApp } from './HSApp';

/**
 * 2D Gizmo 创建选项
 */
interface GizmoCreateOptions {
  /** 上下文对象 */
  context: unknown;
  /** 显示图层配置 */
  displayLayers: {
    /** 临时图层 */
    temp: unknown;
  };
}

/**
 * 楼板编辑倒角命令类
 * 继承自基础的2D草图倒角命令，提供楼板特定的倒角编辑功能
 * @extends {HSApp.ExtraordinarySketch2d.Cmd.CmdDrawFillet}
 */
export class CmdDrawFillet extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawFillet {
  /** 草图构建器实例 */
  private readonly _sketchBuilder: unknown;

  /** 上下文对象 */
  protected readonly context: {
    /** 事务管理器 */
    transManager: {
      /**
       * 创建请求
       * @param requestType - 请求类型
       * @param args - 请求参数数组
       * @returns 创建的请求对象
       */
      createRequest(requestType: string, args: unknown[]): unknown;
    };
  };

  /**
   * 创建2D Gizmo（图形控制器）
   * @param options - Gizmo创建选项
   * @returns 倒角Gizmo实例
   */
  protected _create2DGizmo(options: GizmoCreateOptions): DrawFilletGizmo {
    return new DrawFilletGizmo(
      options.context,
      options.displayLayers.temp,
      this,
      this._sketchBuilder
    );
  }

  /**
   * 创建倒角编辑请求
   * @param param1 - 第一个参数（具体类型由业务定义）
   * @param param2 - 第二个参数（具体类型由业务定义）
   * @returns 创建的请求对象
   */
  protected _createRequest(param1: unknown, param2: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.SlabEdit.DrawFillet,
      [this._sketchBuilder, param1, param2]
    );
  }

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  public getDescription(): string {
    return '楼板编辑倒角';
  }

  /**
   * 获取命令所属分类
   * @returns 日志分组类型常量
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}

/**
 * 全局常量定义（需要在项目中声明）
 */
declare const HSFPConstants: {
  /** 请求类型枚举 */
  RequestType: {
    /** 楼板编辑相关请求 */
    SlabEdit: {
      /** 倒角请求类型 */
      DrawFillet: string;
    };
  };
  /** 日志分组类型 */
  LogGroupTypes: {
    /** 楼板编辑分组 */
    SlabEdit: string;
  };
};