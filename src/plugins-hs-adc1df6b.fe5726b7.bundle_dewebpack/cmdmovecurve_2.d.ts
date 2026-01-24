/**
 * 移动曲线命令模块
 * 用于外部区域绘制中的曲线移动操作
 * @module CmdMoveCurve
 * @originalId 633105
 */

import { HSApp } from './HSApp';

/**
 * 请求参数类型
 */
interface MoveCurveRequestParams {
  /** 曲线标识 */
  curveId?: string;
  /** 移动向量 */
  moveVector?: { x: number; y: number };
  /** 其他请求参数 */
  [key: string]: unknown;
}

/**
 * 移动曲线命令类
 * 继承自基础的移动曲线命令，专门用于外部区域绘制场景
 * @extends HSApp.ExtraordinarySketch2d.Cmd.CmdMoveCurve
 */
export declare class CmdMoveCurve extends HSApp.ExtraordinarySketch2d.Cmd.CmdMoveCurve {
  /**
   * 上下文对象，包含事务管理器等
   */
  protected context: {
    transManager: {
      /**
       * 创建请求
       * @param requestType 请求类型
       * @param params 请求参数
       */
      createRequest(requestType: string, params: MoveCurveRequestParams): unknown;
    };
  };

  /**
   * 构造函数
   */
  constructor();

  /**
   * 创建移动曲线请求
   * @param params 请求参数
   * @returns 创建的请求对象
   * @protected
   */
  protected _createRequest(params: MoveCurveRequestParams): unknown;

  /**
   * 获取命令描述信息
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取拓扑无效时的提示信息
   * @returns 从资源管理器获取的提示文本
   * @protected
   */
  protected _getToposInvalidTip(): string;

  /**
   * 获取命令所属的日志分类
   * @returns 日志分组类型常量
   */
  getCategory(): string;
}

/**
 * 常量定义命名空间
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  namespace RequestType {
    namespace OutdoorDrawing {
      /** 移动曲线请求类型常量 */
      const MoveCurve: string;
    }
  }

  /**
   * 日志分组类型枚举
   */
  namespace LogGroupTypes {
    /** 外部区域绘制日志分组 */
    const OutdoorDrawing: string;
  }
}

/**
 * 资源管理器
 */
declare namespace ResourceManager {
  /**
   * 根据键获取国际化字符串
   * @param key 资源键
   * @returns 对应的字符串资源
   */
  function getString(key: string): string;
}