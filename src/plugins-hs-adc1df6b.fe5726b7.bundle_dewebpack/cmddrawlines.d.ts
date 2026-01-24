/**
 * 外部区域绘制-划线命令
 * 用于在2D草图中绘制多条线段
 */

import { HSApp } from './HSApp';
import { DrawLines } from './DrawLines';
import { HSFPConstants } from './HSFPConstants';

/**
 * 路径数据接口
 */
export interface IPathData {
  /** 路径点集合 */
  points?: Array<{ x: number; y: number }>;
  /** 路径属性 */
  [key: string]: unknown;
}

/**
 * 显示层配置接口
 */
export interface IDisplayLayers {
  /** 临时绘制层 */
  temp: unknown;
  [key: string]: unknown;
}

/**
 * 命令接收事件数据接口
 */
export interface IEventData {
  /** 键盘按键码 */
  keyCode?: number;
  /** 鼠标事件 */
  event?: {
    /** 鼠标按键 (0: 左键, 1: 中键, 2: 右键) */
    button: number;
  };
  /** 完成的路径集合 */
  paths?: IPathData[];
}

/**
 * 2D Gizmo 配置接口
 */
export interface IGizmoConfig {
  /** 上下文对象 */
  context: unknown;
  /** 显示层配置 */
  displayLayers: IDisplayLayers;
}

/**
 * 2D Gizmo 接口
 */
export interface IGizmo2D {
  /** 处理 ESC 键事件 */
  onESC(event?: Event): void;
  /** 重置 Gizmo 状态 */
  reset(): void;
}

/**
 * 事务管理器接口
 */
export interface ITransactionManager {
  /**
   * 创建请求
   * @param requestType - 请求类型
   * @param params - 请求参数
   */
  createRequest(requestType: string, params: unknown[]): unknown;
  
  /**
   * 提交请求
   * @param request - 请求对象
   */
  commit(request: unknown): void;
}

/**
 * 上下文接口
 */
export interface IContext {
  /** 事务管理器 */
  transManager: ITransactionManager;
  [key: string]: unknown;
}

/**
 * 2D 草图构建器接口
 */
export interface ISketch2DBuilder {
  /** 上下文对象 */
  context: IContext;
  [key: string]: unknown;
}

/**
 * 划线命令类
 * 继承自外部区域绘制基础命令，用于在2D草图中绘制线段
 */
export declare class CmdDrawLines extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExLines {
  /** 2D 草图构建器实例 */
  protected sketch2dBuilder: ISketch2DBuilder;
  
  /** 当前活动的 Gizmo 实例 */
  protected gizmo?: IGizmo2D;
  
  /** 上下文对象 */
  protected context: IContext;

  /**
   * 构造函数
   * @param sketch2dBuilder - 2D 草图构建器实例
   */
  constructor(sketch2dBuilder: ISketch2DBuilder);

  /**
   * 创建2D Gizmo实例
   * @param config - Gizmo 配置对象
   * @returns DrawLines Gizmo 实例
   */
  protected _create2DGizmo(config: IGizmoConfig): DrawLines;

  /**
   * 接收并处理事件
   * @param eventType - 事件类型 ("keydown" | "click" | "gizmo.completeSinglePath")
   * @param eventData - 事件数据
   * @returns 是否处理了该事件
   */
  onReceive(eventType: string, eventData: IEventData): boolean;

  /**
   * 创建绘制线段请求
   * @param paths - 路径数据集合
   * @returns 请求对象
   */
  protected _createRequest(paths: IPathData[]): unknown;

  /**
   * 获取命令描述
   * @returns 命令描述字符串
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 日志分组类型
   */
  getCategory(): string;

  /**
   * 显示提示信息
   * @param paths - 已完成的路径数据
   */
  protected showToast(paths: IPathData[]): void;
}