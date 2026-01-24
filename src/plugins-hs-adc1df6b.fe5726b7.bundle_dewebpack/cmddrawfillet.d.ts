/**
 * 外部区域绘制-倒角命令
 * 用于在2D草图中创建倒角（圆角）的交互式绘制命令
 */

import { DrawFilletGizmo } from './DrawFilletGizmo';
import { HSApp } from './HSApp';

/**
 * 2D Gizmo 创建参数
 */
interface GizmoCreationParams {
  /** 上下文对象 */
  context: any;
  /** 显示图层集合 */
  displayLayers: {
    /** 临时图层 */
    temp: any;
  };
}

/**
 * 命令请求创建参数
 */
interface RequestCreationParams {
  /** 草图构建器实例 */
  sketchBuilder: any;
  /** 第一个参数（倒角起点或相关实体） */
  param1: any;
  /** 第二个参数（倒角终点或相关实体） */
  param2: any;
}

/**
 * 倒角绘制命令类
 * 继承自基础的倒角绘制命令，提供外部区域的倒角绘制功能
 */
export declare class CmdDrawFillet extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawFillet {
  /** 草图构建器实例 */
  private _sketchBuilder: any;
  
  /** 命令上下文 */
  protected context: {
    /** 事务管理器 */
    transManager: {
      /**
       * 创建请求
       * @param requestType 请求类型
       * @param params 请求参数数组
       */
      createRequest(requestType: string, params: any[]): any;
    };
  };

  /**
   * 构造函数
   */
  constructor();

  /**
   * 创建2D交互操作器（Gizmo）
   * @param params - Gizmo创建参数
   * @returns 倒角绘制Gizmo实例
   */
  protected _create2DGizmo(params: GizmoCreationParams): DrawFilletGizmo;

  /**
   * 创建命令请求
   * @param param1 - 第一个参数（倒角相关实体）
   * @param param2 - 第二个参数（倒角相关实体）
   * @returns 创建的请求对象
   */
  protected _createRequest(param1: any, param2: any): any;

  /**
   * 获取命令描述
   * @returns 命令的中文描述："外部区域绘制-倒角"
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 日志分组类型：外部区域绘制
   */
  getCategory(): string;
}

/**
 * HSFPConstants 常量定义
 */
declare namespace HSFPConstants {
  /** 请求类型命名空间 */
  namespace RequestType {
    /** 外部区域绘制相关请求类型 */
    namespace OutdoorDrawing {
      /** 倒角绘制请求类型标识 */
      const DrawFillet: string;
    }
  }

  /** 日志分组类型 */
  namespace LogGroupTypes {
    /** 外部区域绘制日志分组 */
    const OutdoorDrawing: string;
  }
}