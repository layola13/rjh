/**
 * 命令：添加辅助线
 * 用于外部区域绘制场景中添加辅助线的命令类
 * @module CmdAddGuideLines
 */

import { HSApp } from './HSApp';
import { AddGuideLineGizmo } from './AddGuideLineGizmo';

/**
 * 2D Gizmo 创建参数
 */
interface GizmoCreateParams {
  /** 上下文对象 */
  context: any;
  /** 显示层配置 */
  displayLayers: {
    /** 临时显示层 */
    temp: any;
  };
}

/**
 * 添加辅助线命令类
 * 继承自特殊草图2D命令基类，用于在外部区域绘制中添加辅助线
 * @extends HSApp.ExtraordinarySketch2d.Cmd.CmdAddExGuideLines
 */
export declare class CmdAddGuideLines extends HSApp.ExtraordinarySketch2d.Cmd.CmdAddExGuideLines {
  /**
   * 草图2D构建器实例
   */
  sketch2dBuilder: any;

  /**
   * 上下文对象
   */
  context: any;

  /**
   * 构造函数
   */
  constructor();

  /**
   * 创建2D Gizmo对象
   * @param params - Gizmo创建参数，包含上下文和显示层信息
   * @returns 返回AddGuideLineGizmo实例
   */
  protected _create2DGizmo(params: GizmoCreateParams): AddGuideLineGizmo;

  /**
   * 创建请求对象
   * 通过事务管理器创建添加辅助线的请求
   * @param data - 请求所需的数据参数
   * @returns 返回创建的请求对象
   */
  protected _createRequest(data: any): any;

  /**
   * 获取命令描述
   * @returns 返回命令的中文描述信息
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 返回命令所属的日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * 全局常量命名空间
 */
declare namespace HSFPConstants {
  /**
   * 请求类型定义
   */
  namespace RequestType {
    /**
     * 外部区域绘制相关请求类型
     */
    namespace OutdoorDrawing {
      /** 添加辅助线请求类型 */
      const AddGuideLine: string;
    }
  }

  /**
   * 日志分组类型枚举
   */
  enum LogGroupTypes {
    /** 外部区域绘制分组 */
    OutdoorDrawing = 'OutdoorDrawing'
  }
}